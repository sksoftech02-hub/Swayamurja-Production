'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { Sun, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';

  const blogUrl = content?.blogLinkedInUrl || 'https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/';
  const contactPhone = content?.companyContact?.phone || '+91 92721 00623';
  const contactTelHref = contactPhone.replace(/[^+0-9]/g, '');
  const contactEmail = content?.companyContact?.email || 'crm@swayamurja.com';
  const contactAddressEn =
    content?.companyContact?.address ||
    'T9, A-1001, Brahma Business Park, New Kalyani Nagar, Wadgaon Sheri, Pune, Maharashtra 411014';

  const defaultDesc = isMr 
    ? 'स्वयम्ऊर्जा ही महाराष्ट्रातील अग्रगण्य स्वच्छ ऊर्जा EPC कंपनी असून रूफटॉप, १३ मेगावॅट युटिलिटी सोलर, पवन आणि बॅटरी स्टोरेज प्रकल्पांमध्ये कार्यरत आहे.'
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
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p>PM Surya Ghar Empaneled Vendor | ISO 9001:2015 by TÜV SÜD</p>
              <p className="text-slate-500">Registered Office: Pune, Maharashtra</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-['Outfit']">
              {isMr ? 'जलद दुवे' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about-us" className="hover:text-amber-400 transition-colors">{isMr ? 'आमच्याबद्दल' : 'About Us'}</Link></li>
              <li><Link href="/#calculator" className="hover:text-amber-400 transition-colors">{t('nav_calc')}</Link></li>
              <li><Link href="/#solapur-map" className="hover:text-amber-400 transition-colors">{t('nav_utility')}</Link></li>
              <li><Link href="/#services" className="hover:text-amber-400 transition-colors">{t('nav_services')}</Link></li>
              <li><Link href="/#projects" className="hover:text-amber-400 transition-colors">{t('nav_projects')}</Link></li>
              <li>
                <a href={blogUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                  <span>{isMr ? 'ब्लॉग व माहिती' : 'Solar Blog (LinkedIn)'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li><Link href="/#careers" className="hover:text-amber-400 transition-colors">{t('nav_careers')}</Link></li>
              <li><Link href="/#contact" className="hover:text-amber-400 transition-colors">{t('nav_contact')}</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">{isMr ? 'गोपनीयता धोरण (DPDP)' : 'Privacy Policy (DPDP)'}</Link></li>
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
              {isMr ? 'पुणे मुख्य कार्यालय' : 'Pune Headquarters'}
            </h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                <span className="leading-relaxed">
                  {isMr 
                    ? 'टी९, ए-१००१, ब्रह्मा बिझनेस पार्क, न्यू कल्याणी नगर, वडगाव शेरी, पुणे, महाराष्ट्र ४११०१४'
                    : contactAddressEn
                  }
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`tel:${contactTelHref}`} className="hover:text-white">{contactPhone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`mailto:${contactEmail}`} className="hover:text-white">{contactEmail}</a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-500">
                <span className="text-emerald-500 font-bold">HR:</span>
                <a href="mailto:hr@swayamurja.com" className="hover:text-white">hr@swayamurja.com</a>
              </div>

              {/* Satara Regional Branch */}
              <div className="pt-2 border-t border-slate-800 text-xs">
                <span className="text-amber-400 font-bold block mb-1">
                  {isMr ? 'सातारा / कराड विभागीय कार्यालय:' : 'Satara / Karad Branch:'}
                </span>
                <span className="text-slate-400 block leading-tight">
                  {isMr ? 'कार्यालय क्र. २, वरदराज मंगल कार्यालय, उंब्रज, कराड, सातारा' : 'Office No. 2, Varadraj Mangal Karyalay, Umbraj, Karad, Satara'}
                </span>
                <span className="text-slate-400 block mt-0.5">📞 96897-23627 / 99758-73722</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Real Legal Credentials */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p>© {new Date().getFullYear()} SwayamUrja Renewable Energy Pvt. Ltd. All rights reserved.</p>
            <p className="text-[11px] text-slate-400 font-mono">
              CIN: U43219PN2023PTC220327 &nbsp;|&nbsp; GSTIN: 27ABKCS7507GIZ2 &nbsp;|&nbsp; ISO 9001:2015 by TÜV SÜD
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">
              {isMr ? 'गोपनीयता धोरण' : 'Privacy Policy'}
            </Link>
            <span className="text-slate-700">|</span>
            <Link href="/privacy-policy#grievance-officer" className="hover:text-amber-400 transition-colors">
              {isMr ? 'तक्रार निवारण अधिकारी' : 'Grievance Officer'}
            </Link>
            <span className="text-slate-700">|</span>
            <span>Designed & Engineered by <strong>SK Softech & Digital Marketing</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
