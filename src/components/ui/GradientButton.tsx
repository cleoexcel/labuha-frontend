'use client';

import Link from 'next/link';

interface GradientButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function GradientButton({ href, children }: GradientButtonProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'inline-block' }}>
      <span style={{
        display: 'inline-block',
        padding: '2px',
        borderRadius: '50px',
        background: 'linear-gradient(to right, #1a1a1a, #C29B24)',
      }}>
        <span style={{
          display: 'block',
          padding: '8px 32px',
          borderRadius: '50px',
          background: '#fff',
          fontSize: 13,
          fontWeight: 600,
          color: '#555',
          fontFamily: 'Poppins, sans-serif',
          whiteSpace: 'nowrap',
        }}>
          {children}
        </span>
      </span>
    </Link>
  );
}