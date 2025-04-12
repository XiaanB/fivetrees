import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; 
import { useCartStore } from '../../../services/store/cartStore'; 
import CustomHeader from '../../../components/CustomHeader';

export default function CartPage() {
    const router = useRouter();
    const cartItems = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);

    const total = cartItems
      .reduce((sum, item) => {
        // Ensure price and quantity are valid numbers
        const price = parseFloat(item?.price ?? '0'); // Default to 0 if price is invalid
        const quantity = parseInt(item?.quantity ?? 1); // Default to 1 if quantity is invalid
        return sum + price * quantity;
      }, 0)
    .toFixed(2);

    const handleCheckout = () => {
        console.log('Proceeding to checkout...');
        router.push('checkOut'); // 👈 must match file structure in /app
    };

    const handleQuantityChange = (itemId, increment) => {
        const item = cartItems.find(i => i.id === itemId);
        if (item) {
            const newQuantity = item.quantity + increment;
            // Only update quantity if it's a valid positive number
            if (newQuantity > 0) {
                updateQuantity(itemId, newQuantity);
            }
        }
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <CustomHeader title="Back" />

        <Text style={styles.title}>Your Cart</Text>

        {cartItems.length === 0 ? (
            <Text style={styles.emptyCart}>Your cart is empty.</Text>
        ) : (
            cartItems.map((item, index) => {
                // Ensure price and quantity are valid numbers
                const price = parseFloat(item?.price ?? '0'); 
                const quantity = parseInt(item?.quantity ?? 1);
                return (
                    <View key={index} style={styles.itemContainer}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>${price}</Text>

                            {/* Quantity controls */}
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity 
                                    onPress={() => handleQuantityChange(item.id, -1)} 
                                    style={styles.quantityButton}
                                    disabled={quantity <= 1}
                                >
                                    <Text style={styles.quantityButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{quantity}</Text>
                                <TouchableOpacity 
                                    onPress={() => handleQuantityChange(item.id, 1)} 
                                    style={styles.quantityButton}
                                >
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                <Text style={styles.removeText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            })
        )}

        {cartItems.length > 0 && (
            <>
                <Text style={styles.total}>Total: ${total}</Text>

                {isNaN(total) || total === 'NaN' || total === '0.00' ? (
                  <Text style={styles.warningText}>
                    Your cart seems empty or contains invalid data. Please add items before checking out.
                  </Text>
                ) : null}

                <TouchableOpacity
                  style={[styles.proceedButton, total === '0.00' && { backgroundColor: '#ccc' }] }
                  onPress={handleCheckout}
                  disabled={total === '0.00'}
                >
                  <Text style={styles.proceedText}>
                    Proceed to Checkout
                  </Text>
                </TouchableOpacity>
            </>
        )}
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
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    emptyCart: {
        fontSize: 18,
        textAlign: 'center',
        color: '#888',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 10,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        color: '#4CAF50',
    },
    removeText: {
        color: '#e53935',
        marginTop: 5,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginVertical: 10,
    },
    proceedButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    proceedText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    quantityButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    warningText: {
      color: '#f44336',
      fontSize: 14,
      marginTop: 5,
      textAlign: 'center',
    },
});
