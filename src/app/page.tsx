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
      case 'clients':
        return <ClientsSlider key={sec.id} />;
      case 'about':
        return <AboutTeaser key={sec.id} />;
      case 'services':
        return <ServicesSection key={sec.id} />;
      case 'projects':
        return <ProjectsGallery key={sec.id} />;
      case 'map':
        return <MaharashtraMap key={sec.id} />;
      case 'schemes':
        return <SchemesSection key={sec.id} />;
      case 'calculator':
        return <SolarCalculator key={sec.id} />;
      case 'testimonials':
        return <TestimonialsSection key={sec.id} />;
      case 'careers':
        return <CareersSection key={sec.id} />;
      case 'contact':
        return <ContactForm key={sec.id} />;
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
      <Navbar />
      {activeSections.map(renderSectionComponent)}
      <Footer />
    </main>
  );
}
