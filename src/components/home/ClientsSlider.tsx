'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { Building2 } from 'lucide-react';
import { CMSClient } from '@/lib/types';

export const ClientsSlider: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';

  const clients: CMSClient[] = (content?.clients && content.clients.length > 0)
    ? content.clients
    : [
        { id: 'c-1', name: 'Ajanta Universal Fabrics Ltd', logo: '/uploads/clients/client-1.webp' },
        { id: 'c-2', name: 'Sun Ut Tech', logo: '/uploads/clients/client-2.webp' },
        { id: 'c-3', name: 'Fluorotech Group (FTG)', logo: '/uploads/clients/client-3.webp' },
        { id: 'c-4', name: 'Shri K. R. Ramdasi Sansthan', logo: '/uploads/clients/client-4.webp' },
        { id: 'c-5', name: 'BAPS Swaminarayan Sansthan', logo: '/uploads/clients/client-5.webp' },
        { id: 'c-6', name: 'Spark Engineers', logo: '/uploads/clients/spark-engineers.webp' },
        { id: 'c-7', name: 'Unique Tools', logo: '/uploads/clients/unique-tools.webp' },
      ];

  // Duplicate for seamless infinite marquee loop
  const marqueeList = [...clients, ...clients];

  return (
    <section className="py-12 bg-white border-y border-slate-100 overflow-hidden relative" id="our-clients">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        {/* Clean, authentic Green Heading matching swayamurja.com */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#386b40] tracking-tight">
          {isMr ? 'आमचे ग्राहक' : 'Our Clients'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl mx-auto">
          {isMr
            ? 'महाराष्ट्रातील नामांकित औद्योगिक व व्यावसायिक संस्थांचे विश्वासू भागीदार'
            : 'Powering trusted industrial powerhouses, commercial facilities & institutions across Maharashtra'}
        </p>
      </div>

      {/* Infinite Scrolling Logo Marquee Container */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max gap-6 sm:gap-10 animate-marquee items-center py-3 hover:[animation-play-state:paused]">
          {marqueeList.map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              className="flex-shrink-0 w-44 sm:w-52 h-20 sm:h-24 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center p-3 group hover:border-[#386b40]/50"
              title={client.name}
            >
              {client.logo ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={164}
                    height={64}
                    className="w-[144px] h-[56px] sm:w-[164px] sm:h-[64px] object-contain transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                    onError={(e) => {
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
                  <Building2 className="w-4 h-4 text-[#386b40]" />
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
