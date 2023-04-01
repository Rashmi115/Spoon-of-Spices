import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

export default function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
     const fetchCategories = async () => {
    try {
      console.log("useffect of categories")
      const response = await axios.get('https://0640-14-139-180-87.in.ngrok.io/RecipeApp/categories/');
      console.log(response)
      const data = response.data;
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };
       fetchCategories();
  }, []);

  const handleCategoryPress = async (category) => {
    try {
      const response = await fetch(``);
      const data = await response.json();
      navigation.navigate('Recipes', { recipes: data });
    } catch (error) {
      console.error(error);
    }
  };
  const categoryBgColors = ['#F3A699', '#A9ECA2', '#BE9FE1', '#FFE9AE', '#ECDFC8'];
  const renderCategoryItem = ({ item,index }) => (
   
    <TouchableOpacity onPress={() => handleCategoryPress(item)}>
    <View style={[styles.category, { backgroundColor: categoryBgColors[index % categoryBgColors.length] }]}>
        <View style={styles.categoryname}>
          <Text>{item.categoryName}</Text>
        </View>
        <View style={styles.categorydesc}>
          <Text>{item.categoryDes}</Text>
        </View>
      </View>
    </TouchableOpacity>
    
  );

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    height:200,
    margin:20,
    padding:20,
    backgroundColor: '#F3A699',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    
  },
  categoryname: {
    fontWeight: '800',
    fontSize: 60,
    color:'white'
  },
  categorydesc: {
    fontWeight: '700',
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
});


// const styles = StyleSheet.create({
//   category: {
//     height:200,
//     margin:20,
//     padding:20,
//     backgroundColor: '#F3A699',
//     borderRadius: 15,
//     padding: 10,
//     marginBottom: 10,
//   },
//   categoryname: {
//     fontWeight: '800',
//     fontSize: 60,
//     color: '#FFFFFF',
//   },
//   categorydesc: {
//     fontWeight: '700',
//     fontSize: 12,
//     color: '#FFFFFF',
//   },
// });




