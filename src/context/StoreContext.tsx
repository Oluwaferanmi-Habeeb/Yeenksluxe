'use client';

import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';
import { CartItem, CheckoutFormData, CheckoutStep, ThemeMode, PaymentMethod, DossierTab } from '../types';
import { products, Product } from '../data/products';
import { getShopifyCheckoutUrl } from '../utils/shopify';

interface StoreContextType {
  // State
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedProduct: Product | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checkoutStep: CheckoutStep;
  setCheckoutStep: React.Dispatch<React.SetStateAction<CheckoutStep>>;
  paymentMethod: PaymentMethod;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
  mounted: boolean;
  heroIndex: number;
  setHeroIndex: React.Dispatch<React.SetStateAction<number>>;
  theme: ThemeMode;
  setTheme: React.Dispatch<React.SetStateAction<ThemeMode>>;
  udIndex: number;
  setUdIndex: React.Dispatch<React.SetStateAction<number>>;
  cartAnimated: boolean;
  scrolled: boolean;
  chosenSize: string;
  setChosenSize: React.Dispatch<React.SetStateAction<string>>;
  chosenColor: string;
  setChosenColor: React.Dispatch<React.SetStateAction<string>>;
  activeDossierTab: DossierTab;
  setActiveDossierTab: React.Dispatch<React.SetStateAction<DossierTab>>;
  fitHeight: string;
  setFitHeight: React.Dispatch<React.SetStateAction<string>>;
  fitWeight: string;
  setFitWeight: React.Dispatch<React.SetStateAction<string>>;
  checkoutForm: CheckoutFormData;
  setCheckoutForm: React.Dispatch<React.SetStateAction<CheckoutFormData>>;

  // Computed
  cartItemCount: number;
  cartSubtotal: number;
  filteredProducts: Product[];

