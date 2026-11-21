'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Zap, 
  ShieldCheck, 
  MapPin, 
  Maximize2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DEFAULT_VIDEO_SECTION } from '@/lib/types';

export const VideoHero: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';

  const videoConfig = content?.videoSection || DEFAULT_VIDEO_SECTION;
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  if (videoConfig.enabled === false) {
    return null;
  }

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full bg-slate-950 overflow-hidden border-b border-slate-800" id="video-showcase">
      {/* 16:9 or Full-Width Cinematic Video Container */}
      <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[82vh] max-h-[850px] overflow-hidden">
        <video
          ref={videoRef}
          src={videoConfig.videoUrl || '/uploads/video/13mw-solar-plant.mp4'}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Cinematic Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" />

        {/* Watermark Logo Badge (Matching swayamurja.com 13 MW Badge) */}
        <div className="absolute top-6 right-6 hidden md:flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/40 shadow-2xl">
          <div className="w-12 h-12 relative flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="SwayamUrja Renewable Energy"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-extrabold text-amber-600 tracking-wider uppercase flex items-center gap-1 font-mono">
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{videoConfig.plantCapacity || '13 MW'}</span>
            </div>
            <div className="text-xs font-black text-slate-900 tracking-tight">
              SOLAR PLANT INSTALL
            </div>
          </div>
        </div>

        {/* Interactive Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-16 max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4">
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>{isMr ? videoConfig.badgeMr : videoConfig.badgeEn}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="flex items-center gap-1 text-[11px] text-slate-300 font-normal">
                <MapPin className="w-3 h-3 text-emerald-400" />
                {isMr ? videoConfig.locationMr : videoConfig.locationEn}
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {isMr ? videoConfig.titleMr : videoConfig.titleEn}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
              {isMr ? videoConfig.subtitleMr : videoConfig.subtitleEn}
            </p>

            {/* Metric Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-2.5 sm:p-3">
                <div className="text-base sm:text-xl font-black text-amber-400 font-mono">13 MWp</div>
                <div className="text-[10px] sm:text-xs text-slate-300 font-medium">
                  {isMr ? 'एकूण स्थापित क्षमता' : 'Installed Capacity'}
                </div>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-2.5 sm:p-3">
                <div className="text-base sm:text-xl font-black text-emerald-400 font-mono">50+ Acres</div>
                <div className="text-[10px] sm:text-xs text-slate-300 font-medium">
                  {isMr ? 'जमीन विस्तार' : 'Land Footprint'}
                </div>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-2.5 sm:p-3">
                <div className="text-base sm:text-xl font-black text-cyan-400 font-mono">33 kV</div>
                <div className="text-[10px] sm:text-xs text-slate-300 font-medium">
                  {isMr ? 'ग्रिड सबस्टेशन' : 'Grid Substation'}
                </div>
              </div>
            </div>

            {/* Action Buttons & Video Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#services"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/40 transition-all hover:scale-105"
              >
                <span>{isMr ? 'आमचे प्रकल्प व सेवा' : 'Explore Solar EPC'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all hover:border-white/40"
              >
                <span>{isMr ? 'मोफत साईट सर्वेक्षण' : 'Request Site Survey'}</span>
              </a>

              {/* Player Controls (Play/Pause & Sound) */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  className="p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md border border-slate-700/80 transition-all cursor-pointer"
                  title={isPlaying ? 'Pause Aerial Video' : 'Play Aerial Video'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  className="p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md border border-slate-700/80 transition-all cursor-pointer"
                  title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
