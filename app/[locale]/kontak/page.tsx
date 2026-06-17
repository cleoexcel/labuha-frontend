import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/beranda/HeroSection';

export default async function KontakPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('kontak');

  const GradientCard = ({ children }: { children: React.ReactNode }) => (
    <div style={{
      padding: '2px',
      borderRadius: 10,
      background: 'linear-gradient(to right, #C29B24, #1a1a1a)',
      height: '100%',
    }}>
      <div style={{
        background: '#f5f5f5',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: 'clamp(18px, 2.5vw, 28px) clamp(20px, 3vw, 36px)',
        height: '100%',
      }}>
        {children}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 56 }}>
        <HeroSection title={t('hero')} />

        <section style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
          <div className="container">
            <h1 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>
              {t('title')}
            </h1>
            <div style={{ width: 80, height: 3, background: 'var(--accent)', borderRadius: 2, margin: '0 auto 48px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Address */}
              <GradientCard>
                <div style={{ flexShrink: 0 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, marginBottom: 4 }}>
                    {t('address.name')}
                  </p>
                  <p style={{ fontSize: 'clamp(12px, 1.2vw, 14px)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {t('address.detail')}
                  </p>
                </div>
              </GradientCard>

              {/* Email, Telp & Instagram */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>

                {/* Email */}
                <GradientCard>
                  <div style={{ flexShrink: 0 }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="M2 7l10 7 10-7"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, marginBottom: 4 }}>
                      {t('email.label')}
                    </p>
                    <p style={{ fontSize: 'clamp(12px, 1.2vw, 14px)', color: 'var(--text-muted)' }}>
                      {t('email.value')}
                    </p>
                  </div>
                </GradientCard>

                {/* Telp */}
                <GradientCard>
                  <div style={{ flexShrink: 0 }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, marginBottom: 4 }}>
                      {t('telp.label')}
                    </p>
                    <p style={{ fontSize: 'clamp(12px, 1.2vw, 14px)', color: 'var(--text-muted)' }}>
                      {t('telp.value')}
                    </p>
                  </div>
                </GradientCard>

                {/* Instagram */}
                <a
                  href="https://instagram.com/adijayaberkahmandiri"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <GradientCard>
                    <div style={{ flexShrink: 0 }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, marginBottom: 4 }}>
                        Instagram
                      </p>
                      <p style={{ fontSize: 'clamp(12px, 1.2vw, 14px)', color: 'var(--text-muted)', fontWeight: 600 }}>
                        @adijayaberkahmandiri
                      </p>
                    </div>
                  </GradientCard>
                </a>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}