import { View, Text,TextInput, StyleSheet} from 'react-native';
import { useState } from 'react';

export default function SignupScreen() {
    const [username, setUsername] = useState("");
  return (
    <View style={styles.container}>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.label}>GAMERTAG</Text>        
        <TextInput
            style={styles.input}
            
            placeholder="YourGamertag"
            placeholderTextColor="#ffffff"
            value={username}
            onChangeText={setUsername}
            
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b5a54',
    paddingHorizontal: 28,
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  label: {
    color: '#84929f',
    fontSize: 11,
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
    color: '#ffffff',      // ← this controls what you type
    fontSize: 15,
    marginBottom: 18,
  },
});