import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/data/site-config';

function ColumnHeader({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
      {children}
    </p>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="shrink-0 border-t border-brand-gold/20 bg-brand-blue-dark text-white">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-16">
          {/* Column 1: brand mark + overview */}
          <div>
            <Link href="/" className="relative -ml-4 block h-[4.5rem] w-60 overflow-visible">
              <Image
                src="/KBR1.png"
                alt={`${siteConfig.brand.fullName} logo`}
                fill
                sizes="240px"
                className="origin-left scale-[1.75] object-contain object-left"
              />
            </Link>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-slate-300/90">
              Managing a premier portfolio of private commercial and residential real
              estate assets with absolute integrity and long-term strategic vision.
            </p>
          </div>

          {/* Column 2: direct contact */}
          <div>
            <ColumnHeader>{siteConfig.contact.phoneLabel}</ColumnHeader>
            <div className="mt-4 space-y-3 text-[15px] leading-relaxed">
              <p className="text-slate-300">
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`}
                  className="tabular-nums text-slate-300 transition-colors duration-300 hover:text-brand-gold focus-visible:ring-offset-brand-blue-dark"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="text-slate-300">{siteConfig.contact.address}</p>
            </div>
          </div>

          {/* Columns 3 and 4: navigation sections */}
          {siteConfig.footerSections.map((section) => (
            <div key={section.title}>
              <ColumnHeader>{section.title}</ColumnHeader>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-slate-300 transition-colors duration-300 hover:text-brand-gold focus-visible:ring-offset-brand-blue-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sub-footer: full-width hairline boundary + legal row */}
        <div className="mt-16 border-t border-slate-800/60 pt-8">
          <div className="flex flex-col items-center justify-between gap-3 font-sans text-[13px] text-slate-400 md:flex-row">
            <p className="text-slate-400">
              &copy; {year} {siteConfig.brand.fullName}. All rights reserved.
            </p>

            <nav aria-label="Legal navigation">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {siteConfig.legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-slate-400 transition-colors duration-300 hover:text-brand-gold focus-visible:ring-offset-brand-blue-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
