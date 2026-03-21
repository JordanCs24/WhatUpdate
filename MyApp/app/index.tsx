import { Text, ScrollView, TouchableOpacity,StyleSheet} from "react-native";
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#2b5a54' }}
      contentContainerStyle={{
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 80,
  }}>
      <Text style={styles.title}>Hello, Welcome to WhatUpdate! Signup or Login!</Text>
      <Link href="/signup-screen" asChild>
        <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
       </Link>

       <Link href="/login" asChild>
       <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
       </TouchableOpacity>
       </Link>

       <Link href="/gameselect" asChild>
       <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.buttonText}>GameSelect</Text>
       </TouchableOpacity>
       </Link>

       <Link href="/feed" asChild>
       <TouchableOpacity style={styles.feedButton}>
        <Text style={styles.buttonText}>Feed</Text>
       </TouchableOpacity>
       </Link>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#356d65',
  },
  content: {
    paddingHorizontal: 28,
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 32,
  },
  signUpButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 2,
    width: 250,
    height: 80,
    justifyContent: 'center',  // ← centers text vertically
    alignItems: 'center',
    marginTop: 8,
  },
  loginButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 2,
    width: 250,
    height: 80,
    justifyContent: 'center',  // ← centers text vertically
    alignItems: 'center',
    marginTop: 16,
  },
  feedButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 2,
    width: 250,
    height: 80,
    justifyContent: 'center',  // ← centers text vertically
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#223533',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
