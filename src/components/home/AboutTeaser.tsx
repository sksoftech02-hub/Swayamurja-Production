'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { 
  ArrowRight, 
  Quote, 
  Award, 
  ShieldCheck, 
} from 'lucide-react';
import { AboutUsContent } from '@/lib/types';

export const AboutTeaser: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';

  const about: AboutUsContent = content?.aboutUs || {
    taglineEn: "Empowering Maharashtra's Green Future Through Engineering Excellence",
    taglineMr: "अभियांत्रिकी उत्कृष्टतेद्वारे महाराष्ट्राच्या हरित भविष्याला सक्षम करणे",
    mdCeoMessage: {
      name: "Rahul Nalawade",
      designationEn: "Founder, Managing Director & CEO",
      designationMr: "संस्थापक, व्यवस्थापकीय संचालक आणि मुख्य कार्यकारी अधिकारी",
      photo: "/uploads/team/rahul-nalawade.jpg",
      quoteEn: "True energy independence begins when every enterprise and household produces their own clean, renewable power.",
      quoteMr: "प्रत्येक व्यवसाय आणि कुटुंब स्वतःची स्वच्छ, नवीकरणीय ऊर्जा निर्माण करेल तेव्हाच खरी ऊर्जा स्वावलंबता सुरू होईल.",
      messageEn: "At SwayamUrja, we engineer reliable, high-yield solar power plants for Maharashtra's industrial units, commercial institutions, and farming communities.",
      messageMr: "स्वयम्ऊर्जा मध्ये, आमचे उद्दिष्ट केवळ सोलर पॅनेल बसवणे एवढेच नाही; तर महाराष्ट्रातील औद्योगिक उद्योग, व्यावसायिक संस्था आणि प्रगतीशील शेतकरी यांच्यासाठी दीर्घकालीन ऊर्जा सुरक्षा निर्माण करणे हे आहे."
    },
    visionEn: "To lead Maharashtra's transition to 100% clean, decentralized solar power through engineering excellence and customer trust.",
    visionMr: "अभियांत्रिकी उत्कृष्टता आणि ग्राहकांच्या विश्वासाद्वारे महाराष्ट्राला १००% स्वच्छ, विकेंद्रित सौर ऊर्जेकडे नेणे.",
    missionEn: "Deliver robust, high-yield solar EPC solutions that maximize return on investment.",
    missionMr: "गुंतवणुकीवर जास्तीत जास्त परतावा देणारे मजबूत सोलर प्रकल्प उभारणे.",
    coreFocus: [],
    coreValues: [],
    teamMembers: []
  };

  return (
    <section id="about" className="py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Teaser Card */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-10 md:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: MD & CEO Profile Card */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-lg">
                <Image
                  src={about.mdCeoMessage?.photo || '/uploads/team/rahul-nalawade.jpg'}
                  alt={about.mdCeoMessage?.name || 'Rahul Nalawade'}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>

              <div className="mt-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                  {about.mdCeoMessage?.name || 'Rahul Nalawade'}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-emerald-400 mt-0.5">
                  {isMr ? about.mdCeoMessage?.designationMr : about.mdCeoMessage?.designationEn}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-emerald-300 mt-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isMr ? '२५+ वर्षे नवीकरणीय ऊर्जा नेतृत्व' : '25+ Years Renewable Sector Leader'}</span>
                </div>
              </div>
            </div>

            {/* Right: Vision, Quote & Direct Page Link */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-400/25 text-xs font-medium">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isMr ? 'आमच्याबद्दल आणि नेतृत्व' : 'About SwayamUrja & Leadership'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight font-['Outfit']">
                {isMr ? 'स्वच्छ ऊर्जा क्रांतीचे अग्रदूत' : 'Pioneers of Maharashtra\'s Solar Energy Revolution'}
              </h2>

              {/* MD Quote Box */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 relative">
                <Quote className="w-5 h-5 text-emerald-400/50 mb-2" />
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  &ldquo;{isMr ? about.mdCeoMessage?.quoteMr : about.mdCeoMessage?.quoteEn}&rdquo;
                </p>
              </div>

              {/* Key Highlights Metrics */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-3 border-t border-slate-800 tabular-nums">
                <div className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-amber-400 font-['Outfit']">1,600+ MW</div>
                  <div className="text-xs text-slate-300 font-medium">{isMr ? 'विकसित पवन व सौर' : 'Developed India'}</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-['Outfit']">550+</div>
                  <div className="text-xs text-slate-300 font-medium">{isMr ? 'पूर्ण झालेले प्रकल्प' : 'Completed Projects'}</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">60+</div>
                  <div className="text-xs text-slate-300 font-medium">{isMr ? 'स्वयम्ऊर्जा-मित्र टीम' : 'MITRA Experts'}</div>
                </div>
              </div>

              {/* Call-to-action buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/about-us"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors active:scale-[0.98]"
                >
                  <span>{isMr ? 'संपूर्ण माहिती आणि टीम पहा' : 'Explore Our Story, Vision & Leadership Team'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/about-us#about-ceo"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors border border-white/15"
                >
                  <span>{isMr ? 'संचालकांचे मनोगत' : 'MD & CEO Gratitude'}</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
