'use client';

import Link from 'next/link';
import { useStore } from '../context/StoreContext';

export default function Footer() {
  const { setCheckoutStep, setSelectedCategory, scrollToShop } = useStore();
  const shop = (category: string) => { setCheckoutStep('shop'); setSelectedCategory(category); window.setTimeout(scrollToShop, 30); };
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand"><strong>YEENKSLUXE<span>®</span></strong><p>Lagos-born streetwear for people who move with intent.</p></div>
        <div><h2>Shop</h2><button onClick={() => shop('All')}>All pieces</button><button onClick={() => shop('Shirts')}>Shirts</button><button onClick={() => shop('Hoodies')}>Hoodies</button><button onClick={() => shop('Hats')}>Headwear</button></div>
        <div><h2>Help</h2><Link href="/shipping">Delivery</Link><Link href="/returns">Returns & exchanges</Link><Link href="/size-guide">Size guide</Link><a href="#faq">FAQ</a></div>
        <div><h2>Follow</h2><a href="https://instagram.com/yeenksluxe" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://tiktok.com/@yeenksluxe" target="_blank" rel="noopener noreferrer">TikTok ↗</a><a href="https://wa.me/2349033364994" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} YEENKSLUXE</span><span>Lagos, Nigeria</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
      <div className="footer-word" aria-hidden="true">YEENKSLUXE</div>
    </footer>
  );
}
