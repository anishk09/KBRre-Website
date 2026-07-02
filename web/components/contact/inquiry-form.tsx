'use client';

import { FormEvent, useState } from 'react';

import { siteConfig } from '@/data/site-config';

type InquiryFormProps = {
  propertyId?: string;
  propertyTitle?: string;
};

export function InquiryForm({ propertyId, propertyTitle }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-sm border border-brand-gold/30 bg-brand-gold/5 p-6">
        <p className="font-serif text-lg text-brand-blue">Thank you for your inquiry.</p>
        <p className="mt-2 text-sm text-brand-dark/70">
          Our team will review your message and follow up shortly. For immediate assistance,
          call us at{' '}
          <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`}>
            {siteConfig.contact.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-luxury text-brand-blue">
            Name
          </span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-sm border border-brand-blue/15 bg-white px-4 py-3 text-sm text-brand-dark outline-none transition-colors focus:border-brand-gold"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-luxury text-brand-blue">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-sm border border-brand-blue/15 bg-white px-4 py-3 text-sm text-brand-dark outline-none transition-colors focus:border-brand-gold"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-luxury text-brand-blue">
          Phone <span className="normal-case tracking-normal text-brand-dark/50">(optional)</span>
        </span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          className="mt-2 w-full rounded-sm border border-brand-blue/15 bg-white px-4 py-3 text-sm text-brand-dark outline-none transition-colors focus:border-brand-gold"
        />
      </label>

      {propertyTitle && (
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-luxury text-brand-blue">
            Property of Interest
          </span>
          <input
            type="text"
            name="property"
            readOnly
            defaultValue={propertyTitle}
            className="mt-2 w-full rounded-sm border border-brand-blue/10 bg-brand-dark/5 px-4 py-3 text-sm text-brand-dark/80"
          />
          {propertyId && <input type="hidden" name="propertyId" value={propertyId} />}
        </label>
      )}

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-luxury text-brand-blue">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={5}
          defaultValue={
            propertyTitle
              ? `I would like to learn more about ${propertyTitle}.`
              : undefined
          }
          className="mt-2 w-full resize-y rounded-sm border border-brand-blue/15 bg-white px-4 py-3 text-sm text-brand-dark outline-none transition-colors focus:border-brand-gold"
        />
      </label>

      <button type="submit" className="btn-primary">
        Submit Inquiry
      </button>
    </form>
  );
}
