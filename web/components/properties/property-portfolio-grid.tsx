'use client';

import { PropertyCard } from '@/components/properties/property-card';
import type { Property, PropertyPortfolios } from '@/types/property';

type PortfolioData = PropertyPortfolios | Property[] | null | undefined;

type PropertyPortfolioGridProps = {
  listings?: PortfolioData;
  properties?: PortfolioData;
};

function sortByPropertyValue(properties: Property[]): Property[] {
  return [...properties].sort((a, b) => {
    const priceA = a.price || 0;
    const priceB = b.price || 0;

    if (priceA === 0) return 1;
    if (priceB === 0) return -1;

    return priceB - priceA;
  });
}

function resolvePortfolioLists(data: PortfolioData): PropertyPortfolios {
  if (Array.isArray(data)) {
    const flatList = data.filter((item): item is Property => Boolean(item?.id));

    return {
      commercial: flatList.filter((item) => item.portfolio !== 'residential'),
      residential: flatList.filter((item) => item.portfolio === 'residential'),
    };
  }

  if (data && typeof data === 'object') {
    return {
      commercial: Array.isArray(data.commercial) ? data.commercial : [],
      residential: Array.isArray(data.residential) ? data.residential : [],
    };
  }

  return { commercial: [], residential: [] };
}

function PropertyGrid({ properties }: { properties?: Property[] }) {
  const safeProperties = sortByPropertyValue(
    Array.isArray(properties) ? properties : [],
  );

  if (safeProperties.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile: horizontal swipe rail with a peek of the next card */}
      <div className="snap-carousel -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:hidden">
        {safeProperties.map((property) =>
          property?.id ? (
            <div key={property.id} className="w-[82%] flex-none snap-center">
              <PropertyCard property={property} locationFields="full-address" />
            </div>
          ) : null,
        )}
      </div>

      {/* Tablet and desktop: standard grid */}
      <div className="hidden grid-cols-1 gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {safeProperties.map((property) =>
          property?.id ? (
            <PropertyCard
              key={property.id}
              property={property}
              locationFields="full-address"
            />
          ) : null,
        )}
      </div>
    </>
  );
}

function PortfolioSection({
  title,
  properties,
  emptyLabel,
}: {
  title: string;
  properties?: Property[];
  emptyLabel: string;
}) {
  const safeProperties = Array.isArray(properties) ? properties : [];

  return (
    <section className="relative isolate w-full py-12 md:py-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-brand-blue/10 pb-5 sm:mb-8">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-brand-blue-dark sm:text-3xl">
          {title}
        </h2>
        {safeProperties.length > 0 && (
          <p className="font-serif text-xs font-semibold uppercase tracking-luxury tabular-nums text-brand-dark/50">
            {safeProperties.length} {safeProperties.length === 1 ? 'Asset' : 'Assets'}
          </p>
        )}
      </div>

      {safeProperties.length === 0 ? (
        <p className="text-brand-dark/70">
          No {emptyLabel.toLowerCase()} listings available yet.
        </p>
      ) : (
        <PropertyGrid properties={safeProperties} />
      )}
    </section>
  );
}

export function PropertyPortfolioGrid({ listings, properties }: PropertyPortfolioGridProps) {
  const data = listings ?? properties;

  const { commercial: commercialList, residential: residentialList } =
    resolvePortfolioLists(data);
  const hasAnyListings = commercialList.length > 0 || residentialList.length > 0;

  if (!hasAnyListings) {
    return (
      <div className="py-12 text-center text-brand-dark/60">
        No properties available in the current portfolio.
      </div>
    );
  }

  return (
    <div className="relative isolate w-full">
      <PortfolioSection
        title="Commercial Properties"
        properties={commercialList}
        emptyLabel="commercial"
      />
      <PortfolioSection
        title="Residential Properties"
        properties={residentialList}
        emptyLabel="residential"
      />
    </div>
  );
}
