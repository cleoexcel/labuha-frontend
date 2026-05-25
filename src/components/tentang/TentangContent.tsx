import { getTranslations } from 'next-intl/server';
import InfiniteCarousel from '@/components/ui/InfiniteCarousel';

export default async function TentangContent() {
  const t = await getTranslations('tentangPage');
  const nilaiItems = t.raw('nilai.items') as { id: string; label: string; sub: string; image: string }[];
  const falsafahItems = t.raw('falsafah.items') as { id: string; label: string; sub: string; image: string }[];
  const misiItems = t.raw('misi.items') as string[];

  return (
    <div>
      {/* Company Info */}
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 800, textAlign: 'center', marginBottom: 36 }}>
            {t('companyName')}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'start',
          }}>
            <img
              src="/images/tentang/company.png"
              alt="PT Labuha Inter Nusa"
              style={{ width: '100%', objectFit: 'cover' }}
            />
            <div>
              <p style={{ fontSize: 18, lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: 20 }}>
                {t('companyDesc1')}
              </p>
              <p style={{ fontSize: 18, lineHeight: 1.9, color: 'var(--text-muted)' }}>
                {t('companyDesc2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi */}
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 36px)', fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>
            {t('visi.title')}
          </h2>
          <div style={{ width: 80, height: 3, background: 'var(--accent)', borderRadius: 2, margin: '0 auto 28px' }} />

          {/* Gradient border box */}
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '8px', borderRadius: 16, background: 'linear-gradient(to right, #C29B24, #1a1a1a)' }}>
            <div style={{ background: '#fff', borderRadius: 14, padding: 'clamp(24px, 4vw, 40px) clamp(24px, 5vw, 56px)' }}>
              <p style={{ fontSize: 'clamp(15px, 1.6vw, 19px)', lineHeight: 1.8, color: 'var(--text)', textAlign: 'center' }}>
                {t('visi.text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misi */}
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 36px)', fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>
            {t('misi.title')}
          </h2>
          <div style={{ width: 80, height: 3, background: 'var(--accent)', borderRadius: 2, margin: '0 auto 36px' }} />

          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
              {misiItems.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--text)', fontWeight: 700, flexShrink: 0, fontSize: 20, lineHeight: 1.6 }}>•</span>
                  <p style={{ fontSize: 'clamp(20px, 1.4vw, 18px)', lineHeight: 1.8, color: 'var(--text)' }}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Nilai-nilai Perusahaan */}
      <section style={{ background: 'var(--bg-dark)', overflow: 'hidden', paddingBottom: 24 }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 800, color: '#fff', whiteSpace: 'nowrap' }}>
              {t('nilai.title')}
            </h2>
            <div style={{ flex: 1, height: 2, background: 'var(--accent)' }} />
          </div>
        </div>
        <InfiniteCarousel items={nilaiItems} speed={15} direction="left" darkBg={true} />
      </section>

      {/* Falsafah Perusahaan */}
      <section style={{ background: '#f9f7f2', overflow: 'hidden', paddingBottom: 24 }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
            <div style={{ flex: 1, height: 2, background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 800, color: 'var(--text)', whiteSpace: 'nowrap' }}>
              {t('falsafah.title')}
            </h2>
          </div>
        </div>
        <InfiniteCarousel items={falsafahItems} speed={15} direction="right" darkBg={false} />
      </section>
    </div>
  );
}