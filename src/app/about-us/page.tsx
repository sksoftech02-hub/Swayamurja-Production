'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { AboutUsSection } from '@/components/home/AboutUsSection';
import { ClientsSlider } from '@/components/home/ClientsSlider';
import { ContactForm } from '@/components/home/ContactForm';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { 
  ShieldCheck, 
  Award, 
  Zap, 
  ChevronRight, 
  Sparkles, 
  SunMedium, 
  Building2, 
  Users, 
  CheckCircle2,
  ArrowRight,
  PhoneCall
} from 'lucide-react';

export default function AboutUsPage() {
  const { language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* ── Main Sticky Navbar ── */}
      <Navbar />

      {/* ── Breadcrumb & Page Banner ── */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white pt-10 pb-16 sm:pb-20 overflow-hidden border-b border-slate-800">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-emerald-400/90 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-300 transition-colors">
              {isMr ? 'मुख्यपृष्ठ' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-white">
              {isMr ? 'आमच्याबद्दल' : 'About Us'}
            </span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isMr ? 'स्वयम्ऊर्जा रिन्यूएबल एनर्जी प्रा. लि.' : 'SwayamUrja Renewable Energy Pvt. Ltd.'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight font-['Outfit']">
              {isMr ? (
                <>महाराष्ट्राच्या <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">स्वच्छ ऊर्जा क्रांतीचे</span> अग्रदूत</>
              ) : (
                <>Pioneering Maharashtra&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Clean Energy</span> Independence</>
              )}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {isMr 
                ? '५०+ मेगावॅट सोलर कार्यान्वित क्षमता, १२००+ उद्योगांचा अतूट विश्वास आणि महावितरण ग्रीड नियमावलीचे परिपूर्ण पालन.'
                : 'Over 50 MW commissioned across Maharashtra, trusted by 1,200+ enterprise leaders with Tier-1 engineering excellence, MSEDCL compliance mastery, and guaranteed plant performance.'
              }
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-['Outfit']">50+ MW</div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">{isMr ? 'एकूण सोलर क्षमता' : 'Commissioned'}</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-['Outfit']">1,200+</div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">{isMr ? 'उद्योजक ग्राहक' : 'Enterprise Clients'}</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">13 MW</div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">{isMr ? 'सोलापूर युटिलिटी पार्क' : 'Solapur Utility Plant'}</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-['Outfit']">99.4%</div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">{isMr ? 'SCADA अपटाईम' : 'Plant Availability'}</div>
              </div>
            </div>

            {/* In-page Jump Navigation Pills */}
            <div className="pt-4 flex flex-wrap gap-2 text-xs font-bold">
              <a 
                href="#about-ceo" 
                className="px-3.5 py-1.5 rounded-full bg-emerald-600/60 hover:bg-emerald-500 text-white transition-colors border border-emerald-400/40"
              >
                {isMr ? 'व्यवस्थापकीय संचालकांचे मनोगत ↓' : 'MD & CEO Gratitude ↓'}
              </a>
              <a 
                href="#about-vision" 
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
              >
                {isMr ? 'दृष्टिकोन आणि ध्येय ↓' : 'Vision & Mission ↓'}
              </a>
              <a 
                href="#about-focus" 
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
              >
                {isMr ? 'प्रमुख कार्यक्षेत्र ↓' : 'Core Focus ↓'}
              </a>
              <a 
                href="#about-values" 
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
              >
                {isMr ? 'मूल्ये (MITRA) ↓' : 'Core Values (MITRA) ↓'}
              </a>
              <a 
                href="#about-team" 
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
              >
                {isMr ? 'आमची टीम ↓' : 'Executive Team ↓'}
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── Complete About Us Content (Dynamic from CMS / Admin) ── */}
      <AboutUsSection />

      {/* ── Client Partnerships & Accreditations ── */}
      <div className="border-t border-slate-100 bg-slate-50/50 py-4">
        <ClientsSlider />
      </div>

      {/* ── Direct Contact / Survey Lead Section ── */}
      <ContactForm />

      {/* ── Global Footer ── */}
      <Footer />
    </main>
  );
}
