import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/beranda/HeroSection';
import JumlahProduk from '@/components/bisnis/JumlahProduk';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default async function BisnisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const t = await getTranslations('bisnisPage');

  const services = t.raw('services') as { id: string; title: string; text: string; image: string }[];

  // Judul gradient gold->hitam
  const gradientTitle = (text: string, alignRight = false) => (
    <h3 style={{
      fontSize: 'clamp(20px, 2.6vw, 32px)',
      fontWeight: 800,
      marginBottom: 16,
      background: alignRight
        ? 'linear-gradient(to right, #1a1a1a, #C29B24)'
        : 'linear-gradient(to right, #C29B24, #1a1a1a)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block',
    }}>
      {text}
    </h3>
  );

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 56 }}>
        <HeroSection title={t('hero')} />

        {/* Judul + deskripsi */}
        <section style={{ padding: 'clamp(40px, 5vw, 64px) 0' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800, marginBottom: 8, lineHeight: 1.3 }}>
              {t('title')}
            </h2>
            <div style={{ width: 300, height: 3, background: 'var(--accent)', borderRadius: 2, margin: '0 auto 24px' }} />
            <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.9, color: 'var(--text-muted)' }}>
              {t('description')}
            </p>
          </div>
        </section>

        {/* 4 Layanan zig-zag */}
        {services.map((service, i) => {
          const isEven = i % 2 === 0; // 0,2 = foto kiri + background abu
          const bgGray = isEven;
          const imageFirst = isEven;

          return (
            <section
              key={service.id}
              style={{
                background: bgGray ? '#f5f5f5' : '#fff',
                padding: 'clamp(32px, 4vw, 56px) 0',
              }}
            >
              <div className="container">
                <ScrollReveal direction={imageFirst ? 'left' : 'right'}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: 'clamp(24px, 4vw, 56px)',
                  alignItems: 'center',
                }}>
                  {imageFirst ? (
                    <>
                      <img src={service.image} alt={service.title} style={{ width: '100%', objectFit: 'cover' }} />
                      <div>
                        {gradientTitle(service.title, false)}
                        <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.9, color: 'var(--text-muted)' }}>
                          {service.text}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ textAlign: 'right', order: 1 }}>
                        {gradientTitle(service.title, true)}
                        <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.9, color: 'var(--text-muted)' }}>
                          {service.text}
                        </p>
                      </div>
                      <img src={service.image} alt={service.title} style={{ width: '100%', objectFit: 'cover', order: 2 }} />
                    </>
                  )}
                </div>
                </ScrollReveal>
              </div>
            </section>
          );
        })}

        {/* Penghargaan & Sertifikat */}
        <section style={{ padding: 'clamp(48px, 6vw, 80px) 0 clamp(20px, 3vw, 32px)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            {/* Title dengan 2 logo */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(16px, 3vw, 40px)', marginBottom: 8, flexWrap: 'wrap' }}>
              <img src="/images/bisnis/sertifikat-icon-1.png" alt="" style={{ width: 'clamp(48px, 6vw, 72px)', height: 'clamp(48px, 6vw, 72px)', objectFit: 'contain' }} />
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800 }}>
                {t('penghargaan.title')}
              </h2>
              <img src="/images/bisnis/sertifikat-icon-2.png" alt="" style={{ width: 'clamp(48px, 6vw, 72px)', height: 'clamp(48px, 6vw, 72px)', objectFit: 'contain' }} />
            </div>
            <div style={{ width: 300, height: 3, background: 'var(--accent)', borderRadius: 2, margin: '0 auto 40px' }} />

            {/* Sertifikat image */}
            <div style={{ maxWidth: 560, margin: '0 auto 32px' }}>
              <img src="/images/bisnis/sertifikat.png" alt="Sertifikat" style={{ width: '100%', objectFit: 'contain' }} />
            </div>

            {/* Caption */}
            <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: 800, margin: '0 auto' }}>
              {t('penghargaan.caption')}
            </p>
          </div>
        </section>
        <JumlahProduk />
      </main>
      <Footer />
    </>
  );
}