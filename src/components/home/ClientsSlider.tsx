'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { Building2, Sparkles } from 'lucide-react';
import { CMSClient } from '@/lib/types';

export const ClientsSlider: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';

  const clients: CMSClient[] = (content?.clients && content.clients.length > 0)
    ? content.clients
    : [
        { id: 'c-1', name: 'Ajanta Universal Fabrics Ltd', logo: '/uploads/clients/client-1.png' },
        { id: 'c-2', name: 'Sun Ut Tech', logo: '/uploads/clients/client-2.png' },
        { id: 'c-3', name: 'Fluorotech Group (FTG)', logo: '/uploads/clients/client-3.png' },
        { id: 'c-4', name: 'Shri K. R. Ramdasi Sansthan', logo: '/uploads/clients/client-4.png' },
        { id: 'c-5', name: 'BAPS Swaminarayan Sansthan', logo: '/uploads/clients/client-5.png' },
        { id: 'c-6', name: 'Spark Engineers', logo: '/uploads/clients/spark-engineers.png' },
        { id: 'c-7', name: 'Unique Tools', logo: '/uploads/clients/unique-tools.png' },
      ];

  // Duplicate for seamless infinite marquee loop
  const marqueeList = [...clients, ...clients];

  return (
    <section className="py-14 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 border-y border-slate-200/60 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isMr ? 'विश्वसनीय भागीदारी' : 'Trusted Partnerships'}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isMr ? 'आमचे प्रतिष्ठित ग्राहक' : 'Our Clients'}
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
          {isMr
            ? 'महाराष्ट्रातील आघाडीच्या औद्योगिक, व्यावसायिक आणि कृषी संस्थांचा स्वयम्ऊर्जा वर अतूट विश्वास'
            : 'Powering leading industrial manufacturing powerhouses, educational campuses, and commercial institutions across Maharashtra'}
        </p>
      </div>

      {/* Infinite Scrolling Logo Marquee Container */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-8 sm:gap-12 animate-marquee items-center py-4 hover:[animation-play-state:paused]">
          {marqueeList.map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              className="flex-shrink-0 w-44 h-24 sm:w-52 sm:h-28 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center p-4 group hover:border-emerald-300"
              title={client.name}
            >
              {client.logo ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={180}
                    height={80}
                    className="max-h-16 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                    unoptimized
                    onError={(e) => {
                      // Fallback if image path fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Fallback label if image is missing */}
                  <span className="text-xs font-bold text-slate-700 text-center px-2 line-clamp-2 hidden group-has-[img[style*='display: none']]:block">
                    {client.name}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-700 text-xs font-bold">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>{client.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
