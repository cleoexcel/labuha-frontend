import { getTranslations } from 'next-intl/server';
import { boardService } from '@/services';
import type { BoardOfDirector, BoardOfCommissioner } from '@/types';

export default async function BoardContent({ locale }: { locale: string }) {
  const t = await getTranslations('tentangPage.board');

  let directors: BoardOfDirector[] = [];
  let commissioners: BoardOfCommissioner[] = [];

  try {
    const [dirRes, comRes] = await Promise.all([
      boardService.getDirectors(),
      boardService.getCommissioners(),
    ]);
    directors = dirRes.data || [];
    commissioners = comRes.data || [];
  } catch {
    directors = [];
    commissioners = [];
  }

  const PersonCard = ({ name, position, photo_url }: { name: string; position: string; photo_url: string }) => (
    <div>
      {/* Photo */}
      <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#e0e0e0' }}>
        {photo_url ? (
          <img
            src={photo_url}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#d0d0d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, color: '#aaa' }}>
            👤
          </div>
        )}
      </div>

      {/* Name & Position */}
      <div style={{
        background: '#f0f0f0',
        padding: '12px 16px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
          {name}
        </p>
        <p style={{ fontSize: 'clamp(11px, 0.9vw, 13px)', color: 'var(--text-muted)' }}>
          {position}
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '48px 0 64px' }}>
      <div className="container">

        {/* Board of Directors */}
        {directors.length > 0 && (
          <div style={{ marginBottom: 64 }}>
            {/* Title rata kiri */}
            <div style={{ marginBottom: 8 }}>
              <h2 style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 800, color: 'var(--text)' }}>
                {t('director')}
              </h2>
              <div style={{ width: 80, height: 3, background: 'var(--accent)', borderRadius: 2, marginTop: 6 }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(12px, 2vw, 24px)',
              marginTop: 32,
            }}>
              {directors.map(d => (
                <PersonCard
                  key={d.id}
                  name={d.name}
                  position={locale === 'en' ? (d.position_en || d.position) : d.position}
                  photo_url={d.photo_url}
                />
              ))}
            </div>
          </div>
        )}

        {/* Board of Commissioners */}
        {commissioners.length > 0 && (
          <div>
            {/* Title rata kanan */}
            <div style={{ marginBottom: 8, textAlign: 'right' }}>
              <h2 style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 800, color: 'var(--text)' }}>
                {t('commissioner')}
              </h2>
              <div style={{ width: 80, height: 3, background: 'var(--accent)', borderRadius: 2, marginTop: 6, marginLeft: 'auto' }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(12px, 2vw, 24px)',
              marginTop: 32,
            }}>
              {commissioners.map(c => (
                <PersonCard
                  key={c.id}
                  name={c.name}
                  position={locale === 'en' ? (c.position_en || c.position) : c.position}
                  photo_url={c.photo_url}
                />
              ))}
            </div>
          </div>
        )}

        {directors.length === 0 && commissioners.length === 0 && (
          <p style={{ textAlign: 'center', color: '#aaa', padding: '40px 0' }}>Data belum tersedia.</p>
        )}
      </div>
    </div>
  );
}