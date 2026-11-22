'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Home, Factory, Zap, Wind, BatteryCharging, Wrench, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    icon: Home,
    color: 'emerald',
    titleEn: 'Residential Rooftop Solar',
    titleMr: 'घरगुती रूफटॉप सोलर',
    descEn: 'On-grid rooftop solar for homes with PM Surya Ghar subsidy, MSEDCL net-metering approval, and complete turnkey execution.',
    descMr: 'घरांसाठी ऑन-ग्रिड सोलर. PM सूर्य घर सबसिडी व MSEDCL नेट-मीटरिंग मदतीसह संपूर्ण टर्नकी इंस्टॉलेशन.',
    highlight: '₹78,000 Subsidy',
    fallbackBg: 'from-amber-400/20 to-orange-400/10',
  },
  {
    icon: Factory,
    color: 'blue',
    titleEn: 'Commercial & Industrial',
    titleMr: 'व्यावसायिक व औद्योगिक',
    descEn: 'Large-scale C&I solar for factories, MIDC units, and commercial buildings. 40% accelerated tax depreciation available.',
    descMr: 'कारखाने, MIDC युनिट्स व व्यावसायिक इमारतींसाठी मोठे सोलर. ४०% कर घसारा लाभ उपलब्ध.',
    highlight: '40% Tax Depreciation',
    fallbackBg: 'from-blue-400/20 to-indigo-400/10',
  },
  {
    icon: Zap,
    color: 'violet',
    titleEn: 'Utility Scale Projects',
    titleMr: 'युटिलिटी स्केल प्रकल्प',
    descEn: "Ground-mounted multi-MW solar farms like our 13 MW Sangli flagship parks powering Maharashtra's grid.",
    descMr: 'ग्राउंड-माउंटेड मल्टी-MW सोलर फार्म. सांगली येथील आमचे १३ MW प्रकल्प महाराष्ट्राच्या ग्रीडला वीज पुरवतात.',
    highlight: '13 MW Utility Parks',
    fallbackBg: 'from-violet-400/20 to-purple-400/10',
  },
  {
    icon: Wind,
    color: 'teal',
    titleEn: 'Solar-Wind Hybrid',
    titleMr: 'सोलर-विंड हायब्रिड',
    descEn: 'Combined solar + wind energy systems for 24/7 clean power generation even during low-sunlight or monsoon periods.',
    descMr: 'सोलर + विंड एकत्रित प्रणाली. पावसाळ्यातही २४/७ स्वच्छ ऊर्जा निर्मिती.',
    highlight: '24/7 Hybrid Power',
    fallbackBg: 'from-teal-400/20 to-cyan-400/10',
  },
  {
    icon: BatteryCharging,
    color: 'rose',
    titleEn: 'Battery Energy Storage',
    titleMr: 'बॅटरी स्टोरेज (BESS)',
    descEn: 'Lithium-ion BESS systems for peak shaving, backup power, and maximising solar self-consumption. No power cuts.',
    descMr: 'लिथियम-आयन BESS प्रणाली. पीक शेव्हिंग, बॅकअप पॉवर आणि सोलर स्व-वापर वाढवण्यासाठी.',
    highlight: 'Zero Power Cuts',
    fallbackBg: 'from-rose-400/20 to-pink-400/10',
  },
  {
    icon: Wrench,
    color: 'amber',
    titleEn: 'O&M & Asset Management',
    titleMr: 'O&M व मालमत्ता व्यवस्थापन',
    descEn: 'Cloud SCADA monitoring, quarterly preventive maintenance, cleaning schedules, and performance guarantee contracts.',
    descMr: 'क्लाउड SCADA मॉनिटरिंग, त्रैमासिक PM भेटी, सफाई वेळापत्रक आणि परफॉर्मन्स गॅरंटी करार.',
    highlight: '99.2% Uptime SLA',
    fallbackBg: 'from-amber-400/20 to-yellow-400/10',
  },
];

