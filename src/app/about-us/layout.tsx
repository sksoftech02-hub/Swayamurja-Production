import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Leadership & Solar EPC Team',
  description:
    'Meet SwayamUrja Renewable Energy Pvt. Ltd. — led by MD & CEO Rahul Nalawade with 25+ years leadership, 1,600+ MW advisory, 550+ projects & 60+ EPC experts.',
  alternates: {
    canonical: 'https://swayamurja.com/about-us',
    languages: {
      'en-IN': 'https://swayamurja.com/about-us?lang=en',
      'mr-IN': 'https://swayamurja.com/about-us?lang=mr',
    },
  },
  openGraph: {
    title: 'About SwayamUrja Renewable Energy Pvt. Ltd. | Pune, Maharashtra',
    description:
      '25+ years of clean energy leadership, ISO 9001:2015 certified by TÜV SÜD, 1,600+ MW developed, and 60+ SwayamUrja-MITRA solar EPC engineers.',
    url: 'https://swayamurja.com/about-us',
    type: 'website',
    images: [
      {
        url: '/uploads/team/swayamurja-mitra-team.jpg',
        width: 1533,
        height: 690,
        alt: 'SwayamUrja-MITRA 60+ Solar EPC Specialists Team',
      },
    ],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://swayamurja.com' },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://swayamurja.com/about-us' },
  ],
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
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
