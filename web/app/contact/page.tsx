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

  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\D/g, '')}`;

  return (
    <InteriorPageShell>
      <section className="mx-auto max-w-7xl px-4 py-16 pb-32 sm:px-6 md:py-24 lg:px-8">
      <div className="divider-gold" />
      <p className="heading-overline mt-6">Contact</p>
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
                <p className="mt-1 tabular-nums">
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
          <h2 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-brand-blue-dark">
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

      {/* Mobile-only floating action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-brand-blue/10 bg-white/85 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-8px_30px_rgb(0_0_0/0.08)] backdrop-blur-lg md:hidden">
        <a href={phoneHref} className="btn-primary flex-1">
          Call Now
        </a>
        <a href="#contact-form" className="btn-outline flex-1 bg-white/70">
          Inquire
        </a>
      </div>
    </InteriorPageShell>
  );
}
