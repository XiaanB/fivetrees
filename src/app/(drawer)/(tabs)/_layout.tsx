import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons for user and cart
import { TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router'; // For navigation
import Footer from 'components/footer'; // Footer component

export default function TabsLayout() {
  const router = useRouter();

  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#27ae60', // selected tab color
          tabBarInactiveTintColor: '#95a5a6', // unselected tab color
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
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* User Icon */}
              <TouchableOpacity
                onPress={() => router.push('/profile')} // Navigate to profile screen when clicked
                style={{ marginRight: 20 }} // Add space between user and cart icon
              >
                <FontAwesome name="user" size={25} color="black" />
              </TouchableOpacity>

              {/* Cart Icon */}
              <TouchableOpacity
                onPress={() => router.push('/cart')} // Navigate to cart screen when clicked
                style={{ marginRight: 20 }} // Add space between user and cart icon

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
      </Tabs>

      {/* Footer Component */}
      <Footer />
    </>
  );
}
