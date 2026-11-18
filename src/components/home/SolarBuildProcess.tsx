'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Cpu, Wrench, Zap, Activity, CheckCircle2, ArrowRight, ShieldCheck, Layers } from 'lucide-react';

interface ProcessStep {
  id: number;
  icon: React.ElementType;
  code: string;
  titleEn: string;
  titleMr: string;
  timelineEn: string;
  timelineMr: string;
  descEn: string;
  descMr: string;
  deliverablesEn: string[];
  deliverablesMr: string[];
  engineeringSpecs: { labelEn: string; labelMr: string; value: string }[];
}

const STEPS: ProcessStep[] = [
  {
    id: 1,
    icon: MapPin,
    code: 'ENG-M1',
    titleEn: 'Site Survey & Shading Analysis',
    titleMr: 'साइट सर्व्हे व शैडो ॲनालिसिस',
    timelineEn: 'Day 1 — 2',
    timelineMr: 'दिवस १ — २',
    descEn: 'Certified solar engineers perform physical roof measurements, LiDAR shadow trajectory mapping, and MSEDCL distribution transformer (DT) capacity verification.',
    descMr: 'प्रमाणित सोलर अभियंते छताचे अचूक मोजमाप, सूर्यकिरण मार्ग व सावली विश्लेषण आणि महावितरण ट्रान्सफॉर्मर क्षमता तपासणी करतात.',
    deliverablesEn: [
      '3D Solar Shading Polygon Analysis',
      'Structural Roof Load Assessment',
      'MSEDCL Transformer Quota Check',
    ],
    deliverablesMr: [
      '३D सोलर सावलीमुक्त क्षेत्र विश्लेषण',
      'छताचे वजन क्षमता (Structural Load) मूल्यांकन',
      'महावितरण ट्रान्सफॉर्मर सबसिडी कोटा तपासणी',
    ],
    engineeringSpecs: [
      { labelEn: 'Measurement Precision', labelMr: 'मापन अचूकता', value: '±15 mm LiDAR' },
      { labelEn: 'Sun Path Range', labelMr: 'सूर्यकिरण वेळ', value: '9:00 AM – 4:30 PM' },
      { labelEn: 'Feasibility Report', labelMr: 'फिजिबिलिटी अहवाल', value: 'Within 24 Hours' },
    ],
  },
  {
    id: 2,
    icon: Cpu,
    code: 'ENG-M2',
    titleEn: 'PVsyst 3D Modeling & SLD Design',
    titleMr: 'PVsyst ३D मॉडेलिंग व SLD डिझाईन',
    timelineEn: 'Day 3 — 5',
    timelineMr: 'दिवस ३ — ५',
    descEn: 'Industrial-grade PVsyst simulation forecasts generation yields (P50/P90), optimal tilt angle, string configuration, and Single Line Diagram (SLD) ready for CEIG compliance.',
    descMr: 'PVsyst सॉफ्टवेअरद्वारे २५ वर्षांचे अचूक उत्पादन मॉडेलिंग, इष्टतम पॅनेल अँगल, स्ट्रिंग मांडणी आणि CEIG नियमांनुसार SLD तयार केली जाते.',
    deliverablesEn: [
      'AutoCAD Panel Placement Blueprint',
      'Single Line Diagram (SLD) for Approvals',
      '25-Year P50/P90 Yield Forecast Report',
    ],
    deliverablesMr: [
      'AutoCAD छतावरील पॅनेल मांडणी नकाशा',
      'महावितरण मंजुरीसाठी सिंगल लाइन डायग्राम (SLD)',
      '२५ वर्षांचा प्रत्यक्ष वीज उत्पादन अहवाल',
    ],
    engineeringSpecs: [
      { labelEn: 'Simulation Engine', labelMr: 'सिम्युलेशन इंजिन', value: 'PVsyst v7.4 Pro' },
      { labelEn: 'DC:AC Ratio', labelMr: 'DC:AC गुणोत्तर', value: '1.25x Optimized' },
      { labelEn: 'Yield Forecast', labelMr: 'वार्षिक उत्पादन', value: '1,500+ kWh/kWp' },
    ],
  },
  {
    id: 3,
    icon: Wrench,
    code: 'ENG-M3',
    titleEn: 'Turnkey Procurement & Installation',
    titleMr: 'दर्जेदार साहित्य खरेदी व उभारणी',
    timelineEn: 'Day 6 — 12',
    timelineMr: 'दिवस ६ — १२',
    descEn: 'Assembly of Tier-1 Monocrystalline Bifacial TOPCon modules on hot-dip galvanized mounting structures rated for 150 km/h wind speeds, with chemical earthing.',
    descMr: '१५० किमी/तास वादळी वाऱ्यास सक्षम हॉट-डिप गॅल्व्हनाइज्ड MMS स्ट्रक्चरवर Tier-1 Bifacial TOPCon मॉड्युल्स आणि केमिकल अर्थिंगसह अचूक इन्स्टॉलेशन.',
    deliverablesEn: [
      'Tier-1 Monocrystalline Bifacial Modules',
      'Hot-Dip Galvanized MMS (150 km/h Wind Rated)',
      'Pure Copper AC/DC Cabling + Chemical Earthing',
    ],
    deliverablesMr: [
      'Tier-1 मोनोक्रिस्टलाइन बायफेशिअल मॉड्यूल्स',
      'हॉट-डिप गॅल्व्हनाइज्ड फ्रेम (१५० किमी वारा क्षम)',
      'शुद्ध तांब्याची केबलिंग + ३-पॉइंट केमिकल अर्थिंग',
    ],
    engineeringSpecs: [
      { labelEn: 'Structure Coating', labelMr: 'स्ट्रक्चर कोटिंग', value: '80µm Hot-Dip GI' },
      { labelEn: 'Module Efficiency', labelMr: 'मॉड्यूल कार्यक्षमता', value: '22.8% Bifacial' },
      { labelEn: 'Surge Protection', labelMr: 'लाइटनिंग सुरक्षा', value: 'Class-II SPD / LA' },
    ],
  },
  {
    id: 4,
    icon: Zap,
    code: 'ENG-M4',
    titleEn: 'MSEDCL Net-Metering & CEIG Sync',
    titleMr: 'महावितरण नेट-मीटरिंग व ग्रीड जोडणी',
    timelineEn: 'Day 13 — 21',
    timelineMr: 'दिवस १३ — २१',
    descEn: 'Complete liaisoning with local MSEDCL circle office for technical sanction, CEIG inspection clearance, and bi-directional net-meter replacement so units spin backward.',
    descMr: 'महावितरण विभागाशी संपूर्ण तांत्रिक समन्वय, इन्स्पेक्शन मंजुरी आणि बाय-डायरेक्शनल नेट-मीटर बसवून ग्रिड जोडणी पूर्ण करणे.',
    deliverablesEn: [
      'MSEDCL Grid Synchronization Approval',
      'Bi-Directional Net-Meter Commissioning',
      'National Portal Direct Bank Subsidy (DBT) Claim',
    ],
    deliverablesMr: [
      'महावितरण ग्रिड समन्वय अधिकृत प्रमाणपत्र',
      'बाय-डायरेक्शनल नेट-मीटर प्रत्यक्ष चालू करणे',
      'नॅशनल पोर्टलवरून ₹७८,००० थेट बँक सबसिडी मंजुरी',
    ],
    engineeringSpecs: [
      { labelEn: 'Meter Type', labelMr: 'मीटर प्रकार', value: 'Bi-Directional 3-Ph' },
      { labelEn: 'Grid Standard', labelMr: 'ग्रिड मानके', value: 'IEEE 1547 / CEA' },
      { labelEn: 'Subsidy Support', labelMr: 'सबसिडी साहाय्य', value: '100% Turnkey DBT' },
    ],
  },
  {
    id: 5,
    icon: Activity,
    code: 'ENG-M5',
    titleEn: 'IoT SCADA Telemetry & 25-Yr O&M',
    titleMr: 'IoT SCADA मॉनिटरिंग व २५ वर्षे O&M',
    timelineEn: 'Handover & Day 1+',
    timelineMr: 'हस्तांतरण व २५ वर्षे',
    descEn: 'Plant telemetry is mapped to our cloud monitoring platform. Clients track real-time kW production, daily yield, and carbon offset from their mobile phone with guaranteed 99.2% uptime.',
    descMr: 'प्रकल्प थेट क्लाउड मॉनिटरिंगशी जोडला जातो. ग्राहक मोबाईलवर दैनंदिन वीजनिर्मिती, बचत पाहू शकतात. आमची O&M टीम ९९.२% अपटाइमची हमी देते.',
    deliverablesEn: [
      'Mobile App Cloud Telemetry Dashboard',
      'Annual Preventive Engineering Visits',
      '25-Year Linear Yield Performance Warranty',
    ],
    deliverablesMr: [
      'मोबाईल ॲप क्लाउड मॉनिटरिंग डॅशबोर्ड',
      'वार्षिक प्रतिबंधात्मक देखभाल (O&M) भेटी',
      '२५ वर्षे वीजनिर्मिती परफॉर्मन्स वॉरंटी',
    ],
    engineeringSpecs: [
      { labelEn: 'Telemetry Interval', labelMr: 'डेटा अपडेट', value: 'Every 5 Minutes' },
      { labelEn: 'Guaranteed Uptime', labelMr: 'अपटाइम हमी', value: '99.2% Contracted' },
      { labelEn: 'Yield Warranty', labelMr: 'परफॉर्मन्स वॉरंटी', value: '84.8% at Yr 25' },
    ],
  },
];

