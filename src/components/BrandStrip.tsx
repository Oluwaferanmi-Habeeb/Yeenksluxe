'use client';

export default function BrandStrip() {
  return (
    <section className="brand-strip">
      <div className="brand-strip-content container">
        <p className="brand-strip-tagline">PREMIUM STREETWEAR. WORN BY THE BOLD.</p>
        <div className="brand-strip-socials">
          <a href="https://instagram.com/yeenksluxe" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://twitter.com/yeenksluxe" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg viewBox="0 0 24 24"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
          </a>
          <a href="https://tiktok.com/@yeenksluxe" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg viewBox="0 0 24 24"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
