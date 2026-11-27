'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { Award, CheckCircle, IndianRupee, ArrowRight, FileCheck, Layers } from 'lucide-react';

export const SchemesSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';

  const sub1Kw = content?.tariffs?.pmSuryaGhar1Kw ?? 30000;
  const sub2Kw = content?.tariffs?.pmSuryaGhar2Kw ?? 60000;
  const sub3KwMax = content?.tariffs?.pmSuryaGhar3KwMax ?? 78000;

  return (
    <section id="schemes" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold tracking-normal border border-emerald-200">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('schemes_tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
            {t('schemes_title')}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t('schemes_subtitle')}
          </p>
        </div>

        {/* Subsidy Cards Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* PM Surya Ghar Card */}
          <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-emerald-800 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-normal px-3 py-1 rounded-full bg-amber-400 text-emerald-950 inline-block">
                {isMr ? 'केंद्र शासन योजना' : 'Central Government Scheme'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
                PM Surya Ghar: Muft Bijli Yojana
              </h3>
              <p className="text-emerald-100/90 text-sm leading-relaxed">
                {isMr
                  ? 'निवासी घरमालकांसाठी थेट बँक खात्यात (DBT) सबसिडी. महावितरण नेट-मीटरिंगद्वारे ३०० युनिट्स मोफत विजेचा लाभ.'
                  : 'Direct Bank Transfer (DBT) subsidy for residential homes. Provides up to 300 units of free clean electricity per month via net-metering.'}
              </p>

              {/* Subsidy Table */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-800/60 border border-emerald-700/60">
                  <span className="text-sm font-semibold">{isMr ? '१ किलोवॅट सिस्टीम' : '1 kW System'}</span>
                  <span className="text-base font-extrabold text-amber-300">₹ {sub1Kw.toLocaleString('en-IN')} {isMr ? 'सबसिडी' : 'Subsidy'}</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-800/60 border border-emerald-700/60">
                  <span className="text-sm font-semibold">{isMr ? '२ किलोवॅट सिस्टीम' : '2 kW System'}</span>
                  <span className="text-base font-extrabold text-amber-300">₹ {sub2Kw.toLocaleString('en-IN')} {isMr ? 'सबसिडी' : 'Subsidy'}</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-800/60 border border-emerald-700/60">
                  <span className="text-sm font-semibold">{isMr ? '३ किलोवॅट किंवा अधिक' : '3 kW or higher'}</span>
                  <span className="text-base font-extrabold text-amber-300">₹ {sub3KwMax.toLocaleString('en-IN')} {isMr ? 'कमाल सबसिडी' : 'Max Subsidy'}</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-800/60 border border-emerald-700/60">
                  <span className="text-sm font-semibold">{isMr ? 'सोसायटी (Common Facilities)' : 'Housing Societies (GHS)'}</span>
                  <span className="text-base font-extrabold text-amber-300">₹ 18,000 / kW {isMr ? '(कमाल ९ लाख)' : '(Max ₹9L)'}</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="#calculator"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm transition-colors"
              >
                <span>{isMr ? 'तुमची सबसिडी कॅल्क्युलेट करा' : 'Calculate Your Exact Subsidy'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* PM-KUSUM Agri-Solar Card */}
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-normal px-3 py-1 rounded-full bg-emerald-500 text-slate-950 inline-block">
                {isMr ? 'शेतकऱ्यांसाठी योजना' : 'Agricultural Scheme'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
                PM-KUSUM Solar Agri-Pumps
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {isMr
                  ? 'शेतकऱ्यांना शेतीसाठी दिवसा अखंड वीज आणि सिंचनासाठी ३, ५, व ७.५ HP सौर कृषी पंप. केंद्र व राज्य शासनाचे एकत्रित ९०% पर्यंत अनुदान.'
                  : 'Reliable daytime irrigation power for farmers with 3 HP, 5 HP, and 7.5 HP standalone and grid-connected DC/AC solar pumps with up to 90% combined subsidy.'}
              </p>

              {/* Highlights */}
              <div className="pt-4 space-y-3 text-sm text-slate-200">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{isMr ? 'दिवसा अखंड सिंचन — रात्री शेतात जाण्याची गरज नाही' : 'Daytime continuous irrigation without night visits'}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{isMr ? '५ वर्षांची संपूर्ण ऑन-साइट वॉरंटी व मोफत देखभाल' : '5-Year comprehensive onsite warranty & maintenance'}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{isMr ? 'ठिबक व तुषार सिंचन नेटवर्कशी १००% सुसंगत' : '100% compatible with drip and sprinkler networks'}</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors"
              >
                <span>{isMr ? 'शेतकरी सौर पंपासाठी अर्ज करा' : 'Apply for Solar Pump Scheme'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* 4-Step Net-Metering Flow */}
        <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-3xl p-8 sm:p-12">
          <h3 className="text-2xl font-bold text-slate-900 font-['Outfit'] mb-8 text-center">
            {isMr ? 'महावितरण नेट-मीटरिंग व सबसिडी मिळण्याची ४-टप्पे सोपी प्रक्रिया' : 'Simple 4-Step MSEDCL Net-Metering & Subsidy Process'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-extrabold flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="font-bold text-slate-900 font-['Outfit']">
                {isMr ? 'मोफत साइट सर्व्हे' : 'Site Feasibility'}
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                {isMr ? 'इंजिनिअर छताची तपासणी व वीज मंजुरी भार तपासतात.' : 'Technical check of shadow area and sanctioned load.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-extrabold flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="font-bold text-slate-900 font-['Outfit']">
                {isMr ? 'ऑनलाइन पोर्टल अर्ज' : 'Portal Registration'}
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                {isMr ? 'पीएम सूर्य घर पोर्टलवर नोंदणी व महावितरण ना हरकत प्रमाणपत्र.' : 'Submission on national portal & MSEDCL sanction.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-extrabold flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="font-bold text-slate-900 font-['Outfit']">
                {isMr ? 'टर्नकी इन्स्टॉलेशन' : 'EPC Installation'}
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                {isMr ? 'दर्जेदार सोलर पॅनेल्स, इनव्हर्टर आणि संरचनेची उभारणी.' : 'DCR compliant panels, inverters & earthing setup.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-sm">
                4
              </div>
              <h4 className="font-bold text-slate-900 font-['Outfit']">
                {isMr ? 'नेट-मीटर व सबसिडी' : 'Net-Meter & DBT'}
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                {isMr ? 'बाय-डायरेक्शनल मीटर बसवला जातो व सबसिडी थेट बँकेत जमा.' : 'Bidirectional meter install and DBT release in 30 days.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
