from django.contrib import admin

from App.models import Category, Meal, Table, MealTable, AcceptedOrder, YourOrder, Payment

# Register your models here.
admin.site.register(Category)
admin.site.register(Meal)
admin.site.register(MealTable)
admin.site.register(Table)
admin.site.register(AcceptedOrder)
admin.site.register(YourOrder)
admin.site.register(Payment)