import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { siteConfig } from '@/data/site-config';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

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
      <body className={`${poppins.variable} flex min-h-screen w-full flex-col bg-[#fafaf8]`}>
        <Navbar />
        <main className="flex w-full flex-1 flex-grow flex-col bg-transparent">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
