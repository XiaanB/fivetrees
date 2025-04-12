import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Image, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HeaderLeftButton() {
  const navigation = useNavigation();

  // const logo = require('../../assets/images/fiveTreesIcon.png'); // Adjust the path as needed

  return (
    <TouchableOpacity
      style={styles.logoContainer}
      onPress={() => navigation.navigate('home')} // Navigate to 'home' when clicked
    >
      <Image source={require('../../assets/images/fiveTreesIcon.png')} style={styles.fiveTreesIcon} />
      <Text style={{ marginLeft: 10, fontSize: 10 }}>Home</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginLeft: 15,
  },
  logo: {
    width: 40, // Adjust the size of the logo as needed
    height: 40, // Adjust the size of the logo as needed
    resizeMode: 'contain',
  },
});