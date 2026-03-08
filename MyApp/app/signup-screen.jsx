import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";

export default function SignupScreen(){
    // 1. State - data that can change
    const[email, setEmail] = useState("");
    // 2. Functions - what happens when user does something
    // 3. Return - what the screen looks like
}