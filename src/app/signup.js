import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { signUp, auth } from "../../services/auth"; // double-check this path
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  

  const handleSignUp = async () => {
    try {
      const result = await signUp(email, password, "user");

      if (result.success) {
        Alert.alert("Success", "Account created successfully!");
        router.push("login");
      } else {
        Alert.alert("Error", result.error);
      }

      Alert.alert("Success", "Account created successfully!");
      router.push("login"); 
      console.log("About to write to Firestore...");
    } catch (error) {
      Alert.alert("Error", error.message);
            Alert.alert("Error", error.message);

    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Create Account" onPress={handleSignUp} />
      <Button title="Back to Sign In" onPress={() => router.push("login")} />
    </View>
  );
}
