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
    console.log('Server Page Portfolio Fetch Check:', portfolios);

    commercialSlides = portfolios?.commercial || [];
    if (commercialSlides.length === 0) {
      console.log('Warning: commercial key empty, merging flat fallback listings');
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
    <div className="flex flex-1 flex-col">
      <HeroSlider slides={commercialSlides} />

      {featuredListings.length > 0 && (
        <section className="border-t border-brand-blue/10 bg-brand-dark/5 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="heading-overline">Featured Listings</p>
            <h2 className="heading-display mt-3 text-3xl">Curated Portfolio</h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredListings.map((property) => (
                <li key={property.id}>
                  <PropertyCard property={property} />
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/properties" className="btn-outline">
                View Full Portfolio
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
