import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../services/firebaseConfig'; 

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/(drawer)/productDetails', params: { ...item } })}
      style={[styles.productCard, isGridView && styles.productCardGrid]}
    >
      <Image
        source={{ uri: item.image }}
        style={[styles.productImage, isGridView && styles.productImageGrid]}
        resizeMode="cover"
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price?.toFixed(2)}</Text>
        {!isGridView && <Text style={styles.productDescription}>{item.description}</Text>}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsGridView(!isGridView)} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>
            {isGridView ? 'List View' : 'Grid View'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        key={isGridView ? 'grid' : 'list'}
        numColumns={isGridView ? 2 : 1}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 1,
  },
  productCardGrid: {
    flexDirection: 'column',
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  productImageGrid: {
    width: '100%',
    height: 140,
    marginRight: 0,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#27ae60',
    textAlign: 'center',
    marginTop: 5,
  },
  productDescription: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
