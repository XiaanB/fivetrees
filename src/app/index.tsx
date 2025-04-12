// app/index.tsx
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { Redirect } from 'expo-router';
import { Buffer } from 'buffer';
global.Buffer = Buffer;


export default function DrawerLayout() {
  return (
    
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>🌳 Welcome to Five Treessssssssss 🌳</Text>
              return <Redirect href="/(auth)/login" />;

          </View>
  );
}
