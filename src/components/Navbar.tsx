'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const t = useTranslations('nav');
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;
  const otherLocale = locale === 'id' ? 'en' : 'id';
  const [menuOpen, setMenuOpen] = useState(false);

  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navLinks = [
    { key: 'beranda', href: `/${locale}` },
    { key: 'tentang', href: `/${locale}/tentang` },
    { key: 'bisnis', href: `/${locale}/bisnis` },
    { key: 'keberlanjutan', href: `/${locale}/keberlanjutan` },
    { key: 'berita', href: `/${locale}/berita` },
    { key: 'karir', href: `/${locale}/karir` },
    { key: 'kontak', href: `/${locale}/kontak` },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: '#362B09', borderBottom: '1px solid #333',
        height: 56, display: 'flex', alignItems: 'center',
        padding: '0 clamp(16px, 4vw, 60px)', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href={`/${locale}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
          <img src="/images/logo-labuha.png" alt="Labuha" style={{ height: 36, objectFit: 'contain', display: 'block' }} />
        </Link>

        {/* Desktop nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center' }}
          className="desktop-nav">
          {navLinks.map(link => (
            <Link key={link.key} href={link.href} style={{
              padding: '6px 10px', fontSize: 13,
              fontWeight: isActive(link.href) ? 600 : 400,
              color: isActive(link.href) ? 'var(--accent)' : '#fff',
              textDecoration: 'none',
              borderBottom: isActive(link.href) ? '2px solid var(--accent)' : '2px solid transparent',
              whiteSpace: 'nowrap',
            }}>
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* Language switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, flexShrink: 0 }}>
          <Link
            href={pathname.replace(`/${locale}`, '/id')}
            style={{ color: locale === 'id' ? 'var(--accent)' : '#aaa', textDecoration: 'none', fontWeight: locale === 'id' ? 700 : 400 }}
          >
            ID
          </Link>
          <span style={{ color: '#ccc' }}>|</span>
          <Link
            href={pathname.replace(`/${locale}`, '/en')}
            style={{ color: locale === 'en' ? 'var(--accent)' : '#aaa', textDecoration: 'none', fontWeight: locale === 'en' ? 700 : 400 }}
          >
            EN
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="mobile-menu-btn"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, marginLeft: 8 }}
          aria-label="Menu"
        >
          <div style={{ width: 22, height: 2, background: '#fff', marginBottom: 5, borderRadius: 1 }} />
          <div style={{ width: 22, height: 2, background: '#fff', marginBottom: 5, borderRadius: 1 }} />
          <div style={{ width: 22, height: 2, background: '#fff', borderRadius: 1 }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 56, left: 0, right: 0, zIndex: 99,
          background: '#1a1a1a', borderBottom: '1px solid #333',
          padding: '16px clamp(16px, 4vw, 60px)',
          display: 'flex', flexDirection: 'column', gap: 4,
        }} className="mobile-menu">
          {navLinks.map(link => (
            <Link key={link.key} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '10px 0', fontSize: 14,
                fontWeight: isActive(link.href) ? 600 : 400,
                color: isActive(link.href) ? 'var(--accent)' : '#fff',
                textDecoration: 'none', borderBottom: '1px solid #333',
              }}>
              {t(link.key)}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}