'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { ArrowRight } from 'lucide-react';
import { DEFAULT_VIDEO_SECTION } from '@/lib/types';

export const VideoHero: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';

  const videoConfig = content?.videoSection || DEFAULT_VIDEO_SECTION;

  if (videoConfig.enabled === false) {
    return null;
  }

  return (
    <section className="relative w-full bg-slate-950 border-b border-slate-900" id="video-showcase">
      {/* 100% Natural Uncropped Video - Zero cropping on top, bottom or sides */}
      <div className="relative w-full">
        <video
          src={videoConfig.videoUrl || '/uploads/video/13mw-solar-plant.mp4'}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto block"
        />

        {/* Minimal localized bottom gradient for readable text - keeps entire video clear and bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Medium-Sized Two Lines of Content on Bottom Left (No Extra Badges) */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-12 max-w-7xl mx-auto">
          <div className="max-w-xl space-y-2">
            {/* Line 1: Headline (Medium Size, Clear & Crisp) */}
            <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug drop-shadow-md">
              {isMr ? videoConfig.titleMr : videoConfig.titleEn}
            </h1>

            {/* Line 2: Subtitle (Medium / Clean) */}
            <p className="text-xs sm:text-sm text-slate-100/90 leading-relaxed font-medium drop-shadow-sm">
              {isMr ? videoConfig.subtitleMr : videoConfig.subtitleEn}
            </p>

            {/* Sleek Call-to-Action Buttons */}
            <div className="flex items-center gap-2.5 pt-1.5 flex-wrap">
              <a
                href="#services"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md shadow-black/40 transition-all hover:scale-105"
              >
                <span>{isMr ? 'आमचे प्रकल्प व सेवा' : 'Explore Solar EPC'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 text-xs font-bold inline-flex items-center gap-1.5 transition-all"
              >
                <span>{isMr ? 'मोफत साईट सर्वेक्षण' : 'Request Site Survey'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
