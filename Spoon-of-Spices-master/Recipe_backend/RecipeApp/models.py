from django.db import models

class Category(models.Model):
    categoryName = models.CharField(max_length=255)
    categoryDes = models.CharField(max_length=300)
    categoryImage = models.ImageField(upload_to='category_images/')

class User(models.Model):
    uName = models.CharField(max_length=50)
    uPassword = models.CharField(max_length=50)
    akaName = models.CharField(max_length=50)
    about = models.TextField(default='')

class Recipe(models.Model):

    VEG_CHOICES = (
        (True, 'Veg'),
        (False, 'Non-Veg'),
    )

    recipeName = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    ingredients = models.TextField()
    instructions = models.TextField()
    image_url = models.ImageField(upload_to='recipe_images/')
    likes = models.IntegerField(default=0)
    recipe_type = models.BooleanField(choices=VEG_CHOICES)


class Like(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
