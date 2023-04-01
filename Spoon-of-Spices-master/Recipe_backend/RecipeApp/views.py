from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Category, User, Recipe, Like
from .serializers import CategorySerializer, UserSerializer, RecipeSerializer, LikeSerializer
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import json
from django.http import JsonResponse

@csrf_exempt
def category_list(request):
    """
    API endpoint to get all categories
    """
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.POST)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        else:
            print(serializer.errors)  # add this line to print errors to console
            return JsonResponse(serializer.errors, status=400)
        
@csrf_exempt
def recipe_list(request):
    """
    API endpoint to get all recipes or add a new recipe
    """
    if request.method == 'GET':
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = RecipeSerializer(data=data)
        print(request.POST)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def recipe_detail(request, pk):
    """
    API endpoint to get a specific recipe by id
    """
    recipe = get_object_or_404(Recipe, pk=pk)
    if request.method == 'GET':
        serializer = RecipeSerializer(recipe)
        return JsonResponse(serializer.data)

@csrf_exempt
def user_recipes(request, user_id):
    """
    API endpoint to get all recipes posted by a specific user
    """
    if request.method == 'GET':
        user = get_object_or_404(User, pk=user_id)
        recipes = Recipe.objects.filter(user=user)
        serializer = RecipeSerializer(recipes, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def like_recipe(request, recipe_id):
    """
    API endpoint to like a recipe
    """
    recipe = get_object_or_404(Recipe, pk=recipe_id)
    if request.method == 'POST':
        recipe.likes += 1
        recipe.save()
        serializer = RecipeSerializer(recipe)
        return JsonResponse(serializer.data)

@csrf_exempt
def user_favourites(request, user_id):
    """
    API endpoint to get all recipes liked by a specific user
    """
    if request.method == 'GET':
        user = get_object_or_404(User, pk=user_id)
        likes = Like.objects.filter(user=user)
        serializer = LikeSerializer(likes, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def user_detail(request, user_id):
    """
    API endpoint to get details of a specific user by id
    """
    user = get_object_or_404(User, pk=user_id)
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)

@csrf_exempt
def login_user(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    print(request.POST)
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid username or password'})
    
class UserManager(BaseUserManager):
    def create_user(self, username, password=None, akaName='', about=''):
        user = self.model(
            username=username,
            akaName=akaName,
            about=about,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None):
        user = self.create_user(
            username=username,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User_model(AbstractBaseUser):
    username = models.CharField(max_length=50, unique=True,default='')
    akaName = models.CharField(max_length=50, default='')
    about = models.TextField(default='')
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

@csrf_exempt
def register_user(request):
    if request.method == 'POST':

        data = json.loads(request.body)
        print(data)
        username = data.get('username')
        password = data.get('password')
        akaName = data.get('akaName')
        about = data.get('about')

        if not username:
            return JsonResponse({'success': False, 'message': 'Username is required'})
        if User_model.objects.filter(username=username).exists():
            return JsonResponse({'success': False, 'message': 'User with this username already exists'})

        user = User_model.objects.create_user(username=username, password=password, akaName=akaName, about=about)
        user.save()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})
