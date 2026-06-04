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
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Sub-menu labels (bilingual sederhana)
  const isEn = locale === 'en';
  const subMenus: Record<string, { label: string; href: string }[]> = {
    tentang: [
      { label: isEn ? 'About Us' : 'Tentang Kami', href: `/${locale}/tentang` },
      { label: 'Board of Director & Commissioner', href: `/${locale}/tentang?tab=board` },
    ],
    keberlanjutan: [
      { label: isEn ? 'Sustainability Program' : 'Program Keberlanjutan', href: `/${locale}/keberlanjutan` },
      { label: 'QHSE', href: `/${locale}/keberlanjutan?tab=mutu` },
    ],
  };

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
          {navLinks.map(link => {
            const hasDropdown = !!subMenus[link.key];
            return (
              <div
                key={link.key}
                style={{ position: 'relative' }}
                onMouseEnter={() => hasDropdown && setOpenDropdown(link.key)}
                onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
              >
                <Link href={link.href} style={{
                  padding: '6px 10px', fontSize: 13,
                  fontWeight: isActive(link.href) ? 600 : 400,
                  color: isActive(link.href) ? 'var(--accent)' : '#fff',
                  textDecoration: 'none',
                  borderBottom: isActive(link.href) ? '2px solid var(--accent)' : '2px solid transparent',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                }}>
                  {t(link.key)}
                </Link>

                {/* Dropdown */}
                {hasDropdown && openDropdown === link.key && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    minWidth: 240,
                    background: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
                    overflow: 'hidden',
                    paddingTop: 4,
                    paddingBottom: 4,
                  }}>
                    {subMenus[link.key].map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.href}
                        onClick={() => setOpenDropdown(null)}
                        style={{
                          display: 'block',
                          padding: '10px 18px',
                          fontSize: 13,
                          color: 'var(--text)',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          transition: 'background 0.15s, color 0.15s',
                        }}
                        onMouseOver={e => {
                          e.currentTarget.style.background = '#f5f0e0';
                          e.currentTarget.style.color = 'var(--accent)';
                        }}
                        onMouseOut={e => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'var(--text)';
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
          {navLinks.map(link => {
            const hasDropdown = !!subMenus[link.key];
            return (
              <div key={link.key}>
                <Link href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: '10px 0', fontSize: 14,
                    fontWeight: isActive(link.href) ? 600 : 400,
                    color: isActive(link.href) ? 'var(--accent)' : '#fff',
                    textDecoration: 'none',
                    display: 'block',
                    borderBottom: hasDropdown ? 'none' : '1px solid #333',
                  }}>
                  {t(link.key)}
                </Link>
                {/* Sub-menu mobile */}
                {hasDropdown && (
                  <div style={{ paddingLeft: 16, paddingBottom: 8, borderBottom: '1px solid #333' }}>
                    {subMenus[link.key].map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          padding: '8px 0', fontSize: 13,
                          color: '#bbb', textDecoration: 'none', display: 'block',
                        }}
                      >
                        - {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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