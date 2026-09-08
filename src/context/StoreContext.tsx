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

function restoreCart(rawCart: string | null): CartItem[] {
  if (!rawCart) return [];

  try {
    const saved: unknown = JSON.parse(rawCart);
    if (!Array.isArray(saved)) return [];

    return saved.flatMap((entry): CartItem[] => {
      if (!entry || typeof entry !== 'object') return [];
      const candidate = entry as Partial<CartItem>;
      const productId = candidate.product?.id;
      const product = products.find(item => item.id === productId);
      if (!product) return [];

      const quantity = Number.isInteger(candidate.quantity)
        ? Math.min(Math.max(candidate.quantity as number, 1), 10)
        : 1;
      const selectedSize = product.sizes?.includes(candidate.selectedSize ?? '')
        ? candidate.selectedSize as string
        : product.sizes?.[0] ?? 'One Size';
      const selectedColor = product.colors?.includes(candidate.selectedColor ?? '')
        ? candidate.selectedColor as string
        : product.colors?.[0] ?? '';

      return [{ product, quantity, selectedSize, selectedColor }];
    });
  } catch {
    return [];
  }
}

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
  const [orderReference, setOrderReference] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedCart = restoreCart(localStorage.getItem('ynks_cart'));
      const savedCurrency = localStorage.getItem('ynks_currency') as CurrencyType | null;
      setCart(savedCart);
      if (savedCurrency === 'NGN' || savedCurrency === 'USD') setCurrency(savedCurrency);
      setMounted(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem('ynks_cart', JSON.stringify(cart)); } catch { /* Storage may be unavailable. */ }
  }, [cart, mounted]);
  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem('ynks_currency', currency); } catch { /* Storage may be unavailable. */ }
  }, [currency, mounted]);

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
      if (index < 0) return [...current, { product, quantity: Math.min(Math.max(quantity, 1), 10), selectedSize: size, selectedColor: colour }];
      return current.map((item, itemIndex) => itemIndex === index ? { ...item, quantity: Math.min(item.quantity + quantity, 10) } : item);
    });
    setSelectedProduct(null);
    setCartAnimated(true);
    showToast('Added to your shopping bag.');
    window.setTimeout(() => { setCartAnimated(false); setCartOpen(true); }, 450);
  };

  const updateCartQty = (index: number, delta: number) => setCart(current => current.flatMap((item, itemIndex) => {
    if (itemIndex !== index) return item;
    const quantity = item.quantity + delta;
    return quantity > 0 ? { ...item, quantity: Math.min(quantity, 10) } : [];
  }));

  const removeCartItem = (index: number) => setCart(current => current.filter((_, itemIndex) => itemIndex !== index));

  const formatCurrency = (amount: number) => currency === 'NGN'
    ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)
    : `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount / 1500)} est.`;

  const createOrderReference = () => {
    const stamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 12);
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `YNL-${stamp}-${suffix}`;
  };

  const getWhatsAppLink = (reference = orderReference ?? createOrderReference()) => {
    const orderLines = cart.map((item, index) => {
      const name = item.product.name.replace(/YĒĒNKSLUXÉ\s*x\s*/gi, '').replace(/[‘’']?26 Edition\s*/gi, '').trim();
      return `${index + 1}. *${name}*\n   • Quantity: ${item.quantity}\n   • Size: ${item.selectedSize}${item.selectedColor ? `\n   • Colour: ${item.selectedColor}` : ''}\n   • Line total: ${formatCurrency(item.product.price * item.quantity)}`;
    }).join('\n\n');
    const emailLine = checkoutForm.email ? `\n• Email: ${checkoutForm.email}` : '';
    const noteLine = checkoutForm.notes.trim() ? checkoutForm.notes.trim() : 'None';
    const message = `*YEENKSLUXE — ORDER REQUEST*\n\n*Order reference:* ${reference}\n*Date:* ${new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())}\n\n*ITEMS*\n${orderLines}\n\n*ITEM SUBTOTAL: ${formatCurrency(cartSubtotal)}*\n*Delivery fee:* To be confirmed\n*Final total:* To be confirmed after stock and delivery confirmation\n\n*CUSTOMER & DELIVERY DETAILS*\n• Name: ${checkoutForm.name}\n• Phone: ${checkoutForm.phone}${emailLine}\n• Address: ${checkoutForm.address}\n• City / State: ${checkoutForm.city}\n• Order note: ${noteLine}\n\n*NEXT STEP*\nPlease confirm item availability, delivery fee, final total and payment details. Thank you.`;
    return `https://wa.me/2349033364994?text=${encodeURIComponent(message)}`;
  };

  const handlePlaceOrder = (event: React.FormEvent) => {
    event.preventDefault();
    if (!cart.length) return;
    const reference = orderReference ?? createOrderReference();
    if (!orderReference) setOrderReference(reference);
    window.open(getWhatsAppLink(reference), '_blank', 'noopener,noreferrer');
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
