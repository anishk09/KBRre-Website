import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { siteConfig } from '@/data/site-config';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.brand.fullName,
    template: `%s | ${siteConfig.brand.fullName}`,
  },
  description: siteConfig.brand.tagline,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="flex min-h-screen w-full flex-col bg-[#fafaf8]">
        <Navbar />
        <main className="flex w-full flex-1 flex-grow flex-col bg-transparent">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
