import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Switch, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { auth } from "../../../services/firebaseConfig";
import { initDB } from "../../../services/db"; 
import { useRouter } from "expo-router";
import CustomHeader from '../../../components/CustomHeader';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import ProfilePic from '../../../assets/images/profile.jpg'




const ProfileScreen = () => {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    photoUri: null,
    subscribe: false,
    newsletter: false,
    promo: false,
  });
  const router = useRouter();

  const [db, setDb] = useState(null);

  useEffect(() => {
    
    const setup = async () => {
      
      const database = await initDB();
      setDb(database);

      await database.execAsync(`DROP TABLE IF EXISTS user;`);

      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT,
          lastName TEXT,
          email TEXT,
          phone TEXT,
          address TEXT,
          photoUri TEXT,
          subscribe INTEGER,
          newsletter INTEGER,
          promo INTEGER
        );
      `);

      const result = await database.getAllAsync(
        "SELECT * FROM user ORDER BY id DESC LIMIT 1;"
      );

      if (result.length > 0) {
        const userData = result[0];
        setForm({
          ...userData,
          subscribe: !!userData.subscribe,
          newsletter: !!userData.newsletter,
          promo: !!userData.promo,
        });
      } else {
        const firebaseUser = auth.currentUser;
        if (firebaseUser) {
          setForm((prev) => ({
            ...prev,
            email: firebaseUser.email || "",
            firstName: firebaseUser.displayName?.split(" ")[0] || "",
            lastName: firebaseUser.displayName?.split(" ")[1] || "",
          }));
        }
      }
    };

    setup();
  }, []);

const handleSave = () => {
  Alert.alert(
    "Save Info",
    "Are you sure you want to save this profile?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, Save",
        onPress: async () => {
          if (!db) return;

          try {
            await db.runAsync("DELETE FROM user");

            await db.runAsync(
              `INSERT INTO user (firstName, lastName, email, phone, address, photoUri, subscribe, newsletter, promo)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                form.firstName,
                form.lastName,
                form.email,
                form.phone,
                form.address,
                form.photoUri,
                form.subscribe ? 1 : 0,
                form.newsletter ? 1 : 0,
                form.promo ? 1 : 0,
              ]
            );

            Alert.alert("Saved", "User info saved to database!");
            // Clear the form only after DB save succeeds
            // setForm({
            //   firstName: "",
            //   lastName: "",
            //   email: "",
            //   phone: "",
            //   address: "",
            //   photoUri: null,
            //   subscribe: false,
            //   newsletter: false,
            //   promo: false,
            // });
          } catch (error) {
            console.error("Error saving profile:", error);
            Alert.alert("Error", "Failed to save user info.");
          }
        },
      },
    ]
  );
};

  const logUsersFromDB = async () => {
  if (!db) {
    console.log("DB not initialized yet");
    return;
  }

  try {
    const users = await db.getAllAsync("SELECT * FROM user");
    console.log("Users in DB:", users);
  } catch (error) {
    console.error("Error fetching users from DB:", error);
  }
  };
  useEffect(() => {
  if (db) {
    logUsersFromDB();
  }
}, [db]);



  const handleDelete = () => {
    Alert.alert(
      "Delete Profile",
      "This will delete all profile information. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: async () => {
            if (!db) return;

            await db.runAsync("DELETE FROM user");

            setForm({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              address: "",
              photoUri: null,
              subscribe: false,
              newsletter: false,
              promo: false,
            });

            Alert.alert("Deleted", "User info has been cleared.");
          },
        },
      ]
    );
  };

  const toggleSwitch = (field) => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleLogout = () => {
    auth.signOut();
  };

    const handleSignOut = async () => {
      try {
        await auth.signOut();
        router.replace('/login'); 
      } catch (error) {
        console.error('Sign out error:', error);
      }
    };
  

  const pickImage = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    alert("Permission to access gallery is required!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (!result.canceled) {
    setForm({ ...form, photoUri: result.assets[0].uri });
  }
};

const takePhoto = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  if (!permissionResult.granted) {
    alert("Permission to access camera is required!");
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (!result.canceled) {
    setForm({ ...form, photoUri: result.assets[0].uri });
  }
};
  

  return (
    <ScrollView style={styles.container}>
                  <CustomHeader title="Back" />



      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>User Profile</Text>

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={form.photoUri ? { uri: form.photoUri } : ProfilePic}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              marginBottom: 10,
              borderWidth: 2,
              borderColor: "#ccc",
            }}
            resizeMode="cover"
          />

          <Text style={{ color: "#3498db", textAlign: "center" }}>Choose from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={takePhoto}>
          <Text style={{ color: "#27ae60", marginTop: 10 }}>Take Photo</Text>
        </TouchableOpacity>
      </View>


      {["firstName", "lastName", "email", "phone", "address"].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.replace(/([A-Z])/g, " $1").trim()}
          value={form[field]}
          onChangeText={(text) => setForm({ ...form, [field]: text })}
        />
      ))}

      <View style={styles.section}>
        <Text style={styles.label}>Subscribe to updates</Text>
        <Switch
          value={form.subscribe}
          onValueChange={() => toggleSwitch("subscribe")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Receive Newsletter</Text>
        <Switch
          value={form.newsletter}
          onValueChange={() => toggleSwitch("newsletter")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Get Promotions</Text>
        <Switch
          value={form.promo}
          onValueChange={() => toggleSwitch("promo")}
        />
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.buttonPrimary} 
        onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
          
          
        </TouchableOpacity>

        

        <Button title="Log Users" onPress={logUsersFromDB} />


        <TouchableOpacity style={styles.buttonDanger} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete All</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fdfdfd",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
    color: "#2c3e50",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#444",
  },
  buttonGroup: {
    marginTop: 30,
    gap: 12,
  },
  buttonPrimary: {
    backgroundColor: "#27ae60",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDanger: {
    backgroundColor: "#e74c3c",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
  marginBottom: 10,
  paddingVertical: 8,
  paddingHorizontal: 12,
  backgroundColor: "#ddd",
  borderRadius: 6,
  alignSelf: "flex-start",
},

backButtonText: {
  fontSize: 16,
  color: "#333",
},

});

export default ProfileScreen;
















