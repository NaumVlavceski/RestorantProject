from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User

from App.models import Meal, Category


class MealForm(forms.ModelForm):
    class Meta:
        model = Meal
        fields = '__all__'
class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = '__all__'

class UserRegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']
class LoginForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ['username', 'password']