'use client';

interface CarouselItem {
  id: string;
  label: string;
  sub: string;
  image: string;
}

interface InfiniteCarouselProps {
  items: CarouselItem[];
  speed?: number;
  direction?: 'left' | 'right';
  darkBg?: boolean;
}

export default function InfiniteCarousel({
  items,
  speed = 20,
  direction = 'left',
  darkBg = false,
}: InfiniteCarouselProps) {
  const ITEM_WIDTH = 200;

  // Duplicate banyak kali supaya seamless di semua ukuran layar
  const repeated = [...items, ...items, ...items, ...items, ...items, ...items];
  const singleSetWidth = items.length * ITEM_WIDTH;

  const animName = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <>
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${singleSetWidth}px); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-${singleSetWidth}px); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: `${animName} ${speed}s linear infinite`,
          }}
        >
          {repeated.map((item, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: ITEM_WIDTH,
                textAlign: 'center',
                padding: '24px 12px 32px',
              }}
            >
              <img
                src={item.image}
                alt={item.label}
                style={{
                  width: 80, height: 80,
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto 16px',
                }}
              />
              <p style={{
                fontSize: 14, fontWeight: 600,
                color: darkBg ? '#fff' : 'var(--text)',
                marginBottom: 4, lineHeight: 1.4,
              }}>
                {item.label}
              </p>
              <p style={{
                fontSize: 12, color: 'var(--accent)',
                fontStyle: 'italic', lineHeight: 1.4,
              }}>
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}