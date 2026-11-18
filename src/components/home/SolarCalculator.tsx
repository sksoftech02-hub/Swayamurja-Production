'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { calculateSolar } from '@/lib/solar-calculator';
import { generateSolarProposalPDF } from '@/lib/pdf-proposal-generator';
import { DEFAULT_THEME, SiteTheme } from '@/lib/theme-presets';
import { Calculator, CheckCircle2, ArrowRight, Zap, IndianRupee, Leaf, Clock, Building, Home, Users, FileText } from 'lucide-react';

export const SolarCalculator: React.FC = () => {
  const { t, language } = useLanguage();
  const { content } = useContent();
  const theme: SiteTheme = content?.theme || DEFAULT_THEME;
  const isMr = language === 'mr';

  const [category, setCategory] = useState<'residential' | 'commercial' | 'housing'>('residential');
  const [bill, setBill] = useState<number>(4500);

  // Dynamic tariffs from CMS if available
  const resTariff = content?.tariffs?.residentialUnitRate || 8.5;
  const comTariff = content?.tariffs?.commercialUnitRate || 11.5;
  const socTariff = content?.tariffs?.housingUnitRate || 9.2;

  const estimate = calculateSolar(bill, category, isMr);

  const handleCategoryChange = (cat: 'residential' | 'commercial' | 'housing') => {
    setCategory(cat);
    if (cat === 'residential') {
      setBill(4500);
    } else if (cat === 'commercial') {
      setBill(65000);
    } else {
      setBill(25000);
    }
  };

  const getMinMaxStep = () => {
    if (category === 'residential') return { min: 1500, max: 30000, step: 500 };
    if (category === 'commercial') return { min: 15000, max: 300000, step: 5000 };
    return { min: 8000, max: 100000, step: 2000 };
  };

  const { min, max, step } = getMinMaxStep();

  return (
    <section id="calculator" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('calc_tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
            {t('calc_title')}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t('calc_subtitle')}
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl border border-emerald-800">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              type="button"
              onClick={() => handleCategoryChange('residential')}
              style={
                category === 'residential'
                  ? { backgroundColor: theme.primaryColor || '#f59e0b', color: '#ffffff' }
                  : {}
              }
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                category === 'residential'
                  ? 'shadow-lg scale-105'
                  : 'bg-emerald-800/60 text-emerald-200 hover:bg-emerald-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t('calc_tab_res')}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCategoryChange('commercial')}
              style={
                category === 'commercial'
                  ? { backgroundColor: theme.primaryColor || '#f59e0b', color: '#ffffff' }
                  : {}
              }
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                category === 'commercial'
                  ? 'shadow-lg scale-105'
                  : 'bg-emerald-800/60 text-emerald-200 hover:bg-emerald-800'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>{t('calc_tab_com')}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCategoryChange('housing')}
              style={
                category === 'housing'
                  ? { backgroundColor: theme.primaryColor || '#f59e0b', color: '#ffffff' }
                  : {}
              }
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                category === 'housing'
                  ? 'shadow-lg scale-105'
                  : 'bg-emerald-800/60 text-emerald-200 hover:bg-emerald-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t('calc_tab_soc')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Input Slider */}
            <div className="lg:col-span-5 space-y-6">
              <label className="block text-emerald-200 text-sm font-semibold">
                {t('calc_bill_lbl')}
              </label>

              <div className="flex items-baseline justify-between">
                <span
                  className="text-4xl sm:text-5xl font-extrabold font-['Outfit']"
                  style={{ color: theme.primaryColor || '#f59e0b' }}
                >
                  ₹ {bill.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-emerald-300 bg-emerald-800/80 px-3 py-1 rounded-full border border-emerald-700">
                  {isMr ? 'दरमहा' : 'Per Month'}
                </span>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                className="w-full h-3 bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-hidden"
              />

              <div className="flex justify-between text-xs text-emerald-300 font-medium">
                <span>₹ {min.toLocaleString('en-IN')}</span>
                <span>₹ {max.toLocaleString('en-IN')}</span>
              </div>

              {/* Subsidy Highlight Badge */}
              <div className="p-4 rounded-2xl bg-emerald-800/50 border border-emerald-600/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-bold text-amber-300">
                    {estimate.subsidy > 0
                      ? (isMr ? `✓ ₹ ${estimate.subsidy.toLocaleString('en-IN')} थेट बँक सबसिडीसाठी पात्र` : `✓ Eligible for ₹ ${estimate.subsidy.toLocaleString('en-IN')} Direct Bank Subsidy`)
                      : (isMr ? '✓ ४०% प्राप्तिकर घसारा (Accelerated Depreciation) लाभ' : '✓ Eligible for 40% Accelerated Tax Depreciation Benefit')}
                  </span>
                  <p className="text-emerald-200 text-xs mt-1">
                    {isMr
                      ? 'पीएम सूर्य घर राष्ट्रीय पोर्टलानुसार थेट खात्यात सबसिडी जमा होते.'
                      : 'Under PM Surya Ghar Muft Bijli Yojana with MSEDCL Net-Metering.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Output Metrics Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                
                {/* Metric 1: Capacity */}
                <div className="bg-emerald-900/60 border border-emerald-700/60 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300 mb-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('calc_metric_kw')}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                    {estimate.kw} {isMr ? 'किलोवॅट' : 'kW'}
                  </div>
                </div>

                {/* Metric 2: Roof Area */}
                <div className="bg-emerald-900/60 border border-emerald-700/60 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300 mb-1">
                    <Building className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('calc_metric_roof')}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                    {estimate.roofSqft} {isMr ? 'चौ.फूट' : 'sq.ft'}
                  </div>
                </div>

                {/* Metric 3: Subsidy */}
                <div className="bg-emerald-900/60 border border-emerald-700/60 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300 mb-1">
                    <IndianRupee className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('calc_metric_subsidy')}</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-300 font-['Outfit']">
                    {estimate.subsidyText}
                  </div>
                </div>

                {/* Metric 4: Monthly Save */}
                <div className="bg-emerald-900/60 border border-emerald-700/60 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300 mb-1">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('calc_metric_mo_save')}</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit']">
                    ₹ {estimate.monthlySavings.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Metric 5: 25-Year Lifetime */}
                <div className="bg-emerald-900/60 border border-emerald-700/60 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('calc_metric_lifetime')}</span>
                  </div>
                  <div
                    className="text-xl sm:text-2xl font-extrabold font-['Outfit']"
                    style={{ color: theme.primaryColor || '#f59e0b' }}
                  >
                    ₹ {estimate.lifetimeSavingsLakhs} {isMr ? 'लाख' : 'Lakhs'}
                  </div>
                </div>

                {/* Metric 6: Payback */}
                <div className="bg-emerald-900/60 border border-emerald-700/60 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300 mb-1">
                    <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('calc_metric_payback')}</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit']">
                    {estimate.paybackYears}
                  </div>
                </div>

              </div>

              {/* Call to action button */}
              <div className="mt-8">
                <a
                  href={`#contact`}
                  onClick={() => {
                    const billInput = document.getElementById('clientBill') as HTMLInputElement;
                    const msgInput = document.getElementById('clientNotes') as HTMLTextAreaElement;
                    if (billInput) billInput.value = `₹ ${bill.toLocaleString('en-IN')}`;
                    if (msgInput) {
                      msgInput.value = `Calculated Estimate: ${estimate.kw} kW solar system required for average monthly bill of ₹ ${bill.toLocaleString('en-IN')}. Roof area: ~${estimate.roofSqft} sq.ft.`;
                    }
                  }}
                  style={{
                    backgroundColor: theme.primaryColor || '#f59e0b',
                    color: '#ffffff',
                    boxShadow: `0 10px 25px -5px ${theme.primaryColor || '#f59e0b'}80`,
                  }}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl hover:opacity-95 font-extrabold text-base shadow-xl transition-all cursor-pointer"
                >
                  <span>{t('calc_cta_claim')}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                {/* 1-Click Instant Engineering Solar Proposal (PDF Generation) */}
                <button
                  type="button"
                  onClick={() => {
                    generateSolarProposalPDF({
                      category,
                      monthlyBill: bill,
                      kw: estimate.kw,
                      roofSqft: estimate.roofSqft,
                      subsidy: estimate.subsidy,
                      subsidyText: estimate.subsidyText,
                      monthlySavings: estimate.monthlySavings,
                      annualSavings: estimate.annualSavings,
                      lifetimeSavingsLakhs: estimate.lifetimeSavingsLakhs,
                      paybackYears: estimate.paybackYears,
                      co2Tons: estimate.co2Tons,
                      isMarathi: isMr,
                    });
                  }}
                  className="w-full mt-3 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-sm shadow-md transition-all cursor-pointer hover:border-emerald-400 group"
                >
                  <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>{isMr ? 'विस्तृत फिजिबिलिटी अहवाल डाउनलोड करा (PDF)' : 'Download Detailed Feasibility Report (PDF)'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
