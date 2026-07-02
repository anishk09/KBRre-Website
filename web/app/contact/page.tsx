import { InquiryForm } from '@/components/contact/inquiry-form';
import { InteriorPageShell } from '@/components/layout/interior-page-shell';
import { siteConfig } from '@/data/site-config';

type ContactPageProps = {
  searchParams?: {
    property?: string;
    propertyTitle?: string;
  };
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const propertyId = searchParams?.property;
  const propertyTitle = searchParams?.propertyTitle;

  return (
    <InteriorPageShell>
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="heading-overline">Contact</p>
      <h1 className="heading-display mt-3">Get in Touch</h1>
      <p className="mt-6 max-w-2xl text-brand-dark/80">
        Connect with our advisory team for confidential guidance on acquisitions,
        dispositions, and portfolio strategy.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-luxury text-brand-gold">
              Direct Contact
            </p>
            <div className="mt-4 space-y-4 text-brand-dark/80">
              <div>
                <p className="text-xs font-semibold uppercase tracking-luxury text-brand-gold">
                  {siteConfig.contact.phoneLabel}
                </p>
                <p className="mt-1">
                  <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`}>
                    {siteConfig.contact.phone}
                  </a>
                </p>
              </div>
              <p>{siteConfig.contact.address}</p>
            </div>
          </div>
        </div>

        <div id="contact-form" className="scroll-mt-28 lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-luxury text-brand-gold">
            Inquiry Form
          </p>
          <h2 className="mt-3 font-serif text-2xl text-brand-blue">
            {propertyTitle ? 'Request Property Details' : 'Send an Inquiry'}
          </h2>
          {propertyTitle && (
            <p className="mt-3 text-sm text-brand-dark/70">
              Complete the form below and an advisor will follow up regarding{' '}
              <span className="font-medium text-brand-blue">{propertyTitle}</span>.
            </p>
          )}
          <div className="mt-8">
            <InquiryForm propertyId={propertyId} propertyTitle={propertyTitle} />
          </div>
        </div>
      </div>
      </section>
    </InteriorPageShell>
  );
}
