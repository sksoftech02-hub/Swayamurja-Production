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
    taglineEn: "Empowering Maharashtra's Clean Energy Independence Through 25+ Years of Engineering Leadership",
    taglineMr: "२५+ वर्षांच्या प्रदीर्घ अभियांत्रिकी नेतृत्वाद्वारे महाराष्ट्राला स्वच्छ व स्वयंपूर्ण ऊर्जेकडे नेणे",
    mdCeoMessage: {
      name: "Rahul Nalawade",
      designationEn: "Founder, Managing Director & CEO",
      designationMr: "संस्थापक, व्यवस्थापकीय संचालक आणि मुख्य कार्यकारी अधिकारी",
      photo: "/uploads/team/rahul-nalawade.jpg",
      quoteEn: "Guided by our organizational purpose of contributing to the Nation's growth through sustainable and affordable clean energy solutions, every initiative undertaken by us is focused towards building a greener, brighter, and energy-secure future for generations to come.",
      quoteMr: "शाश्वत आणि परवडणाऱ्या स्वच्छ ऊर्जा उपायांद्वारे राष्ट्राच्या प्रगतीत योगदान देण्याच्या आमच्या ध्येयाने प्रेरित होऊन, आमचा प्रत्येक उपक्रम भावी पिढ्यांसाठी अधिक हरित, उज्ज्वल आणि ऊर्जा-सुरक्षित भविष्य घडवण्यासाठी समर्पित आहे.",
      messageEn: "SwayamUrja Renewable Energy delivers comprehensive end-to-end solutions across Solar Energy, Wind Energy, and Battery Energy Storage Systems (BESS). Guided by our core values of Morality, Integrity, Transparency, Reliability, and Authenticity ('MITRA'), our leadership has developed 1,600 MW+ in Wind & Solar projects across India and completed 550+ clean energy installations. We express our deepest gratitude to our esteemed clients including Manikchand Group, Elpro Group, Lohia Jain Group, The Fern Hotels, Cleanmax, and Bajaj Finserv, along with our dedicated team of 70+ SwayamUrja-MITRA professionals.",
      messageMr: "स्वयम्ऊर्जा रिन्यूएबल एनर्जी सौर ऊर्जा, पवन ऊर्जा आणि बॅटरी एनर्जी स्टोरेज (BESS) क्षेत्रात संकल्पनेपासून ते प्रत्यक्ष कार्यान्वित होईपर्यंत सर्वसमावेशक सेवा प्रदान करते. नीतिमत्ता (Morality), प्रामाणिकपणा (Integrity), पारदर्शकता (Transparency), विश्वासार्हता (Reliability) आणि सत्यता (Authenticity) या 'मित्र' (MITRA) मूल्यांवर आधारित, आमच्या नेतृत्वाने देशभरात १,६००+ मेगावॅटचे प्रकल्प विकसित केले असून ५५०+ हून अधिक प्रकल्प यशस्वीरीत्या पूर्ण केले आहेत. माणिकचंद ग्रुप, एल्प्रो ग्रुप, लोहिया जैन ग्रुप, द फर्न हॉटेल्स, क्लीनमॅक्स आणि बजाज फिनसर्व्ह यांसारख्या आदरणीय ग्राहकांचा आणि आमच्या ७०+ निष्ठावान कर्मचाऱ्यांचा आम्ही मनापासून आभारी आहोत."
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
      { letter: "M", titleEn: "Morality", titleMr: "नीतिमत्ता", descEn: "Uncompromising ethical standards in all commercial dealings, regulatory compliances, and customer commitments.", descMr: "सर्व व्यावसायिक व्यवहार, शासकीय नियमांचे पालन आणि ग्राहकांशी दिलेल्या शब्दाला जागणारी उच्च नैतिक मूल्ये." },
      { letter: "I", titleEn: "Integrity", titleMr: "प्रामाणिकपणा", descEn: "Honest generation yield forecasts, transparent billing, and reliable post-commissioning warranties.", descMr: "पारदर्शक व्यवहार, सौर निर्मितीचे अचूक अंदाज आणि प्रकल्प उभारणीनंतर विश्वासार्ह हमी." },
      { letter: "T", titleEn: "Transparency", titleMr: "पारदर्शकता", descEn: "Clear, upfront technical communication from design, component selection, to MSEDCL grid sync.", descMr: "प्रकल्प आराखडा, उपकरणांची निवड ते महावितरण ग्रीड जोडणीपर्यंत प्रत्येक टप्प्यावर स्पष्ट व पारदर्शक संवाद." },
      { letter: "R", titleEn: "Reliability", titleMr: "विश्वासार्हता", descEn: "Proactive remote SCADA telemetry ensuring >99.4% plant availability across all weather conditions.", descMr: "सर्व ऋतूंमध्ये ९९.४% पेक्षा जास्त प्लांट अपटाइम देणारी २४/७ रिमोट स्कॅडा मॉनिटरिंग हमी." },
      { letter: "A", titleEn: "Authenticity", titleMr: "सत्यता आणि अस्सलता", descEn: "Genuine Tier-1 equipment, tested engineering practices, and authentic lifelong stewardship for every client.", descMr: "अस्सल टियर-१ प्रमाणित उपकरणे, दर्जेदार अभियांत्रिकी आणि ग्राहकांसाठी आजन्म सेवा सहाय्य." }
    ],
    teamMembers: [
      {
        id: "tm-1",
        name: "Rahul Nalawade",
        designationEn: "Founder, Managing Director & CEO",
        designationMr: "संस्थापक, व्यवस्थापकीय संचालक आणि मुख्य कार्यकारी अधिकारी",
        bioEn: "Electrical Engineer with MBA, PG in RE & TQM, Doctorate candidate in Project Mgmt. Former President & CEO at Panama RE, Technical Advisor to MEDA, with 25+ years developing 1,600 MW+ Wind & Solar projects across India.",
        bioMr: "इलेक्ट्रिकल इंजिनिअर, व्यवस्थापन पदवीधर (MBA) आणि २५+ वर्षांचा प्रदीर्घ अनुभव. 'मेडा' (MEDA) चे माजी तांत्रिक सल्लागार आणि देशभरात १,६००+ मेगावॅट प्रकल्पांचे यशस्वी नेतृत्व.",
        photo: "/uploads/team/rahul-nalawade.jpg",
        linkedin: "https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/",
        order: 1
      },
      {
        id: "tm-2",
        name: "Mahesh Mane",
        designationEn: "Director - Projects & Engineering",
        designationMr: "संचालक - प्रकल्प व अभियांत्रिकी",
        bioEn: "Electrical Engineer with 20+ years of distinguished execution leadership across high-voltage electrical infrastructure and multi-megawatt solar grid integration.",
        bioMr: "इलेक्ट्रिकल इंजिनिअर व उच्च-दाब वीज पायाभूत सुविधा तसेच बहु-मेगावॅट सोलर प्रकल्पांच्या प्रत्यक्ष उभारणीतील २०+ वर्षांचा समृद्ध अनुभव.",
        photo: "/uploads/team/swayamurja-mitra-team.jpg",
        linkedin: "https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/",
        order: 2
      },
      {
        id: "tm-3",
        name: "Anil God",
        designationEn: "Director - SCM & Finance",
        designationMr: "संचालक - पुरवठा साखळी व वित्त व्यवस्थापन",
        bioEn: "Specialist in strategic Tier-1 procurement, vendor contract administration, and project financial modeling for CAPEX and OPEX renewable energy developments.",
        bioMr: "टियर-१ दर्जाच्या उपकरणांची खरेदी, पुरवठा साखळी व्यवस्थापन आणि सौर ऊर्जा प्रकल्पांचे आर्थिक नियोजन यातील तज्ज्ञ.",
        photo: "/uploads/team/swayamurja-mitra-team.jpg",
        linkedin: "https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/",
        order: 3
      },
      {
        id: "tm-4",
        name: "SwayamUrja EPC Engineering Team",
        designationEn: "Technical Operations, Design & O&M (60+ Professionals)",
        designationMr: "तांत्रिक ऑपरेशन्स, डिझाईन आणि ओ अँड एम (६०+ तज्ज्ञ)",
        bioEn: "Cross-functional team of 60+ certified electrical engineers, PVsyst solar designers, and MSEDCL grid-connectivity specialists.",
        bioMr: "६०+ प्रमाणित इलेक्ट्रिकल इंजिनिअर्स, सोलर डिझाइन आणि महावितरण ग्रीड जोडणी तज्ज्ञांची समर्पित टीम.",
        photo: "/uploads/team/swayamurja-mitra-team.jpg",
        linkedin: "https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/",
        order: 4
      }
    ]
  };

  const team: CMSTeamMember[] = about.teamMembers && about.teamMembers.length > 0
    ? about.teamMembers
    : [];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* ══════════════════════════════════════════════
            1. SECTION INTRO
        ══════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isMr ? 'आमच्याबद्दल' : 'About SwayamUrja'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight font-['Outfit']">
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
          <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Photo & Badge */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-lg">
                  <Image
                    src={about.mdCeoMessage.photo || '/uploads/team/rahul-nalawade.jpg'}
                    alt={about.mdCeoMessage.name}
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mt-4 font-['Outfit']">
                  {about.mdCeoMessage.name}
                </h3>
                <p className="text-xs font-medium text-emerald-400 mt-1">
                  {isMr ? about.mdCeoMessage.designationMr : about.mdCeoMessage.designationEn}
                </p>
              </div>

              {/* Message Content */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-emerald-300 text-xs font-medium">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isMr ? 'व्यवस्थापकीय संचालकांचे मनोगत' : 'Gratitude by our MD & CEO'}</span>
                </div>

                <div className="relative pl-6 border-l-2 border-amber-400">
                  <Quote className="w-6 h-6 text-amber-400/40 absolute -left-3.5 -top-2" />
                  <p className="text-lg md:text-xl font-medium text-slate-200 leading-snug">
                    &ldquo;{isMr ? about.mdCeoMessage.quoteMr : about.mdCeoMessage.quoteEn}&rdquo;
                  </p>
                </div>

                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  {isMr ? about.mdCeoMessage.messageMr : about.mdCeoMessage.messageEn}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 tabular-nums">
                  <div>
                    <div className="text-2xl font-bold text-amber-400 font-['Outfit']">1,600+ MW</div>
                    <div className="text-xs text-slate-400">{isMr ? 'विकसित पवन व सौर प्रकल्प' : 'Developed Across India'}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-400 font-['Outfit']">550+</div>
                    <div className="text-xs text-slate-400">{isMr ? 'यशस्वी पूर्ण प्रकल्प' : 'Completed Projects'}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400 font-['Outfit']">25+ Yrs</div>
                    <div className="text-xs text-slate-400">{isMr ? 'नवीकरणीय ऊर्जा नेतृत्व' : 'Renewable Sector Leadership'}</div>
                  </div>
                </div>

                {/* Verified Awards & Recognitions (zero emojis) */}
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="text-xs font-medium text-amber-400/90 mb-2">
                    {isMr ? 'पुरस्कार आणि सन्मान' : 'Awards & Recognition'}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-emerald-500/30 text-emerald-300">
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      {isMr ? 'भारतातील टॉप ४० प्रभावशाली सौर नेते (२०२२)' : 'Top 40 Most Influential Solar Leaders (2022)'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                      <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {isMr ? 'मोस्ट प्रॉमिसिंग यंग लीडर (२०२१)' : 'Most Promising Young Leader (2021)'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                      <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {isMr ? 'सोलर ईपीसी कंपनी ऑफ द इयर (२०२५)' : 'Solar EPC Company of the Year (2025)'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {isMr ? 'पुणे विद्यापीठ अतिथी व्याख्याते व यशदा प्रशिक्षक' : 'SPPU Guest Lecturer & YASHADA Trainer'}
                    </span>
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
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-colors duration-300 group"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold tracking-normal mb-2">
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
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 hover:bg-white hover:border-amber-400 hover:shadow-md transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-xl flex items-center justify-center mb-3 shadow-md shadow-amber-500/20 font-['Outfit']">
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
        <div id="about-team" className="scroll-mt-32 space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold tracking-normal mb-2">
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

          {/* ── Genuine SwayamUrja-MITRA 60+ Team Photo Showcase ── */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white max-w-5xl mx-auto group">
            <div className="relative w-full aspect-[16/9] sm:aspect-[2.2/1] overflow-hidden">
              <Image
                src="/uploads/team/swayamurja-mitra-team.jpg"
                alt={isMr ? "स्वयम्ऊर्जा-मित्र टीम (६०+ तज्ज्ञ)" : "SwayamUrja-MITRA EPC Team (60+ Professionals)"}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/90 text-emerald-300 border border-emerald-400/30 text-xs font-medium tracking-normal">
                    <Users className="w-3.5 h-3.5" />
                    {isMr ? "आमचा सर्वात मोठा ठेवा (Our Asset)" : "Our Asset – Our Driving Force"}
                  </span>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-['Outfit']">
                    {isMr ? "स्वयम्ऊर्जा-मित्र (SwayamUrja-MITRA) ६०+ तज्ज्ञांची समर्पित टीम" : "Team of 60+ SwayamUrja-MITRA Solar EPC Specialists"}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    {isMr
                      ? "सौर डिझाईन, स्ट्रक्चरल इंजिनिअरिंग, महावितरण नेट-मीटरिंग, सीईआयजी मंजुरी आणि २५ वर्षांची सातत्यपूर्ण ओ अँड एम (O&M) सेवा सांभाळणारे आमचे ६०+ अभियंते व तंत्रज्ञ."
                      : "Certified PVsyst solar designers, electrical engineers, MSEDCL net-metering liaison specialists, and dedicated 24/7 O&M technicians delivering engineering excellence."}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-['Outfit']">60+</div>
                  <div className="text-xs text-slate-200 leading-tight">
                    {isMr ? <>सौर ऊर्जा<br/>अभियंते व मित्र</> : <>Solar EPC<br/>Specialists</>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div 
                key={member.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-colors duration-300 flex flex-col sm:flex-row gap-5 items-center sm:items-start group hover:border-emerald-300"
              >
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-100 shadow-md">
                  <Image
                    src={member.photo || '/uploads/team/rahul-nalawade.jpg'}
                    alt={member.name}
                    fill
                    className="object-cover group- transition-transform duration-300"
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
