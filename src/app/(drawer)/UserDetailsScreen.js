import React, { useEffect, useState } from "react";
import {
  View, Text, Button, StyleSheet, ScrollView, Image, Alert
} from "react-native";
import { initDB } from "../../../services/db"; // adjust path
import { router } from 'expo-router';

const UserDetailsScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const database = await initDB();
      setDb(database);
      const result = await database.getAllAsync("SELECT * FROM user ORDER BY id DESC LIMIT 1;");
      if (result.length > 0) {
        setUser(result[0]);
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async () => {
    if (!db) return;
    Alert.alert("Delete", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await db.runAsync("DELETE FROM user");
          setUser(null);
          Alert.alert("Deleted", "User info has been deleted.");
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No user found</Text>
        <Button title="Add New User" onPress={() => router.push('/(drawer)/userProfile')} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Info</Text>
      <Text>Name: {user.firstName} {user.lastName}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>
      <Text>Address: {user.address}</Text>
      <Text>Subscribed: {user.subscribe ? "Yes" : "No"}</Text>
      <Text>Newsletter: {user.newsletter ? "Yes" : "No"}</Text>
      <Text>Promo: {user.promo ? "Yes" : "No"}</Text>

      {user.photoUri && (
        <Image source={{ uri: user.photoUri }} style={styles.photo} />
      )}

      <View style={styles.buttonGroup}>
        <Button title="Edit" onPress={() => navigation.navigate("Profile")} />
        <Button title="Delete" color="red" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  photo: { width: 150, height: 150, borderRadius: 75, marginVertical: 20 },
  buttonGroup: { marginTop: 20, gap: 10 },
});

export default UserDetailsScreen;
