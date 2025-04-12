import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import {
  signInWithEmailAndPassword,
  signInAnonymously,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../../../services/firebaseConfig";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { Alert } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();


  const redirectUri = "https://auth.expo.io/@xiaan/fivetrees"
  console.log("1 Google redirect URI:", redirectUri); 


  const [request, response, promptAsync] = Google.useAuthRequest({
  webClientId: "582444083351-18bib0ib1suegl75vkgc7p95sl1ac8e4.apps.googleusercontent.com", // ✅ The correct Web client ID from your Firebase project
  androidClientId: "582444083351-18bib0ib1suegl75vkgc7p95sl1ac8e4.apps.googleusercontent.com",
  expoClientId: "582444083351-18bib0ib1suegl75vkgc7p95sl1ac8e4.apps.googleusercontent.com", // 👈 Also set this to the web client ID (because Expo Go acts like a web app)
  redirectUri: "https://auth.expo.io/@xiaan/fivetrees", // ✅ Exact match to your OAuth setup
});



    // Handle Google Sign-In response
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params; // Get the id_token from Google
      const credential = GoogleAuthProvider.credential(id_token); // Create Firebase credential

      signInWithCredential(auth, credential) // Sign in with the credential
        .then(() => {
          Alert.alert("Success", "You are signed in with Google!");
          router.replace("/(tabs)"); // Redirect to the home page
        })
        .catch((error) => {
          console.error("Google Sign-In Error:", error);
          Alert.alert("Error", "Google Sign-In failed!");
        });
    }
  }, [response]);


  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)/home");
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Login Error:", error.message);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      router.push("/(tabs)/home");
    } catch (error) {
      setErrorMessage("Error signing in as guest");
      console.error("Anonymous Login Error:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    console.log("ACTUAL redirect URI:", redirectUri); // Log the redirect URI
    console.log("Request client ID actually used:", request?.clientId);
    console.log("Google Sign-In request:", request); // Log the request object
    promptAsync({ useProxy: true, redirectUri });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Log in to your account</Text>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

          <TouchableOpacity
  style={[
    styles.primaryButton,
    isAdmin && { backgroundColor: "#28a745" },
  ]}
  onPress={handleLogin}
>
        <Text style={styles.primaryButtonText}>
            {isAdmin ? "Login as Admin" : "Login"}
        </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setIsAdmin(!isAdmin)}
        >
        <Text style={styles.switchButtonText}>
            {isAdmin ? "Switch to User Login" : "Switch to Admin Login"}
        </Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
        <Text style={styles.guestButtonText}>Continue as Guest</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>

      {user && (
  <View style={{ marginTop: 30, alignItems: "center" }}>
    <Text>
      Welcome, {String(user.displayName || "User")}!
    </Text>
    <Button title="Logout" onPress={() => auth.signOut()} />
  </View>
)}

      
    </View>
  );
  
};

export const unstable_settings = {
  initialRouteName: 'login',
};

export const screenOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  googleButton: {
    backgroundColor: "#DB4437",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  googleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  guestButton: {
    backgroundColor: "#666",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  guestButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#007AFF",
    textDecorationLine: "underline",
    },
  switchButton: {
  marginTop: 12,
  alignItems: "center",
},

switchButtonText: {
  color: "#007AFF",
  fontSize: 14,
  textDecorationLine: "underline",
},

});

export default LoginScreen;
