from django.contrib.auth import authenticate, login as django_login
from django.contrib.auth import logout as django_logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import AllowAny

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes, permission_classes, authentication_classes
from django.db.models import CharField
from django.db.models.functions import Cast
from rest_framework.views import APIView

from App.forms import MealForm, CategoryForm
from App.models import Category, Meal, Table, MealTable, AcceptedOrder, YourOrder, Payment

from django.http import JsonResponse
from django.db import connection

def debug_status(request):
    tables = connection.introspection.table_names()
    error = None

    return JsonResponse({
        "tables": tables,
        "orders_table_exists": "App_order" in tables,
        "orders_error": error,
    })

@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({"detail": "CSRF cookie set"})
@api_view(['GET'])
def get_categories(request):
    categories = list(Category.objects.values())
    return Response(categories)


@api_view(['GET'])
def get_meals(request):
    query = request.GET.get('q', '')
    if query:
        meals = Meal.objects.filter(titleMK__istartswith=query.capitalize()).values()
    else:
        meals = list(Meal.objects.values())
    return Response(meals)


@api_view(['GET'])
def get_meals_by_category(request, category_id):
    meals = list(Meal.objects.filter(Category_id=category_id).values())
    return Response(meals)


@api_view(['GET'])
def get_tables(request):
    query = request.GET.get('q', '')
    if query:
        tables = Table.objects.annotate(id_str=Cast('id', CharField())).filter(id_str__istartswith=query).values()
    else:
        tables = Table.objects.all().values()
    return Response(list(tables))


class GroupedOrders(APIView):
    def get(self, request):
        data = AcceptedOrder.objects.all().select_related('Table', 'Meal')

        grouped = {}

        for item in data:
            table_id = item.Table.id
            meal = item.Meal

            if table_id not in grouped:
                grouped[table_id] = {
                    "meals": {},
                    "total_price": 0,
                    "payment_method": None
                }

            if not grouped[table_id]["payment_method"]:
                try:
                    payment = Payment.objects.filter(table_id=table_id).first()
                    if payment:
                        grouped[table_id]["payment_method"] = payment.payment_method
                except:
                    pass

            if meal.id not in grouped[table_id]["meals"]:
                grouped[table_id]["meals"][meal.id] = {
                    "titleMK": meal.titleMK,
                    "priceMK": meal.priceMK,
                    "count": 0,
                    "subtotal": 0
                }

            grouped[table_id]["meals"][meal.id]["count"] += 1

            grouped[table_id]["meals"][meal.id]["subtotal"] = (
                    grouped[table_id]["meals"][meal.id]["count"] * meal.priceMK
            )

        for table_id, obj in grouped.items():
            total = 0
            for meal_info in obj["meals"].values():
                total += meal_info["subtotal"]

            obj["total_price"] = total

        resp = []
        for table_id, obj in grouped.items():
            resp.append({
                "table": table_id,
                "meals": list(obj["meals"].values()),
                "total_price": obj["total_price"],
                "payment_method": obj["payment_method"]  # Вклучи го payment методот
            })

        return Response(resp)


class OrdersByTable(APIView):
    def get(self, request, table_id):
        data = MealTable.objects.filter(Table_id=table_id).select_related('Meal')
        grouped = {}

        for item in data:
            meal = item.Meal

            if meal.id not in grouped:
                grouped[meal.id] = {
                    "id": meal.id,
                    "titleMK": meal.titleMK,
                    "title": meal.title,
                    "priceMK": meal.priceMK,
                    "price": meal.price,
                    "count": 0,
                    "subtotal": 0
                }

            grouped[meal.id]["count"] += 1
            grouped[meal.id]["subtotal"] = grouped[meal.id]["count"] * meal.priceMK

        total_price = sum(meal_info["subtotal"] for meal_info in grouped.values())

        resp = {
            "table": table_id,
            "meals": list(grouped.values()),
            "total_price": total_price

        }

        return Response(resp)


@api_view(['POST'])
def add_meal(request, table_id, meal_id):
    meal = Meal.objects.get(id=meal_id)
    table = Table.objects.get(id=table_id)
    MealTable.objects.create(
        Table=table,
        Meal=meal,
    )
    return Response({"success": True, "Message": "Meal added"}, status=201)


@api_view(['POST'])
def remove_meal(request, table_id, meal_id):
    try:
        items = MealTable.objects.filter(Table_id=table_id, Meal_id=meal_id)
    except MealTable.DoesNotExist:
        return Response({"error": "Meal not found"}, status=404)
    if items.count() > 0:
        items.first().delete()
    return Response({"success": True, "Message": "Meal removed"}, status=201)


@api_view(['POST'])
def add_order(request, table_id):
    items = MealTable.objects.filter(Table_id=table_id)
    for item in items:
        AcceptedOrder.objects.create(
            Table=item.Table,
            Meal=item.Meal,
        )
        YourOrder.objects.create(
            Table=item.Table,
            Meal=item.Meal,
        )
    MealTable.objects.filter(Table_id=table_id).delete()
    return Response({"status": "ok"})


@api_view(['POST'])
def remove_order(request, table_id):
    AcceptedOrder.objects.filter(Table_id=table_id).delete()
    YourOrder.objects.filter(Table_id=table_id).delete()
    Payment.objects.filter(table_id=table_id).delete()
    return Response({"status": "ok"})


