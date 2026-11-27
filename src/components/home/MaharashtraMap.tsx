'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { INDIA_STATE_PATHS, INDIA_MAP_VIEWBOX } from '@/lib/india-map-paths';
import { MapPin, ArrowRight, CheckCircle2, Globe2, Building2 } from 'lucide-react';

interface StatePresence {
  id: string;
  order: number;
  name: { en: string; mr: string };
  badge: { en: string; mr: string };
  role: { en: string; mr: string };
  hubs: { en: string; mr: string };
  segments: { en: string[]; mr: string[] };
  summary: { en: string; mr: string };
  // Percentage coordinates matching viewBox 600 x 660
  pinX: number;
  pinY: number;
  labelSide: 'left' | 'right' | 'top' | 'bottom';
}

const PRESENCE_STATES: StatePresence[] = [
  {
    id: 'maharashtra',
    order: 1,
    name: { en: 'Maharashtra', mr: 'महाराष्ट्र' },
    badge: { en: 'Headquarters & Flagship EPC Hub', mr: 'मुख्यालय व प्रमुख EPC केंद्र' },
    role: { en: 'Pune HQ · Satara / Karad Branch · 13 MW Utility', mr: 'पुणे मुख्यालय · सातारा/कराड शाखा · १३ MW युटिलिटी' },
    hubs: { en: 'Pune, Sangli (Tasgaon & Jath), Satara, Karad, Chakan MIDC', mr: 'पुणे, सांगली (तासगाव व जत), सातारा, कराड, चाकण MIDC' },
    segments: {
      en: ['13 MW Utility-Scale Solar Parks', 'C&I Industrial & Institutional Rooftops', 'PM Surya Ghar & Housing Societies', 'PM-KUSUM Agri-Solar'],
      mr: ['१३ MW युटिलिटी सोलर पार्क', 'औद्योगिक व शैक्षणिक रूफटॉप सोलर', 'पीएम सूर्य घर व गृहनिर्माण सोसायट्या', 'पीएम-कुसुम कृषी सोलर'],
    },
    summary: {
      en: 'Home to our Pune headquarters, 70+ SwayamUrja-MITRA engineering team, 13 MW utility parks in Sangli, and flagship institutional & hospitality installations across Pune and Karad.',
      mr: 'पुणे मुख्यालय, ७०+ स्वयम्ऊर्जा-मित्र अभियांत्रिकी टीम, सांगलीतील १३ MW युटिलिटी प्रकल्प आणि पुणे-कराडमधील नामवंत व्यावसायिक व शैक्षणिक प्रकल्पांचे मुख्य केंद्र.',
    },
    pinX: 29.5,
    pinY: 56.2,
    labelSide: 'top',
  },
  {
    id: 'goa',
    order: 2,
    name: { en: 'Goa', mr: 'गोवा' },
    badge: { en: 'Coastal Commercial & Hospitality EPC', mr: 'किनारी व्यावसायिक व हॉस्पिटॅलिटी EPC' },
    role: { en: 'Commercial, Hospitality & Residential Rooftop', mr: 'व्यावसायिक, हॉटेल आणि निवासी रूफटॉप' },
    hubs: { en: 'Panaji, Margao, Verna Industrial Estate', mr: 'पणजी, मडगाव, वेर्णा औद्योगिक वसाहत' },
    segments: {
      en: ['Corrosion-Resistant Coastal Mounting', 'Hotels, Resorts & Institutional Rooftops', 'Commercial Net-Metered Solar'],
      mr: ['किनारपट्टीसाठी गंज-प्रतिरोधक माउंटिंग', 'हॉटेल्स, रिसॉर्ट्स व संस्थात्मक रूफटॉप', 'व्यावसायिक नेट-मीटरिंग सोलर'],
    },
    summary: {
      en: 'Engineered for high-salinity coastal conditions with marine-grade galvanized structures powering hospitality, industrial estates, and commercial roofs across Goa.',
      mr: 'समुद्रकिनाऱ्याच्या हवामानासाठी खास गंज-प्रतिरोधक संरचनेसह गोव्यातील हॉटेल्स, औद्योगिक वसाहती आणि व्यावसायिक इमारतींसाठी उच्च-कार्यक्षम सोलर प्रकल्प.',
    },
    pinX: 21.7,
    pinY: 68.0,
    labelSide: 'left',
  },
  {
    id: 'karnataka',
    order: 3,
    name: { en: 'Karnataka', mr: 'कर्नाटक' },
    badge: { en: 'Southern Industrial & Utility Corridor', mr: 'दक्षिण औद्योगिक व युटिलिटी कॉरिडॉर' },
    role: { en: 'Industrial C&I, Open-Access & Commercial EPC', mr: 'औद्योगिक C&I, ओपन-अ‍ॅक्सेस आणि व्यावसायिक EPC' },
    hubs: { en: 'Belagavi, Hubballi-Dharwad, Bengaluru Region', mr: 'बेळगाव, हुबळी-धारवाड, बेंगळुरू विभाग' },
    segments: {
      en: ['C&I Manufacturing Rooftop Plants', 'Ground-Mounted Open Access Solar', 'SCADA & Preventive O&M'],
      mr: ['औद्योगिक कारखाना रूफटॉप प्लांट्स', 'ग्राउंड-माउंटेड ओपन अ‍ॅक्सेस सोलर', 'SCADA व प्रतिबंधात्मक O&M सेवा'],
    },
    summary: {
      en: 'Serving industrial manufacturing clusters and commercial campuses across northern and central Karnataka with turnkey engineering, statutory approvals, and long-term O&M.',
      mr: 'उत्तर व मध्य कर्नाटकातील औद्योगिक कारखाने आणि व्यावसायिक संकुलांसाठी टर्नकी सोलर अभियांत्रिकी, शासकीय मान्यता आणि दीर्घकालीन देखभाल सेवा.',
    },
    pinX: 29.7,
    pinY: 69.2,
    labelSide: 'bottom',
  },
  {
    id: 'telangana',
    order: 4,
    name: { en: 'Telangana', mr: 'तेलंगणा' },
    badge: { en: 'Industrial & C&I Solar Execution', mr: 'औद्योगिक व C&I सोलर अंमलबजावणी' },
    role: { en: 'High-Capacity Industrial & Enterprise Solar', mr: 'उच्च-क्षमतेचे औद्योगिक व एंटरप्राइझ सोलर' },
    hubs: { en: 'Hyderabad Industrial Corridor & Surrounding Zones', mr: 'हैदराबाद औद्योगिक कॉरिडॉर व परिसर' },
    segments: {
      en: ['Megawatt-Scale Industrial Shed Rooftops', '40% Accelerated Depreciation C&I Projects', 'HT / LT Synchronized Grid Integration'],
      mr: ['मेगावॅट-स्तरीय औद्योगिक शेड रूफटॉप', '४०% प्राप्तिकर घसारा लाभ प्रकल्प', 'HT / LT सिंक्रोनाइझ्ड ग्रिड जोडणी'],
    },
    summary: {
      en: 'Delivering high-yield industrial and manufacturing solar plants across Telangana with Tier-1 bifacial modules and rapid payback financial engineering.',
      mr: 'तेलंगणातील औद्योगिक उत्पादन युनिट्ससाठी टियर-१ बायफेशियल मॉड्युल्ससह जलद परतावा देणारे उच्च-कार्यक्षम सौर ऊर्जा प्रकल्प.',
    },
    pinX: 38.1,
    pinY: 60.4,
    labelSide: 'right',
  },
  {
    id: 'andhra-pradesh',
    order: 5,
    name: { en: 'Andhra Pradesh', mr: 'आंध्र प्रदेश' },
    badge: { en: 'Utility & Commercial Solar Presence', mr: 'युटिलिटी व व्यावसायिक सोलर उपस्थिती' },
    role: { en: 'Utility Solar, Wind-Solar Hybrid & C&I EPC', mr: 'युटिलिटी सोलर, पवन-सौर हायब्रिड व C&I EPC' },
    hubs: { en: 'Rayalaseema, Vijayawada & Industrial Belts', mr: 'रायलसीमा, विजयवाडा व औद्योगिक पट्टे' },
    segments: {
      en: ['Ground-Mounted Utility Solar Parks', 'Solar-Wind Hybrid Advisory & EPC', 'Industrial Captive Power Plants'],
      mr: ['ग्राउंड-माउंटेड युटिलिटी सोलर पार्क', 'सोलर-विंड हायब्रिड सल्ला व EPC', 'औद्योगिक कॅप्टिव्ह पॉवर प्लांट्स'],
    },
    summary: {
      en: 'Leveraging high solar irradiance across Andhra Pradesh for utility-scale ground-mounted plants, hybrid renewable projects, and commercial captive power.',
      mr: 'आंध्र प्रदेशातील मुबलक सूर्यप्रकाशाचा लाभ घेत युटिलिटी-स्केल ग्राउंड-माउंटेड प्रकल्प, हायब्रिड ऊर्जा आणि औद्योगिक कॅप्टिव्ह सोलर उभारणी.',
    },
    pinX: 40.9,
    pinY: 67.8,
    labelSide: 'right',
  },
  {
    id: 'gujarat',
    order: 6,
    name: { en: 'Gujarat', mr: 'गुजरात' },
    badge: { en: 'Western Industrial & Hybrid Belt', mr: 'पश्चिम औद्योगिक व हायब्रिड पट्टा' },
    role: { en: 'Industrial C&I, Wind-Solar Hybrid & BESS', mr: 'औद्योगिक C&I, सोलर-विंड हायब्रिड व BESS' },
    hubs: { en: 'Surat, Vadodara, Ahmedabad & Kutch Corridor', mr: 'सुरत, वडोदरा, अहमदाबाद व कच्छ कॉरिडॉर' },
    segments: {
      en: ['Textile, Chemical & Engineering Factory Solar', 'Solar-Wind Hybrid & BESS Integration', 'High-Efficiency Industrial EPC'],
      mr: ['टेक्सटाईल, केमिकल व अभियांत्रिकी कारखाने', 'सोलर-विंड हायब्रिड व BESS एकात्मता', 'उच्च-कार्यक्षम औद्योगिक EPC'],
    },
    summary: {
      en: 'Supporting Gujarat’s manufacturing hubs with large-scale industrial rooftops, hybrid solar-wind advisory, and battery energy storage engineering.',
      mr: 'गुजरातमधील उत्पादन केंद्रांसाठी मोठे औद्योगिक रूफटॉप, सोलर-विंड हायब्रिड सल्ला आणि बॅटरी एनर्जी स्टोरेज (BESS) अभियांत्रिकी सेवा.',
    },
    pinX: 14.3,
    pinY: 45.5,
    labelSide: 'left',
  },
  {
    id: 'rajasthan',
    order: 7,
    name: { en: 'Rajasthan', mr: 'राजस्थान' },
    badge: { en: 'High-Irradiance Utility & Open Access', mr: 'उच्च सूर्यप्रकाश युटिलिटी व ओपन अ‍ॅक्सेस' },
    role: { en: 'Utility-Scale Ground Mount & Advisory', mr: 'युटिलिटी-स्केल ग्राउंड माउंट व सल्लागार सेवा' },
    hubs: { en: 'Jodhpur, Bikaner, Jaipur Industrial Belt', mr: 'जोधपूर, बिकानेर, जयपूर औद्योगिक पट्टा' },
    segments: {
      en: ['Multi-MW Ground-Mounted Solar Parks', 'Desert-Grade Dust & Thermal Engineering', 'Owner’s Engineering & Project Advisory'],
      mr: ['मल्टी-MW ग्राउंड-माउंटेड सोलर पार्क', 'वाळवंटी उष्णता व धूळ-प्रतिरोधक डिझाइन', 'प्रकल्प सल्लागार व अभियांत्रिकी सेवा'],
    },
    summary: {
      en: 'High-yield desert-grade solar engineering and utility project development across India’s highest solar irradiance corridor.',
      mr: 'भारतातील सर्वाधिक सूर्यप्रकाश असलेल्या राजस्थानात उष्णता-प्रतिरोधक युटिलिटी सोलर पार्क व अभियांत्रिकी प्रकल्प विकास.',
    },
    pinX: 24.7,
    pinY: 34.8,
    labelSide: 'top',
  },
];

