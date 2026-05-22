import { getTranslations } from 'next-intl/server';
import BisnisSlider from './BisnisSlider';

export default async function BisnisSection({ locale }: { locale: string }) {
  const t = await getTranslations('bisnis');

  const rawSlides = t.raw('slides') as { title: string }[];
  const slideImages = [
    '/images/bisnis/slide-1.png',
    '/images/bisnis/slide-2.png',
    '/images/bisnis/slide-3.png',
    '/images/bisnis/slide-4.png',
  ];

  const slides = rawSlides.map((s, i) => ({
    title: s.title,
    image: slideImages[i] || slideImages[0],
  }));

  return (
    <section style={{ padding: '48px 0', background: '#fff' }}>
      <div className="container">
        <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>
          {t('title')}
        </h2>
        <div style={{ width: 48, height: 3, background: 'var(--accent)', borderRadius: 2, margin: '0 auto 28px' }} />
        <BisnisSlider slides={slides} cta={t('cta')} locale={locale} />
      </div>
    </section>
  );
}