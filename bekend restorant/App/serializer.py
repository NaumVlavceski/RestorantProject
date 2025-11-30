from rest_framework import serializers
from .models import Meal, Category

class CategorySerializer(serializers.ModelSerializer):
    icon = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    def get_icon(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.icon.url)