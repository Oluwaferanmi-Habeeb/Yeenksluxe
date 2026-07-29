'use client';

import { useEffect } from 'react';
import { StoreProvider, useStore } from '../context/StoreContext';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import UpperDisplay from '../components/UpperDisplay';
import ProductGrid from '../components/ProductGrid';
import EditorialPanels from '../components/EditorialPanels';
import BrandStrip from '../components/BrandStrip';
import MembershipSection from '../components/MembershipSection';
import CheckoutForm from '../components/CheckoutForm';
import SuccessPage from '../components/SuccessPage';
import CommunityShowcase from '../components/CommunityShowcase';
import LookbookFilmstrip from '../components/LookbookFilmstrip';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import ProductModal from '../components/ProductModal';
import ToastNotification from '../components/ToastNotification';
import NewsletterPopup from '../components/NewsletterPopup';
import CountdownTimer from '../components/CountdownTimer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ScrollToTop from '../components/ScrollToTop';

function Storefront() {
  const { checkoutStep, selectedCategory, searchQuery } = useStore();

  // Intersection Observer for scroll-driven reveals
  useEffect(() => {
    if (checkoutStep !== 'shop') return;
    let observer: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('revealed');
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
      );
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer?.observe(el));
    }, 100);
    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [checkoutStep, selectedCategory, searchQuery]);

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">
        {checkoutStep === 'shop' && (
          <>
            <Hero />
            <UpperDisplay />
            <ProductGrid />
            <EditorialPanels />
            <BrandStrip />
            <MembershipSection />
          </>
        )}

        {checkoutStep === 'checkout' && <CheckoutForm />}
        {checkoutStep === 'success' && <SuccessPage />}
      </div>

      <CountdownTimer />

      <CommunityShowcase />
      <LookbookFilmstrip />
      <Footer />

      <NewsletterPopup />
      <WhatsAppFloat />
      <ScrollToTop />
      <CartDrawer />
      <ProductModal />

      {/* Toast notification container */}
      <ToastNotification />

      {/* A11y live region for dynamic updates */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="a11y-announcer"></div>
    </div>
  );
}

export default function Home() {
  return (
    <StoreProvider>
      <Storefront />
    </StoreProvider>
  );
}
