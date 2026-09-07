'use client';

import { useEffect } from 'react';
import { StoreProvider, useStore } from '../context/StoreContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import EditorialPanels from '../components/EditorialPanels';
import CommunityShowcase from '../components/CommunityShowcase';
import MembershipSection from '../components/MembershipSection';
import FaqSection from '../components/FaqSection';
import CheckoutForm from '../components/CheckoutForm';
import SuccessPage from '../components/SuccessPage';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import ProductModal from '../components/ProductModal';
import ToastNotification from '../components/ToastNotification';
import WhatsAppFloat from '../components/WhatsAppFloat';

function Storefront() {
  const { checkoutStep, selectedCategory, searchQuery } = useStore();

  useEffect(() => {
    if (checkoutStep !== 'shop') return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -48px' }
    );
    const timer = window.setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    }, 50);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [checkoutStep, selectedCategory, searchQuery]);

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        {checkoutStep === 'shop' && (
          <>
            <Hero />
            <ProductGrid />
            <EditorialPanels />
            <CommunityShowcase />
            <MembershipSection />
            <FaqSection />
          </>
        )}
        {checkoutStep === 'checkout' && <CheckoutForm />}
        {checkoutStep === 'success' && <SuccessPage />}
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartDrawer />
      <ProductModal />
      <ToastNotification />
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="a11y-announcer" />
    </div>
  );
}

export default function Home() {
  return <StoreProvider><Storefront /></StoreProvider>;
}
