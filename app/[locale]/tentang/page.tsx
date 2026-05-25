import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/beranda/HeroSection';
import TentangTabs from '@/components/tentang/TentangTabs';
import TentangContent from '@/components/tentang/TentangContent';
import BoardContent from '@/components/tentang/BoardContent';

export default async function TentangPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('tentangPage');

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 56 }}>
        <HeroSection title={t('hero')} />
        <TentangTabs
          tentangContent={<TentangContent />}
          boardContent={<BoardContent locale={locale} />}
        />
      </main>
      <Footer />
    </>
  );
}