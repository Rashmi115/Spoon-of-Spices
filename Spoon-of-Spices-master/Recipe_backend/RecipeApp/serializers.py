from rest_framework import serializers
from .models import Category, User, Recipe, Like
from django.contrib.auth import get_user_model

class CategorySerializer(serializers.ModelSerializer):
    categoryImage = serializers.ImageField(required=False)
    class Meta:
        model = Category
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model
        fields = '__all__'


class RecipeSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Recipe
        fields = '__all__'

    def create(self, validated_data):
        category_data = validated_data.pop('category')
        category = Category.objects.create(**category_data)
        recipe = Recipe.objects.create(category=category, **validated_data)
        return recipe

    image_url = serializers.ImageField(required=False)
    category = CategorySerializer()
    user = UserSerializer()
    
    class Meta:
        model = Recipe
        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

