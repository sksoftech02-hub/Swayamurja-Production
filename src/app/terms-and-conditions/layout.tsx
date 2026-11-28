import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Official Terms and Conditions & Terms of Use governing the SwayamUrja Renewable Energy Pvt. Ltd. website, solar estimation software, and services.',
  alternates: {
    canonical: 'https://swayamurja.com/terms-and-conditions',
    languages: {
      'en-IN': 'https://swayamurja.com/terms-and-conditions?lang=en',
      'mr-IN': 'https://swayamurja.com/terms-and-conditions?lang=mr',
    },
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://swayamurja.com' },
    { '@type': 'ListItem', position: 2, name: 'Terms & Conditions', item: 'https://swayamurja.com/terms-and-conditions' },
  ],
};

export default function TermsAndConditionsLayout({ children }: { children: React.ReactNode }) {
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
