'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { ClientsSlider } from '@/components/home/ClientsSlider';
import { AboutUsSection } from '@/components/home/AboutUsSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { SolarBuildProcess } from '@/components/home/SolarBuildProcess';
import { AnimatedSolarShowcase } from '@/components/home/AnimatedSolarShowcase';
import { SolarCalculator } from '@/components/home/SolarCalculator';
import { MaharashtraMap } from '@/components/home/MaharashtraMap';
import { SchemesSection } from '@/components/home/SchemesSection';
import { ProjectsGallery } from '@/components/home/ProjectsGallery';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { BlogSection } from '@/components/home/BlogSection';
import { CareersSection } from '@/components/home/CareersSection';
import { ContactForm } from '@/components/home/ContactForm';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <ClientsSlider />
      <AboutUsSection />
      <ServicesSection />
      <SolarBuildProcess />
      <AnimatedSolarShowcase />
      <ProjectsGallery />
      <MaharashtraMap />
      <SchemesSection />
      <SolarCalculator />
      <TestimonialsSection />
      <BlogSection />
      <CareersSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
