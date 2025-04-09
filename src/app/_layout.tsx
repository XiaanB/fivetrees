import React, { useState, useEffect } from 'react';
import CustomSplash from '../../components/CustomSplash';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { Drawer } from "expo-router/drawer";




export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppReady(true);
    }, 3000);
  }, []);

  if (!appReady) return <CustomSplash />;

  return (
    <Drawer>
          {/* <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
          <Drawer.Screen name="(app)/aboutUs" options={{ title: "About Us" }} />
          <Drawer.Screen name="(app)/contactUs" options={{ title: "Contact Us" }} /> */}
    </Drawer>
  );
}