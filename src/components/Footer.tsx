import { getTranslations } from 'next-intl/server';

export default async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer style={{ background: 'var(--bg-dark)', color: '#fff', padding: 'clamp(32px, 5vw, 56px) 0 24px' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
          <span style={{ fontSize: 20, fontWeight: 700 }}>Logo</span>
          <span style={{ fontSize: 16, fontWeight: 600 }}>{t('company')}</span>
        </div>
        <p style={{ fontSize: 13, color: '#aaa', lineHeight: 1.8, marginBottom: 24, whiteSpace: 'pre-line' }}>
          {t('address')}
        </p>
        <div style={{ borderTop: '1px solid #333', paddingTop: 20 }}>
          <p style={{ fontSize: 12, color: '#666' }}>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}