from django.db import models

class Meal(models.Model):
    title = models.CharField(max_length=100,blank=True,null=True)
    titleMK = models.CharField(max_length=100, blank=True, null=True)
    price = models.DecimalField(max_digits=10,decimal_places=2, blank=True,null=True)
    priceMK = models.DecimalField(max_digits=10,decimal_places=2, blank=True,null=True)
    photo = models.ImageField(blank=True,null=True,upload_to='menu_pics')
    description = models.TextField(blank=True,null=True)
    descriptionMK = models.TextField(blank=True,null=True)
    Category = models.ForeignKey('Category',on_delete=models.CASCADE)
    def __str__(self):
        return self.title
class Category(models.Model):
    title = models.CharField(max_length=100,blank=True,null=True)
    titleMK = models.CharField(max_length=100, blank=True, null=True)
    photo =models.ImageField(blank=True,null=True,upload_to='category_pics')
    def __str__(self):
        return self.title

class Table(models.Model):
    tableName = models.CharField(max_length=100,blank=True,null=True)
    def __str__(self):
        return self.tableName
# Create your models here.


class MealTable(models.Model):
    Table = models.ForeignKey('Table',on_delete=models.CASCADE)
    Meal = models.ForeignKey('Meal',on_delete=models.CASCADE)
    def __str__(self):
        return f" {self.Meal} {self.Table}"

class AcceptedOrder(models.Model):
    Table = models.ForeignKey('Table',on_delete=models.CASCADE)
    Meal = models.ForeignKey('Meal',on_delete=models.CASCADE)
    def __str__(self):
        return f" {self.Meal} {self.Table}"
class YourOrder(models.Model):
    Table = models.ForeignKey('Table',on_delete=models.CASCADE)
    Meal = models.ForeignKey('Meal',on_delete=models.CASCADE)
    def __str__(self):
        return f" {self.Meal} {self.Table}"

class Payment(models.Model):
    PAYMENT_METHODS = [
        ('cash','во готово'),
        ('card','Со каратичка')
    ]
    table = models.ForeignKey('Table',on_delete=models.CASCADE)
    payment_method = models.CharField(choices=PAYMENT_METHODS,max_length=10,blank=True,null=True)
