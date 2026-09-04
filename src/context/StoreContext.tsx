'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { products, type Product } from '../data/products';
import type { CartItem, CheckoutFormData, CheckoutStep, CurrencyType } from '../types';

interface StoreContextType {
  cart: CartItem[];
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  checkoutStep: CheckoutStep;
  setCheckoutStep: (step: CheckoutStep) => void;
  mounted: boolean;
  cartAnimated: boolean;
  scrolled: boolean;
  chosenSize: string;
  setChosenSize: (size: string) => void;
  chosenColor: string;
  setChosenColor: (colour: string) => void;
  checkoutForm: CheckoutFormData;
  setCheckoutForm: (form: CheckoutFormData) => void;
  cartItemCount: number;
  cartSubtotal: number;
  filteredProducts: Product[];
  toast: string | null;
  setToast: (message: string | null) => void;
  showToast: (message: string) => void;
  openQuickView: (product: Product) => void;
  addToCart: (product: Product, size: string, colour: string, quantity?: number) => void;
  updateCartQty: (index: number, delta: number) => void;
  removeCartItem: (index: number) => void;
  handlePlaceOrder: (event: React.FormEvent) => void;
  getWhatsAppLink: () => string;
  formatCurrency: (amount: number) => string;
  scrollToShop: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<CurrencyType>('NGN');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('shop');
  const [mounted, setMounted] = useState(false);
  const [cartAnimated, setCartAnimated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [chosenSize, setChosenSize] = useState('');
  const [chosenColor, setChosenColor] = useState('');
  const [checkoutForm, setCheckoutForm] = useState<CheckoutFormData>({ name: '', email: '', phone: '', address: '', city: '', notes: '' });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedCart = localStorage.getItem('ynks_cart');
      const savedCurrency = localStorage.getItem('ynks_currency') as CurrencyType | null;
      if (savedCart) { try { setCart(JSON.parse(savedCart)); } catch { localStorage.removeItem('ynks_cart'); } }
      if (savedCurrency === 'NGN' || savedCurrency === 'USD') setCurrency(savedCurrency);
      setMounted(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => { if (mounted) localStorage.setItem('ynks_cart', JSON.stringify(cart)); }, [cart, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem('ynks_currency', currency); }, [currency, mounted]);

  const cartItemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cart]);
  const filteredProducts = useMemo(() => products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const searchMatch = product.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return categoryMatch && searchMatch;
  }), [selectedCategory, searchQuery]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2800);
  };

  const openQuickView = (product: Product) => {
    setChosenSize(product.sizes?.[0] || 'One Size');
    setChosenColor(product.colors?.[0] || '');
    setSelectedProduct(product);
  };

  const addToCart = (product: Product, size: string, colour: string, quantity = 1) => {
    setCart(current => {
      const index = current.findIndex(item => item.product.id === product.id && item.selectedSize === size && item.selectedColor === colour);
      if (index < 0) return [...current, { product, quantity, selectedSize: size, selectedColor: colour }];
      return current.map((item, itemIndex) => itemIndex === index ? { ...item, quantity: item.quantity + quantity } : item);
    });
    setSelectedProduct(null);
    setCartAnimated(true);
    showToast('Added to your shopping bag.');
    window.setTimeout(() => { setCartAnimated(false); setCartOpen(true); }, 450);
  };

  const updateCartQty = (index: number, delta: number) => setCart(current => current.flatMap((item, itemIndex) => {
    if (itemIndex !== index) return item;
    const quantity = item.quantity + delta;
    return quantity > 0 ? { ...item, quantity } : [];
  }));

  const removeCartItem = (index: number) => setCart(current => current.filter((_, itemIndex) => itemIndex !== index));

  const formatCurrency = (amount: number) => currency === 'NGN'
    ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)
    : `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount / 1500)} est.`;

  const getWhatsAppLink = () => {
    const orderLines = cart.map(item => `• ${item.product.name}\n  Qty ${item.quantity} · Size ${item.selectedSize}${item.selectedColor ? ` · Colour ${item.selectedColor}` : ''}`).join('\n\n');
    const emailLine = checkoutForm.email ? `\nEmail: ${checkoutForm.email}` : '';
    const message = `Hello YEENKSLUXE,\n\nI would like to confirm this order:\n\n${orderLines}\n\nName: ${checkoutForm.name}\nPhone: ${checkoutForm.phone}${emailLine}\nDelivery: ${checkoutForm.address}, ${checkoutForm.city}\nNote: ${checkoutForm.notes || 'None'}\n\nPlease confirm stock, final total and payment details.`;
    return `https://wa.me/2349033364994?text=${encodeURIComponent(message)}`;
  };

  const handlePlaceOrder = (event: React.FormEvent) => {
    event.preventDefault();
    if (!cart.length) return;
    window.open(getWhatsAppLink(), '_blank', 'noopener,noreferrer');
    setCheckoutStep('success');
    showToast('Your order message is ready in WhatsApp.');
  };

  const scrollToShop = () => document.getElementById('shop-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return <StoreContext.Provider value={{
    cart, currency, setCurrency, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
    selectedProduct, setSelectedProduct, cartOpen, setCartOpen, checkoutStep, setCheckoutStep,
    mounted, cartAnimated, scrolled, chosenSize, setChosenSize, chosenColor, setChosenColor,
    checkoutForm, setCheckoutForm, cartItemCount, cartSubtotal, filteredProducts, toast, setToast,
    showToast, openQuickView, addToCart, updateCartQty, removeCartItem, handlePlaceOrder,
    getWhatsAppLink, formatCurrency, scrollToShop,
  }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
