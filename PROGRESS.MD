Project: WhatUpdate — A personalized gaming update tracker app
Tech Stack: React Native (Expo), Express + Node.js (backend — not started yet), MongoDB (database — not started yet), OpenAI API (not started yet)
What we've built so far:
We are building the frontend first, then the backend. We have three screens built so far inside the app/ folder.
app/index.tsx — Home screen with a title, a Sign Up button that navigates to /signup-screen and a Login button that navigates to /login. Green background theme.
app/signup-screen.tsx — Full signup screen with four input fields (Gamertag, Email, Password, Confirm Password), all connected to useState, secureTextEntry on password fields, AutoFill enabled with textContentType, and a handleSignup validation function that checks for empty username, invalid email, mismatched passwords, and password length under 8 characters.
Concepts learned so far: useState, StyleSheet, TextInput, TouchableOpacity, ScrollView, ScrollView contentContainerStyle vs style, event handlers, arrow functions, validation logic, Expo Router file-based navigation, Link with asChild, textContentType for iOS AutoFill.
What's next:

Build app/login.tsx — Email and Password fields, handleLogin function, Login button. Student is building this independently using patterns already learned.
After login — Game Selection screen
After that — Sources Selection screen
After that — Main Feed screen
Then start backend: Express server, MongoDB models, auth routes, JWT tokens, scraping logic, OpenAI integration, push notifications.

File structure so far:
WhatUpdate/
  MyApp/
    app/
      _layout.tsx
      index.tsx
      signup-screen.tsx
      login.tsx  ← currently building
To run the app: cd WhatUpdate/MyApp then npx expo start  