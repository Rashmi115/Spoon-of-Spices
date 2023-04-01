import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity , StyleSheet, Image} from 'react-native';

const image = { uri: "../assets/Spoon_of_spices.png" };

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    
  const handleLogin = async () => {
  try {
    const response = await fetch('https://0640-14-139-180-87.in.ngrok.io/RecipeApp/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    console.log(response)
    const data = await response.json();
    if (response.ok) {
      // Login successful
      navigation.navigate('BottomTabNavigation');
    } else {
      // Login failed, display error message
      alert(data.error);
    }
  } catch (error) {
    // Handle network error
    console.log(error)
    alert('Network error, please try again later.');
  }
};


  return (
     <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={setPassword} />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 50,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});