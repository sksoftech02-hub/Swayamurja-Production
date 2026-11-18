'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Sun, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const isMr = language === 'mr';

  const defaultDesc = isMr 
    ? 'स्वयमऊर्जा ही महाराष्ट्रातील अग्रगण्य स्वच्छ ऊर्जा EPC कंपनी असून रूफटॉप, १३ मेगावॅट युटिलिटी सोलर, पवन आणि बॅटरी स्टोरेज प्रकल्पांमध्ये कार्यरत आहे.'
    : 'SwayamUrja Renewable Energy Pvt. Ltd. is Maharashtra’s leading clean-tech EPC company delivering residential rooftop solar, 13 MW+ utility-scale solar plants, wind hybrid installations, and battery energy storage.';

  const companyBio = t('ft_desc') !== 'ft_desc' ? t('ft_desc') : defaultDesc;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-amber-400">
                <Sun className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-white font-['Outfit']">
                Swayam<span className="text-amber-400">Urja</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {companyBio}
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p>CIN: U40106PN2020PTC195234 (Registered in Pune, Maharashtra)</p>
              <p>GSTIN: 27AAMCS8921N1ZM | MNRE Channel Partner</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-['Outfit']">
              {isMr ? 'जलद दुवे' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#calculator" className="hover:text-amber-400 transition-colors">{t('nav_calc')}</Link></li>
              <li><Link href="#solapur-map" className="hover:text-amber-400 transition-colors">{t('nav_utility')}</Link></li>
              <li><Link href="#services" className="hover:text-amber-400 transition-colors">{t('nav_services')}</Link></li>
              <li><Link href="#projects" className="hover:text-amber-400 transition-colors">{t('nav_projects')}</Link></li>
              <li><Link href="#blog" className="hover:text-amber-400 transition-colors">{isMr ? 'ब्लॉग व माहिती' : 'Solar Blog'}</Link></li>
              <li><Link href="#careers" className="hover:text-amber-400 transition-colors">{t('nav_careers')}</Link></li>
              <li><Link href="#contact" className="hover:text-amber-400 transition-colors">{t('nav_contact')}</Link></li>
            </ul>
          </div>

          {/* Government Hub */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-['Outfit']">
              {isMr ? 'सरकारी योजना' : 'Government Portals'}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="https://pmsuryaghar.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center gap-1">
                  PM Surya Ghar Portal <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a href="https://mnre.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center gap-1">
                  MNRE India <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a href="https://www.mahadiscom.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center gap-1">
                  MSEDCL Net Metering <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-['Outfit']">
              {isMr ? 'कार्यालय संपर्क' : 'Headquarters'}
            </h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                <span>Baner, Pune, Maharashtra 411045</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="tel:+919272100623" className="hover:text-white">+91 92721 00623</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="mailto:sales@swayamurja.com" className="hover:text-white">sales@swayamurja.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SwayamUrja Renewable Energy Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Designed & Engineered by <strong>SK Softech & Digital Marketing</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
