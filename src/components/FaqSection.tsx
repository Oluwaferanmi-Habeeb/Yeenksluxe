'use client';

import { useState } from 'react';

const faqs = [
  ['How long does delivery take?', 'Lagos orders typically arrive within 1 to 3 business days. Other Nigerian locations typically take 3 to 7 business days.'],
  ['Can I exchange my size?', 'Yes. Unworn items with original tags can be exchanged within 7 days of delivery, subject to stock availability.'],
  ['How do I choose the right size?', 'Open the size guide inside any product, or message our team on WhatsApp for personal sizing help before ordering.'],
  ['How is payment completed?', 'Your order is prepared on the website and sent to our official WhatsApp line, where availability and payment details are confirmed.'],
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq-section reveal-on-scroll" id="faq">
      <div className="container faq-layout">
        <div className="section-intro">
          <p className="eyebrow">Need to know</p>
          <h2>Before you order.</h2>
          <a className="text-link" href="https://wa.me/2349033364994" target="_blank" rel="noopener noreferrer">Ask us anything <span>↗</span></a>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className={`faq-item ${open === index ? 'open' : ''}`} key={question}>
              <button onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}>
                <span>{question}</span><span aria-hidden="true">{open === index ? '−' : '+'}</span>
              </button>
              <div className="faq-answer"><p>{answer}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
