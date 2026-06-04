'use client';

import { useState, useEffect, useCallback } from 'react';

interface CertItem {
  id: string;
  title: string;
  photo_url: string;
}

export default function SertifikasiSlider({ items }: { items: CertItem[] }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(next, 2500);
    return () => clearInterval(timer);
  }, [next, items.length]);

  if (items.length === 0) {
    return <p style={{ textAlign: 'center', color: '#aaa', padding: '40px 0' }}>Belum ada sertifikat.</p>;
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
        {items.map((item, i) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === current ? 1 : 0,
              transition: 'opacity 0.6s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: i === current ? 'auto' : 'none',
            }}
          >
            {item.photo_url ? (
              <img
                src={item.photo_url}
                alt={item.title}
                style={{ width: '100%', height: '82%', objectFit: 'contain', marginBottom: 16 }}
              />
            ) : (
              <div style={{ width: '100%', height: '82%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginBottom: 16 }}>📄</div>
            )}
            <p style={{ fontSize: 'clamp(13px, 1.4vw, 16px)', fontWeight: 600, color: 'var(--text)', textAlign: 'center' }}>
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
        {items.map((_, i) => (
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