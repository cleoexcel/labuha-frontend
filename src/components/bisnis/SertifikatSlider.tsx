'use client';

import { useState, useEffect, useCallback } from 'react';

const images = [
  '/images/penghargaan/penghargaan-1.jpeg',
  '/images/penghargaan/penghargaan-2.jpeg',
  '/images/penghargaan/penghargaan-3.jpeg',
  '/images/penghargaan/penghargaan-4.jpeg',
  '/images/penghargaan/penghargaan-5.jpeg',
  '/images/penghargaan/penghargaan-6.jpeg',
];

export default function SertifikatSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % images.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 1500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div style={{ maxWidth: 560, margin: '0 auto 32px', position: 'relative' }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '3/2' }}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Penghargaan ${i + 1}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: i === current ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          />
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? 20 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              background: i === current ? 'var(--accent)' : '#ddd',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}