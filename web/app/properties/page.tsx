import { InteriorPageShell } from '@/components/layout/interior-page-shell';
import { PropertyPortfolioGrid } from '@/components/properties/property-portfolio-grid';
import { fetchPortfolios } from '@/lib/fetch-listings';
import type { PropertyPortfolios } from '@/types/property';

const EMPTY_PORTFOLIOS: PropertyPortfolios = {
  commercial: [],
  residential: [],
};

type PropertiesPageContentProps = {
  listings: PropertyPortfolios;
};

function PropertiesPageContent({ listings }: PropertiesPageContentProps) {
  return (
    <InteriorPageShell>
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="heading-overline">Portfolio</p>
      <h1 className="heading-display mt-3">Properties</h1>
      <p className="mt-4 max-w-2xl text-brand-dark/70">
        Browse our current offerings. For confidential details, pricing guidance, or
        private showings, submit an inquiry through our advisory team.
      </p>

      <PropertyPortfolioGrid listings={listings} />
      </section>
    </InteriorPageShell>
  );
}

export default async function PropertiesPage() {
  try {
    const portfolios = await fetchPortfolios();

    return <PropertiesPageContent listings={portfolios} />;
  } catch (error) {
    console.error('Server-side portfolio fetch failed:', error);

    return <PropertiesPageContent listings={EMPTY_PORTFOLIOS} />;
  }
}
