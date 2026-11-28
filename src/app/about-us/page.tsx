'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { AboutUsSection } from '@/components/home/AboutUsSection';
import { ClientsSlider } from '@/components/home/ClientsSlider';
import { ContactForm } from '@/components/home/ContactForm';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Award, ChevronRight, ShieldCheck } from 'lucide-react';

const HERO_METRICS = [
  {
    value: '25+ Yrs',
    labelEn: 'Sector Leadership',
    labelMr: 'ऊर्जा नेतृत्व अनुभव',
    accent: 'text-emerald-300',
  },
  {
    value: '610+',
    labelEn: 'Completed Projects',
    labelMr: 'पूर्ण झालेले प्रकल्प',
    accent: 'text-emerald-400',
  },
  {
    value: '1,750+ MW',
    labelEn: 'Wind & Solar Advisory',
    labelMr: 'पवन व सौर सल्लागार',
    accent: 'text-amber-400',
  },
  {
    value: '35+ MW',
    labelEn: 'Solar EPC & I&C',
    labelMr: 'सोलर ईपीसी उभारणी',
    accent: 'text-white',
  },
  {
    value: '65+ MW',
    labelEn: 'Solar O&M Portfolio',
    labelMr: 'सोलर देखभाल (O&M)',
    accent: 'text-cyan-300',
  },
  {
    value: '60+ MWh',
    labelEn: 'BESS · 300 MWh PMC',
    labelMr: 'BESS · ३०० MWh PMC',
    accent: 'text-amber-300',
  },
];

export default function AboutUsPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* ── Main Sticky Navbar ── */}
      <Navbar />

      {/* ── Breadcrumb & Executive Page Banner ── */}
      <section className="relative bg-slate-900 text-white pt-10 pb-14 sm:pb-16 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav
            className="flex items-center gap-2 text-xs font-medium text-emerald-400/90 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-emerald-300 transition-colors">
              {isMr ? 'मुख्यपृष्ठ' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-white">{isMr ? 'आमच्याबद्दल' : 'About Us'}</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            {/* Official Motto & ISO Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-400/25 text-xs font-medium">
                <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>॥ स्वयम्ऊर्जा – शाश्वत ऊर्जा ॥</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 text-slate-200 border border-white/15 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  {isMr
                    ? 'ISO 9001:2015 प्रमाणित (TÜV SÜD) · शाश्वततेचा विश्वासार्ह भागीदार'
                    : 'ISO 9001:2015 Certified (TÜV SÜD) · Reliable Partner for Sustainability'}
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight font-['Outfit']">
              {isMr ? (
                <>
                  एकाच छताखाली <span className="text-emerald-400">संपूर्ण नवीकरणीय ऊर्जा</span> सेवा
                </>
              ) : (
                <>
                  All Renewable Energy <span className="text-emerald-400">Under One Roof</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl">
              {isMr
                ? 'स्वयम्ऊर्जा रिन्यूएबल एनर्जी प्रा. लि. ही सौर ऊर्जा, पवन ऊर्जा, बॅटरी एनर्जी स्टोरेज (BESS), ग्रीन हायड्रोजन आणि नियामक सल्लागार क्षेत्रातील संकल्पनेपासून कार्यान्वित होईपर्यंत सेवा देणारी कंपनी आहे — ७०+ स्वयम्ऊर्जा-मित्र अभियंत्यांच्या समर्पित टीमसह.'
                : 'SwayamUrja Renewable Energy Pvt. Ltd. delivers concept-to-commissioning solutions across Solar, Wind, Battery Energy Storage (BESS), Green Hydrogen, and Regulatory Advisory — powered by 70+ SwayamUrja-MITRA specialists.'}
            </p>
          </div>

          {/* 6-Metric "All RE Under One Roof" Proof Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-8 tabular-nums">
            {HERO_METRICS.map((m) => (
              <div
                key={m.labelEn}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <div className={`text-xl sm:text-2xl font-bold font-['Outfit'] ${m.accent}`}>
                  {m.value}
                </div>
                <div className="text-xs text-slate-300 font-medium mt-1 leading-snug">
                  {isMr ? m.labelMr : m.labelEn}
                </div>
              </div>
            ))}
          </div>

          {/* In-page Jump Navigation Pills */}
          <div className="pt-6 flex flex-wrap gap-2 text-xs font-semibold">
            <a
              href="#about-ceo"
              className="px-3.5 py-1.5 rounded-full bg-emerald-600/70 hover:bg-emerald-500 text-white transition-colors border border-emerald-400/40"
            >
              {isMr ? 'व्यवस्थापकीय संचालक परिचय ↓' : 'MD & CEO Dossier ↓'}
            </a>
            <a
              href="#about-credentials"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            >
              {isMr ? 'मान्यता व प्रमाणपत्रे ↓' : 'Empanelments ↓'}
            </a>
            <a
              href="#about-vision"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            >
              {isMr ? 'उद्देश, दृष्टिकोन व ध्येय ↓' : 'Purpose, Vision & Mission ↓'}
            </a>
            <a
              href="#about-strengths"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            >
              {isMr ? 'अभियांत्रिकी सामर्थ्य ↓' : 'Strengths & Synergy ↓'}
            </a>
            <a
              href="#about-track-record"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            >
              {isMr ? 'प्रकल्प अनुभव ↓' : 'Track Record ↓'}
            </a>
            <a
              href="#about-awards"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            >
              {isMr ? 'पुरस्कार व सन्मान ↓' : 'Awards (2021–2026) ↓'}
            </a>
            <a
              href="#about-values"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            >
              {isMr ? 'MITRA मूल्ये ↓' : 'MITRA Values ↓'}
            </a>
            <a
              href="#about-team"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            >
              {isMr ? '७०+ आमची टीम ↓' : '70+ Team ↓'}
            </a>
          </div>
        </div>
      </section>

      {/* ── Complete Executive About Us Content ── */}
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
