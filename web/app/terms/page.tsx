import type { Metadata } from 'next';

import { LegalPageLayout } from '@/components/layout/legal-page-layout';

export const metadata: Metadata = {
  title: 'Terms of Use',
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      overline="Legal"
      title="Terms of Use"
      dateLabel="Last Updated: June 30, 2026"
    >
      <p>
        Welcome to the website of KBR Reality Group (&ldquo;KBR,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using our website, you agree to
        comply with and be bound by the following Terms of Use. If you do not agree to these terms,
        please do not use this site.
      </p>

      <h2>1. Scope of Information</h2>
      <p>
        The content provided on this website is for informational and portfolio-overview purposes
        only. While we strive to maintain accurate and up-to-date listings, commercial assets,
        residential holdings, and market insights, all information is subject to change, withdrawal,
        or error without notice. Nothing on this website constitutes a binding offer, professional
        legal advice, or financial investment advice.
      </p>

      <h2>2. Intellectual Property</h2>
      <p>
        All content, logos, graphics, text, and design elements on this website are the property of
        KBR Reality Group and are protected by applicable copyright, trademark, and intellectual
        property laws. Unauthorized use, reproduction, or distribution of any materials on this
        site without explicit written permission is strictly prohibited.
      </p>

      <h2>3. User Conduct</h2>
      <p>
        By using this website, including our Inquiry and Contact forms, you agree to:
      </p>
      <ul>
        <li>Provide accurate, current, and truthful information.</li>
        <li>Refrain from submitting any fraudulent, defamatory, or harmful content.</li>
        <li>
          Avoid attempting to interfere with the proper working of the website or bypassing any
          security measures.
        </li>
      </ul>

      <h2>4. Limitation of Liability</h2>
      <p>
        KBR Reality Group and its affiliates, directors, or employees will not be held liable for
        any direct, indirect, incidental, or consequential damages arising out of your use of, or
        inability to use, this website or the information contained herein.
      </p>

      <h2>5. Governing Law</h2>
      <p>
        These Terms of Use and your use of the website are governed by and construed in accordance
        with the laws of the State of New Jersey, without regard to its conflict of law principles.
        Any legal action arising out of these terms shall be filed solely in the state or federal
        courts located in New Jersey.
      </p>

      <h2>6. Modifications</h2>
      <p>
        We reserve the right to change or modify these Terms of Use at any time. Your continued use
        of the website following the posting of changes will mean that you accept and agree to the
        revisions.
      </p>
    </LegalPageLayout>
  );
}
