import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

export type CheckoutStep = 'shop' | 'checkout' | 'success';
export type CurrencyType = 'NGN' | 'USD';
