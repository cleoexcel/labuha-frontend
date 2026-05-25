import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/beranda/HeroSection';
import NewsCard from '@/components/beranda/NewsCard';
import { newsService } from '@/services';
import type { News } from '@/types';

export default async function BeritaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('beritaPage');

  let news: News[] = [];
  try {
    const res = await newsService.getAll(20);
    news = res.data || [];
  } catch {
    news = [];
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 56 }}>
        <HeroSection title={t('hero')} />

        <section style={{ padding: 'clamp(40px, 5vw, 72px) 0' }}>
          <div className="container">
            <h1 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>
              {t('title')}
            </h1>
            <div style={{ width: 80, height: 3, background: 'var(--accent)', borderRadius: 2, margin: '0 auto 48px' }} />

            {news.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#aaa', padding: '40px 0' }}>{t('empty')}</p>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'clamp(16px, 2.5vw, 32px)',
              }}>
                {news.map(item => {
                  const title = locale === 'en' ? (item.title_en || item.title) : item.title;
                  const date = new Date(item.published_at).toLocaleDateString(
                    locale === 'en' ? 'en-GB' : 'id-ID',
                    { day: 'numeric', month: 'long', year: 'numeric' }
                  );

                  return (
                    <NewsCard
                      key={item.id}
                      id={item.id}
                      title={title}
                      photo_url={item.photo_url}
                      date={date}
                      cta={t('cta')}
                      locale={locale}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}