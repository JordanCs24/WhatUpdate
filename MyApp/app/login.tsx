import {Text, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () =>{
      // Send username + password, receive JWT token back 
      const API_URL = 'http://10.2.38.193:3000';
        
        try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('username', data.username);
            alert(`Welcome ${data.username}! Now let's get your favorite games updates`);
            router.push('/gameselect');
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert('Could not connect to server!');
    }  

}
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Login</Text>
    <Text style={styles.label}>GAMERTAG</Text> 
    <TextInput 
          style={styles.input}
          placeholder="Your Gamertag"
          placeholderTextColor="#ffffff"
          value={username}
          onChangeText={setUsername}
    />
    <Text style={styles.label}>Password</Text> 
    <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Your Password"
          placeholderTextColor="#ffffff"
          value={password}
          onChangeText={setPassword}
    />
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b5a54',
  },
  content: {
    paddingHorizontal: 28,
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  label: {
    color: '#c0d5e9',
    fontSize: 14,
    letterSpacing: 3,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0D1117',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#ffffff',
    fontSize: 15,
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#2b5a54',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
});