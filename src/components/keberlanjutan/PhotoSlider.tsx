'use client';

import { useState, useEffect, useCallback } from 'react';

interface PhotoSliderProps {
  images: string[];
  interval?: number;
  alt?: string;
}

export default function PhotoSlider({ images, interval = 3000, alt = '' }: PhotoSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval, images.length]);

  if (images.length === 0) return null;

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: 12, overflow: 'hidden' }}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={alt}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: i === current ? 1 : 0,
              transition: 'opacity 0.7s ease',
            }}
          />
        ))}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 14 }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Foto ${i + 1}`}
              style={{
                width: i === current ? 20 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                background: i === current ? 'var(--accent)' : '#ccc',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}