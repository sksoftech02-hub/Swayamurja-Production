import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy & DPDP Act 2023',
  description:
    'Official Privacy Policy, India DPDP Act 2023 Data Protection Notice, Data Principal Rights, consent withdrawal & Grievance Officer contact — SwayamUrja.',
  alternates: {
    canonical: 'https://swayamurja.com/privacy-policy',
    languages: {
      'en-IN': 'https://swayamurja.com/privacy-policy?lang=en',
      'mr-IN': 'https://swayamurja.com/privacy-policy?lang=mr',
    },
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://swayamurja.com' },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://swayamurja.com/privacy-policy' },
  ],
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
