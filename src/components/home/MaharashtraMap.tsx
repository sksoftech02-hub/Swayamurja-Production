'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Factory, Zap, ShieldCheck, Sun, CheckCircle, ArrowRight } from 'lucide-react';

interface ProjectNode {
  id: string;
  name: { en: string; mr: string };
  badge: { en: string; mr: string };
  capacity: string;
  location: { en: string; mr: string };
  annualYield: string;
  gridSubstation: string;
  description: { en: string; mr: string };
}

const PROJECT_NODES: ProjectNode[] = [
  {
    id: 'solapur',
    name: { en: '13 MW Utility Scale Solar Plant', mr: '१३ मेगावॅट भव्य युटिलिटी स्केल सोलर प्लांट' },
    badge: { en: 'FLAGSHIP UTILITY EPC', mr: 'प्रमुख युटिलिटी EPC प्रकल्प' },
    capacity: '13,000 kW (13 MW)',
    location: { en: 'Solapur, Maharashtra', mr: 'सोलापूर, महाराष्ट्र' },
    annualYield: '21.5 GWh / Year',
    gridSubstation: '33 kV Dedicated Substation',
    description: {
      en: 'Turnkey concept-to-commissioning ground-mounted photovoltaic project covering over 50 acres. Generates over 21 million clean units annually with high-performance string inverters and automated weather station integration.',
      mr: 'टर्नकी संकल्पनेपासून कार्यान्वित केलेला ५० एकराहून अधिक जमिनीवरील भव्य सोलर प्रकल्प. दरवर्षी २१ दशलक्षाहून अधिक युनिट्स वीजनिर्मिती, स्ट्रिंग इन्व्हर्टर्स आणि स्वयंचलित हवामान केंद्रासह.'
    }
  },
  {
    id: 'pune',
    name: { en: 'Pune Auto Hub Rooftop Solar Installations', mr: 'पुणे ऑटो हब रूफटॉप सोलर प्रकल्प' },
    badge: { en: 'COMMERCIAL ROOFTOP', mr: 'औद्योगिक रूफटॉप प्रकल्प' },
    capacity: '8,500 kW Aggregate',
    location: { en: 'Chakan & Bhosari MIDC, Pune', mr: 'चाकण व भोसरी MIDC, पुणे' },
    annualYield: '12.8 GWh / Year',
    gridSubstation: '415V / 11 kV HT Synchronous',
    description: {
      en: 'Over 8.5 MW aggregate rooftop installations across Chakan, Bhosari, and Talegaon industrial corridors for automotive component manufacturers, reducing factory diesel generator dependence.',
      mr: 'चाकण, भोसरी आणि तळेगाव एमआयडीसीतील ऑटोमोबाईल कारखान्यांसाठी ८.५ मेगावॅटपेक्षा जास्त रूफटॉप सोलर, डिझेल जनरेटरवरील अवलंबित्व पूर्णपणे कमी.'
    }
  },
  {
    id: 'satara',
    name: { en: 'Satara Agro-Photovoltaics & Solar Pumping', mr: 'सातारा कृषी-सोलर व पंपिंग प्रकल्प' },
    badge: { en: 'AGRI-SOLAR & PM-KUSUM', mr: 'कृषी-सोलर व पीएम-कुसुम' },
    capacity: '2,500 kW (2.5 MW)',
    location: { en: 'Satara District, Maharashtra', mr: 'सातारा जिल्हा, महाराष्ट्र' },
    annualYield: '3.9 GWh / Year',
    gridSubstation: '11 kV Rural Feeder',
    description: {
      en: 'Integrated agricultural solar power plant powering drip irrigation networks under PM-KUSUM. Elevated mounting structures allow farmers to grow sugarcane and cash crops underneath.',
      mr: 'पीएम-कुसुम अंतर्गत ठिबक सिंचन नेटवर्कला वीजपुरवठा करणारा एकात्मिक कृषी सौर प्रकल्प. उंचावलेल्या रचनेमुळे शेतकरी खाली ऊस आणि भाजीपाला पिके घेऊ शकतात.'
    }
  },
  {
    id: 'sambhaji',
    name: { en: 'Chh. Sambhaji Nagar Industrial Solar', mr: 'छ. संभाजीनगर औद्योगिक सोलर प्रकल्प' },
    badge: { en: 'INDUSTRIAL CAPTIVE', mr: 'औद्योगिक कॅप्टिव्ह' },
    capacity: '3,200 kW (3.2 MW)',
    location: { en: 'Shendra MIDC, Chh. Sambhaji Nagar', mr: 'शेंद्रा MIDC, छ. संभाजीनगर' },
    annualYield: '5.1 GWh / Year',
    gridSubstation: '22 kV Substation Feed',
    description: {
      en: 'Heavy engineering plant solar solution with automated robotic cleaning to counter dry regional dust and maintain 99.4% peak generation efficiency.',
      mr: 'कोरड्या धुळीच्या वातावरणातही ९९.४% उच्च वीजनिर्मिती क्षमता राखण्यासाठी रोबोटिक क्लिनिंगसह अवजड उद्योगासाठी तयार केलेला सोलर प्रकल्प.'
    }
  }
];

