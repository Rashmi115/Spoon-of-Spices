from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.category_list),
    path('recipes/', views.recipe_list),
    path('recipes/<int:pk>/', views.recipe_detail),
    path('users/<int:user_id>/recipes/', views.user_recipes),
    path('users/<int:user_id>/favourites/', views.user_favourites),
    path('users/<int:user_id>/', views.user_detail),
    path('recipes/<int:recipe_id>/like/', views.like_recipe, name='like_recipe'),
    path('login/', views.login_user, name='login'),
    path('register/',views.register_user,name='register'),
]
