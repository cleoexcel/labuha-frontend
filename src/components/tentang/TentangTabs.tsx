'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

interface TentangTabsProps {
  tentangContent: React.ReactNode;
  boardContent: React.ReactNode;
}

export default function TentangTabs({ tentangContent, boardContent }: TentangTabsProps) {
  const t = useTranslations('tentangPage.tabs');
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'board' ? 'board' : 'tentang';
  const [active, setActive] = useState<'tentang' | 'board'>(initialTab);

  return (
    <div>
      {/* Tab bar */}
      <div style={{ borderBottom: '1px solid #e5e5e5', background: '#fff' }}>
        <div className="container" style={{ display: 'flex', gap: 0, justifyContent: 'center' }}>
          <button
            onClick={() => setActive('tentang')}
            style={{
              padding: '16px 24px', fontSize: 'clamp(13px, 1.4vw, 16px)',
              fontWeight: active === 'tentang' ? 700 : 500,
              color: active === 'tentang' ? 'var(--accent)' : 'var(--text)',
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: active === 'tentang' ? '3px solid var(--accent)' : '3px solid transparent',
              fontFamily: 'Poppins, sans-serif', transition: 'all 0.2s',
            }}
          >
            {t('tentang')}
          </button>
          <span style={{ color: '#ccc', display: 'flex', alignItems: 'center', fontSize: 16 }}>|</span>
          <button
            onClick={() => setActive('board')}
            style={{
              padding: '16px 24px', fontSize: 'clamp(13px, 1.4vw, 16px)',
              fontWeight: active === 'board' ? 700 : 500,
              color: active === 'board' ? 'var(--accent)' : 'var(--text)',
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: active === 'board' ? '3px solid var(--accent)' : '3px solid transparent',
              fontFamily: 'Poppins, sans-serif', transition: 'all 0.2s',
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