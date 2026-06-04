import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/beranda/HeroSection';
import KeberlanjutanTabs from '@/components/keberlanjutan/KeberlanjutanTabs';
import ProgramContent from '@/components/keberlanjutan/ProgramContent';
import MutuContent from '@/components/keberlanjutan/MutuContent';

export default async function KeberlanjutanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('keberlanjutanPage');

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 56 }}>
        <HeroSection title={t('hero')} />
        <KeberlanjutanTabs
          programContent={<ProgramContent />}
          mutuContent={<MutuContent locale={locale} />}
        />
      </main>
      <Footer />
    </>
  );
}