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

  return (
    <article className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
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

      <div className="mt-6 flex flex-wrap gap-6 text-sm">
        {property.price > 0 && (
          <p>
            <span className="font-medium text-brand-blue">Asking Price:</span>{' '}
            ${property.price.toLocaleString()}
          </p>
        )}
        {property.sqFt > 0 && (
          <p>
            <span className="font-medium text-brand-blue">Building Size:</span>{' '}
            {property.sqFt.toLocaleString()} sq ft
          </p>
        )}
        {property.beds > 0 && (
          <p>
            <span className="font-medium text-brand-blue">Bedrooms:</span> {property.beds}
          </p>
        )}
        {property.baths > 0 && (
          <p>
            <span className="font-medium text-brand-blue">Bathrooms:</span> {property.baths}
          </p>
        )}
        {property.status && (
          <p>
            <span className="font-medium text-brand-blue">Availability:</span> {property.status}
          </p>
        )}
      </div>

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
    </article>
  );
}
