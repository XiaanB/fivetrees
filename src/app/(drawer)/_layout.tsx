import { Drawer } from 'expo-router/drawer';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { auth } from '../../../services/firebaseConfig'; // adjust path as needed
import { router } from 'expo-router';

function CustomDrawerContent(props) {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.replace('/login'); // or wherever your login screen is
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />

      {/* Spacer to push button to bottom */}
      <View style={{ flex: 1 }} />

      {/* Sign Out */}
      <Pressable onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
     <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="(tabs)"
        options={{ drawerLabel: 'Home', title: 'Main' }}
      />
      <Drawer.Screen
        name="profile"
        options={{ drawerLabel: 'Profile' }}
      />
      <Drawer.Screen
        name="settings"
        options={{ drawerLabel: 'Settings' }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  signOutButton: {
    padding: 16,
    backgroundColor: '#f44336',
    margin: 10,
    borderRadius: 8,
  },
  signOutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
