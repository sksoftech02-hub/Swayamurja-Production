'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { DEFAULT_THEME, SiteTheme } from '@/lib/theme-presets';
import { Sun, Zap, Battery, Home, ArrowRight, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

type Mode = 'day' | 'battery' | 'night';

export const AnimatedSolarShowcase: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';
  const theme: SiteTheme = content?.theme || DEFAULT_THEME;
  const isGreen = theme.heroBackground === 'emerald-green';

  const [activeMode, setActiveMode] = useState<Mode>('day');
  const [watts, setWatts] = useState(5240);

  // Slight realistic wattage fluctuation simulation
  useEffect(() => {
    const timer = setInterval(() => {
      if (activeMode === 'day') {
        setWatts(Math.floor(5100 + Math.random() * 320));
      } else if (activeMode === 'battery') {
        setWatts(Math.floor(2800 + Math.random() * 200));
      } else {
        setWatts(0);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [activeMode]);

  const bgClasses = isGreen
    ? 'bg-gradient-to-b from-[#062c1e] via-[#083825] to-[#062c1e]'
    : 'bg-gradient-to-b from-[#0a1428] via-[#0d1c36] to-[#091224]';

  const cardClasses = isGreen
    ? 'bg-[#042015]/90 border-emerald-500/30'
    : 'bg-[#061022]/90 border-slate-700/60 shadow-2xl';

  return (
    <section className={`py-20 text-white relative overflow-hidden transition-colors duration-500 ${bgClasses}`}>
      
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>{isMr ? 'सोलर ऊर्जा प्रवाह सिम्युलेशन' : 'Interactive Solar Energy Architecture'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit']">
            {isMr ? 'स्वच्छ ऊर्जा कशी तयार होते?' : 'How Your Rooftop Generates Clean Power'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            {isMr
              ? 'सूर्यकिरणांपासून ते तुमच्या फॅक्टरी आणि घरापर्यंत — प्रत्यक्ष ऊर्जा रूपांतरण आणि MSEDCL नेट-मीटरिंग प्रवाह पहा.'
              : 'From photons hitting monocrystalline cells to powering your home and exporting surplus back to the MSEDCL grid.'}
          </p>

          {/* Interactive Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              type="button"
              onClick={() => setActiveMode('day')}
              style={
                activeMode === 'day'
                  ? { backgroundColor: theme.primaryColor || '#f59e0b', color: '#ffffff' }
                  : {}
              }
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeMode === 'day'
                  ? 'shadow-lg scale-105'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-700 hover:border-amber-400'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>{isMr ? '☀️ दुपारचे कमाल उत्पादन' : '☀️ Day Peak (Max Export)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('battery')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeMode === 'battery'
                  ? 'bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/30 scale-105'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-700 hover:border-sky-400'
              }`}
            >
              <Battery className="w-4 h-4 text-sky-300" />
              <span>{isMr ? '🔋 बॅटरी चार्जिंग' : '🔋 Smart Storage Backup'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('night')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeMode === 'night'
                  ? 'bg-indigo-400 text-slate-950 shadow-lg shadow-indigo-400/30 scale-105'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-700 hover:border-indigo-400'
              }`}
            >
              <RefreshCw className="w-4 h-4 text-indigo-300" />
              <span>{isMr ? '🌙 रात्रीचा बॅटरी बॅकअप' : '🌙 Night Battery Mode'}</span>
            </button>
          </div>
        </div>

        {/* Animated Solar Canvas Card */}
        <div className={`rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden border ${cardClasses}`}>
          
          {/* Top Live Metrics HUD */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-6 border-b border-slate-800 text-center">
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-700/60">
              <span className="text-[11px] text-amber-300 uppercase tracking-wider block font-semibold">
                {isMr ? 'सोलर उत्पादन' : 'Solar Generation'}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-['Outfit'] block mt-1">
                {(watts / 1000).toFixed(2)} kW
              </span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-700/60">
              <span className="text-[11px] text-sky-300 uppercase tracking-wider block font-semibold">
                {isMr ? 'घराचा वीज वापर' : 'Direct Home Load'}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-sky-300 font-['Outfit'] block mt-1">
                1.85 kW
              </span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-700/60">
              <span className="text-[11px] text-emerald-300 uppercase tracking-wider block font-semibold">
                {isMr ? 'MSEDCL ग्रिड एक्स्पोर्ट' : 'Surplus Grid Export'}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-['Outfit'] block mt-1">
                {activeMode === 'day' ? '+3.35 kW' : activeMode === 'battery' ? '+0.95 kW' : '0.00 kW'}
              </span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-700/60">
              <span className="text-[11px] text-slate-300 uppercase tracking-wider block font-semibold">
                {isMr ? 'वीजबिल बचत' : 'Electricity Savings'}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] block mt-1">
                {activeMode === 'night' ? '88% Saved' : '100% Zero Bill'}
              </span>
            </div>
          </div>

          {/* Interactive Diagram Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
            
            {/* 1. Animated Sun with Photons */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-900/60 rounded-2xl border border-amber-500/30 relative">
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Outer Corona Glow */}
                <div className={`absolute inset-0 rounded-full blur-md transition-opacity duration-700 ${
                  activeMode === 'night' ? 'opacity-0 bg-transparent' : 'opacity-80 bg-amber-400/30 animate-pulse-glow'
                }`} />
                {/* Rotating Rays */}
                <div className={`absolute inset-1 border-2 border-dashed border-amber-400/50 rounded-full ${
                  activeMode === 'night' ? 'opacity-10' : 'animate-spin-slow'
                }`} />
                {/* Core Sun */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-700 ${
                  activeMode === 'night'
                    ? 'bg-slate-700 text-slate-400'
                    : 'bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 text-slate-950 shadow-amber-400/50 scale-110'
                }`}>
                  <Sun className={`w-9 h-9 ${activeMode !== 'night' ? 'animate-spin-slow-reverse' : ''}`} />
                </div>
              </div>

              <div className="text-center mt-3">
                <span className="font-bold text-amber-300 text-sm block">
                  {activeMode === 'night' ? (isMr ? 'रात्रीची वेळ (विश्रांती)' : 'Night Period') : (isMr ? 'तेजस्वी सूर्यप्रकाश' : 'High Solar Irradiance')}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {activeMode === 'night' ? '0 W/m²' : '1,050 W/m² (Peak)'}
                </span>
              </div>
            </div>

            {/* 2. Monocrystalline Solar Panel Array */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-900/60 rounded-2xl border border-sky-500/30 relative overflow-hidden group">
              {/* Shimmer sweep effect */}
              {activeMode !== 'night' && (
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-sky-300/20 to-transparent animate-shimmer-sweep pointer-events-none" />
              )}

              {/* Graphic Solar Panel */}
              <div className="w-full h-28 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 rounded-xl border-2 border-sky-400/60 p-2 shadow-inner relative flex flex-col justify-between">
                <div className="grid grid-cols-4 gap-1 h-full">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs border border-sky-400/30 transition-all duration-500 ${
                        activeMode !== 'night'
                          ? 'bg-gradient-to-br from-blue-600/40 to-sky-500/20'
                          : 'bg-slate-800/60'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-[10px] text-sky-300 font-mono text-center mt-1 flex items-center justify-center gap-1 font-bold">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Tier-1 Bifacial TOPCon</span>
                </div>
              </div>

              <div className="text-center mt-3">
                <span className="font-bold text-sky-200 text-sm block">
                  {isMr ? 'मोनोक्रिस्टलाइन सोलर पॅनेल्स' : 'Monocrystalline Solar PV'}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {isMr ? 'कार्यक्षमता २२.८% (DC पॉवर)' : '22.8% Module Efficiency (DC)'}
                </span>
              </div>
            </div>

            {/* 3. Smart Hybrid Inverter */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-900/60 rounded-2xl border border-slate-700/80 relative">
              <div className="w-24 h-28 bg-slate-950 border-2 border-slate-700 rounded-xl p-3 flex flex-col justify-between shadow-lg relative">
                <div className="flex items-center justify-between">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[9px] font-mono font-bold text-emerald-400">MPPT ACTIVE</span>
                </div>
                <div className="my-auto text-center font-mono text-xs text-amber-300 bg-slate-900 py-1 rounded-sm border border-slate-800">
                  {activeMode === 'night' ? 'INV STANDBY' : 'DC ➔ AC 230V'}
                </div>
                <div className="flex justify-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                </div>
              </div>

              <div className="text-center mt-3">
                <span className="font-bold text-slate-200 text-sm block">
                  {isMr ? 'स्मार्ट हायब्रिड इन्व्हर्टर' : 'Smart Hybrid Inverter'}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {isMr ? 'शुद्ध साइन वेव्ह रूपांतरण' : 'Pure Sine Wave AC Output'}
                </span>
              </div>
            </div>

            {/* 4. Dual Destination: House Load & MSEDCL Net Meter */}
            <div className="flex flex-col gap-3 p-4 bg-slate-900/80 rounded-2xl border border-slate-700/80">
              
              {/* Home Appliance Load */}
              <div className="flex items-center gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="w-10 h-10 rounded-lg bg-sky-950 flex items-center justify-center text-sky-300 shadow-sm shrink-0">
                  <Home className="w-5 h-5 text-amber-300" />
                </div>
                <div className="text-left leading-tight">
                  <span className="text-xs font-bold text-white block">
                    {isMr ? 'घर व उद्योग वीज वापर' : 'Property Power Load'}
                  </span>
                  <span className="text-[11px] text-sky-300">
                    {isMr ? '१००% मोफत सौर ऊर्जेवर' : 'Running on 100% Free Solar'}
                  </span>
                </div>
              </div>

              {/* MSEDCL Net Meter */}
              <div className="flex items-center gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-sm shrink-0">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-left leading-tight">
                  <span className="text-xs font-bold text-amber-300 block">
                    {isMr ? 'MSEDCL द्वि-मार्गी नेट-मीटर' : 'MSEDCL Net-Meter (Export)'}
                  </span>
                  <span className="text-[11px] text-slate-300">
                    {activeMode === 'day' ? (isMr ? 'मीटर उलटा फिरतोय (+ युनिट्स)' : 'Meter Spins Backward (Credits)') : (isMr ? 'शून्य ग्रिड अवलंबित्व' : 'Zero Grid Dependency')}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Trust & Feasibility Banner */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>
                {isMr
                  ? 'MNRE व MSEDCL मान्यताप्राप्त २५ वर्षांची सोलर पॅनेल वॉरंटी व संपूर्ण नेट-मीटरिंग परवानग्या.'
                  : 'MNRE & MSEDCL Approved with 25-Year Performance Warranty & Complete Net-Metering Approvals.'}
              </span>
            </div>

            <a
              href="#calculator"
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer group"
            >
              <span>{isMr ? 'तुमच्या छतावरील क्षमता मोजा' : 'Calculate Your Rooftop Potential'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
