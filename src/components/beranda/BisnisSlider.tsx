'use client';

import { useState, useEffect, useCallback } from 'react';
import GradientButton from '@/components/ui/GradientButton';

interface Slide {
  title: string;
  image: string;
}

interface BisnisSliderProps {
  slides: Slide[];
  cta: string;
  locale: string;
}

export default function BisnisSlider({ slides, cta, locale }: BisnisSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 2000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div>
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        height: 'clamp(280px, 42vw, 520px)',
        background: '#222',
      }}>
        {slides.map((slide, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.7s ease',
          }}>
            <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.55))' }} />
            <div style={{
              position: 'absolute', bottom: '50%', left: '50%',
              transform: 'translate(-50%, 50%)', textAlign: 'center', width: '70%',
            }}>
              <h3 style={{
                fontSize: 'clamp(18px, 3vw, 30px)', fontWeight: 800,
                color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.6)', whiteSpace: 'pre-line',
              }}>
                {slide.title}
              </h3>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 24 : 8, height: 8, borderRadius: 4,
              border: 'none', background: i === current ? '#fff' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer', padding: 0, transition: 'all 0.3s',
            }} />
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 28 }}>
        <GradientButton href={`/${locale}/bisnis`}>{cta}</GradientButton>
      </div>
    </div>
  );
}