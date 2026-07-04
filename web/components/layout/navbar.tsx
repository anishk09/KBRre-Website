'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { siteConfig } from '@/data/site-config';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Lock body scroll while the full-screen mobile overlay is open.
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Force-close the overlay if the viewport grows past the desktop breakpoint,
  // so a stale open state can never leak over desktop content.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileOpen(false);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full overflow-visible border-b border-brand-blue/10 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-8 overflow-visible px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group relative block h-14 w-52 shrink-0 overflow-visible bg-transparent"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src={siteConfig.brand.logo}
            alt={`${siteConfig.brand.fullName} logo`}
            fill
            sizes="208px"
            className="origin-left -ml-5 scale-[2.5] object-contain object-left transition-opacity group-hover:opacity-90"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-sm px-4 py-2 text-sm font-medium uppercase tracking-luxury transition-colors duration-300',
                isActive(link.href)
                  ? 'text-brand-gold'
                  : 'text-brand-blue hover:text-brand-gold'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact#contact-form" className="btn-primary">
            Get in Touch
          </Link>
        </div>

        <button
          type="button"
          className="relative z-50 inline-flex items-center justify-center rounded-sm p-2 text-brand-blue transition-colors duration-300 hover:bg-brand-blue/5 hover:text-brand-gold md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Full-screen premium mobile overlay */}
      <div
        id="mobile-nav"
        aria-label="Mobile navigation"
        className={cn(
          'fixed inset-0 z-[60] flex h-screen w-full flex-col bg-white/95 backdrop-blur-md transition-[opacity,visibility] duration-300 md:hidden',
          mobileOpen
            ? 'visible pointer-events-auto opacity-100'
            : 'invisible pointer-events-none opacity-0'
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="relative z-50 flex h-24 items-center justify-between px-4 py-6">
          <Link
            href="/"
            className="relative block h-12 w-44 overflow-visible"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src={siteConfig.brand.logo}
              alt={`${siteConfig.brand.fullName} logo`}
              fill
              sizes="176px"
              className="origin-left -ml-3 scale-[2.2] object-contain object-left"
            />
          </Link>
          <button
            type="button"
            className="relative z-50 inline-flex items-center justify-center rounded-sm p-2 text-brand-blue transition-colors duration-300 hover:text-brand-gold"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center px-4" aria-label="Mobile navigation links">
          <ul className="space-y-2">
            {siteConfig.navLinks.map((link, index) => (
              <li
                key={link.href}
                className={cn(
                  'transition-all duration-500',
                  mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                )}
                style={{ transitionDelay: mobileOpen ? `${100 + index * 60}ms` : '0ms' }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'block border-b border-brand-blue/10 py-4 font-sans text-lg font-semibold uppercase tracking-luxury transition-colors duration-300',
                    isActive(link.href)
                      ? 'text-brand-gold'
                      : 'text-brand-blue hover:text-brand-gold'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="mr-4 align-middle text-xs font-sans font-semibold uppercase tracking-luxury text-brand-gold/70">
                    0{index + 1}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={cn(
            'px-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] transition-all duration-500',
            mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
          style={{ transitionDelay: mobileOpen ? '340ms' : '0ms' }}
        >
          <Link
            href="/contact#contact-form"
            className="btn-primary w-full"
            onClick={() => setMobileOpen(false)}
          >
            Get in Touch
          </Link>
          <p className="mt-4 text-center text-xs font-semibold uppercase tracking-luxury tabular-nums text-brand-dark/50">
            {siteConfig.contact.phoneLabel} · {siteConfig.contact.phone}
          </p>
        </div>
      </div>
    </header>
  );
}
