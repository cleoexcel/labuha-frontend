import { getTranslations } from 'next-intl/server';
import GradientButton from '@/components/ui/GradientButton';

export default async function KeberlanjutanSection({ locale }: { locale: string }) {
  const t = await getTranslations('keberlanjutan');

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <h2 style={{ fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 800, marginBottom: 6 }}>{t('title')}</h2>
      <div style={{ width: 40, height: 3, background: 'var(--accent)', borderRadius: 2, marginBottom: 20 }} />
      <div style={{ overflow: 'hidden', marginBottom: 20, height: 'clamp(220px, 28vw, 380px)' }}>
        <img src="/images/keberlanjutan.png" alt="Keberlanjutan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <p style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 20 }}>
        {t('description')}
      </p>
      <GradientButton href={`/${locale}/keberlanjutan`}>{t('cta')}</GradientButton>
    </div>
  );
}