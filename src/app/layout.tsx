import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ContentProvider } from '@/context/ContentContext';
import { ThemeApplier } from '@/components/common/ThemeApplier';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#059669' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://swayamurja.com'),
  title: {
    default: 'SwayamUrja Renewable Energy | Solar EPC Company Pune, Maharashtra',
    template: '%s | SwayamUrja Solar EPC',
  },
  description:
    'ISO 9001:2015 Certified Solar EPC Company in Pune & Maharashtra. 25+ years leadership, 1,600+ MW Wind & Solar advisory, 13 MW Utility Solar Parks, C&I Rooftops, BESS & PM Surya Ghar ₹78,000 DBT Subsidies.',
  keywords: [
    'Solar EPC Pune',
    'Commercial Solar Rooftop Pune',
    'Industrial Solar MIDC Chakan',
    '13 MW Utility Solar Plant Sangli Maharashtra',
    'PM Surya Ghar Maharashtra Subsidy',
    'Solar Panel Installation Pune',
    'MSEDCL Net Metering Approval',
    '40% Solar Depreciation Tax Benefit',
    'PM-KUSUM Agri Solar Pump Maharashtra',
    'SwayamUrja Renewable Energy Pvt Ltd',
    'Best Solar Company Maharashtra',
    'Rooftop Solar for Housing Societies Pune',
  ],
  authors: [{ name: 'SwayamUrja Renewable Energy Pvt. Ltd.', url: 'https://swayamurja.com' }],
  creator: 'SwayamUrja Renewable Energy Pvt. Ltd.',
  publisher: 'SwayamUrja Renewable Energy Pvt. Ltd.',
  category: 'Renewable Energy',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: 'https://swayamurja.com',
    languages: {
      'en-IN': 'https://swayamurja.com/?lang=en',
      'mr-IN': 'https://swayamurja.com/?lang=mr',
    },
  },
  openGraph: {
    title: 'SwayamUrja Renewable Energy Pvt. Ltd. | Premier Solar EPC',
    description:
      'Empowering Maharashtra with Clean Energy: 1,600+ MW Wind & Solar Advisory, 550+ Completed Projects, 13 MW Utility Solar Parks & ₹78,000 PM Surya Ghar Subsidies.',
    url: 'https://swayamurja.com',
    siteName: 'SwayamUrja Renewable Energy',
    locale: 'en_IN',
    alternateLocale: ['mr_IN'],
    type: 'website',
    images: [
      {
        url: '/images/whatsapp_showcase.jpeg',
        width: 1200,
        height: 630,
        alt: 'SwayamUrja 13 MW Utility & Industrial Rooftop Solar EPC Commissioning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwayamUrja Renewable Energy | Solar EPC Pune',
    description: '1,600+ MW Developed, 550+ Projects, 13 MW Utility Parks & PM Surya Ghar ₹78,000 Subsidies.',
    images: ['/images/whatsapp_showcase.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  other: {
    'geo.region': 'IN-MH',
    'geo.placename': 'Pune, Maharashtra',
    'geo.position': '18.5515;73.9218',
    ICBM: '18.5515, 73.9218',
  },
};

const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SwayamUrja Renewable Energy Pvt. Ltd.',
  alternateName: 'स्वयम्ऊर्जा रिन्यूएबल एनर्जी प्रा. लि.',
  image: 'https://swayamurja.com/images/whatsapp_showcase.jpeg',
  logo: 'https://swayamurja.com/assets/logo.webp',
  '@id': 'https://swayamurja.com/#organization',
  url: 'https://swayamurja.com',
  telephone: '+919272100623',
  email: 'crm@swayamurja.com',
  priceRange: '₹₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'T9, A-1001, Brahma Business Park, New Kalyani Nagar, Wadgaon Sheri',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    postalCode: '411014',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 18.5515,
    longitude: 73.9218,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:30',
      closes: '18:30',
    },
  ],
  sameAs: ['https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/'],
  areaServed: [
    { '@type': 'City', name: 'Pune' },
    { '@type': 'City', name: 'Sangli' },
    { '@type': 'City', name: 'Satara' },
    { '@type': 'City', name: 'Karad' },
    { '@type': 'City', name: 'Hyderabad' },
    { '@type': 'AdministrativeArea', name: 'Maharashtra' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the maximum subsidy under PM Surya Ghar Muft Bijli Yojana in Maharashtra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the PM Surya Ghar: Muft Bijli Yojana in Maharashtra, residential homeowners can receive up to ₹78,000 as a direct bank transfer (DBT) subsidy for systems 3 kW and above. A 1 kW system receives ₹30,000, and a 2 kW system receives ₹60,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does 40% accelerated tax depreciation benefit commercial and industrial factories installing solar in Maharashtra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under Section 32 of the Indian Income Tax Act, commercial and industrial companies in Maharashtra can claim 40% accelerated depreciation on solar power plant capital investments in the very first year, effectively recovering up to 30% of their project cost in corporate tax savings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does SwayamUrja handle MSEDCL bi-directional net-metering approvals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, SwayamUrja provides 100% turnkey solar EPC execution, including site feasibility, PVsyst engineering design, MSEDCL liaisoning, DISCOM net-metering installation, CEIG approvals, and commissioning.',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Schema.org Organization & LocalBusiness JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        {/* Schema.org FAQPage Rich Snippet JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[#f8faf9] text-[#0f172a]">
        <ContentProvider>
          <ThemeApplier />
          <LanguageProvider>{children}</LanguageProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
