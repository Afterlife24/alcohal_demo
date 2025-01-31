import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface StoreState {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],

  // Add to Cart (with Quantity Support)
  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, cartQuantity: item.cartQuantity + quantity }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, cartQuantity: quantity }] };
    }),

  // Remove Item from Cart
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  // Update Item Quantity
  updateQuantity: (productId, newQuantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, cartQuantity: newQuantity } : item
      ),
    })),
}));
