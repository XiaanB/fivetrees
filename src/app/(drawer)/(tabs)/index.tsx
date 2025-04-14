import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import CustomHeader from '../../../../components/CustomHeader';

const AboutUsScreen = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <CustomHeader title="Back" />

      <View style={styles.headerContainer}>
        <Image
          source={require('../../../../assets/images/about us.jpg')}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <Text style={styles.headerText}>About Five Trees</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionText}>
          At Five Trees, our mission is to provide sustainable and eco-friendly solutions that help make the world a cleaner, greener place. We specialize in reusable hand wash tablets that reduce plastic waste and encourage mindful consumption. Our commitment to quality and environmental responsibility drives us to create innovative products that benefit both our customers and the planet.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Image
          source={require('../../../../assets/images/meettheteam.jpg')}
          style={styles.teamImage}
          resizeMode="cover"
        />
        <Text style={styles.sectionTitle}>Meet The Team</Text>
        <Text style={styles.sectionText}>
          We are a family-owned business on a mission to help remove plastic waste from your home and the planet. Caring for your family and their future is at the heart of what we do. Our products are reusable and refillable, made from gentle ingredients with no nasties.
        </Text>
      </View>

      {/* Contact Us Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionText}>
          We would love to hear from you! For inquiries, support, or feedback, feel free to reach out to us.
        </Text>
        <TouchableOpacity onPress={() => router.push('/(hamburger)/contactUs')}>
          <Text style={styles.contactLink}>Go to Contact Us</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Five Trees Ltd. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  headerContainer: {
    position: 'relative',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    width: '100%',
    height: 200, 
  },
  headerText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  teamImage: {
    width: '100%',
    height: 350, 
    borderRadius: 10,
    marginBottom: 10, 
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  contactLink: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 10,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#777',
  },
});

export default AboutUsScreen;
