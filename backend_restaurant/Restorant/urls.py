"""
URL configuration for Restorant project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path
from django.conf import settings
from App.views import get_categories, get_meals, get_meals_by_category, get_tables, GroupedOrders, add_meal, \
    OrdersByTable, remove_meal, add_order, remove_order, YourOrderView, set_payment, get_payment, add_meal_to_menu, \
    add_category_to_menu, register, login_view, check_auth, logout_view, users, remove_user, edit_meal_to_menu, \
    remove_meal_from_menu, edit_category_to_menu, remove_category_from_menu, csrf, checked_order
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    path('owner/', admin.site.urls),
    path('categories/', get_categories),
    path("csrf/", csrf),
    path("meals/<int:category_id>/", get_meals_by_category),
    path('meals/', get_meals),
    path("tables/", get_tables),
    path('orders/', GroupedOrders.as_view()),
    path("add_order/<int:table_id>/", add_order),
    path("finish_order/<int:table_id>/", remove_order),
    path('your_order/<int:table_id>/', YourOrderView.as_view()),
    path('add/<int:table_id>/<int:meal_id>/', add_meal),
    path('order/<int:table_id>/', OrdersByTable.as_view()),
    path('remove/<int:table_id>/<int:meal_id>/', remove_meal),
    path('set_payment/<int:table_id>/', set_payment),
    path('get_payment/<int:table_id>/', get_payment),
    path('addMeal/', add_meal_to_menu),
    path('editMeal/<int:meal_id>/', edit_meal_to_menu),
    path('removeMeal/<int:meal_id>/', remove_meal_from_menu),
    path('addCategory/', add_category_to_menu),
    path('editCategory/<int:category_id>/', edit_category_to_menu),
    path('removeCategory/<int:category_id>/', remove_category_from_menu),
    path('register/', register),
    path('login/', login_view),
    path('logout/', logout_view),
    path('check-auth/', check_auth),
    path('users/', users),
    path('checked_order/<int:table_id>/', checked_order),

    path('api/token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
