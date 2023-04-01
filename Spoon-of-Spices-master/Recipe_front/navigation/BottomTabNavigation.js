import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoryScreen from '../screens/CategoriesScreen';
import UserRecipesScreen from '../screens/MyRecipesScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import FavouriteRecipesScreen from '../screens/FavouritesScreen';
import UserProfileScreen from '../screens/ProfileScreen';
import { MaterialIcons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Explore') {
            iconName = 'explore';
          } else if (route.name === 'My Recipes') {
            iconName = 'local-dining';
          } else if (route.name === 'Add Recipe') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'Favourites') {
            iconName = 'favorite';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#CC9B6D',
          tabBarInactiveTintColor: 'gray',
        })}
    >
      <Tab.Screen name="Explore" component={CategoryScreen} 

      />
      <Tab.Screen name="My Recipes" component={UserRecipesScreen} />
      <Tab.Screen name="Add Recipe" component={AddRecipeScreen} />
      <Tab.Screen name="Favourites" component={FavouriteRecipesScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}