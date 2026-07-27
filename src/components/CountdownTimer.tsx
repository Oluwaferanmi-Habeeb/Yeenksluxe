'use client';

import { useState, useEffect } from 'react';

const DROP_DATE = new Date('2026-08-15T12:00:00+01:00'); // Aug 15, 2026 12:00 WAT

function getTimeLeft(now: Date) {
  const diff = DROP_DATE.getTime() - now.getTime();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="countdown-container reveal-on-scroll">
      <span className="countdown-eyebrow">NEXT DROP IN</span>
      <div className="countdown-grid">
        <div className="countdown-cell">
          <span className="countdown-value">{pad(timeLeft.days)}</span>
          <span className="countdown-label">Days</span>
        </div>
        <span className="countdown-colon">:</span>
        <div className="countdown-cell">
          <span className="countdown-value">{pad(timeLeft.hours)}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <span className="countdown-colon">:</span>
        <div className="countdown-cell">
          <span className="countdown-value">{pad(timeLeft.minutes)}</span>
          <span className="countdown-label">Min</span>
        </div>
        <span className="countdown-colon">:</span>
        <div className="countdown-cell">
          <span className="countdown-value">{pad(timeLeft.seconds)}</span>
          <span className="countdown-label">Sec</span>
        </div>
      </div>
    </div>
  );
}
