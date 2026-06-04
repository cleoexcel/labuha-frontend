import { getTranslations } from 'next-intl/server';
import { certificationService } from '@/services';
import type { Certification } from '@/types';
import MutuAccordion from './MutuAccordion';
import SertifikasiSlider from './SertifikasiSlider';

export default async function MutuContent({ locale }: { locale: string }) {
  const t = await getTranslations('keberlanjutanPage');
  const accItems = t.raw('mutu.items') as { id: string; title: string; text: string }[];

  let certs: Certification[] = [];
  try {
    const res = await certificationService.getAll();
    certs = res.data || [];
  } catch {
    certs = [];
  }

  const certItems = certs.map(c => ({
    id: c.id,
    title: locale === 'en' ? (c.title_en || c.title) : c.title,
    photo_url: c.photo_url,
  }));

  return (
    <div>
      {/* Title */}
      <section style={{ padding: 'clamp(32px, 4vw, 56px) 0 32px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 800, marginBottom: 8 }}>
            {t('mutu.title')}
          </h2>
          <div style={{ width: 80, height: 3, background: 'var(--accent)', borderRadius: 2, margin: '0 auto' }} />
        </div>
      </section>

      {/* Side by side: accordion + sertifikasi */}
      <section style={{ paddingBottom: 'clamp(40px, 5vw, 72px)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'start',
          }}>
            {/* KIRI: Accordion */}
            <MutuAccordion items={accItems} />

            {/* KANAN: Sertifikasi */}
            <div>
              <h3 style={{ fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 800, textAlign: 'center', marginBottom: 2 }}>
                Sertifikasi
              </h3>
              <SertifikasiSlider items={certItems} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}