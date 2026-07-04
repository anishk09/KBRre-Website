import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    <article className="mx-auto max-w-4xl px-4 py-16 pb-32 sm:px-6 md:py-24 lg:px-8">
      {property.imageUrl && (
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-sm bg-brand-dark/5">
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
            unoptimized
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
              <p className="mt-0.5 font-medium text-brand-dark md:mt-0 md:font-normal">
                <span className="hidden font-medium text-brand-blue md:inline">{label}: </span>
                {value}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 rounded-sm border border-brand-blue/10 bg-brand-dark/5 p-8">
        <p className="text-xs font-semibold uppercase tracking-luxury text-brand-gold">
          Advisory Inquiry
        </p>
        <h2 className="mt-3 font-serif text-2xl text-brand-blue">
          Interested in this asset?
        </h2>
        <p className="mt-3 max-w-xl text-brand-dark/70">
          Our team provides confidential guidance on due diligence, market positioning,
          and next steps. Submit an inquiry to connect with an advisor.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href={inquiryUrl} className="btn-primary">
            Inquire About Asset
          </Link>
          <Link href="/contact#contact-form" className="btn-outline">
            General Inquiry
          </Link>
        </div>
      </div>

      {/* Mobile-only floating action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-blue/10 bg-white/85 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-8px_30px_rgb(0_0_0/0.08)] backdrop-blur-lg md:hidden">
        <Link href={inquiryUrl} className="btn-primary w-full">
          Inquire About Asset
        </Link>
      </div>
    </article>
  );
}
