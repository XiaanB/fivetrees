import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router'; 
import Footer from 'components/footer'; 
import { DrawerActions, useNavigation } from '@react-navigation/native'; 
import { useAuth } from '../../../../services/AuthContext';



export default function TabsLayout({children}) {
  const router = useRouter();
  const navigation = useNavigation(); 
  const { userRole } = useAuth(); 

  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#27ae60', 
          tabBarInactiveTintColor: '#95a5a6', 
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0.5,
            borderTopColor: '#ccc',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            switch (route.name) {
              case 'home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'education':
                iconName = focused ? 'book' : 'book-outline';
                break;
              case 'products':
                iconName = focused ? 'pricetags' : 'pricetags-outline';
                break;
              default:
                iconName = 'ellipse-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },

          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
              {/* Logo */}
              <TouchableOpacity onPress={() => router.push('/home')}>
                {/* <Image
                    source={logo}
                    style={{ width: 32, height: 32, resizeMode: 'contain', marginRight: 15 }}
                  /> */}
              </TouchableOpacity>

            {(userRole === 'admin' || userRole === 'user') && (
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Ionicons name="menu" size={28} color="black" />
              </TouchableOpacity>
              )}
            </View>
          ),

          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* User Icon */}
              <TouchableOpacity
                onPress={() => router.push('userProfile')} 
                style={{ marginRight: 20 }} 
              >
                <FontAwesome name="user" size={25} color="black" />
              </TouchableOpacity>

              {/* Cart Icon */}
              <TouchableOpacity
                onPress={() => router.push('/cart')} 
                style={{ marginRight: 20 }} 
              >
                <FontAwesome name="shopping-cart" size={25} color="black" />
              </TouchableOpacity>
            </View>
          ),
        })}
      >
        <Tabs.Screen name="home" options={{ title: 'Home' }} />
        <Tabs.Screen name="education" options={{ title: 'Education' }} />
        <Tabs.Screen name="products" options={{ title: 'Products' }} />
        <Tabs.Screen name="index" options={{ title: 'About Us' }} />

      </Tabs>

      <Footer />
      </>

  );
}
