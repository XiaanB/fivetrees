// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router/tabs';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

export default function TabsLayout() {
  const navigation = useNavigation();

  return (
    <Tabs
    //   screenOptions={{
    //     headerLeft: () => (
    //       <TouchableOpacity
    //         onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    //         style={{ marginLeft: 15 }}
    //       >
    //         <Ionicons name="menu" size={24} color="black" />
    //       </TouchableOpacity>
    //     ),
    //   }}
    >
      {/* <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="products" options={{ title: "Products" }} />
      <Tabs.Screen name="education" options={{ title: "Education" }} /> */}
    </Tabs>
  );
}
