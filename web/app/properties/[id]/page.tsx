import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { MobileCtaBar } from '@/components/layout/mobile-cta-bar';
import { fetchListingById } from '@/lib/fetch-listings';
import { buildPropertyInquiryUrl } from '@/lib/contact-url';

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await fetchListingById(id);

  if (!property) notFound();

  const address = [property.street, property.city, property.state, property.zip]
    .filter(Boolean)
    .join(', ');

  const inquiryUrl = buildPropertyInquiryUrl(property);

  const metrics = [
    property.price > 0
      ? { label: 'Asking Price', value: `$${property.price.toLocaleString()}` }
      : null,
    property.sqFt > 0
      ? { label: 'Building Size', value: `${property.sqFt.toLocaleString()} sq ft` }
      : null,
    property.beds > 0 ? { label: 'Bedrooms', value: String(property.beds) } : null,
    property.baths > 0 ? { label: 'Bathrooms', value: String(property.baths) } : null,
    property.status ? { label: 'Availability', value: property.status } : null,
  ].filter((metric): metric is { label: string; value: string } => metric !== null);

  return (
    <div className="relative w-full max-w-full overflow-x-hidden">
    <article className="mx-auto max-w-4xl px-4 py-16 pb-32 sm:px-6 md:py-24 lg:px-8">
      {property.imageUrl && (
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-sm border border-brand-dark/[0.06]">
          <div className="absolute inset-0 animate-pulse bg-neutral-100" aria-hidden="true" />
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
            unoptimized
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
            aria-hidden="true"
          />
        </div>
      )}

      <p className="heading-overline">{property.type}</p>
      <h1 className="heading-display mt-3">{property.title}</h1>
      {address && <p className="mt-4 text-brand-dark/70">{address}</p>}

      {metrics.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-2 text-sm md:flex md:flex-wrap md:gap-6">
          {metrics.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-sm border border-brand-blue/10 bg-white/70 px-3 py-2.5 md:rounded-none md:border-0 md:bg-transparent md:p-0"
            >
              <p className="text-[10px] font-semibold uppercase tracking-luxury text-brand-gold md:hidden">
                {label}
              </p>
              <p className="mt-0.5 font-medium tabular-nums text-brand-dark md:mt-0 md:font-normal">
                <span className="hidden font-medium text-brand-blue md:inline">{label}: </span>
                {value}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="section-navy mt-12 rounded-sm p-8 md:mt-16 md:p-12">
        <div className="divider-gold" />
        <p className="mt-5 text-xs font-semibold uppercase tracking-luxury text-brand-gold">
          Advisory Inquiry
        </p>
        <h2 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Interested in this asset?
        </h2>
        <p className="mt-3 max-w-xl leading-relaxed text-white/75">
          Our team provides confidential guidance on due diligence, market positioning,
          and next steps. Submit an inquiry to connect with an advisor.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={inquiryUrl} className="btn-gold">
            Inquire About Asset
          </Link>
          <Link href="/contact#contact-form" className="btn-ghost-light">
            General Inquiry
          </Link>
        </div>
      </div>

    </article>

    <MobileCtaBar href={inquiryUrl} label="Inquire About Asset" />
    </div>
  );
}
