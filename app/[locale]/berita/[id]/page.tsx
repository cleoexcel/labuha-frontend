import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { newsService } from '@/services';
import { notFound } from 'next/navigation';

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  let news;
  try {
    const res = await newsService.getById(id);
    news = res.data;
  } catch {
    notFound();
  }

  if (!news) notFound();

  const title = locale === 'en' ? (news.title_en || news.title) : news.title;
  const content = locale === 'en' ? (news.content_en || news.content) : news.content;

  const publishedDate = new Date(news.published_at);
  const dateStr = publishedDate.toLocaleDateString(
    locale === 'en' ? 'en-GB' : 'id-ID',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );
  const timeStr = publishedDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 56, background: '#fff' }}>
        <article style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: 'clamp(24px, 4vw, 48px) clamp(16px, 4vw, 48px)',
        }}>

          {/* Date & Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
              <span style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', color: '#aaa' }}>{dateStr}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', color: '#aaa' }}>{timeStr}</span>
            </div>
          </div>

          {/* Photo — full width */}
          {news.photo_url && (
            <div style={{ overflow: 'hidden', marginBottom: 40 }}>
              <img
                src={news.photo_url}
                alt={title}
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
            </div>
          )}

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(22px, 3vw, 36px)',
            fontWeight: 800,
            lineHeight: 1.4,
            color: 'var(--text)',
            marginBottom: 40,
            textAlign: 'center',
            maxWidth: 860,
            margin: '0 auto 40px',
          }}>
            {title}
          </h1>

          {/* Content */}
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            {content.split('\n').map((paragraph, i) =>
              paragraph.trim() ? (
                <p key={i} style={{
                  fontSize: 'clamp(14px, 1.4vw, 18px)',
                  lineHeight: 1.9,
                  color: 'var(--text)',
                  textAlign: 'justify',
                  marginBottom: 28,
                }}>
                  {paragraph}
                </p>
              ) : null
            )}
          </div>

        </article>
      </main>
      <Footer />
    </>
  );
}