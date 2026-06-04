import { getTranslations } from 'next-intl/server';
import { productService } from '@/services';
import type { Product } from '@/types';
import CountUp from '@/components/ui/CountUp';

export default async function JumlahProduk() {
  const t = await getTranslations('bisnisPage');

  let products: Product[] = [];
  try {
    const res = await productService.getAll();
    products = res.data || [];
  } catch {
    products = [];
  }

  if (products.length === 0) return null;

  const featured = products.filter(p => p.is_featured).slice(0, 3);
  const rest = products.filter(p => !p.is_featured);

  return (
    <section style={{ padding: 'clamp(20px, 3vw, 32px) 0 clamp(48px, 6vw, 80px)' }}>
      <div className="container">
        {/* Title dengan logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(16px, 3vw, 40px)', marginBottom: 8, flexWrap: 'wrap' }}>
          <img src="/images/bisnis/produk-icon-1.png" alt="" style={{ width: 'clamp(48px, 7vw, 90px)', height: 'clamp(48px, 7vw, 90px)', objectFit: 'contain' }} />
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800 }}>
            {t('jumlahProduk')}
          </h2>
          <img src="/images/bisnis/produk-icon-2.png" alt="" style={{ width: 'clamp(48px, 7vw, 90px)', height: 'clamp(48px, 7vw, 90px)', objectFit: 'contain' }} />
        </div>
        <div style={{ width: 160, height: 5, background: 'var(--accent)', borderRadius: 2, margin: '0 auto 48px' }} />

        {/* Featured - background gambar redup */}
        {featured.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(260px, 1fr))`,
            gap: 'clamp(12px, 2vw, 24px)',
            marginBottom: rest.length > 0 ? 'clamp(32px, 4vw, 56px)' : 0,
          }}>
            {featured.map((product, i) => (
              <div key={product.id} style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                textAlign: 'center',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                minHeight: 'clamp(180px, 20vw, 280px)',
                padding: 'clamp(28px, 4vw, 44px) 20px',
                background: 'var(--bg-dark)',
              }}>
                <img
                  src={`/images/produk/featured-${i + 1}.png`}
                  alt=""
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,20,20,0.55)' }} />

                <span style={{ position: 'relative', fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 10 }}>
                  <CountUp target={product.quantity} />
                </span>
                <span style={{ position: 'relative', fontSize: 'clamp(15px, 1.8vw, 22px)', fontWeight: 700, color: 'var(--accent)', lineHeight: 1.4 }}>
                  {product.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Rest - tanpa box: angka hitam + nama gold di samping */}
        {rest.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 'clamp(20px, 3vw, 36px)',
          }}>
            {rest.map(product => (
              <div key={product.id} style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                gap: 10,
              }}>
                <span style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, color: 'var(--text)', lineHeight: 1 }}>
                  <CountUp target={product.quantity} />
                </span>
                <span style={{
                  fontSize: 'clamp(15px, 1.6vw, 22px)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  background: 'linear-gradient(to right, #1a1a1a, #C29B24)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
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