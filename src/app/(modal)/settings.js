import React, { useState } from 'react';
import { View, Text, Button, Alert, Switch, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import { useColorScheme } from 'react-native';

export default function SettingsModal() {
  const [dealAlerts, setDealAlerts] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const scheme = useColorScheme();

  const askForLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      Alert.alert('Location enabled', 'You can now use location features.');
    } else {
      Alert.alert('Permission denied', 'Please enable location in settings.');
    }
  };

  const toggleTheme = () => {
    Alert.alert('Theme Toggle', 'This is a placeholder. Add theme logic here.');
  };

  const handleSignOut = () => {
    Alert.alert('Signed Out', 'You have been signed out.');
    // Add Firebase sign out logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>

      {/* User Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 Account</Text>
        <Text>Email: <Text style={styles.bold}>xiaan_b@hotmail.com</Text></Text>
        <Text>Role: <Text style={styles.bold}>Admin</Text></Text>
        <Button title="Sign Out" onPress={handleSignOut} color="#d9534f" />
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Notifications</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Enable deal alerts</Text>
          <Switch
            value={dealAlerts}
            onValueChange={setDealAlerts}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Subscribe to newsletter</Text>
          <Switch
            value={newsletterSubscribed}
            onValueChange={(val) => {
              setNewsletterSubscribed(val);
              Alert.alert(
                val ? 'Subscribed' : 'Unsubscribed',
                `You have ${val ? 'joined' : 'left'} our newsletter.`
              );
            }}
          />
        </View>
      </View>

      {/* Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Location</Text>
        <Button title="Request Location Access" onPress={askForLocationPermission} />
      </View>

      {/* Theme */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 App Theme</Text>
        <Text>Current theme: <Text style={styles.bold}>{scheme}</Text></Text>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>

      {/* Close Modal */}
      <View style={styles.footer}>
        <Button title="Close" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
  bold: {
    fontWeight: '600',
    color: '#111',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
});
