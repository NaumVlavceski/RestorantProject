from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view

from App.models import Category, Meal
from .serializer import CategorySerializer

@api_view(['GET'])
def get_categories(request):
    categories = list(Category.objects.values())
    return Response(categories)

@api_view(['GET'])
def get_meals(request):
    meals = list(Meal.objects.values())
    return Response(meals)

@api_view(['GET'])
def get_meals_by_category(request, category_id):
    meals = list(Meal.objects.filter(Category_id=category_id).values())
    return Response(meals)

