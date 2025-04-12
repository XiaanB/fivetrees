import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { auth } from '../../../services/firebaseConfig'; // update based on your new structure
import { useCartStore } from '../../../services/store/cartStore'; // update path if different

const isGuest = auth.currentUser?.isAnonymous;

export default function ProductDetails() {
  const addToCart = useCartStore((state) => state.addToCart);
  const product = useLocalSearchParams();
  const router = useRouter();

  const handleAddToCart = () => {
    if (isGuest) {
      alert('Please sign in to add items to your cart.');
      return;
    }
    addToCart(product);
    router.push('/cart'); // or replace with `(tabs)/cart` if needed
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Product Details</Text>

      <Image source={{ uri: product.image }} style={styles.productImage} />

      <Text style={styles.productName}>{product.name}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>${product.price}</Text>
        <Text style={styles.productStock}>{product.stock} in stock</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Ingredients:</Text>
        <Text style={styles.productIngredients}>{product.ingredients}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.label}>How It Works:</Text>
        <Text style={styles.productHowItWorks}>{product.howItWorks}</Text>
      </View>

      <View style={styles.dimensionsContainer}>
        <Text style={styles.dimensionsTitle}>Dimensions:</Text>
        <Text style={styles.dimensionsText}>Weight: {product.weight}g</Text>
        <Text style={styles.dimensionsText}>Height: {product.height}cm</Text>
        <Text style={styles.dimensionsText}>Width: {product.width}cm</Text>
        <Text style={styles.dimensionsText}>Volume: {product.volume}ml</Text>
      </View>

      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  productStock: {
    fontSize: 16,
    color: '#777',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  productIngredients: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  productHowItWorks: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  dimensionsContainer: {
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  dimensionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dimensionsText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
