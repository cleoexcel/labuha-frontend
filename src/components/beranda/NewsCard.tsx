'use client';

import Link from 'next/link';

interface NewsCardProps {
  id: string;
  title: string;
  photo_url: string;
  date: string;
  cta: string;
  locale: string;
}

export default function NewsCard({ id, title, photo_url, date, cta, locale }: NewsCardProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Photo */}
      <div style={{ overflow: 'hidden', aspectRatio: '16/10' }}>
        {photo_url ? (
          <img
            src={photo_url}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s', display: 'block' }}
            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>📰</div>
        )}
      </div>

      {/* Content */}
      <div style={{ paddingTop: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{
          fontSize: 'clamp(14px, 1.4vw, 16px)',
          fontWeight: 700, lineHeight: 1.5,
          color: 'var(--text)', marginBottom: 16, flex: 1,
        }}>
          {title}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{
            fontSize: 12, fontWeight: 600,
            background: 'var(--accent)', color: '#fff',
            padding: '5px 14px', borderRadius: 50, whiteSpace: 'nowrap',
          }}>
            {date}
          </span>
          <Link
            href={`/${locale}/berita/${id}`}
            style={{
              fontSize: 12, fontWeight: 500,
              padding: '5px 16px',
              border: '1.5px solid var(--text)',
              borderRadius: 50, color: 'var(--text)',
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}
          >
            {cta}
          </Link>
        </div>
      </div>
    </div>
  );
}