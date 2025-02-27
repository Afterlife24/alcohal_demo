export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  quantity: number;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}