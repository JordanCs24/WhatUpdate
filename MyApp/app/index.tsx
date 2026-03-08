import { Text, View } from "react-native";
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello, Welcome to WhatUpdate! Signup or Login!</Text>
      <Link href="/signup-screen">Go to Signup</Link>
      
    </View>
  );
  
}