export const SolarBuildProcess: React.FC = () => {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const [activeStep, setActiveStep] = useState(1);

  const current = STEPS.find((s) => s.id === activeStep) || STEPS[0];
  const StepIcon = current.icon;

  return (
    <section id="process" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Subtle Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-amber-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>{isMr ? 'EPC कार्यप्रणाली मानके' : 'Standard Engineering Protocol'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            {isMr ? (
              <>
                सर्व्हे ते कमिशनिंग — <span className="text-shimmer">५ टप्प्यांत</span> सोलर प्रकल्प
              </>
            ) : (
              <>
                Concept to Grid Sync in <span className="text-shimmer">5 Precision Milestones</span>
              </>
            )}
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {isMr
              ? 'आमची संपूर्ण EPC अंमलबजावणी MNRE मार्गदर्शक तत्त्वे व आंतरराष्ट्रीय IEC मानकांनुसार पारदर्शक आणि वेळेत पूर्ण केली जाते.'
              : 'Our turnkey EPC execution adheres strictly to MNRE guidelines and IEC standards — delivering zero-compromise engineering quality.'}
          </p>
        </div>

        {/* Milestone Steps Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                className={`relative p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-900/95 border-amber-400 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'text-slate-500 bg-slate-800/50'
                    }`}
                  >
                    {step.code}
                  </span>
                </div>

                <div>
                  <span className={`text-[11px] font-bold block ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {isMr ? step.titleMr : step.titleEn}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                    {isMr ? step.timelineMr : step.timelineEn}
                  </span>
                </div>

                {isActive && (
                  <div className="absolute -bottom-[2px] left-4 right-4 h-[2px] bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Milestone Engineering Deliverable Card */}
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Scope & Deliverables */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold">
                  {current.code}
                </span>
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  {isMr ? current.timelineMr : current.timelineEn}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white">
                  {isMr ? current.titleMr : current.titleEn}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2.5">
                  {isMr ? current.descMr : current.descEn}
                </p>
              </div>

              {/* Verified Technical Deliverables */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {isMr ? 'अधिकृत तांत्रिक निष्पत्ती (Deliverables)' : 'Certified Technical Deliverables'}
                </h4>
                <div className="space-y-2">
                  {(isMr ? current.deliverablesMr : current.deliverablesEn).map((d, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 text-slate-200 text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-medium">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prev / Next milestone controls */}
              <div className="flex items-center gap-3 pt-4">
                {activeStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveStep((s) => s - 1)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer text-slate-300"
                  >
                    ← {isMr ? 'मागील टप्पा' : 'Previous Milestone'}
                  </button>
                )}
                {activeStep < STEPS.length ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep((s) => s + 1)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm transition-all cursor-pointer shadow-md hover:shadow-amber-400/20"
                  >
                    <span>{isMr ? 'पुढील टप्पा' : 'Next Milestone'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-lg hover:shadow-amber-400/30"
                  >
                    <span>{isMr ? 'प्रकल्प सुरू करा' : 'Initiate Project'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Engineering Specification HUD */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-7 space-y-6 shadow-inner relative overflow-hidden">
                {/* Header of HUD */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                        {current.code} Specification
                      </span>
                      <span className="text-xs font-bold text-white block">
                        {isMr ? 'गुणवत्ता तपासणी निकष' : 'Quality Compliance Standard'}
                      </span>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>

                {/* Key Technical Metric Chips */}
                <div className="space-y-4">
                  {current.engineeringSpecs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between"
                    >
                      <span className="text-xs text-slate-400 font-medium">
                        {isMr ? spec.labelMr : spec.labelEn}
                      </span>
                      <span className="text-xs sm:text-sm font-mono font-extrabold text-amber-300">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quality Assurance Guarantee Banner */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    MNRE / MSEDCL Compliant
                  </span>
                  <span className="font-mono text-slate-500 font-bold">ISO 9001:2015</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
