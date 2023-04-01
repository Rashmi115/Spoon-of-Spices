import React from 'react';
import { View, Text, FlatList } from 'react-native';

export default function RecipesScreen({ route }) {
  const { recipes } = route.params;

  const renderRecipeItem = ({ item }) => (
    <View>
      <Text>{item.recipeName}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
