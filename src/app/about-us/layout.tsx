import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Leadership, Vision, MITRA Values & EPC Team',
  description:
    'Discover SwayamUrja Renewable Energy Pvt. Ltd. — led by MD & CEO Mr. Rahul Nalawade with 25+ years of renewable leadership, 1,600+ MW Wind & Solar advisory, 550+ completed projects, and 60+ SwayamUrja-MITRA specialists.',
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

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
