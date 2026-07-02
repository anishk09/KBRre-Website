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
    <div className="mx-auto mb-12 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
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
    <section className="relative isolate w-full py-12">
      <h2 className="mb-8 block w-full px-6 font-serif text-3xl text-brand-blue">{title}</h2>

      {safeProperties.length === 0 ? (
        <p className="w-full px-6 text-brand-dark/70">
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
      <div className="py-12 text-center text-gray-500">
        No properties available in the current portfolio portfolio configuration.
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
