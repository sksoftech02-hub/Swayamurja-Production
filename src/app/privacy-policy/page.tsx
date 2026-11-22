'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import {
  ShieldCheck,
  ChevronRight,
  FileText,
  Lock,
  UserCheck,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Clock,
  AlertCircle,
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';

  const contactPhone = content?.companyContact?.phone || '+91 92721 00623';
  const contactTelHref = contactPhone.replace(/[^+0-9]/g, '');
  const contactEmail = content?.companyContact?.email || 'crm@swayamurja.com';
  const contactAddressEn =
    content?.companyContact?.address ||
    'T9, A-1001, Brahma Business Park, New Kalyani Nagar, Wadgaon Sheri, Pune, Maharashtra 411014';

  const erasureMailto = `mailto:${contactEmail}?subject=${encodeURIComponent(
    'DPDP Act 2023 Request: Withdraw Consent / Erase Personal Data'
  )}&body=${encodeURIComponent(
    'Dear Grievance Officer,\n\nI hereby request to withdraw my consent and/or erase my personal data submitted on swayamurja.com under the Digital Personal Data Protection Act, 2023.\n\nFull Name:\nRegistered Mobile Number:\nEmail (if provided):\nRequest Type (Access / Correction / Erasure / Consent Withdrawal):\n'
  )}`;

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav className="flex items-center gap-2 text-xs font-semibold text-emerald-400/90" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-300 transition-colors">
              {isMr ? 'मुख्यपृष्ठ' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-white">{isMr ? 'गोपनीयता धोरण (DPDP कायदा २०२३)' : 'Privacy Policy (DPDP Act, 2023)'}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{isMr ? 'भारत डिजिटल वैयक्तिक डेटा संरक्षण कायदा, २०२३ नुसार' : 'Compliant with India DPDP Act, 2023'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight">
            {isMr ? 'गोपनीयता धोरण आणि वैयक्तिक डेटा संरक्षण सूचना' : 'Privacy Policy & Personal Data Protection Notice'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {isMr
              ? 'स्वयम्ऊर्जा रिन्यूएबल एनर्जी प्रा. लि. (डेटा फिड्यूशियरी) आपल्या वैयक्तिक माहितीच्या सुरक्षिततेसाठी आणि भारत सरकारच्या डिजिटल वैयक्तिक डेटा संरक्षण कायदा, २०२३ (DPDP Act, 2023) च्या सर्व तरतुदींचे पालन करण्यासाठी कटिबद्ध आहे.'
              : 'SwayamUrja Renewable Energy Pvt. Ltd. ("Data Fiduciary") is committed to protecting your personal data and complying with India’s Digital Personal Data Protection (DPDP) Act, 2023 and applicable rules.'}
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-2 font-mono">
            <span>Policy Version: DPDP-2023-v1.0</span>
            <span>|</span>
            <span>Effective Date: November 2026</span>
            <span>|</span>
            <span>CIN: U43219PN2023PTC220327</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 bg-white flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">

          {/* 1. Data Fiduciary Identity */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit'] flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              <span>{isMr ? '१. डेटा फिड्यूशियरीची ओळख (Data Fiduciary Identity)' : '1. Identity of the Data Fiduciary'}</span>
            </h2>
            <p>
              <strong>SwayamUrja Renewable Energy Pvt. Ltd.</strong>
              <br />
              {isMr
                ? 'नोंदणीकृत कार्यालय: टी९, ए-१००१, ब्रह्मा बिझनेस पार्क, न्यू कल्याणी नगर, वडगाव शेरी, पुणे, महाराष्ट्र ४११०१४'
                : `Registered Office: ${contactAddressEn}`}
              <br />
              <span className="text-xs font-mono text-slate-500">
                CIN: U43219PN2023PTC220327 &nbsp;|&nbsp; GSTIN: 27ABKCS7507GIZ2 &nbsp;|&nbsp; ISO 9001:2015 Certified by TÜV SÜD
              </span>
            </p>
          </div>

          {/* 2. Section 5 Itemized Notice */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">
              {isMr
                ? '२. आम्ही कोणती वैयक्तिक माहिती गोळा करतो आणि कशासाठी? (कलम ५ सूचना)'
                : '2. Itemized Personal Data Collected & Specific Purposes (DPDP Section 5 Notice)'}
            </h2>
            <p>
              {isMr
                ? 'आम्ही केवळ आपण स्वेच्छेने आणि स्पष्ट संमतीने दिलेली खालील माहितीच गोळा करतो:'
                : 'We collect only the specific personal data you voluntarily submit with affirmative consent:'}
            </p>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="py-3 px-4">{isMr ? 'वैयक्तिक माहितीचा प्रकार' : 'Personal Data Category'}</th>
                    <th className="py-3 px-4">{isMr ? 'निश्चित उद्देश (Purpose)' : 'Specific Purpose of Processing'}</th>
                    <th className="py-3 px-4">{isMr ? 'जतन कालावधी' : 'Retention Period'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {isMr ? 'पूर्ण नाव, मोबाईल क्रमांक, ईमेल' : 'Full Name, 10-Digit Mobile Number, Email Address'}
                    </td>
                    <td className="py-3 px-4">
                      {isMr
                        ? 'सौर ऊर्जा प्रकल्प कोटेशन, मोफत साइट सर्व्हे नियोजन आणि ग्राहक संवाद.'
                        : 'Contacting you to schedule free site feasibility surveys and deliver requested solar EPC proposals.'}
                    </td>
                    <td className="py-3 px-4">{isMr ? '२४ महिने किंवा संमती मागे घेईपर्यंत' : 'Up to 24 months or until consent withdrawal'}</td>
                  </tr>
                  <tr className="bg-slate-50/70">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {isMr ? 'शहर/पत्ता, मासिक वीजबिल, छताचा तपशील' : 'City/Location, Monthly Electricity Bill, Roof Notes'}
                    </td>
                    <td className="py-3 px-4">
                      {isMr
                        ? 'किलोवॅट (kW) क्षमता अंदाज, महावितरण नेट-मीटरिंग व पीएम सूर्य घर सबसिडी पात्रता तपासणी.'
                        : 'Engineering sizing (kW estimate), MSEDCL net-metering assessment, and PM Surya Ghar / C&I ROI calculation.'}
                    </td>
                    <td className="py-3 px-4">{isMr ? '२४ महिने (प्रकल्प झाल्यास कायदेशीर कालावधी)' : '24 months (or statutory warranty/tax period if commissioned)'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {isMr ? 'संमती नोंद व सुरक्षा लॉग (IP पत्ता)' : 'Consent Timestamp & Security Logs (IP Address)'}
                    </td>
                    <td className="py-3 px-4">
                      {isMr
                        ? 'DPDP कलम ६ नुसार संमतीचा पुरावा आणि स्पॅम/सायबर हल्ल्यांपासून सुरक्षा.'
                        : 'Maintaining verifiable consent proof under DPDP Sec. 6 and preventing spam / unauthorized access.'}
                    </td>
                    <td className="py-3 px-4">{isMr ? 'कायदेशीर सुरक्षा कालावधीसाठी (१२–२४ महिने)' : '12–24 months for security & compliance audit'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Consent & Third-Party Disclosures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-extrabold text-slate-900 font-['Outfit'] flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-700" />
                <span>{isMr ? '३. स्पष्ट संमती आणि संमती मागे घेणे (कलम ६)' : '3. Affirmative Consent & Withdrawal (Sec. 6)'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700">
                {isMr
                  ? 'संपर्क अर्जावर आपण स्वतःहून संमती चौकटीवर टिक (✓) केल्याशिवाय आपला डेटा स्वीकारला जात नाही. आपण कधीही खालील "संमती मागे घ्या / डेटा हटवा" पर्यायाद्वारे आपली संमती रद्द करू शकता.'
                  : 'We never use pre-ticked checkboxes. Your inquiry is only processed when you actively check the consent box. You may withdraw consent at any time as easily as you gave it by emailing our Grievance Officer below.'}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-extrabold text-slate-900 font-['Outfit'] flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-700" />
                <span>{isMr ? '४. डेटा सुरक्षा व तृतीय-पक्ष माहिती' : '4. Security Safeguards & Third-Party Transfers'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700">
                {isMr
                  ? 'आम्ही आपली माहिती कोणासही विकत नाही. वेबसाइट व डेटाबेस व्यवस्थापन आमचे डेटा प्रोसेसर SK Softech सुरक्षित भूमिका-आधारित प्रवेश (RBAC) व एन्क्रिप्शनसह करतात. आपण स्वतःहून व्हॉट्सअ‍ॅप (WhatsApp) बटण क्लिक केल्यास, आपला संदेश किंवा रेझ्युमे Meta WhatsApp वर पाठवला जातो.'
                  : 'We never sell your personal data. Website infrastructure and database operations are secured by our Data Processor (SK Softech) using role-based access control, cryptographic hashing, and audit logging. If you voluntarily click WhatsApp inquiry or Careers apply buttons, your message/CV is transmitted via Meta WhatsApp.'}
              </p>
            </div>
          </div>

          {/* 5. Essential Cookies & LocalStorage */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900 font-['Outfit']">
              {isMr ? '५. कुकीज आणि ब्राउझर स्टोरेज (Cookies & LocalStorage)' : '5. Essential Cookies & Browser Storage'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700">
              {isMr
                ? 'ही वेबसाइट कोणत्याही तृतीय-पक्ष जाहिरात ट्रॅकिंग पिक्सेल्सचा वापर करत नाही. आम्ही फक्त आपली भाषा निवड (English / मराठी) लक्षात ठेवण्यासाठी स्थानिक स्टोरेज (`swayamurja_lang`) आणि अधिकृत कर्मचाऱ्यांसाठी सुरक्षित `HttpOnly` सत्र कुकीज वापरतो.'
                : 'This website does not deploy third-party advertising trackers or behavioral profiling pixels. We use strictly functional browser storage (`swayamurja_lang`) to remember your English/Marathi preference and secure `HttpOnly` session cookies exclusively for authorized staff consoles.'}
            </p>
          </div>

          {/* 6. Data Principal Rights */}
          <div className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">
              {isMr ? '६. डेटा प्रिन्सिपल म्हणून आपले कायदेशीर हक्क (कलम ११–१४)' : '6. Your Statutory Rights as a Data Principal (DPDP Sections 11–14)'}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {[
                {
                  en: 'Right to Access: Request a summary of personal data held about you and its processing activities.',
                  mr: 'माहिती मिळवण्याचा हक्क: आपल्याबद्दल जतन केलेल्या वैयक्तिक डेटाचा सारांश मागवण्याचा हक्क.',
                },
                {
                  en: 'Right to Correction & Updating: Request correction of inaccurate or incomplete contact/inquiry details.',
                  mr: 'दुरुस्तीचा हक्क: चुकीचा किंवा अपूर्ण तपशील दुरुस्त किंवा अद्ययावत करून घेण्याचा हक्क.',
                },
                {
                  en: 'Right to Erasure: Request permanent deletion of your inquiry data once purpose is fulfilled or consent is withdrawn.',
                  mr: 'डेटा हटवण्याचा हक्क (Right to Erasure): उद्देश पूर्ण झाल्यावर किंवा संमती मागे घेतल्यास डेटा कायमचा हटवण्याचा हक्क.',
                },
                {
                  en: 'Right to Nominate: Nominate another individual to exercise your rights in the event of death or incapacity.',
                  mr: 'नामनिर्देशनाचा हक्क: असमर्थतेच्या परिस्थितीत आपले हक्क वापरण्यासाठी दुसऱ्या व्यक्तीचे नामनिर्देशन करण्याचा हक्क.',
                },
              ].map((item, idx) => (
                <li key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{isMr ? item.mr : item.en}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 7. Designated Grievance Officer (Section 8(9) & 8(10)) */}
          <div id="grievance-officer" className="scroll-mt-28 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {isMr ? 'कलम ८(९) व ८(१०) — तक्रार निवारण अधिकारी' : 'DPDP Act Sections 8(9) & 8(10) — Designated Contact'}
                </span>
                <h2 className="text-2xl font-extrabold font-['Outfit'] mt-1">
                  {isMr ? 'तक्रार निवारण अधिकारी (Grievance Officer)' : 'Grievance Officer & Data Erasure Desk'}
                </h2>
              </div>

              <a
                href={erasureMailto}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isMr ? 'संमती मागे घ्या / डेटा हटवा' : 'Withdraw Consent / Erase My Data'}</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-200">
              <div className="space-y-2.5">
                <div className="font-bold text-white text-base">
                  {isMr ? 'डेटा संरक्षण व तक्रार निवारण अधिकारी' : 'Grievance Officer — Data Protection & Privacy'}
                </div>
                <div className="text-emerald-300 text-xs font-semibold">
                  SwayamUrja Renewable Energy Pvt. Ltd.
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={`mailto:${contactEmail}`} className="hover:text-amber-300 font-semibold">
                    {contactEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={`tel:${contactTelHref}`} className="hover:text-amber-300 font-semibold">
                    {contactPhone}
                  </a>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {isMr
                      ? 'टी९, ए-१००१, ब्रह्मा बिझनेस पार्क, न्यू कल्याणी नगर, वडगाव शेरी, पुणे, महाराष्ट्र ४११०१४'
                      : contactAddressEn}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>
                    {isMr
                      ? 'तक्रार निवारण कालावधी: विनंती मिळाल्यापासून ३० दिवसांच्या आत'
                      : 'Resolution Timeline: Within 30 days of receiving your verified request'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {isMr
                  ? 'जर आपल्या तक्रारीचे समाधानकारक निवारण झाले नाही, तर आपल्याला भारत सरकारच्या डेटा प्रोटेक्शन बोर्ड ऑफ इंडिया (Data Protection Board of India - DPBI) कडे तक्रार दाखल करण्याचा कायदेशीर अधिकार आहे.'
                  : 'If your grievance is not resolved to your satisfaction within the statutory period, you have the right to lodge a complaint with the Data Protection Board of India (DPBI) under the DPDP Act, 2023.'}
              </span>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