class Your_order(APIView):
    def get(self, request, table_id):
        data = YourOrder.objects.filter(Table_id=table_id).select_related('Meal')
        grouped = {}

        for item in data:
            meal = item.Meal

            if meal.id not in grouped:
                grouped[meal.id] = {
                    "id": meal.id,
                    "titleMK": meal.titleMK,
                    "title": meal.title,
                    "priceMK": meal.priceMK,
                    "price": meal.price,
                    "count": 0,
                    "subtotal": 0
                }

            grouped[meal.id]["count"] += 1
            grouped[meal.id]["subtotal"] = grouped[meal.id]["count"] * meal.priceMK

        total_price = sum(meal_info["subtotal"] for meal_info in grouped.values())

        resp = {
            "table": table_id,
            "meals": list(grouped.values()),
            "total_price": total_price
        }

        return Response(resp)


@api_view(['POST'])
def set_payment(request, table_id):
    try:
        table = Table.objects.get(id=table_id)
    except Table.DoesNotExist:
        return Response({"error": "Table not found"}, status=404)
    if Payment.objects.filter(table_id=table_id).exists():
        return Response({"error": "Payment already exists"}, status=409)
    payment_method = request.data.get("payment_method")
    if payment_method not in ['cash', 'card']:
        return Response({"payment_method": payment_method}, status=400)
    payment = Payment.objects.create(
        table=table,
        payment_method=payment_method,
    )
    return Response({
        "message": "Payment stored",
        'table_id': table_id,
        'payment_method': payment_method,
    }, status=201)


@api_view(['GET'])
def get_payment(request, table_id):
    payment = Payment.objects.filter(table=table_id).values()
    return Response(list(payment))


@api_view(['POST', 'GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def add_meal_to_menu(request):
    if request.method == "POST":
        data = request.data.copy()

        if 'Category' in data:
            data['category'] = data['Category']  # додади како 'category' со мала буква

        print("DATA:", data)

        form = MealForm(data, request.FILES)
        if form.is_valid():
            meal = form.save()
            return Response(
                {"success": True, "message": "Meal added", "id": meal.id},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"success": False, "errors": form.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    else:
        fields = {name: str(field.__class__.__name__) for name, field in MealForm().fields.items()}
        return Response({"fields": fields}, status=status.HTTP_200_OK)

@api_view(['POST', 'GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def edit_meal_to_menu(request,meal_id):
    meal = Meal.objects.get(id=meal_id)
    print(meal)
    if request.method == "POST":
        data = request.data.copy()

        if 'Category' in data:
            data['category'] = data['Category']  # додади како 'category' со мала буква

        print("DATA:", data)

        form = MealForm(data, request.FILES,instance=meal)
        if form.is_valid():
            meal = form.save()
            return Response(
                {"success": True, "message": "Meal edited", "id": meal.id},
                status=200
            )
        return Response(
            {"success": False, "errors": form.errors},
            status=400
        )
    else:
        return Response({
            "id": meal_id,
            "title": meal.title,
            "price":meal.price,
            "titleMK": meal.titleMK,
            "priceMK": meal.priceMK,
            "photo":meal.photo.url if meal.photo else None,
            "description":meal.description,
            "descriptionMK":meal.descriptionMK,
            "Category": meal.Category.id if meal.Category else None,
        }, status=200)

@api_view(['GET'])
def remove_meal_from_menu(request,meal_id):
    Meal.objects.get(id=meal_id).delete()
    return Response({"success": True}, status=200)


@api_view(['POST', 'GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def add_category_to_menu(request):
    if request.method == "POST":
        data = request.data.copy()

        print("DATA:", data)

        form = CategoryForm(data, request.FILES)
        if form.is_valid():
            category = form.save()
            return Response(
                {"success": True, "message": "Category added", "id": category.id},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"success": False, "errors": form.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    else:
        fields = {name: str(field.__class__.__name__) for name, field in CategoryForm().fields.items()}
        return Response({"fields": fields}, status=status.HTTP_200_OK)

@api_view(['POST', 'GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def edit_category_to_menu(request,category_id):
    category = Category.objects.get(id=category_id)
    if request.method == "POST":
        data = request.data.copy()

        print("DATA:", data)

        form = CategoryForm(data, request.FILES,instance=category)
        if form.is_valid():
            category = form.save()
            return Response(
                {"success": True, "message": "Category edited", "id": category.id},
                status=200
            )
        return Response(
            {"success": False, "errors": form.errors},
            status=400
        )
    else:
        return Response({
            "id": category.id,
            "title": category.title,
            "titleMK": category.titleMK,
            "photo":category.photo.url if category.photo else None,
        }, status=200)

@api_view(['GET'])
def remove_category_from_menu(request,category_id):
    Category.objects.get(id=category_id).delete()
    return Response({"success": True}, status=200)




@api_view(['POST', 'GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def register(request):
    if request.method == "POST":
        data = request.data.copy()
        print("DATA:", data)
        form = UserCreationForm(data)
        if form.is_valid():
            user = form.save()
            return Response(
                {"success": True, "message": "User created", "id": user.id},
            )
        return Response(
            {"success": False, "errors": form.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    else:
        fields = {name: str(field.__class__.__name__) for name, field in UserCreationForm().fields.items()}
        return Response({"fields": fields}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([JSONParser])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        django_login(request, user)
        request.session.save()

        return Response({
            "success": True,
            "username": user.username,
        })

    return Response({
        "success": False,
        "errors": "Invalid credentials"
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def logout_view(request):
    django_logout(request)
    return Response({
        "success": True,
        "message": "Logged out successfully"
    })

@api_view(['GET'])
def check_auth(request):
    return Response({
        "is_staff":request.user.is_staff,
        "is_authenticated": request.user.is_authenticated,
        "username": request.user.username if request.user.is_authenticated else None
    })
@api_view(['GET'])
def users(request):
    data = User.objects.all().values()
    return Response(list(data))

@api_view(["GET"])
def remove_user(request, user_id):
    user = User.objects.filter(id=user_id)
    if user:
        user.delete()
        return Response({"success": True})
    return Response({"success": False})