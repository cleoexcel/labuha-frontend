'use client';

import { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  text: string;
}

export default function MutuAccordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id || null);

  return (
    <div style={{ background: 'var(--bg-dark)', borderRadius: 12, padding: 'clamp(16px, 2.5vw, 28px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map(item => {
          const isOpen = open === item.id;
          return (
            <div key={item.id}>
              <button
                onClick={() => setOpen(isOpen ? null : item.id)}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 'clamp(14px, 2vw, 18px) clamp(16px, 3vw, 28px)',
                  background: 'var(--accent)',
                  border: 'none', cursor: 'pointer',
                  borderRadius: isOpen ? '8px 8px 0 0' : '8px',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                <span style={{ fontSize: 'clamp(15px, 1.6vw, 19px)', fontWeight: 700, color: '#fff', textAlign: 'left' }}>
                  {item.title}
                </span>
                <span style={{ fontSize: 24, fontWeight: 400, color: '#fff', lineHeight: 1, flexShrink: 0 }}>
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div style={{ background: '#fff', padding: 'clamp(16px, 3vw, 28px)', borderRadius: '0 0 8px 8px' }}>
                  <p style={{ fontSize: 'clamp(13px, 1.3vw, 15px)', lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-line' }}>
                    {item.text}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}