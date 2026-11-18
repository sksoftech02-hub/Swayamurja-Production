'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { DEFAULT_THEME, SiteTheme } from '@/lib/theme-presets';
import { Menu, X, PhoneCall } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { content } = useContent();
  const theme: SiteTheme = content?.theme || DEFAULT_THEME;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMr = language === 'mr';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#services',    label: isMr ? 'सेवा'       : 'Services'   },
    { href: '#calculator',  label: isMr ? 'कॅल्क्युलेटर' : 'Calculator' },
    { href: '#projects',    label: isMr ? 'प्रकल्प'    : 'Projects'   },
    { href: '#blog',        label: isMr ? 'ब्लॉग'       : 'Blog'       },
    { href: '#contact',     label: isMr ? 'संपर्क'     : 'Contact'    },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/98 backdrop-blur-xl shadow-lg shadow-emerald-900/8 border-b border-emerald-100'
        : 'bg-white/95 backdrop-blur-md border-b border-emerald-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── REAL Logo from swayamurja.com ── */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div
              className="relative w-44 h-10 overflow-hidden flex items-center"
              style={{ width: '180px', height: '42px', position: 'relative', overflow: 'hidden' }}
            >
              {/* Real logo with fallback text */}
              <Image
                src="https://swayamurja.com/wp-content/uploads/2023/08/Logo1.png"
                alt="SwayamUrja Renewable Energy Pvt. Ltd."
                width={180}
                height={42}
                style={{
                  objectFit: 'contain',
                  maxHeight: '40px',
                  width: 'auto',
                  maxWidth: '180px',
                  display: 'block',
                }}
                className="group-hover:scale-105 transition-transform duration-300"
                priority
                unoptimized
                onError={(e) => {
                  // fallback: hide image, show text logo
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            {/* Fallback text logo shown if image fails */}
            <span className="font-extrabold text-xl tracking-tight text-emerald-950 font-['Outfit'] leading-none hidden [.img-error_&]:inline">
              Swayam<span className="text-amber-500">Urja</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-7 text-[14px] font-semibold text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-1 hover:text-emerald-700 transition-colors duration-200
                           after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
                           after:bg-gradient-to-r after:from-emerald-500 after:to-amber-400
                           after:rounded-full hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Action strip ── */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <div className="inline-flex bg-slate-100 p-[3px] rounded-full border border-slate-200/80">
              {(['en', 'mr'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  style={language === lang ? { backgroundColor: '#0f172a', color: '#ffffff' } : {}}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                    language === lang
                      ? 'shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {lang === 'en' ? 'EN' : 'मराठी'}
                </button>
              ))}
            </div>

            {/* Primary CTA (Dynamically Theme-Colored) */}
            <Link
              href="#contact"
              style={{
                backgroundColor: theme.primaryColor || '#f59e0b',
                color: '#ffffff',
                boxShadow: `0 4px 14px -2px ${theme.primaryColor || '#f59e0b'}60`,
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-extrabold
                         rounded-full shadow-md hover:shadow-lg
                         transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white" />
              <span>{isMr ? 'मोफत सल्ला' : 'Free Quote'}</span>
            </Link>
          </div>

          {/* ── Mobile trigger ── */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="inline-flex bg-slate-100 p-[3px] rounded-full border border-slate-200">
              {(['en', 'mr'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  style={language === lang ? { backgroundColor: '#0f172a', color: '#ffffff' } : {}}
                  className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                    language === lang ? 'shadow-xs' : 'text-slate-500'
                  }`}
                >
                  {lang === 'en' ? 'EN' : 'मर'}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="border-t border-slate-100 bg-white/98 backdrop-blur-xl px-5 py-4 space-y-1 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center py-3 text-[15px] font-semibold text-slate-700
                         hover:text-amber-600 hover:pl-2 transition-all duration-200
                         border-b border-slate-50 last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3">
            <Link
              href="#contact"
              onClick={() => setMobileOpen(false)}
              style={{
                backgroundColor: theme.primaryColor || '#f59e0b',
                color: '#ffffff',
                boxShadow: `0 4px 14px -2px ${theme.primaryColor || '#f59e0b'}60`,
              }}
              className="flex items-center justify-center gap-2 w-full py-3
                         font-extrabold rounded-2xl shadow-lg"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>{isMr ? 'मोफत सल्ला मिळवा' : 'Get Free Quote'}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
