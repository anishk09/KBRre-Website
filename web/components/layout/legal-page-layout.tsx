import type { ReactNode } from 'react';

import { InteriorPageShell } from '@/components/layout/interior-page-shell';

type LegalPageLayoutProps = {
  overline: string;
  title: string;
  dateLabel: string;
  children: ReactNode;
};

export function LegalPageLayout({
  overline,
  title,
  dateLabel,
  children,
}: LegalPageLayoutProps) {
  return (
    <InteriorPageShell>
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <p className="heading-overline">{overline}</p>
        <h1 className="heading-display mt-3">{title}</h1>
        <p className="mt-4 text-sm text-brand-dark/60">{dateLabel}</p>

        <article className="legal-prose mt-12 max-w-3xl lg:max-w-4xl">{children}</article>
      </section>
    </InteriorPageShell>
  );
}
