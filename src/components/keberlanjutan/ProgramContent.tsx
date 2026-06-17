import { getTranslations } from 'next-intl/server';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PhotoSlider from './PhotoSlider';

export default async function ProgramContent() {
  const t = await getTranslations('keberlanjutanPage');

  return (
    <div>
      {/* Title */}
      <section style={{ padding: 'clamp(32px, 4vw, 56px) 0 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 800, marginBottom: 8 }}>
            {t('csrTitle')}
          </h2>
          <div style={{ width: 80, height: 3, background: 'var(--accent)', borderRadius: 2, margin: '0 auto' }} />
        </div>
      </section>

      {/* Kepedulian Lingkungan - foto kiri, teks kanan, background abu */}
      <section style={{ background: '#f5f5f5', padding: 'clamp(40px, 5vw, 64px) 0', marginTop: 40 }}>
        <div className="container">
        <ScrollReveal direction="left">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'center',
          }}>
            <PhotoSlider images={[
  '/images/keberlanjutan/lingkungan-1.jpeg',
  '/images/keberlanjutan/lingkungan-2.jpeg',
  '/images/keberlanjutan/lingkungan-3.jpeg',
]} interval={1000} />
            <div>
              <h3 style={{
                fontSize: 'clamp(20px, 2.4vw, 30px)',
                fontWeight: 800,
                marginBottom: 16,
                background: 'linear-gradient(to right, #C29B24, #1a1a1a)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                }}>
                {t('lingkungan.title')}
                </h3>
              <p style={{ fontSize: 'clamp(13px, 1.3vw, 15px)', lineHeight: 1.9, color: 'var(--text-muted)' }}>
                {t('lingkungan.text')}
              </p>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pengembangan Masyarakat - teks kiri, foto kanan */}
      <section style={{ padding: 'clamp(40px, 5vw, 64px) 0' }}>
        <div className="container">
        <ScrollReveal direction="right">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'center',
          }}>
            <div style={{ textAlign: 'right' }}>
              <h3 style={{
                fontSize: 'clamp(20px, 2.4vw, 30px)',
                fontWeight: 800,
                marginBottom: 16,
                background: 'linear-gradient(to right, #1a1a1a, #C29B24)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                }}>
                {t('masyarakat.title')}
                </h3>
              <p style={{ fontSize: 'clamp(13px, 1.3vw, 15px)', lineHeight: 1.9, color: 'var(--text-muted)' }}>
                {t('masyarakat.text')}
              </p>
            </div>
            <PhotoSlider images={[
  '/images/keberlanjutan/masyarakat-1.jpg',
  '/images/keberlanjutan/masyarakat-2.jpg',
  '/images/keberlanjutan/masyarakat-3.jpeg',
  '/images/keberlanjutan/masyarakat-4.jpeg',
]} interval={1000} />
          </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}