  // Actions
  openQuickView: (product: Product) => void;
  addToCart: (product: Product, size: string, color: string, qty?: number) => void;
  updateCartQty: (index: number, delta: number) => void;
  removeCartItem: (index: number) => void;
  handlePlaceOrder: (e: React.FormEvent) => void;
  getWhatsAppLink: () => string;
  formatCurrency: (amount: number) => string;
  scrollToShop: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  // ── Core State ──
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('shop');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('flutterwave');
  const [mounted, setMounted] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [udIndex, setUdIndex] = useState(0);
  const [cartAnimated, setCartAnimated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [chosenSize, setChosenSize] = useState('');
  const [chosenColor, setChosenColor] = useState('');
  const [activeDossierTab, setActiveDossierTab] = useState<DossierTab>('info');
  const [fitHeight, setFitHeight] = useState('');
  const [fitWeight, setFitWeight] = useState('');
  const [checkoutForm, setCheckoutForm] = useState<CheckoutFormData>({
    name: '', email: '', phone: '', address: '', city: '', notes: ''
  });

  // ── Effects ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (checkoutStep !== 'shop') return;
    const interval = setInterval(() => setHeroIndex((p) => (p + 1) % 3), 5000);
    return () => clearInterval(interval);
  }, [checkoutStep]);

  useEffect(() => {
    if (checkoutStep !== 'shop') return;
    const interval = setInterval(() => setUdIndex((p) => (p + 1) % 3), 6000);
    return () => clearInterval(interval);
  }, [checkoutStep]);

  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem('ynks_cart');
    if (savedCart) try { setCart(JSON.parse(savedCart)); } catch {}
    const savedTheme = localStorage.getItem('ynks_theme') as ThemeMode | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('ynks_theme', theme);
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (mounted) localStorage.setItem('ynks_cart', JSON.stringify(cart));
  }, [cart, mounted]);

  // ── Computed ──
  const cartItemCount = useMemo(() =>
    mounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0,
  [cart, mounted]);

  const cartSubtotal = useMemo(() => 0, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p: Product) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // ── Actions ──
  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setChosenSize(product.sizes?.[0] || 'One Size');
    setChosenColor(product.colors?.[0] || '');
    setActiveDossierTab('info');
    setFitHeight('');
    setFitWeight('');
  };

  const addToCart = (product: Product, size: string, color: string, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
      );
      if (idx > -1) {
        const next = [...prev];
        next[idx].quantity += qty;
        return next;
      }
      return [...prev, { product, quantity: qty, selectedSize: size, selectedColor: color }];
    });
    setCartAnimated(true);
    setTimeout(() => setCartAnimated(false), 800);
    setCartOpen(true);
  };

  const updateCartQty = (index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) next.splice(index, 1);
      else next[index].quantity = newQty;
      return next;
    });
  };

  const removeCartItem = (index: number) => {
    setCart((prev) => { const next = [...prev]; next.splice(index, 1); return next; });
  };

  const formatCurrency = (amount: number) => '₦' + amount.toLocaleString('en-NG');

  const getWhatsAppLink = () => {
    const phoneNum = '2349033364994';
    const orderLines = cart.map(
      (item) => `- ${item.product.name} (Qty: ${item.quantity}, Size: ${item.selectedSize}${item.selectedColor ? `, Color: ${item.selectedColor}` : ''})`
    ).join('\\n');
    const message = `Hello YEENKSLUXE,\\n\\nI would like to place an order:\\n\\n*Order Details:*\\n${orderLines}\\n\\n*Customer Info:*\\n- Name: ${checkoutForm.name}\\n- Phone: ${checkoutForm.phone}\\n- Delivery Address: ${checkoutForm.address}, ${checkoutForm.city}\\n- Notes: ${checkoutForm.notes || 'None'}\\n\\nPlease confirm pricing and availability. Thank you!`;
    return `https://wa.me/${phoneNum}?text=${encodeURIComponent(message)}`;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address) {
      alert('Please fill out all required shipping fields.');
      return;
    }

    if (paymentMethod === 'whatsapp') {
      setCheckoutStep('success');
      window.open(getWhatsAppLink(), '_blank');
    } else if (paymentMethod === 'shopify') {
      const items = cart.map(item => ({ variantId: item.product.shopifyVariantId, quantity: item.quantity }));
      window.open(getShopifyCheckoutUrl(items), '_blank');
      setCheckoutStep('success');
    } else if (paymentMethod === 'flutterwave') {
      const Fc = (window as any).FlutterwaveCheckout;
      if (!Fc) { alert('Payment gateway loading. Please try again.'); return; }
      Fc({
        public_key: 'a8c75c71b8e2a69f5e6a877fce04b48b',
        tx_ref: 'YNKS-' + Math.floor(Math.random() * 1000000000 + 1),
        amount: 100,
        currency: 'NGN',
        payment_options: 'card, banktransfer, ussd',
        customer: { email: checkoutForm.email || 'customer@yeenksluxe.com', phone_number: checkoutForm.phone, name: checkoutForm.name },
        customizations: { title: 'YEENKSLUXE APPAREL', description: 'YEENKSLUXE Apparel — Order Payment', logo: window.location.origin + '/images/logoo.jpg' },
        callback: (data: any) => {
          if (data.status === 'successful' || data.status === 'completed') {
            alert('Payment Successful!');
            setCheckoutStep('success');
          } else alert('Payment was not completed.');
        },
        onclose: () => alert('Transaction closed.')
      });
    }
  };

  const scrollToShop = () => document.getElementById('shop-catalog')?.scrollIntoView({ behavior: 'smooth' });

  const value: StoreContextType = {
    cart, setCart, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
    selectedProduct, setSelectedProduct, cartOpen, setCartOpen, checkoutStep, setCheckoutStep,
    paymentMethod, setPaymentMethod, mounted, heroIndex, setHeroIndex, theme, setTheme,
    udIndex, setUdIndex, cartAnimated, scrolled, chosenSize, setChosenSize, chosenColor, setChosenColor,
    activeDossierTab, setActiveDossierTab, fitHeight, setFitHeight, fitWeight, setFitWeight,
    checkoutForm, setCheckoutForm, cartItemCount, cartSubtotal, filteredProducts,
    openQuickView, addToCart, updateCartQty, removeCartItem, handlePlaceOrder,
    getWhatsAppLink, formatCurrency, scrollToShop,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
