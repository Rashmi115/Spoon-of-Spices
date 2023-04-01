import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [uName, setUName] = useState('');
  const [uPassword, setUPassword] = useState('');
  const [akaName, setAkaName] = useState('');
  const [about, setAbout] = useState('');

  const handleLogin = async () =>{
    navigation.navigate('Login');
  }
 const handleRegister = async () => {
  if (!uName || !uPassword || !akaName || !about) {
    Alert.alert('Please enter all fields');
    return;
  }
  
  try {
    const response = await fetch('https://0640-14-139-180-87.in.ngrok.io/RecipeApp/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: uName,
        password: uPassword,
        akaName: akaName,
        about: about,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert('Registration successful!');
      // navigate to login screen
      navigation.navigate('Login');
    } else {
      Alert.alert('Registration failed. Please try again.');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('An error occurred. Please try again later.');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={uName}
        onChangeText={setUName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={uPassword}
        secureTextEntry={true}
        onChangeText={setUPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        value={akaName}
        onChangeText={setAkaName}
      />
      <TextInput
        style={styles.input}
        placeholder="About"
        value={about}
        onChangeText={setAbout}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Already have an account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3f51b5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
