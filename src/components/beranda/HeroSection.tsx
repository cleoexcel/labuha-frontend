'use client';

import { useState, useEffect, useCallback } from 'react';

const heroImages = [
  '/images/hero.png',
  '/images/hero-2.png',
  '/images/hero-3.png',
];

export default function HeroSection({ title }: { title: string }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 1500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section style={{ position: 'relative', height: '70vh', minHeight: 480, overflow: 'hidden' }}>
      {heroImages.map((img, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          opacity: i === current ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}>
          <img
            src={img}
            alt={`Hero ${i + 1}`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      ))}

      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />

      {/* Title */}
      <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0 }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 800, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}