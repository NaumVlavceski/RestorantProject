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
# Create your models here.
