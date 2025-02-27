// import { create } from 'zustand';
// import { CartItem, Product } from '../types';

// interface StoreState {
//   cart: CartItem[];
//   addToCart: (product: Product, quantity?: number) => void;
//   removeFromCart: (productId: string) => void;
//   updateQuantity: (productId: string, quantity: number) => void;
//   setCart: (cart: CartItem[]) => void;
// }

// // Utility function to sync cart with session storage
// const syncCartWithSessionStorage = (cart: CartItem[]) => {
//   sessionStorage.setItem('cart', JSON.stringify(cart));
// };

// // Initialize cart from session storage
// const getInitialCart = (): CartItem[] => {
//   const storedCart = sessionStorage.getItem('cart');
//   return storedCart ? JSON.parse(storedCart) : [];
// };

// export const useStore = create<StoreState>((set) => ({
//   cart: getInitialCart(),

//   // Add to Cart (with Quantity Support)
//   addToCart: (product, quantity = 1) =>
//     set((state) => {
//       const existingItem = state.cart.find((item) => item.id === product.id);
//       const updatedCart = existingItem
//         ? state.cart.map((item) =>
//             item.id === product.id
//               ? { ...item, cartQuantity: item.cartQuantity + quantity }
//               : item
//           )
//         : [...state.cart, { ...product, cartQuantity: quantity }];

//       syncCartWithSessionStorage(updatedCart);
//       return { cart: updatedCart };
//     }),

//   // Remove Item from Cart
//   removeFromCart: (productId) =>
//     set((state) => {
//       const updatedCart = state.cart.filter((item) => item.id !== productId);

//       syncCartWithSessionStorage(updatedCart);
//       return { cart: updatedCart };
//     }),

//   // Update Item Quantity
//   updateQuantity: (productId, newQuantity) =>
//     set((state) => {
//       const updatedCart = state.cart.map((item) =>
//         item.id === productId ? { ...item, cartQuantity: newQuantity } : item
//       );

//       syncCartWithSessionStorage(updatedCart);
//       return { cart: updatedCart };
//     }),

//   // Set Cart (useful for initializing or resetting the cart)
//   setCart: (cart) => {
//     syncCartWithSessionStorage(cart);
//     set({ cart });
//   },
// }));




import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface StoreState {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCart: (cart: CartItem[]) => void;
}

// Utility function to sync cart with session storage
const syncCartWithSessionStorage = (cart: CartItem[]) => {
  sessionStorage.setItem('cart', JSON.stringify(cart));
};

// Initialize cart from session storage
const getInitialCart = (): CartItem[] => {
  const storedCart = sessionStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

export const useStore = create<StoreState>((set) => ({
  cart: getInitialCart(),

  // Add to Cart (with Quantity Support)
  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      const updatedCart = existingItem
        ? state.cart.map((item) =>
            item.id === product.id
              ? { ...item, cartQuantity: quantity } // Set cartQuantity directly to the provided quantity
              : item
          )
        : [...state.cart, { ...product, cartQuantity: quantity }]; // Add new item with the provided quantity

      syncCartWithSessionStorage(updatedCart);
      return { cart: updatedCart };
    }),

  // Remove Item from Cart
  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);

      syncCartWithSessionStorage(updatedCart);
      return { cart: updatedCart };
    }),

  // Update Item Quantity
  updateQuantity: (productId, newQuantity) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === productId ? { ...item, cartQuantity: newQuantity } : item
      );

      syncCartWithSessionStorage(updatedCart);
      return { cart: updatedCart };
    }),

  // Set Cart (useful for initializing or resetting the cart)
  setCart: (cart) => {
    syncCartWithSessionStorage(cart);
    set({ cart });
  },
}));