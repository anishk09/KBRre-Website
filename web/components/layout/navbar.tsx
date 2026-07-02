'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { siteConfig } from '@/data/site-config';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full overflow-visible border-b border-brand-blue/10 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-8 overflow-visible px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group relative block h-16 w-56 shrink-0 overflow-visible bg-transparent"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src={siteConfig.brand.logo}
            alt={`${siteConfig.brand.fullName} logo`}
            fill
            sizes="224px"
            className="origin-left -ml-6 scale-[2.5] object-contain object-left transition-opacity group-hover:opacity-90"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-sm px-4 py-2 text-sm font-medium uppercase tracking-luxury transition-colors duration-200',
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
          className="inline-flex items-center justify-center rounded-sm p-2 text-brand-blue transition-colors hover:bg-brand-blue/5 hover:text-brand-gold md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-brand-blue/10 bg-white/95 px-4 py-4 backdrop-blur-md md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-1">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'block rounded-sm px-3 py-2.5 text-sm font-medium uppercase tracking-luxury transition-colors',
                    isActive(link.href)
                      ? 'bg-brand-blue/5 text-brand-gold'
                      : 'text-brand-blue hover:bg-brand-blue/5 hover:text-brand-gold'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact#contact-form"
                className="btn-primary w-full"
                onClick={() => setMobileOpen(false)}
              >
                Get in Touch
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
