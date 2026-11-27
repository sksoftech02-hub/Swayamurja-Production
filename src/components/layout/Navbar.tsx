'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { DEFAULT_THEME, SiteTheme } from '@/lib/theme-presets';
import { Menu, X, PhoneCall, ChevronDown, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { content } = useContent();
  const theme: SiteTheme = content?.theme || DEFAULT_THEME;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMr = language === 'mr';

  const blogUrl = content?.blogLinkedInUrl || 'https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const aboutSubLinks = [
    { href: '/about-us#about-ceo', label: isMr ? 'व्यवस्थापकीय संचालकांचे मनोगत' : 'Gratitude by our MD & CEO' },
    { href: '/about-us#about-vision', label: isMr ? 'दृष्टिकोन आणि ध्येय' : 'Vision & Mission' },
    { href: '/about-us#about-focus', label: isMr ? 'प्रमुख कार्यक्षेत्र' : 'Core Focus' },
    { href: '/about-us#about-values', label: isMr ? 'मूल्ये (MITRA)' : 'Core Values (MITRA)' },
    { href: '/about-us#about-team', label: isMr ? 'आमची टीम' : 'Our Team' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-200 ${
      scrolled
        ? 'bg-white/98 backdrop-blur-xl shadow-md shadow-slate-900/6 border-b border-slate-200/80'
        : 'bg-white/95 backdrop-blur-md border-b border-slate-200/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── Official Local Logo Asset (Zero External WP Hotlink Dependency) ── */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            {!logoError ? (
              <div
                className="relative w-[182px] h-[36px] overflow-hidden flex items-center"
              >
                <Image
                  src="/assets/logo.webp"
                  alt="SwayamUrja Renewable Energy Pvt. Ltd."
                  width={182}
                  height={36}
                  style={{
                    objectFit: 'contain',
                    width: '182px',
                    height: '36px',
                    display: 'block',
                  }}
                  priority
                  unoptimized
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <span className="font-bold text-xl tracking-tight text-emerald-950 font-['Outfit'] leading-none">
                Swayam<span className="text-amber-600">Urja</span>
              </span>
            )}
          </Link>

          {/* ── Desktop Nav: Home -> About Us -> Services -> Projects -> Blogs -> Careers ── */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-6 text-[14px] font-medium text-slate-700">
            
            {/* 0. Home */}
            <Link
              href="/"
              aria-current={pathname === '/' ? 'page' : undefined}
              className="py-1 hover:text-emerald-700 transition-colors duration-200"
            >
              {isMr ? 'होम' : 'Home'}
            </Link>

            {/* 1. About Us with Dropdown */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <div className="inline-flex items-center gap-1">
                <Link
                  href="/about-us"
                  aria-current={pathname === '/about-us' ? 'page' : undefined}
                  className="py-2 hover:text-emerald-700 transition-colors duration-200 cursor-pointer"
                >
                  <span>{isMr ? 'आमच्याबद्दल' : 'About Us'}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  className="p-1 hover:text-emerald-700 transition-colors duration-200 cursor-pointer"
                  aria-label="Toggle About Us submenu"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} />
                </button>
              </div>

              {/* Dropdown Menu matching swayamurja.com */}
              {aboutDropdownOpen && (
                <div className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/about-us"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-50/70 border-b border-slate-100 transition-colors"
                  >
                    {isMr ? 'सर्व माहिती पहा (/about-us) →' : 'Overview & Full Story →'}
                  </Link>
                  {aboutSubLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setAboutDropdownOpen(false)}
                      className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Services */}
            <Link
              href="/#services"
              className="py-1 hover:text-emerald-700 transition-colors duration-200"
            >
              {isMr ? 'सेवा' : 'Services'}
            </Link>

            {/* 3. Projects */}
            <Link
              href="/#projects"
              className="py-1 hover:text-emerald-700 transition-colors duration-200"
            >
              {isMr ? 'प्रकल्प' : 'Projects'}
            </Link>

            {/* 4. Blogs (Redirects dynamically to LinkedIn in a new tab) */}
            <a
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 py-1 hover:text-emerald-700 transition-colors duration-200 group"
              title="Read SwayamUrja Insights & Articles on LinkedIn"
            >
              <span>{isMr ? 'ब्लॉग' : 'Blogs'}</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </a>

            {/* 5. Careers */}
            <Link
              href="/#careers"
              className="py-1 hover:text-emerald-700 transition-colors duration-200"
            >
              {isMr ? 'करिअर' : 'Careers'}
            </Link>

            {/* 6. Contact */}
            <Link
              href="/#contact"
              className="py-1 hover:text-emerald-700 transition-colors duration-200"
            >
              {isMr ? 'संपर्क' : 'Contact'}
            </Link>
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
              href="/#contact"
              style={{
                backgroundColor: theme.primaryColor || '#f59e0b',
                color: '#ffffff',
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold
                         rounded-xl shadow-xs hover:opacity-90
                         transition-[opacity,transform] duration-150 active:scale-[0.98] cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white" />
              <span>{isMr ? 'मोफत सल्ला' : 'Request a Quote'}</span>
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
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-colors ${
                    language === lang ? 'shadow-xs' : 'text-slate-500'
                  }`}
                >
                  {lang === 'en' ? 'EN' : 'मर'}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer (No layout max-height animation per Modern Web Guidance) ── */}
      {mobileOpen && (
      <div id="mobile-nav-drawer" className="md:hidden border-t border-slate-100 bg-white shadow-xl">
        <div className="px-5 py-4 space-y-1">
          {/* Mobile Home */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center py-3 text-[15px] font-semibold text-slate-700 hover:text-amber-600 border-b border-slate-50"
          >
            {isMr ? 'होम' : 'Home'}
          </Link>

          {/* Mobile About Us Accordion */}
          <div>
            <div className="flex items-center justify-between w-full py-3 text-[15px] font-semibold text-slate-700 border-b border-slate-50">
              <Link
                href="/about-us"
                onClick={() => setMobileOpen(false)}
                className="hover:text-emerald-700 flex-1"
              >
                {isMr ? 'आमच्याबद्दल' : 'About Us'}
              </Link>
              <button
                type="button"
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="p-1 text-slate-500 hover:text-emerald-600"
                aria-label="Toggle About Us sublinks"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {mobileAboutOpen && (
              <div className="pl-4 py-1 space-y-2 bg-slate-50/80 rounded-lg mt-1">
                <Link
                  href="/about-us"
                  onClick={() => { setMobileOpen(false); setMobileAboutOpen(false); }}
                  className="block py-2 text-xs font-bold text-emerald-700 hover:underline"
                >
                  • {isMr ? 'सर्व माहिती पहा (/about-us) →' : 'View Full About Us Page →'}
                </Link>
                {aboutSubLinks.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => { setMobileOpen(false); setMobileAboutOpen(false); }}
                    className="block py-2 text-xs font-semibold text-slate-600 hover:text-emerald-700"
                  >
                    • {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/#services"
            onClick={() => setMobileOpen(false)}
            className="flex items-center py-3 text-[15px] font-semibold text-slate-700 hover:text-amber-600 border-b border-slate-50"
          >
            {isMr ? 'सेवा' : 'Services'}
          </Link>

          <Link
            href="/#projects"
            onClick={() => setMobileOpen(false)}
            className="flex items-center py-3 text-[15px] font-semibold text-slate-700 hover:text-amber-600 border-b border-slate-50"
          >
            {isMr ? 'प्रकल्प' : 'Projects'}
          </Link>

          <a
            href={blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between py-3 text-[15px] font-semibold text-slate-700 hover:text-amber-600 border-b border-slate-50"
          >
            <span>{isMr ? 'ब्लॉग (LinkedIn)' : 'Blogs (LinkedIn)'}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <Link
            href="/#careers"
            onClick={() => setMobileOpen(false)}
            className="flex items-center py-3 text-[15px] font-semibold text-slate-700 hover:text-amber-600 border-b border-slate-50"
          >
            {isMr ? 'करिअर' : 'Careers'}
          </Link>

          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="flex items-center py-3 text-[15px] font-semibold text-slate-700 hover:text-amber-600 border-b border-slate-50"
          >
            {isMr ? 'संपर्क' : 'Contact'}
          </Link>

          <div className="pt-3">
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              style={{
                backgroundColor: theme.primaryColor || '#f59e0b',
                color: '#ffffff',
              }}
              className="flex items-center justify-center gap-2 w-full py-3
                         font-semibold rounded-xl shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>{isMr ? 'मोफत सल्ला मिळवा' : 'Request a Quote'}</span>
            </Link>
          </div>
        </div>
      </div>
      )}
    </header>
  );
};
