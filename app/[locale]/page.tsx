import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/beranda/HeroSection';
import TentangSection from '@/components/beranda/TentangSection';
import BisnisSection from '@/components/beranda/BisnisSection';
import BeritaSection from '@/components/beranda/BeritaSection';
import KeberlanjutanSection from '@/components/beranda/KeberlanjutanSection';

export default async function BerandaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('hero');

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 56 }}>
        <HeroSection title={t('title')} />
        <TentangSection locale={locale} />
        <BisnisSection locale={locale} />

        <section style={{ padding: '48px 0 64px', background: '#fff' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(24px, 4vw, 64px)',
            }}>
              <BeritaSection locale={locale} />
              <KeberlanjutanSection locale={locale} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}