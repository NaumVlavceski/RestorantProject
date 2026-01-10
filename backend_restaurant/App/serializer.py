from rest_framework import serializers
from .models import Meal, Category, MealTable


class CategorySerializer(serializers.ModelSerializer):
    icon = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    def get_icon(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.icon.url)


class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = '__all__'


# class MealTableSerializer(serializers.ModelSerializer):
#     Meal = MealSerializer(read_only=True)
#
#     class Meta:
#         model = MealTable
#         fields = ['id', 'Table', 'Meal']

class GroupMealsSerializer(serializers.ModelSerializer):
    table = serializers.IntegerField()
    meals = serializers.ListField()