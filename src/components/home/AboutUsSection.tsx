'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { 
  Target, 
  Compass, 
  Quote, 
  Award, 
  ShieldCheck, 
  Zap, 
  Factory, 
  SunMedium, 
  Home, 
  Users, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { AboutUsContent, CMSTeamMember } from '@/lib/types';

const LinkedInIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.54a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24" />
  </svg>
);

export const AboutUsSection: React.FC = () => {
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
      messageEn: "At SwayamUrja, our mission transcends installing solar panels; we engineer long-term energy security for Maharashtra's industrial powerhouses, commercial institutions, and progressive farming communities. With over 50 MW commissioned across Maharashtra, our Tier-1 engineering ethos, MSEDCL compliance mastery, and lifetime performance guarantees have earned the trust of over 1,200 esteemed clients.",
      messageMr: "स्वयम्ऊर्जा मध्ये, आमचे उद्दिष्ट केवळ सोलर पॅनेल बसवणे एवढेच नाही; तर महाराष्ट्रातील औद्योगिक उद्योग, व्यावसायिक संस्था आणि प्रगतीशील शेतकरी यांच्यासाठी दीर्घकालीन ऊर्जा सुरक्षा निर्माण करणे हे आहे. ५०+ मेगावॅट कार्यान्वित क्षमतेसह, आमची उत्कृष्ट अभियांत्रिकी आणि विश्वासार्हतेने १२००+ ग्राहकांचा विश्वास संपादन केला आहे."
    },
    visionEn: "To lead Maharashtra's transition to 100% clean, decentralized solar power through engineering excellence and customer trust.",
    visionMr: "अभियांत्रिकी उत्कृष्टता आणि ग्राहकांच्या विश्वासाद्वारे महाराष्ट्राला १००% स्वच्छ, विकेंद्रित सौर ऊर्जेकडे नेणे.",
    missionEn: "Deliver robust, high-yield solar EPC solutions that maximize return on investment, eliminate power outages, and preserve our environment for future generations.",
    missionMr: "गुंतवणुकीवर जास्तीत जास्त परतावा देणारे, अखंड वीज पुरवणारे आणि पर्यावरणाचे रक्षण करणारे मजबूत, उच्च-कार्यक्षम सोलर प्रकल्प उभारणे.",
    coreFocus: [
      {
        titleEn: "Industrial & Commercial Solar",
        titleMr: "औद्योगिक आणि व्यावसायिक सोलर",
        descEn: "Turnkey rooftop and ground-mount plants designed for high-consumption factories and commercial hubs.",
        descMr: "कारखाने आणि व्यावसायिक संकुलांसाठी उच्च-कार्यक्षम रूफटॉप व ग्राउंड-माउंट प्रकल्प.",
        icon: "Factory"
      },
      {
        titleEn: "Utility-Scale Solar Parks",
        titleMr: "युटिलिटी-स्केल सोलर पार्क",
        descEn: "Multi-megawatt grid-tied solar farms powering regional industrial grids and MSEDCL feed-ins.",
        descMr: "महावितरण ग्रीडला वीज पुरवणारे बहु-मेगावॅट क्षमतेचे मोठे सोलर पार्क.",
        icon: "Zap"
      },
      {
        titleEn: "Agricultural Solar (PM-KUSUM)",
        titleMr: "कृषी सोलर (पीएम-कुसुम)",
        descEn: "Daytime uninterrupted irrigation solar pumps empowering Maharashtra farmers.",
        descMr: "शेतकऱ्यांसाठी दिवसा अखंड वीज आणि सिंचन देणारे पीएम-कुसुम सोलर पंप.",
        icon: "SunMedium"
      },
      {
        titleEn: "Residential Rooftop Solar",
        titleMr: "निवासी रूफटॉप सोलर",
        descEn: "PM Surya Ghar subsidy-enabled smart rooftop systems cutting home bills to zero.",
        descMr: "घरगुती वीज बिल शून्य करणारी पीएम सूर्य घर अनुदानयुक्त रूफटॉप प्रणाली.",
        icon: "Home"
      }
    ],
    coreValues: [
      { letter: "M", titleEn: "Mastery in Engineering", titleMr: "अभियांत्रिकी प्रभुत्व", descEn: "Tier-1 component selection, rigorous structural calculations, and zero-defect installation standards.", descMr: "दर्जेदार उपकरणे, सुरक्षित रचना आणि अचूक कामाचे निकष." },
      { letter: "I", titleEn: "Integrity & Transparency", titleMr: "प्रामाणिकपणा आणि पारदर्शकता", descEn: "Honest yield forecasts, transparent billing, and reliable post-commissioning warranties.", descMr: "पारदर्शक व्यवहार, अचूक अंदाज आणि विश्वासार्ह सेवा." },
      { letter: "T", titleEn: "Timely Execution", titleMr: "वेळेवर पूर्तता", descEn: "Strict milestone adherence from civil foundation to MSEDCL net-meter synchronisation.", descMr: "साइट सर्व्हेपासून ते महावितरण नेट-मीटरिंगपर्यंत सर्व कामे वेळेवर." },
      { letter: "R", titleEn: "Reliability & Uptime", titleMr: "विश्वासार्हता आणि सातत्य", descEn: "Proactive remote SCADA telemetry ensuring >99% plant availability across all weather conditions.", descMr: "अखंड कामगिरी आणि २४/७ रिमोट मॉनिटरिंग हमी." },
      { letter: "A", titleEn: "Accountability to Customers", titleMr: "ग्राहकांशी बांधिलकी", descEn: "Lifelong operational stewardship and rapid on-ground response for peak kilowatt generation.", descMr: "प्रकल्प उभारणीनंतरही अखंड देखभाल आणि जलद सेवा सहाय्य." }
    ],
    teamMembers: [
      {
        id: "tm-1",
        name: "Rahul Nalawade",
        designationEn: "Founder, Managing Director & CEO",
        designationMr: "संस्थापक, व्यवस्थापकीय संचालक आणि मुख्य कार्यकारी अधिकारी",
        bioEn: "Pioneering Maharashtra's renewable energy landscape with 15+ years of strategic EPC execution and 50+ MW delivered across C&I and Utility scale.",
        bioMr: "१५+ वर्षांचा अनुभव आणि ५०+ मेगावॅट सोलर प्रकल्पांची यशस्वी उभारणी.",
        photo: "/uploads/team/rahul-nalawade.jpg",
        linkedin: "https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/",
        order: 1
      },
      {
        id: "tm-2",
        name: "SwayamUrja EPC Leadership Team",
        designationEn: "EPC Engineering, Technical Operations & Quality",
        designationMr: "प्रकल्प अभियांत्रिकी, तांत्रिक ऑपरेशन्स आणि गुणवत्ता विभाग",
        bioEn: "Cross-functional team of certified electrical engineers, solar PV designers, and MSEDCL grid-connectivity specialists.",
        bioMr: "प्रमाणित इलेक्ट्रिकल इंजिनिअर्स आणि सोलर डिझाइन तज्ज्ञांची समर्पित टीम.",
        photo: "/uploads/team/our-team.png",
        linkedin: "https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/",
        order: 2
      }
    ]
  };

  const team: CMSTeamMember[] = about.teamMembers && about.teamMembers.length > 0
    ? about.teamMembers
    : [];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50 rounded-full filter blur-3xl opacity-60 -z-10" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-amber-50 rounded-full filter blur-3xl opacity-60 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* ══════════════════════════════════════════════
            1. SECTION INTRO
        ══════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isMr ? 'आमच्याबद्दल' : 'About SwayamUrja'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight font-['Outfit']">
            {isMr ? 'स्वच्छ ऊर्जा क्रांतीचे अग्रदूत' : 'Pioneers of Maharashtra\'s Solar Revolution'}
          </h2>
          <p className="text-base md:text-lg text-slate-600 mt-4 leading-relaxed">
            {isMr ? about.taglineMr : about.taglineEn}
          </p>
        </div>

        {/* ══════════════════════════════════════════════
            2. GRATITUDE BY MD & CEO (Matching swayamurja.com)
        ══════════════════════════════════════════════ */}
        <div id="about-ceo" className="scroll-mt-24">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-800">
            {/* Glow orb */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Photo & Badge */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden border-4 border-emerald-400/40 shadow-2xl group">
                  <Image
                    src={about.mdCeoMessage.photo || '/uploads/team/rahul-nalawade.jpg'}
                    alt={about.mdCeoMessage.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <h3 className="text-2xl font-black text-white mt-4 font-['Outfit']">
                  {about.mdCeoMessage.name}
                </h3>
                <p className="text-xs font-semibold text-emerald-400 mt-1 uppercase tracking-wider">
                  {isMr ? about.mdCeoMessage.designationMr : about.mdCeoMessage.designationEn}
                </p>
              </div>

              {/* Message Content */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isMr ? 'व्यवस्थापकीय संचालकांचे मनोगत' : 'Gratitude by our MD & CEO'}</span>
                </div>

                <div className="relative pl-6 border-l-4 border-amber-400">
                  <Quote className="w-8 h-8 text-amber-400/40 absolute -left-5 -top-3" />
                  <p className="text-lg md:text-xl font-medium text-slate-200 italic leading-snug">
                    "{isMr ? about.mdCeoMessage.quoteMr : about.mdCeoMessage.quoteEn}"
                  </p>
                </div>

                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  {isMr ? about.mdCeoMessage.messageMr : about.mdCeoMessage.messageEn}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div>
                    <div className="text-2xl font-black text-amber-400 font-['Outfit']">50+ MW</div>
                    <div className="text-xs text-slate-400">{isMr ? 'कार्यान्वित क्षमता' : 'Commissioned'}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-emerald-400 font-['Outfit']">1,200+</div>
                    <div className="text-xs text-slate-400">{isMr ? 'समाधानी ग्राहक' : 'Clients Trust'}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-cyan-400 font-['Outfit']">15+ Yrs</div>
                    <div className="text-xs text-slate-400">{isMr ? 'अभियांत्रिकी अनुभव' : 'Engineering Mastery'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            3. VISION & MISSION
        ══════════════════════════════════════════════ */}
        <div id="about-vision" className="scroll-mt-24 space-y-6">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              {isMr ? 'आमचे दृष्टिकोन आणि ध्येय' : 'Our Vision & Mission'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-gradient-to-br from-emerald-50/60 to-white p-8 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-5 shadow-lg shadow-emerald-600/20">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 font-['Outfit']">
                {isMr ? 'दृष्टिकोन (Vision)' : 'Our Vision'}
              </h4>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {isMr ? about.visionMr : about.visionEn}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-br from-amber-50/60 to-white p-8 rounded-3xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-5 shadow-lg shadow-amber-500/20">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 font-['Outfit']">
                {isMr ? 'ध्येय (Mission)' : 'Our Mission'}
              </h4>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {isMr ? about.missionMr : about.missionEn}
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            4. OUR CORE FOCUS
        ══════════════════════════════════════════════ */}
        <div id="about-focus" className="scroll-mt-24 space-y-6">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              {isMr ? 'आमचे प्रमुख कार्यक्षेत्र (Core Focus)' : 'Our Core Focus'}
            </h3>
            <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
              {isMr 
                ? 'महाराष्ट्रातील औद्योगिक कारखान्यांपासून ते कृषी आणि निवासी क्षेत्रांपर्यंत एकात्मिक सोलर सोल्यूशन्स'
                : 'Turnkey engineering across utility scale, industrial manufacturing, agro-solar, and residential sectors'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.coreFocus.map((focus, idx) => {
              const icons = [Factory, Zap, SunMedium, Home];
              const IconComp = icons[idx % icons.length];
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-emerald-100 text-slate-700 group-hover:text-emerald-700 flex items-center justify-center mb-4 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-2 group-hover:text-emerald-800 transition-colors">
                    {isMr ? focus.titleMr : focus.titleEn}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {isMr ? focus.descMr : focus.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            5. OUR CORE VALUES: MITRA (Matching swayamurja.com)
        ══════════════════════════════════════════════ */}
        <div id="about-values" className="scroll-mt-24 space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{isMr ? 'मूल्ये' : 'Foundational Philosophy'}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              {isMr ? 'आमची मूळ मूल्ये : MITRA' : 'Our Core Values : MITRA'}
            </h3>
            <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
              {isMr 
                ? 'प्रत्येक सोलर प्रकल्पाच्या रचनेत, उभारणीत आणि देखभालीत मार्गदर्शक ठरलेली ५ तत्त्वे'
                : 'The 5 engineering and ethical pillars guiding every SwayamUrja installation'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {about.coreValues.map((val) => (
              <div
                key={val.letter}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 hover:bg-white hover:border-amber-400 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white font-black text-xl flex items-center justify-center mb-3 shadow-md shadow-amber-500/20 font-['Outfit']">
                  {val.letter}
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1.5 font-['Outfit']">
                  {isMr ? val.titleMr : val.titleEn}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {isMr ? val.descMr : val.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            6. OUR TEAM & KEY DESIGNATIONS (Dynamic Profiles)
        ══════════════════════════════════════════════ */}
        <div id="about-team" className="scroll-mt-24 space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isMr ? 'नेतृत्व' : 'Leadership & Expertise'}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              {isMr ? 'आमची टीम आणि नेतृत्व' : 'Our Leadership & EPC Team'}
            </h3>
            <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
              {isMr 
                ? 'सौर अभियांत्रिकी, स्ट्रक्चरल डिझाइन आणि महावितरण ग्रिड जोडणीतील अग्रगण्य तज्ज्ञ'
                : 'Certified solar photovoltaic designers, electrical engineers, and regulatory specialists'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div 
                key={member.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-5 items-center sm:items-start group hover:border-emerald-300"
              >
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-100 shadow-md">
                  <Image
                    src={member.photo || '/uploads/team/rahul-nalawade.jpg'}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h4 className="font-extrabold text-slate-900 text-lg font-['Outfit']">
                      {member.name}
                    </h4>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-blue-600 transition-colors inline-flex justify-center"
                        title="LinkedIn Profile"
                      >
                        <LinkedInIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/60">
                    {isMr ? member.designationMr : member.designationEn}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed pt-1">
                    {isMr ? member.bioMr : member.bioEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