const ACTIVE_STATE_IDS = new Set(PRESENCE_STATES.map((s) => s.id));

export const MaharashtraMap: React.FC = () => {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const [selectedId, setSelectedId] = useState<string>('maharashtra');
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Respect prefers-reduced-motion: show pins immediately without stagger animation
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const selectedState = PRESENCE_STATES.find((s) => s.id === selectedId) || PRESENCE_STATES[0];

  const getLabelPositionClass = (side: StatePresence['labelSide']) => {
    switch (side) {
      case 'left':
        return 'right-full mr-1.5 top-1/2 -translate-y-1/2';
      case 'right':
        return 'left-full ml-1.5 top-1/2 -translate-y-1/2';
      case 'bottom':
        return 'top-full mt-1 left-1/2 -translate-x-1/2';
      case 'top':
      default:
        return 'bottom-full mb-1 left-1/2 -translate-x-1/2';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="solapur-map"
      className="py-20 sm:py-24 bg-slate-900 text-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-emerald-400 text-xs font-medium border border-slate-700">
            <Globe2 className="w-3.5 h-3.5" />
            <span>{isMr ? 'भारतातील ७ राज्यांमध्ये उपस्थिती' : 'Pan-India Presence Across 7 States'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-['Outfit'] tracking-tight">
            {isMr ? 'आमची भारतभरातील सौर ऊर्जा उपस्थिती' : 'States Where We Have a Presence'}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {isMr
              ? 'महाराष्ट्र, गोवा, कर्नाटक, तेलंगणा, आंध्र प्रदेश, गुजरात आणि राजस्थान — ६१०+ पूर्ण प्रकल्प आणि १,६००+ MW अनुभव.'
              : 'Delivering turnkey Solar EPC, C&I rooftops, and utility-scale renewable plants across 7 Indian states — 610+ projects completed.'}
          </p>
        </div>

        {/* Main Grid: Full India Map (Left 7 cols) + Active State Details (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* LEFT: Full India Interactive SVG Map with Scroll-Triggered Staggered SwayamUrja Logo Pins */}
          <div className="lg:col-span-7">
            <div className="relative bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-6">
              {/* Top Legend Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-2 border-b border-slate-800/80 text-xs text-slate-400">
                <span className="font-medium text-slate-200">
                  {isMr ? 'सक्रिय राज्यावर क्लिक करा:' : 'Select any highlighted state:'}
                </span>
                <div className="flex items-center gap-4 tabular-nums">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block" />
                    <span>{isMr ? 'स्वयम्ऊर्जा उपस्थिती (७ राज्ये)' : 'SwayamUrja Presence (7 States)'}</span>
                  </span>
                </div>
              </div>

              {/* Aspect-Locked Map Stage (exact 600:660 viewBox ratio -> zero CLS) */}
              <div className="relative w-full max-w-[540px] mx-auto aspect-[600/660]">
                <svg
                  viewBox={INDIA_MAP_VIEWBOX}
                  role="img"
                  aria-label={isMr ? 'भारताचा नकाशा — स्वयम्ऊर्जा उपस्थिती असलेली ७ राज्ये' : 'Map of India highlighting 7 states where SwayamUrja has a presence'}
                  className="w-full h-full block"
                >
                  {INDIA_STATE_PATHS.map((st) => {
                    const isPresence = ACTIVE_STATE_IDS.has(st.id);
                    const isSelected = st.id === selectedId;
                    return (
                      <path
                        key={st.id}
                        d={st.d}
                        onClick={isPresence ? () => setSelectedId(st.id) : undefined}
                        className={isPresence ? 'cursor-pointer transition-colors duration-200' : ''}
                        fill={
                          isSelected
                            ? '#059669'
                            : isPresence
                              ? '#115e43'
                              : '#182234'
                        }
                        stroke={
                          isSelected
                            ? '#f59e0b'
                            : isPresence
                              ? '#34d399'
                              : '#2a3852'
                        }
                        strokeWidth={isSelected ? 1.8 : isPresence ? 1.1 : 0.7}
                      >
                        <title>{st.name}</title>
                      </path>
                    );
                  })}
                </svg>

                {/* 7 Scroll-Triggered Staggered Pop-Up SwayamUrja Logo Pins */}
                {PRESENCE_STATES.map((st, idx) => {
                  const isSelected = st.id === selectedId;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedId(st.id)}
                      onMouseEnter={() => setSelectedId(st.id)}
                      aria-pressed={isSelected}
                      aria-label={`${st.name[language]} — ${st.badge[language]}`}
                      style={{
                        left: `${st.pinX}%`,
                        top: `${st.pinY}%`,
                        transitionDelay: inView ? `${idx * 95}ms` : '0ms',
                        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer transition-[transform,opacity] duration-500 ${
                        isSelected ? 'z-30' : 'z-20 hover:z-30'
                      } ${
                        inView
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-50 translate-y-3'
                      }`}
                    >
                      {/* SwayamUrja Logo Emblem Pin */}
                      <span
                        className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-md border-2 transition-[border-color,transform] duration-150 ${
                          isSelected
                            ? 'border-amber-400 ring-4 ring-amber-400/25 scale-110'
                            : 'border-emerald-500 group-hover:border-amber-300'
                        }`}
                      >
                        <Image
                          src="/assets/logo-emblem.webp"
                          alt=""
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain"
                          unoptimized
                        />
                      </span>

                      {/* State Name Tag */}
                      <span
                        className={`pointer-events-none absolute whitespace-nowrap px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold border shadow-sm transition-colors duration-150 ${getLabelPositionClass(st.labelSide)} ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-300'
                            : 'bg-slate-900/95 text-slate-100 border-slate-700 group-hover:border-emerald-400'
                        }`}
                      >
                        {st.name[language]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Numbered 7-State Selector Strip */}
              <div className="pt-4 mt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-2">
                {PRESENCE_STATES.map((st) => {
                  const isSelected = st.id === selectedId;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedId(st.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer tabular-nums ${
                        isSelected
                          ? 'bg-emerald-700 text-white border-amber-400'
                          : 'bg-slate-900 text-slate-300 border-slate-700/80 hover:border-slate-500 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] text-amber-300 font-semibold">{st.order}.</span>
                      <span>{st.name[language]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Selected State Presence Details Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              {/* Header */}
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-medium">
                  <Image
                    src="/assets/logo-emblem.webp"
                    alt=""
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                    unoptimized
                  />
                  <span>{selectedState.badge[language]}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit'] flex items-center gap-2">
                  <span>{selectedState.name[language]}</span>
                </h3>

                <p className="text-xs sm:text-sm font-medium text-emerald-400 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>{selectedState.role[language]}</span>
                </p>

                <p className="text-slate-300 text-sm leading-relaxed pt-1">
                  {selectedState.summary[language]}
                </p>
              </div>

              {/* Key Regions */}
              <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-700/80">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isMr ? 'प्रमुख कार्यक्षेत्र व शहरे' : 'Key Operating Regions'}</span>
                </span>
                <span className="text-sm font-semibold text-white">
                  {selectedState.hubs[language]}
                </span>
              </div>

              {/* Active Solar Segments */}
              <div className="space-y-2.5">
                <div className="text-xs font-medium text-slate-400">
                  {isMr ? 'सौर ऊर्जा सेवा विभाग' : 'Active Solar EPC Capabilities'}
                </div>
                <ul className="space-y-2">
                  {selectedState.segments[language].map((seg, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{seg}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-slate-700 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-400 tabular-nums">
                  {isMr ? '७ राज्ये · ६१०+ पूर्ण प्रकल्प' : '7 States · 610+ Projects Completed'}
                </span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
                >
                  <span>
                    {isMr
                      ? `${selectedState.name.mr} साठी चौकशी करा`
                      : `Enquire for ${selectedState.name.en}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
