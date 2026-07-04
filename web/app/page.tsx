import Link from 'next/link';

import HeroSlider from '@/components/home/hero-slider';
import { PropertyCard } from '@/components/properties/property-card';
import {
  fetchFeaturedListings,
  fetchListings,
  fetchPortfolios,
  LISTINGS_REVALIDATE_SECONDS,
} from '@/lib/fetch-listings';
import type { Property } from '@/types/property';

export const revalidate = LISTINGS_REVALIDATE_SECONDS;

export default async function HomePage() {
  let commercialSlides: Property[] = [];
  let featuredListings: Property[] = [];

  try {
    const portfolios = await fetchPortfolios();

    commercialSlides = portfolios?.commercial || [];
    if (commercialSlides.length === 0) {
      const allListings = await fetchListings();
      commercialSlides = allListings.filter(
        (p) => p.portfolio === 'commercial' || p.type.toLowerCase() !== 'residential',
      );
    }

    featuredListings = await fetchFeaturedListings();
  } catch (error) {
    console.error('Homepage portfolio fetch failed:', error);
    commercialSlides = [];
    featuredListings = [];
  }

  return (
    <div className="relative flex w-full max-w-full flex-1 flex-col overflow-x-hidden">
      <HeroSlider slides={commercialSlides} />

      {featuredListings.length > 0 && (
        <section className="section-navy py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="divider-gold" />
            <p className="mt-6 text-xs font-semibold uppercase tracking-luxury text-brand-gold">
              Featured Listings
            </p>
            <h2 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
              Curated Portfolio
            </h2>

            {/* Mobile: horizontal swipe rail with a peek of the next card */}
            <ul className="snap-carousel -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 sm:hidden">
              {featuredListings.map((property) => (
                <li key={property.id} className="w-[84vw] shrink-0 snap-center">
                  <PropertyCard property={property} />
                </li>
              ))}
            </ul>

            {/* Tablet and desktop: standard grid */}
            <ul className="mt-10 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
              {featuredListings.map((property) => (
                <li key={property.id}>
                  <PropertyCard property={property} />
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <Link href="/properties" className="btn-gold">
                View Full Portfolio
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