export const MaharashtraMap: React.FC = () => {
  const { t, language } = useLanguage();
  const isMr = language === 'mr';
  const [selectedId, setSelectedId] = useState<string>('solapur');

  const selectedNode = PROJECT_NODES.find((n) => n.id === selectedId) || PROJECT_NODES[0];

  return (
    <section id="solapur-map" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-800">
            <Factory className="w-3.5 h-3.5" />
            <span>{t('map_tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit']">
            {t('map_title')}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t('map_subtitle')}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: District Interactive Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              {isMr ? 'प्रमुख प्रकल्प निवडा:' : 'Select Landmark Project:'}
            </div>

            {PROJECT_NODES.map((node) => {
              const isActive = node.id === selectedId;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedId(node.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-900/90 border-amber-400 shadow-lg scale-102'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                      {node.badge[language]}
                    </span>
                    <h4 className="text-base font-bold text-white font-['Outfit']">
                      {node.name[language]}
                    </h4>
                    <span className="text-xs text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {node.location[language]}
                    </span>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <span className="text-lg font-extrabold text-amber-300 font-['Outfit'] block">
                      {node.capacity}
                    </span>
                    <span className="text-[11px] text-emerald-300">
                      {isActive ? (isMr ? 'निवडलेले ✓' : 'Selected ✓') : (isMr ? 'तपशील पहा →' : 'View Specs →')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Project Detailed Showcase Card */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-700/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

              {/* Tag & Title */}
              <div className="space-y-3 mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Sun className="w-3.5 h-3.5" />
                  <span>{selectedNode.badge[language]}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                  {selectedNode.name[language]}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedNode.description[language]}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 pb-8 border-b border-slate-700">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">
                    {isMr ? 'एकूण स्थापित क्षमता' : 'Commissioned Capacity'}
                  </span>
                  <span className="text-xl font-bold text-amber-300 font-['Outfit']">
                    {selectedNode.capacity}
                  </span>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">
                    {isMr ? 'वार्षिक वीजनिर्मिती' : 'Annual Clean Generation'}
                  </span>
                  <span className="text-xl font-bold text-emerald-400 font-['Outfit']">
                    {selectedNode.annualYield}
                  </span>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">
                    {isMr ? 'ग्रिड / सबस्टेशन जोडणी' : 'Grid Interconnection'}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {selectedNode.gridSubstation}
                  </span>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">
                    {isMr ? 'स्थान' : 'Project Location'}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {selectedNode.location[language]}
                  </span>
                </div>
              </div>

              {/* CTA trigger */}
              <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  {isMr ? 'सर्व प्रकल्प MNRE व महावितरण मानकांनुसार कार्यान्वित.' : 'All installations compliant with MNRE & MSEDCL standards.'}
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors"
                >
                  <span>{isMr ? 'असा प्रकल्प उभारा' : 'Enquire About Utility Solar'}</span>
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
