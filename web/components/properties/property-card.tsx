import Image from 'next/image';
import Link from 'next/link';

import { buildPropertyInquiryUrl } from '@/lib/contact-url';
import type { Property } from '@/types/property';

type PropertyCardProps = {
  property: Property;
  locationFields?: 'city-state' | 'full-address';
};

function PropertyImagePlaceholder({ title }: { title: string }) {
  return (
    <div
      className="flex aspect-[4/3] w-full flex-col items-center justify-center bg-gradient-to-br from-brand-dark/5 via-brand-blue/5 to-brand-gold/10 px-6 text-center"
      aria-hidden="true"
    >
      <div className="rounded-sm border border-brand-blue/15 bg-white/70 px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-luxury text-brand-blue/70">
          Property Image
        </p>
        <p className="mt-1 font-serif text-sm text-brand-dark/60">{title}</p>
      </div>
    </div>
  );
}

function MetadataChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-brand-blue/10 bg-brand-dark/[0.03] px-2.5 py-1 text-xs text-brand-dark/75">
      <span className="font-medium uppercase tracking-wide text-brand-blue/70">{label}</span>
      <span className="ml-1.5">{value}</span>
    </span>
  );
}

export function PropertyCard({
  property,
  locationFields = 'city-state',
}: PropertyCardProps) {
  if (!property?.id) {
    return null;
  }

  const title = property.title?.trim() || 'Untitled Property';
  const location =
    locationFields === 'full-address'
      ? [property.street, property.city, property.state].filter(Boolean).join(', ')
      : [property.city, property.state].filter(Boolean).join(', ');
  const inquiryUrl = buildPropertyInquiryUrl(property);
  const imageUrl = property.imageUrl?.trim() ?? '';
  const status = property.status?.trim() ?? '';

  const metadataChips = [
    (property.sqFt ?? 0) > 0
      ? { label: 'Sq Ft', value: (property.sqFt ?? 0).toLocaleString() }
      : null,
    (property.beds ?? 0) > 0 ? { label: 'Beds', value: String(property.beds) } : null,
    (property.baths ?? 0) > 0 ? { label: 'Baths', value: String(property.baths) } : null,
  ].filter((chip): chip is { label: string; value: string } => chip !== null);

  return (
    <article className="card-premium flex h-full flex-col overflow-hidden">
      <Link
        href={`/properties/${property.id}`}
        className="group block"
        aria-label={`View listing for ${title}`}
      >
        {imageUrl ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-dark/5">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          </div>
        ) : (
          <PropertyImagePlaceholder title={title} />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {property.type && (
            <p className="text-xs uppercase tracking-luxury text-brand-gold">{property.type}</p>
          )}
          {status && (
            <span className="rounded-sm bg-brand-blue/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-luxury text-brand-blue">
              {status}
            </span>
          )}
        </div>

        <h2 className="mt-2 font-serif text-xl leading-snug tracking-tight text-brand-blue">
          <Link
            href={`/properties/${property.id}`}
            className="transition-colors duration-300 hover:text-brand-gold"
          >
            {title}
          </Link>
        </h2>

        {location && (
          <p className="mt-2 text-sm leading-relaxed text-brand-dark/70">{location}</p>
        )}

        {metadataChips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {metadataChips.map((chip) => (
              <MetadataChip key={chip.label} label={chip.label} value={chip.value} />
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Link href={inquiryUrl} className="btn-primary w-full text-center">
            Request Details
          </Link>
          <Link
            href={`/properties/${property.id}`}
            className="text-center text-sm font-medium uppercase tracking-luxury text-brand-blue transition-colors duration-300 hover:text-brand-gold"
          >
            View Listing
          </Link>
        </div>
      </div>
    </article>
  );
}
