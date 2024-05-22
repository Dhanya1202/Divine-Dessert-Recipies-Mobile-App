// HomeScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Divine Desserts</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Recipe')}
      >
        <Icon name="utensils" size={20} color="#fff" />
        <Text style={styles.buttonText}>Explore Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate('Login')}
        testID="login-button"
      >
        <Icon name="sign-in-alt" size={20} color="#fff" />
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.newUserText}>New to Divine Desserts?</Text>
      <TouchableOpacity
        style={[styles.button, styles.registerButton]}
        onPress={() => navigation.navigate('Register')}
        testID='register-button'
      >
        <Icon name="user-plus" size={20} color="#fff" />
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFB6C1',
   
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
 
  buttonText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 18,
  },
  newUserText: {
    marginTop: 16,
    marginBottom: 8,
    color: '#777',
  },
});

export default HomeScreen;



