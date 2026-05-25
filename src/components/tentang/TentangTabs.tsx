'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface TentangTabsProps {
  tentangContent: React.ReactNode;
  boardContent: React.ReactNode;
}

export default function TentangTabs({ tentangContent, boardContent }: TentangTabsProps) {
  const t = useTranslations('tentangPage.tabs');
  const [active, setActive] = useState<'tentang' | 'board'>('tentang');

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        borderBottom: '1px solid #e5e5e5',
        padding: '0',
        background: '#fff',
      }}>
        <div className="container" style={{ display: 'flex', gap: 0 }}>
          <button
            onClick={() => setActive('tentang')}
            style={{
              padding: '14px 24px',
              fontSize: 14, fontWeight: active === 'tentang' ? 700 : 400,
              color: active === 'tentang' ? 'var(--accent)' : '#555',
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: active === 'tentang' ? '3px solid var(--accent)' : '3px solid transparent',
              fontFamily: 'Poppins, sans-serif',
              transition: 'all 0.2s',
            }}
          >
            {t('tentang')}
          </button>
          <span style={{ color: '#ccc', display: 'flex', alignItems: 'center', fontSize: 16 }}>|</span>
          <button
            onClick={() => setActive('board')}
            style={{
              padding: '14px 24px',
              fontSize: 14, fontWeight: active === 'board' ? 700 : 400,
              color: active === 'board' ? 'var(--accent)' : '#555',
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: active === 'board' ? '3px solid var(--accent)' : '3px solid transparent',
              fontFamily: 'Poppins, sans-serif',
              transition: 'all 0.2s',
            }}
          >
            {t('board')}
          </button>
        </div>
      </div>

      {/* Content */}
      <div>
        {active === 'tentang' ? tentangContent : boardContent}
      </div>
    </div>
  );
}