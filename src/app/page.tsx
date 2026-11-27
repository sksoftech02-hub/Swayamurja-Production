'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { VideoHero } from '@/components/home/VideoHero';
import { ClientsSlider } from '@/components/home/ClientsSlider';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { ServicesSection } from '@/components/home/ServicesSection';
import { SolarCalculator } from '@/components/home/SolarCalculator';
import { MaharashtraMap } from '@/components/home/MaharashtraMap';
import { SchemesSection } from '@/components/home/SchemesSection';
import { ProjectsGallery } from '@/components/home/ProjectsGallery';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CareersSection } from '@/components/home/CareersSection';
import { ContactForm } from '@/components/home/ContactForm';
import { Footer } from '@/components/layout/Footer';
import { useContent } from '@/context/ContentContext';
import { useLanguage } from '@/context/LanguageContext';
import { DEFAULT_LAYOUT_SECTIONS, HomepageSection } from '@/lib/types';

const HOME_FAQ_JSON_LD = {
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

export default function HomePage() {
  const { content } = useContent();
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const sections: HomepageSection[] = (content?.layoutSections && content.layoutSections.length > 0)
    ? content.layoutSections
    : DEFAULT_LAYOUT_SECTIONS;

  const activeSections = [...sections]
    .filter(s => s.enabled)
    .sort((a, b) => a.order - b.order);

  const renderSectionComponent = (sec: HomepageSection) => {
    switch (sec.id) {
      case 'hero':
        return <Hero key={sec.id} />;
      case 'video':
        return <VideoHero key={sec.id} />;
      case 'about':
        return <AboutTeaser key={sec.id} />;
      case 'services':
        return <ServicesSection key={sec.id} />;
      case 'projects':
        return <div key={sec.id} className="deferred-section"><ProjectsGallery /></div>;
      case 'map':
        return <div key={sec.id} className="deferred-section"><MaharashtraMap /></div>;
      case 'schemes':
        return <div key={sec.id} className="deferred-section"><SchemesSection /></div>;
      case 'calculator':
        return <div key={sec.id} className="deferred-section"><SolarCalculator /></div>;
      case 'clients':
        return <div key={sec.id} className="deferred-section"><ClientsSlider /></div>;
      case 'testimonials':
        return <div key={sec.id} className="deferred-section"><TestimonialsSection /></div>;
      case 'careers':
        return <div key={sec.id} className="deferred-section"><CareersSection /></div>;
      case 'contact':
        return <div key={sec.id} className="deferred-section"><ContactForm /></div>;
      case 'process':
      case 'showcase':
      case 'blogs':
        return null;
      default:
        if (sec.type === 'custom') {
          return (
            <section key={sec.id} id={sec.id} className="py-16 bg-slate-50 border-y border-slate-200/80">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
                  {isMr ? (sec.titleMr || sec.titleEn || sec.name) : (sec.titleEn || sec.name)}
                </h2>
              </div>
            </section>
          );
        }
        return null;
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FAQ_JSON_LD) }}
      />
      <Navbar />
      {activeSections.map(renderSectionComponent)}
      <Footer />
    </main>
  );
}
