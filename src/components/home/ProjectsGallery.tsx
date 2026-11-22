'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { FolderGit2, MapPin, ExternalLink, Zap } from 'lucide-react';
import { CMSProject } from '@/lib/content-store';

const FALLBACK_IMG = '/uploads/projects/krishna-vishwa-vidyapeeth-1000kw.jpg';

export const ProjectsGallery: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';
  const [filter, setFilter] = useState<string>('all');

  const projects = content?.projects || [];

  const filtered = filter === 'all' 
    ? projects 
    : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-[#f8faf9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isMr ? 'कार्यान्वित प्रकल्प' : 'COMPLETED INSTALLATIONS'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
            {isMr ? 'आमचे गौरवशाली प्रकल्प दालन' : 'Our Landmark Solar Portfolio'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {isMr ? 'महाराष्ट्रातील युटिलिटी, व्यावसायिक आणि निवासी क्षेत्रातील निवडक प्रकल्प.' : 'A selection of high-yield solar plants commissioned across Maharashtra.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'all', label: isMr ? 'सर्व प्रकल्प' : 'All Projects' },
            { id: 'utility', label: isMr ? '१३ MW युटिलिटी' : '13 MW Utility Scale' },
            { id: 'commercial', label: isMr ? 'औद्योगिक व व्यावसायिक' : 'Commercial & Industrial' },
            { id: 'residential', label: isMr ? 'निवासी रूफटॉप' : 'Residential Rooftop' },
            { id: 'agri', label: isMr ? 'कृषी-सोलर' : 'Agri-Solar' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid with Real Imagery & Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item: CMSProject) => {
            const title = isMr ? (item.titleMr || item.titleEn) : item.titleEn;
            const location = isMr ? (item.locationMr || item.locationEn) : item.locationEn;
            const highlight = isMr ? (item.highlightMr || item.highlightEn) : (item.highlightEn || item.highlightMr);

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5"
              >
                {/* Project Card Image */}
                <div className="h-52 w-full overflow-hidden relative bg-slate-200">
                  <img
                    src={item.image || FALLBACK_IMG}
                    alt={title}
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-300 border border-slate-700">
                      {item.category.toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-emerald-950/80 backdrop-blur-md px-3 py-1 rounded-xl text-amber-300 text-xs font-extrabold font-['Outfit'] border border-emerald-700">
                    {item.capacity}
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-2 group-hover:text-emerald-800 transition-colors">
                    {title}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{location}</span>
                  </p>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    {highlight || 'Commissioned with high-performance Tier-1 modules.'}
                  </p>
                </div>

                <div className="p-7 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{isMr ? 'MNRE मानकानुसार प्रमाणित' : 'MNRE Certified EPC'}</span>
                  </span>
                  <a
                    href="#contact"
                    className="text-xs font-bold text-slate-800 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>{isMr ? 'माहिती विचारा' : 'Enquire'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
