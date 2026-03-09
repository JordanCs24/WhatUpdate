import { Text, ScrollView, TouchableOpacity,StyleSheet } from "react-native";
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
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go to Signup</Text>
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
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#223533',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 3,
  }
});
