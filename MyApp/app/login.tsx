import {Text, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useState } from 'react';

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleLogin = () =>{

    }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Login</Text>
    <Text style={styles.label}>GAMERTAG</Text>   
      <TextInput 
            style={styles.input}
            placeholder="Your Gamertag"
            placeholderTextColor="#ffffff"
            value={username}
            onChangeText={setUsername}
    />
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
    justifyContent: 'center'
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