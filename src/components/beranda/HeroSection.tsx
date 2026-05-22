import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section style={{
      position: 'relative',
      height: '70vh',
      minHeight: 480,
      overflow: 'hidden',
    }}>
      {/* Background image */}
      <img
        src="/images/hero.png"
        alt="Hero"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Overlay gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
      }} />

      {/* Title */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: 40,
      }}>
        <h1 style={{
          fontSize: 28,
          fontWeight: 800,
          color: '#fff',
          textShadow: '0 2px 8px rgba(0,0,0,0.4)',
          letterSpacing: '-0.3px',
        }}>
          {t('title')}
        </h1>
      </div>
    </section>
  );
}