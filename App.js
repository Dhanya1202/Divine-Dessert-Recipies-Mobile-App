// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeDetailScreen from './RecipeDetailScreen';
import HomeScreen from './HomeScreen';
import RecipeScreen from './Recipe';  
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { AuthProvider } from './AuthContext';
const Stack = createStackNavigator();

export default function App() {
  return (
  <AuthProvider>

    <NavigationContainer>
     
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
    
  );
}

