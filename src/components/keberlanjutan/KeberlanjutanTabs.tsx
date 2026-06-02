'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface KeberlanjutanTabsProps {
  programContent: React.ReactNode;
  mutuContent: React.ReactNode;
}

export default function KeberlanjutanTabs({ programContent, mutuContent }: KeberlanjutanTabsProps) {
  const t = useTranslations('keberlanjutanPage.tabs');
  const [active, setActive] = useState<'program' | 'mutu'>('program');

  return (
    <div>
      {/* Tab bar */}
      <div style={{ borderBottom: '1px solid #e5e5e5', background: '#fff' }}>
        <div className="container" style={{ display: 'flex', gap: 0, justifyContent: 'center' }}>
          <button
            onClick={() => setActive('program')}
            style={{
              padding: '16px 24px', fontSize: 'clamp(13px, 1.4vw, 16px)',
              fontWeight: active === 'program' ? 700 : 500,
              color: active === 'program' ? 'var(--accent)' : 'var(--text)',
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: active === 'program' ? '3px solid var(--accent)' : '3px solid transparent',
              fontFamily: 'Poppins, sans-serif', transition: 'all 0.2s',
            }}
          >
            {t('program')}
          </button>
          <span style={{ color: '#ccc', display: 'flex', alignItems: 'center', fontSize: 16 }}>|</span>
          <button
            onClick={() => setActive('mutu')}
            style={{
              padding: '16px 24px', fontSize: 'clamp(13px, 1.4vw, 16px)',
              fontWeight: active === 'mutu' ? 700 : 500,
              color: active === 'mutu' ? 'var(--accent)' : 'var(--text)',
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: active === 'mutu' ? '3px solid var(--accent)' : '3px solid transparent',
              fontFamily: 'Poppins, sans-serif', transition: 'all 0.2s',
            }}
          >
            {t('mutu')}
          </button>
        </div>
      </div>

      <div>{active === 'program' ? programContent : mutuContent}</div>
    </div>
  );
}