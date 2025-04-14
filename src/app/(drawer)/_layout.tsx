import { Drawer } from 'expo-router/drawer';
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { auth } from '../../../services/firebaseConfig'; // adjust path as needed
import { router } from 'expo-router';
import { useAuth } from '../../../services/AuthContext';
import { AuthProvider  } from '../../../services/AuthContext';


function CustomDrawerContent(props) {
  const { userRole } = useAuth(); 

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.replace('/login'); 
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };
  return (
    
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />

      
      <View style={{ flex: 1 }} />

      
      {userRole === 'admin' && (
        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={() => router.push('/(admin)/dashboard')}
        >
          <Text style={styles.dashboardText}>Admin Dashboard</Text>
        </TouchableOpacity>
      )}

      {/* Sign Out */}
      <Pressable onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <AuthProvider>
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      
      <Drawer.Screen
        name="(tabs)"
        options={{ drawerLabel: 'Home', headerShown: false }}
      />
      <Drawer.Screen
        name="profile"
        options={{ drawerLabel: 'Profile' }}
      />
      <Drawer.Screen
        name="settings"
        options={{ drawerLabel: 'Settings' }}
      />
      <Drawer.Screen
        name="(drawer)/Map"
        options={{
          drawerItemStyle: { display: 'none' },
          }}
      />

      </Drawer>
      </AuthProvider>
  );
}

const styles = StyleSheet.create({
  dashboardButton: {
    padding: 16,
    backgroundColor: '#1976D2',
    marginHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  dashboardText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
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
