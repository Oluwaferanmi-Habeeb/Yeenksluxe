'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const key = 'ynl_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(!localStorage.getItem(key)), 0);
    return () => window.clearTimeout(timer);
  }, []);
  const decide = (choice: 'accepted' | 'essential') => { localStorage.setItem(key, choice); setVisible(false); };
  if (!visible) return null;
  return <section className="cookie-consent" role="dialog" aria-label="Cookie choices"><p>We use essential browser storage to keep your bag and account flow working. Optional analytics are off unless you accept them. <Link href="/cookies">Cookie Policy</Link></p><div><button className="button button-outline" onClick={() => decide('essential')}>Essential only</button><button className="button button-dark" onClick={() => decide('accepted')}>Accept</button></div></section>;
}
