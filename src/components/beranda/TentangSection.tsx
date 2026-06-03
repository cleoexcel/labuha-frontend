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
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>
          {t('title')}
        </h2>
        <div style={{ width: 150, height: 3, background: 'var(--accent)', borderRadius: 2, margin: '0 auto 16px' }} />
        <p style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', lineHeight: 1.9, color: 'var(--text-muted)', maxWidth: 1000, margin: '0 auto 28px' }}>
          {t('description')}
        </p>

        <div style={{ marginBottom: 36 }}>
          <GradientButton href={`/${locale}/tentang`}>
            {t('cta')}
          </GradientButton>
        </div>

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