'use client';

import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';
import { CartItem, CheckoutFormData, CheckoutStep, ThemeMode, PaymentMethod, DossierTab, CurrencyType } from '../types';
import { products } from '../data/products';

interface StoreContextType {
  // State
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  currency: CurrencyType;
  setCurrency: React.Dispatch<React.SetStateAction<CurrencyType>>;
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

  // Toast
  toast: string | null;
  setToast: React.Dispatch<React.SetStateAction<string | null>>;
  showToast: (msg: string) => void;

  // Actions
  openQuickView: (product: Product) => void;
  addToCart: (product: Product, size: string, color: string, qty?: number) => void;
  updateCartQty: (index: number, delta: number) => void;
  removeCartItem: (index: number) => void;
  handlePlaceOrder: (e: React.FormEvent) => void;
  getWhatsAppLink: () => string;
  formatCurrency: (amount: number) => string;
  formatUSD: (amount: number) => string;
  formatNGN: (amount: number) => string;
  scrollToShop: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  // ── Core State ──
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<CurrencyType>('NGN');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('shop');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paystack');
  const [mounted, setMounted] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [theme, setTheme] = useState<ThemeMode>('dark'); // streetwear brand defaults to dark
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
  const [toast, setToast] = useState<string | null>(null);

  // ── Effects ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (checkoutStep !== 'shop') return;
    const interval = setInterval(() => setHeroIndex((p) => (p + 1) % 2), 5000);
    return () => clearInterval(interval);
  }, [checkoutStep]);

  useEffect(() => {
    if (checkoutStep !== 'shop') return;
    const interval = setInterval(() => setUdIndex((p) => (p + 1) % 3), 6000);
    return () => clearInterval(interval);
  }, [checkoutStep]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const savedCart = localStorage.getItem('ynks_cart');
    if (savedCart) try { setCart(JSON.parse(savedCart)); } catch {}
    const savedTheme = localStorage.getItem('ynks_theme') as ThemeMode | null;
    if (savedTheme) setTheme(savedTheme);
    const savedCurrency = localStorage.getItem('ynks_currency') as CurrencyType | null;
    if (savedCurrency) setCurrency(savedCurrency);
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

  useEffect(() => {
    if (mounted) localStorage.setItem('ynks_currency', currency);
  }, [currency, mounted]);

  // ── Computed ──
  const cartItemCount = useMemo(() =>
    mounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0,
  [cart, mounted]);

  const cartSubtotal = useMemo(() =>
    mounted ? cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) : 0,
  [cart, mounted]);

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

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
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
    showToast(`Added to cart — ${product.name}`);
    setTimeout(() => setCartOpen(true), 600);
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

  const NGN_TO_USD = 1500; // Approximate exchange rate
  
  // Always returns clean NGN format: "NGN ₦30,000"
  const formatNGN = (amount: number) => 'NGN ₦' + amount.toLocaleString('en-NG');
  
  // Always returns clean USD format: "USD $20"
  const formatUSD = (amount: number) => 'USD $' + (amount / NGN_TO_USD).toFixed(0);
  
  // Backward-compatible aliases (used by some components)
  const formatCurrency = (amount: number) => {
    if (currency === 'USD') return formatUSD(amount);
    return formatNGN(amount);
  };

  const getWhatsAppLink = () => {
    const phoneNum = '2349033364994';
    const orderLines = cart.map(
      (item) => `- ${item.product.name} (Qty: ${item.quantity}, Size: ${item.selectedSize}${item.selectedColor ? `, Color: ${item.selectedColor}` : ''})`
    ).join('\\n');
    const message = `Hello YEENKSLUXE,\\n\\nI would like to place an order:\\n\\n*Order Details:*\\n${orderLines}\\n\\n*Customer Info:*\\n- Name: ${checkoutForm.name}\\n- Phone: ${checkoutForm.phone}\\n- Delivery Address: ${checkoutForm.address}, ${checkoutForm.city}\\n- Notes: ${checkoutForm.notes || 'None'}\\n\\nPlease confirm pricing and availability. Thank you!`;
    return `https://wa.me/${phoneNum}?text=${encodeURIComponent(message)}`;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cart.length) {
      alert('Your cart is empty.');
      return;
    }

    const requiredFields = [checkoutForm.name, checkoutForm.email, checkoutForm.phone, checkoutForm.address, checkoutForm.city];
    if (requiredFields.some((field) => !field.trim())) {
      alert('Please fill out all required shipping details before continuing.');
      return;
    }

    if (paymentMethod === 'whatsapp') {
      setCheckoutStep('success');
      setCart([]);
      window.open(getWhatsAppLink(), '_blank');
      showToast('Order request opened in WhatsApp. We will confirm your order shortly.');
      return;
    }

    if (paymentMethod === 'paystack') {
      const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
      if (!paystackKey) {
        alert('Payment gateway is not configured yet. Please contact support.');
        return;
      }

      const PaystackPop = (await import('@paystack/inline-js')).default;
      const popup = new PaystackPop();
      popup.newTransaction({
        key: paystackKey,
        email: checkoutForm.email || 'customer@yeenksluxe.com',
        amount: Math.round(cartSubtotal * 100),
        currency: 'NGN',
        ref: `YNKS-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
        metadata: {
          custom_fields: [
            {
              display_name: 'Customer Name',
              variable_name: 'customer_name',
              value: checkoutForm.name
            },
            {
              display_name: 'Delivery Address',
              variable_name: 'delivery_address',
              value: `${checkoutForm.address}, ${checkoutForm.city}`
            }
          ]
        },
        onSuccess: () => {
          setCart([]);
          setCheckoutStep('success');
          showToast('Payment received — your order is confirmed.');
        },
        onCancel: () => {
          showToast('Payment cancelled. You can try again anytime.');
        }
      });
    }
  };

  const scrollToShop = () => document.getElementById('shop-catalog')?.scrollIntoView({ behavior: 'smooth' });

  const value: StoreContextType = {
    cart, setCart, currency, setCurrency, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
    selectedProduct, setSelectedProduct, cartOpen, setCartOpen, checkoutStep, setCheckoutStep,
    paymentMethod, setPaymentMethod, mounted, heroIndex, setHeroIndex, theme, setTheme,
    udIndex, setUdIndex, cartAnimated, scrolled, chosenSize, setChosenSize, chosenColor, setChosenColor,
    activeDossierTab, setActiveDossierTab, fitHeight, setFitHeight, fitWeight, setFitWeight,
    checkoutForm, setCheckoutForm, cartItemCount, cartSubtotal, filteredProducts,
    toast, setToast, showToast,
    openQuickView, addToCart, updateCartQty, removeCartItem, handlePlaceOrder,
    getWhatsAppLink, formatCurrency, formatUSD, formatNGN, scrollToShop,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
