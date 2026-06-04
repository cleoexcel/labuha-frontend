import { getTranslations } from 'next-intl/server';
import { productService } from '@/services';
import type { Product } from '@/types';
import GradientButton from '@/components/ui/GradientButton';
import CountUp from '@/components/ui/CountUp';

export default async function TentangSection({ locale }: { locale: string }) {
  const t = await getTranslations('tentang');

  let products: Product[] = [];
  try {
    const res = await productService.getFeatured();
    products = res.data || [];
  } catch {
    products = [];
  }

  return (
    <section style={{ padding: '48px 0 0', background: '#fff' }}>
      <div className="container">

        {/* Logo kiri + Teks kanan */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(24px, 5vw, 64px)',
          alignItems: 'center',
          marginBottom: 48,
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="/images/logo-labuha.png"
              alt="PT Labuha Inter Nusa"
              style={{ width: '100%', maxWidth: 420, objectFit: 'contain' }}
            />
          </div>

          {/* Teks */}
          <div>
            <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
              {t('title')}
            </h2>
            <div style={{ width: 80, height: 3, background: 'var(--accent)', borderRadius: 2, marginBottom: 20 }} />
            <p style={{ fontSize: 'clamp(13px, 1.4vw, 16px)', lineHeight: 1.9, color: 'var(--text-muted)', textAlign: 'justify', marginBottom: 28 }}>
              {t('description')}
            </p>
            <GradientButton href={`/${locale}/tentang`}>
              {t('cta')}
            </GradientButton>
          </div>
        </div>

        {/* 3 Card Produk Featured */}
        {products.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(products.length, 3)}, 1fr)`,
            gap: 'clamp(8px, 1.5vw, 16px)',
          }}>
            {products.map(product => (
              <div key={product.id} style={{
                background: 'var(--bg-dark)',
                borderRadius: 12,
                padding: 'clamp(32px, 5vw, 56px) 20px',
                textAlign: 'center',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                minHeight: 'clamp(200px, 22vw, 320px)',
              }}>
                <span style={{
                  fontSize: 'clamp(56px, 9vw, 100px)',
                  fontWeight: 900, color: '#fff',
                  lineHeight: 1, display: 'block', marginBottom: 12,
                }}>
                  <CountUp target={product.quantity} />
                </span>
                <span style={{
                  fontSize: 'clamp(14px, 1.5vw, 20px)',
                  fontWeight: 700, color: 'var(--accent)',
                  lineHeight: 1.4, display: 'block',
                }}>
                  {product.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}