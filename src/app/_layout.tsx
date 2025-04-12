import React, { useState, useEffect } from 'react';
import CustomSplash from '../../components/CustomSplash';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../app/userProfile';
import UserDetailsScreen from '../app/UserDetailsScreen';
import HomeScreen from '../app/index';
import LoginScreen from '../app/(auth)/login';
import AboutUsScreen from '../app/(auth)/login';
import CartScreen from '../app/(auth)/login';
import CheckOutScreen from '../app/(auth)/login';
import ContactUsScreen from '../app/(auth)/login';
import FavoritesScreen from '../app/(auth)/login';
import OrderHistoryScreen from '../app/(auth)/login';
import ProductDetailsScreen from '../app/(auth)/login';
import UserStoriesScreen from '../app/(auth)/login';



const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppReady(true);
    }, 3000);
  }, []);

  if (!appReady) return <CustomSplash />;
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      id={undefined} // required for strict TS projects
    >
      <Drawer.Screen name="Log in" component={LoginScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="User Details" component={UserDetailsScreen} />
      <Drawer.Screen name="About Us" component={AboutUsScreen} />
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="Check Out" component={CheckOutScreen} />
      <Drawer.Screen name="Contact Us" component={ContactUsScreen} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
      <Drawer.Screen name="Order History" component={OrderHistoryScreen} />
      <Drawer.Screen name="Product Details" component={ProductDetailsScreen} />
      <Drawer.Screen name="User Stories" component={UserStoriesScreen} />
    </Drawer.Navigator>
  );
}