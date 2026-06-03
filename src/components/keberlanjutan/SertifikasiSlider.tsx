'use client';

import { useState, useEffect, useCallback } from 'react';

const items = [
  { code: 'ISO 9001:2015', title: 'Sistem Manajemen Mutu', image: '/images/sertifikasi/sertifikasi-1.jpeg' },
  { code: 'ISO 45001:2018', title: 'Sistem Manajemen Keselamatan & Kesehatan Kerja', image: '/images/sertifikasi/sertifikasi-2.jpeg' },
  { code: 'ISO 14001:2015', title: 'Sistem Manajemen Lingkungan', image: '/images/sertifikasi/sertifikasi-3.jpeg' },
  { code: 'Sertifikat ISO Terintegrasi', title: 'Mutu, Lingkungan, dan K3', image: '/images/sertifikasi/sertifikasi-4.jpeg' },
];

export default function SertifikasiSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % items.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 2500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
        {items.map((item, i) => (
          <div
            key={i}
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
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '100%', height: '82%', objectFit: 'contain', marginBottom: 16 }}
            />
            <p style={{ fontSize: 'clamp(13px, 1.4vw, 16px)', fontWeight: 600, color: 'var(--text)', textAlign: 'center' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 800 }}>{item.code}</span> — {item.title}
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