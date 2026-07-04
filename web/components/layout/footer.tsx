import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/data/site-config';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="shrink-0 border-t border-brand-blue/10 bg-brand-dark text-white">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_auto_auto] md:items-start md:gap-10">
          <div>
            <Link href="/" className="relative -ml-4 block h-20 w-64 overflow-visible">
              <Image
                src="/KBR1.png"
                alt={`${siteConfig.brand.fullName} logo`}
                fill
                className="origin-left scale-[1.65] object-contain object-left"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Managing a premier portfolio of private commercial and residential real
              estate assets with absolute integrity and long-term strategic vision.
            </p>

            <div className="mt-5 space-y-2.5 text-sm text-white/65">
              <div>
                <p className="text-xs font-semibold uppercase tracking-luxury text-brand-gold">
                  {siteConfig.contact.phoneLabel}
                </p>
                <p className="mt-1">
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`}
                    className="text-white/65 transition-colors duration-300 hover:text-brand-gold focus-visible:ring-offset-brand-dark"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </p>
              </div>
              <p>{siteConfig.contact.address}</p>
            </div>
          </div>

          {siteConfig.footerSections.map((section) => (
            <div key={section.title} className="min-w-[9rem]">
              <p className="text-xs font-semibold uppercase tracking-luxury text-brand-gold">
                {section.title}
              </p>
              <ul className="mt-3 space-y-2.5">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors duration-300 hover:text-brand-gold focus-visible:ring-offset-brand-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-gold mt-8" />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">
            &copy; {year} {siteConfig.brand.fullName}. All rights reserved.
          </p>

          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {siteConfig.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors duration-300 hover:text-brand-gold focus-visible:ring-offset-brand-dark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