const colorMap: Record<string, { badge: string, icon: string, border: string, link: string }> = {
  emerald: { badge: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: 'bg-emerald-800 text-amber-300 group-hover:bg-emerald-700', border: 'hover:border-emerald-300', link: 'text-emerald-800 hover:text-emerald-950' },
  blue:    { badge: 'bg-blue-50 text-blue-800 border-blue-200',         icon: 'bg-blue-800 text-amber-300 group-hover:bg-blue-700',     border: 'hover:border-blue-300',    link: 'text-blue-800 hover:text-blue-950' },
  violet:  { badge: 'bg-violet-50 text-violet-800 border-violet-200',   icon: 'bg-violet-800 text-amber-300 group-hover:bg-violet-700', border: 'hover:border-violet-300',  link: 'text-violet-800 hover:text-violet-950' },
  teal:    { badge: 'bg-teal-50 text-teal-800 border-teal-200',         icon: 'bg-teal-800 text-amber-300 group-hover:bg-teal-700',     border: 'hover:border-teal-300',    link: 'text-teal-800 hover:text-teal-950' },
  rose:    { badge: 'bg-rose-50 text-rose-800 border-rose-200',         icon: 'bg-rose-800 text-amber-300 group-hover:bg-rose-700',     border: 'hover:border-rose-300',    link: 'text-rose-800 hover:text-rose-950' },
  amber:   { badge: 'bg-amber-50 text-amber-900 border-amber-200',      icon: 'bg-amber-800 text-amber-100 group-hover:bg-amber-700',   border: 'hover:border-amber-300',   link: 'text-amber-900 hover:text-amber-950' },
};

export const ServicesSection: React.FC = () => {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  return (
    <section id="services" className="py-24 bg-[#f8faf9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest border border-emerald-200">
            <Zap className="w-3.5 h-3.5 text-emerald-600 animate-lightning" />
            {isMr ? 'आमच्या सेवा' : 'Our Services'}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit'] leading-tight">
            {isMr
              ? <>संपूर्ण सोलर <span className="text-emerald-700">EPC उपाय</span></>
              : <>Complete Solar <span className="text-emerald-700">EPC Solutions</span></>
            }
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            {isMr
              ? 'घरांपासून मेगावॅट प्रकल्पांपर्यंत — स्वयम्ऊर्जा प्रत्येक गरजेसाठी सोलर उपाय देते.'
              : 'From homes to megawatt-scale projects — SwayamUrja delivers solar solutions for every need.'}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((item, idx) => {
            const Icon = item.icon;
            const c = colorMap[item.color];
            return (
              <div
                key={idx}
                className={`premium-card group rounded-3xl overflow-hidden flex flex-col ${c.border} transition-all duration-300`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Top colour strip with emoji */}
                <div className={`h-2 bg-gradient-to-r ${item.fallbackBg}`} />

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon + badge row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-13 h-13 rounded-2xl ${c.icon} flex items-center justify-center transition-all duration-300 shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${c.badge}`}>
                      {item.highlight}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-extrabold text-slate-900 font-['Outfit'] mb-2 group-hover:text-emerald-800 transition-colors">
                    {isMr ? item.titleMr : item.titleEn}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">
                    {isMr ? item.descMr : item.descEn}
                  </p>

                  {/* CTA */}
                  <a href="#contact"
                    className={`inline-flex items-center gap-2 text-sm font-bold pt-4 border-t border-slate-100 ${c.link} transition-all duration-200`}>
                    <span>{isMr ? 'कोटेशन मिळवा' : 'Request Proposal'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom trust row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: '1,600+ MW', l: isMr ? 'विकसित पवन व सौर' : 'Wind & Solar Developed' },
            { n: '25+ Yrs', l: isMr ? 'ऊर्जा नेतृत्व अनुभव' : 'Sector Leadership' },
            { n: '100%', l: isMr ? 'MSEDCL मान्यता' : 'MSEDCL Approvals' },
            { n: '25 Yrs', l: isMr ? 'पॅनेल वॉरंटी' : 'Panel Warranty' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl font-extrabold text-emerald-700 font-['Outfit']">{s.n}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">{s.l}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
