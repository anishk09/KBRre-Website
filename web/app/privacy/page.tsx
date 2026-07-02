import type { Metadata } from 'next';

import { LegalPageLayout } from '@/components/layout/legal-page-layout';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      overline="Legal"
      title="Privacy Policy"
      dateLabel="Effective Date: June 30, 2026"
    >
      <p>
        KBR Reality Group (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to
        protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you visit our website, use our services, or interact with
        our team.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We may collect personal information that you voluntarily provide to us when you express an
        interest in obtaining information about us or our properties, when you submit an inquiry
        form, or when you otherwise contact us. This information may include:
      </p>
      <ul>
        <li>
          <strong>Contact Data:</strong> Name, business or personal email address, phone number,
          and physical mailing address.
        </li>
        <li>
          <strong>Property Preferences:</strong> Information regarding your investment criteria,
          property interests, or portfolio requirements.
        </li>
        <li>
          <strong>Inquiry Details:</strong> Any specific details or messages you provide through
          our contact forms.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>
        We use the information we collect solely for professional business purposes, including to:
      </p>
      <ul>
        <li>Respond to your inquiries and fulfill your requests for property or advisory information.</li>
        <li>Deliver tailored market insights, property updates, or portfolio strategies.</li>
        <li>Maintain the security, performance, and integrity of our website and services.</li>
        <li>
          Comply with applicable legal obligations, real estate regulations, and industry
          standards.
        </li>
      </ul>

      <h2>Sharing Your Information</h2>
      <p>
        We do not sell, rent, or trade your personal information to third parties. We may share
        information only in limited circumstances, such as with trusted service providers who assist
        us in operating our website and conducting our business, or when required by law to comply
        with legal proceedings or protect our rights.
      </p>

      <h2>Data Security</h2>
      <p>
        We implement appropriate technical and organizational security measures designed to protect
        the security of any personal information we process. However, please remember that no
        electronic transmission over the internet or information storage technology can be guaranteed
        100% secure.
      </p>

      <h2>Your Rights &amp; Contact Us</h2>
      <p>
        Depending on your location, you may have certain rights regarding your personal data. If you
        have questions or comments about this policy, or wish to update or remove your information,
        please contact our business line at{' '}
        <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`}>
          {siteConfig.contact.phone}
        </a>{' '}
        or visit us at {siteConfig.contact.address}.
      </p>
    </LegalPageLayout>
  );
}
