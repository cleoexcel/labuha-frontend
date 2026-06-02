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

  // Pisahkan featured (besar) dan sisanya (kecil)
  const featured = products.filter(p => p.is_featured).slice(0, 3);
  const rest = products.filter(p => !p.is_featured);

  return (
    <section style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
      <div className="container">
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(16px, 3vw, 40px)', marginBottom: 8, flexWrap: 'wrap' }}>
            <img src="/images/bisnis/produk-icon-1.png" alt="" style={{ width: 'clamp(48px, 7vw, 90px)', height: 'clamp(48px, 7vw, 90px)', objectFit: 'contain' }} />
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800 }}>
                {t('jumlahProduk')}
            </h2>
            <img src="/images/bisnis/produk-icon-2.png" alt="" style={{ width: 'clamp(48px, 7vw, 90px)', height: 'clamp(48px, 7vw, 90px)', objectFit: 'contain' }} />
            </div>
        <div style={{ width: 200, height: 3, background: 'var(--accent)', borderRadius: 2, margin: '0 auto 48px' }} />

        {/* Featured - besar, 3 kolom */}
        {featured.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(260px, 1fr))`,
            gap: 'clamp(12px, 2vw, 24px)',
            marginBottom: rest.length > 0 ? 'clamp(24px, 3vw, 40px)' : 0,
          }}>
            {featured.map(product => (
              <div key={product.id} style={{
                background: 'var(--bg-dark)',
                borderRadius: 16,
                padding: 'clamp(28px, 4vw, 44px) 20px',
                textAlign: 'center',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 10 }}>
                  <CountUp target={product.quantity} />
                </span>
                <span style={{ fontSize: 'clamp(15px, 1.8vw, 22px)', fontWeight: 700, color: 'var(--accent)', lineHeight: 1.4 }}>
                  {product.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Rest - kecil, 4 kolom */}
        {rest.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 'clamp(10px, 1.5vw, 18px)',
          }}>
            {rest.map(product => (
              <div key={product.id} style={{
                background: 'var(--bg-dark)',
                borderRadius: 12,
                padding: 'clamp(18px, 2.5vw, 28px) 16px',
                textAlign: 'center',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 6 }}>
                  <CountUp target={product.quantity} />
                </span>
                <span style={{ fontSize: 'clamp(13px, 1.4vw, 17px)', fontWeight: 700, color: 'var(--accent)', lineHeight: 1.3 }}>
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