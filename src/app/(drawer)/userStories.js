import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';


const userStories = [
  {
    title: 'Browse Products',
    description: 'As a customer, I want to browse a list of eco-friendly products so I can choose the one that suits my needs.',
  },
  {
    title: 'View Product Details',
    description: 'As a customer, I want to view product details so I can understand the ingredients and environmental impact.',
  },
  {
    title: 'Add to Cart',
    description: 'As a customer, I want to add items to my cart so I can buy multiple products in one order.',
  },
  {
    title: 'See My Location',
    description: 'As a new user, I want to see where Five Trees is located on a map so I know the origin of the products.',
  },
  {
    title: 'Admin: Manage Products',
    description: 'As an admin, I want to add, edit, or remove products so I can keep the product list up-to-date.',
  },
  {
    title: 'Anonymous Browsing',
    description: 'As a customer, I want to sign in anonymously so I can quickly browse without committing.',
  },
];

const UserStories = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
            <CustomHeader title="Back" />

      <Text style={styles.header}>User Stories</Text>
      {userStories.map((story, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{story.title}</Text>
          <Text style={styles.description}>{story.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2a5d4d',
  },
  card: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f1f5f4',
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1b4d3e',
  },
  description: {
    marginTop: 6,
    fontSize: 15,
    color: '#444',
  },
});

export default UserStories;
