import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/beranda/HeroSection';
import JobCard from '@/components/karir/JobCard';
import { jobService } from '@/services';
import type { JobVacancy } from '@/types';

export default async function KarirPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('karir');

  let jobs: JobVacancy[] = [];
  try {
    const res = await jobService.getAll();
    jobs = (res.data || []).filter(j => j.is_open);
  } catch {
    jobs = [];
  }

  const GradientCard = ({ children }: { children: React.ReactNode }) => (
    <div style={{ padding: '2px', borderRadius: 10, background: 'linear-gradient(to right, #C29B24, #1a1a1a)' }}>
      <div style={{
        background: '#f5f5f5', borderRadius: 8,
        display: 'flex', alignItems: 'center', gap: 20,
        padding: 'clamp(16px, 2.5vw, 24px) clamp(20px, 3vw, 32px)',
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

        <section style={{ padding: 'clamp(40px, 5vw, 64px) 0' }}>
          <div className="container">
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>
              {t('title')}
            </h1>
            <div style={{ width: 80, height: 3, background: 'var(--accent)', borderRadius: 2, margin: '0 auto 24px' }} />

            {/* Subtitle */}
            <p style={{ fontSize: 'clamp(13px, 1.3vw, 15px)', color: 'var(--text-muted)', textAlign: 'center', marginBottom: 40 }}>
              {t('subtitle')}
            </p>

            {/* Email & Telp */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 64 }}>
              {/* Email */}
              <GradientCard>
                <div style={{ flexShrink: 0 }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M2 7l10 7 10-7"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: 'clamp(15px, 1.7vw, 19px)', fontWeight: 700, marginBottom: 2 }}>{t('email.label')}</p>
                  <p style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', color: 'var(--text-muted)' }}>{t('email.value')}</p>
                </div>
              </GradientCard>
            </div>

            {/* Lowongan Pekerjaan */}
            <h2 style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>
              {t('lowongan')}
            </h2>
            <div style={{ width: 80, height: 3, background: 'var(--accent)', borderRadius: 2, margin: '0 auto 40px' }} />

            {jobs.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#aaa', padding: '40px 0' }}>{t('empty')}</p>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'clamp(16px, 2vw, 24px)',
              }}>
                {jobs.map(job => {
                  const title = locale === 'en' ? (job.title_en || job.title) : job.title;
                  const deadline = new Date(job.deadline).toLocaleDateString(
                    locale === 'en' ? 'en-GB' : 'id-ID',
                    { day: 'numeric', month: 'long', year: 'numeric' }
                  );
                  return (
                    <JobCard
                      key={job.id}
                      title={title}
                      location={job.location}
                      deadline={deadline}
                      applyUrl={job.apply_url}
                      cta={t('cta')}
                      deadlineLabel={t('deadline')}
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