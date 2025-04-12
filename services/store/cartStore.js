// store/cartStore.js
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, { ...product }],
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, newQuantity) => set((state) => ({
    cart: state.cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ),
  })),
  clearCart: () => set({ cart: [] }),
}));

