import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.170.3:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse response JSON data
        
        const userId = responseData.user.UserId; // Extract UserID from response data
        console.log('Login successful. UserID:', userId);
        navigation.navigate('Recipe');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID='login-screen-text'>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFB6C1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;

// import React, { useState,useContext } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import axios from 'axios';
// import { AuthContext } from './AuthContext';
// const LoginScreen = ({ navigation }) => {
//   const { loginUser } = useContext(AuthContext);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       console.log('Sending login request...');
//       const response = await axios.post('http://192.168.167.3:5000/login', {
//         username,
//         password,
//       });
//      // console.log('Response:', response);
//      console.log('response data',response.data);
      
//     // Check if login was successful
//     if (response.status === 200 ) {
//       //const userId = response.data.user.id; // Extract UserID from response data
//       //console.log('Login successful. UserID:', userId);
//       //loginUser(userId); // Call the loginUser function with the obtained UserID
//       navigation.navigate('Recipe');
//     } else {
//       console.error('Login failed:', response.data.error|| 'Unknown error');
//       // Handle login error (e.g., display error message)
//     }
//   } catch (error) {
//     console.error('Login failed:', error);
//     // Handle login error (e.g., display error message)
//   }
// };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={(text) => setUsername(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//       />
//       <Button title="Login" onPress={handleLogin} color="#4CAF50" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#FFB6C1',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     color: '#333',
//   },
//   input: {
//     height: 40,
//     width: '100%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingLeft: 10,
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
// });

// export default LoginScreen;

