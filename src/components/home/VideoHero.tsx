'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { Sparkles, ArrowRight, MapPin } from 'lucide-react';
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
    <section className="relative w-full bg-slate-950 overflow-hidden border-b border-slate-900" id="video-showcase">
      {/* 16:9 or Full-Width Cinematic Video Container */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[78vh] max-h-[800px] overflow-hidden">
        <video
          src={videoConfig.videoUrl || '/uploads/video/13mw-solar-plant.mp4'}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/20 to-transparent" />

        {/* Official SwayamUrja Watermark Badge on Top Right */}
        <div className="absolute top-5 right-5 sm:top-8 sm:right-8 flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/50 shadow-2xl">
          <div className="relative w-28 sm:w-36 h-9 sm:h-11">
            <Image
              src="/logo.png"
              alt="SwayamUrja Renewable Energy"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
          <div className="hidden sm:block border-l border-slate-200 pl-3">
            <span className="text-[10px] font-mono font-black text-amber-600 block uppercase tracking-wider">
              13 MW PLANT
            </span>
            <span className="text-[11px] font-extrabold text-slate-900 block leading-tight">
              COMMISSIONED
            </span>
          </div>
        </div>

        {/* Minimal Two Lines of Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14 max-w-7xl mx-auto">
          <div className="max-w-2xl space-y-3">
            {/* Minimal Badge Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/40 backdrop-blur-md text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isMr ? videoConfig.badgeMr : videoConfig.badgeEn}</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="flex items-center gap-1 text-[11px] text-slate-300 font-normal">
                <MapPin className="w-3 h-3 text-emerald-400" />
                {isMr ? videoConfig.locationMr : videoConfig.locationEn}
              </span>
            </div>

            {/* Line 1: Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {isMr ? videoConfig.titleMr : videoConfig.titleEn}
            </h1>

            {/* Line 2: Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-slate-200/90 leading-relaxed max-w-xl font-medium">
              {isMr ? videoConfig.subtitleMr : videoConfig.subtitleEn}
            </p>

            {/* Minimal Clean Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#services"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all hover:scale-105"
              >
                <span>{isMr ? 'आमचे प्रकल्प व सेवा' : 'Explore Solar EPC'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all hover:border-white/50"
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
