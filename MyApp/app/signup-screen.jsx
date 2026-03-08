import { Text,TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useState } from 'react';

export default function SignupScreen() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = () => {
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      if (password.length < 8) {
        alert("Password must be at least 8 characters!");
        return;
      }
      // TODO: call your backend here later
      alert("Account created!");
    };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.label}>GAMERTAG</Text>        
        <TextInput
            style={styles.input}
            
            placeholder="Your Gamertag"
            placeholderTextColor="#ffffff"
            value={username}
            onChangeText={setUsername}
        />
        <Text style={styles.label}>Email</Text>  
        <TextInput
            style={styles.input}

            placeholder="Email"
            placeholderTextColor="#ffffff"
            value={email}
            onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>  
        <TextInput
            secureTextEntry
            style={styles.input}

            placeholder="Password"
            placeholderTextColor="#ffffff"
            value={password}
            onChangeText={setPassword}
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput 
            secureTextEntry
            style={styles.input}

            placeholder="Confirm Password"
            placeholderTextColor="#ffffff"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>SIGN UP</Text>
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