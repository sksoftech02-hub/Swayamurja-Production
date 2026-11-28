'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Briefcase,
  Building2,
  Handshake,
  Layers,
  Trophy,
  BadgeCheck,
  ArrowRight,
} from 'lucide-react';
import { AboutUsContent, CMSTeamMember } from '@/lib/types';
import {
  CEO_DOSSIER,
  EMPANELMENTS,
  EXPANDED_PURPOSE_VISION_MISSION,
  ENGINEERING_STRENGTHS,
  TRACK_RECORD_TABS,
  AWARDS_TIMELINE,
  TrackRecordCategory,
} from '@/lib/about-us-data';

const TEAM_PHOTO_SLIDES = [
  {
    src: '/uploads/team/swayamurja-mitra-team.jpg',
    captionEn: 'SwayamUrja-MITRA 70+ Solar EPC Specialists — Engineering & Field Operations',
    captionMr: 'स्वयम्ऊर्जा-मित्र ७०+ सोलर EPC तज्ज्ञ — अभियांत्रिकी व फिल्ड ऑपरेशन्स टीम',
  },
  {
    src: '/uploads/team/team-slide-1.webp',
    captionEn: 'SwayamUrja Team Outing — United by Our MITRA Core Values',
    captionMr: 'स्वयम्ऊर्जा टीम — आमच्या MITRA मूल्यांनी एकत्र बांधलेला परिवार',
  },
  {
    src: '/uploads/team/team-slide-2.webp',
    captionEn: 'Annual SwayamUrja-MITRA Celebration & Team Gathering',
    captionMr: 'वार्षिक स्वयम्ऊर्जा-मित्र स्नेहसंमेलन व टीम सोहळा',
  },
  {
    src: '/uploads/team/team-slide-3.webp',
    captionEn: 'Festive Celebration with Our Growing 70+ Professional Family',
    captionMr: '७०+ निष्ठावान सदस्यांसह आनंददायी सण व टीम सेलिब्रेशन',
  },
];

const LinkedInIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.54a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24" />
  </svg>
);

type CeoTab = 'gratitude' | 'career' | 'academic';

export const AboutUsSection: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';

  const [ceoTab, setCeoTab] = useState<CeoTab>('gratitude');
  const [trackTab, setTrackTab] = useState<TrackRecordCategory['id']>('epc');
  const [slideIdx, setSlideIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % TEAM_PHOTO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const prevSlide = () => setSlideIdx((prev) => (prev - 1 + TEAM_PHOTO_SLIDES.length) % TEAM_PHOTO_SLIDES.length);
  const nextSlide = () => setSlideIdx((prev) => (prev + 1) % TEAM_PHOTO_SLIDES.length);
  const activeSlide = TEAM_PHOTO_SLIDES[slideIdx];

  const about: AboutUsContent = content?.aboutUs || {
    taglineEn: "Empowering India's Clean Energy Independence Through 25+ Years of Engineering Leadership",
    taglineMr: '२५+ वर्षांच्या प्रदीर्घ अभियांत्रिकी नेतृत्वाद्वारे भारताला स्वच्छ व स्वयंपूर्ण ऊर्जेकडे नेणे',
    mdCeoMessage: {
      name: CEO_DOSSIER.name,
      designationEn: CEO_DOSSIER.designation.en,
      designationMr: CEO_DOSSIER.designation.mr,
      photo: CEO_DOSSIER.photo,
      quoteEn: CEO_DOSSIER.gratitudeQuote.en,
      quoteMr: CEO_DOSSIER.gratitudeQuote.mr,
      messageEn: CEO_DOSSIER.gratitudeParagraphs[0].en,
      messageMr: CEO_DOSSIER.gratitudeParagraphs[0].mr,
    },
    visionEn: EXPANDED_PURPOSE_VISION_MISSION.visionStatement.en,
    visionMr: EXPANDED_PURPOSE_VISION_MISSION.visionStatement.mr,
    missionEn: EXPANDED_PURPOSE_VISION_MISSION.missionStatement.en,
    missionMr: EXPANDED_PURPOSE_VISION_MISSION.missionStatement.mr,
    coreFocus: [
      {
        titleEn: 'Industrial & Commercial Solar',
        titleMr: 'औद्योगिक आणि व्यावसायिक सोलर',
        descEn: 'Turnkey rooftop and ground-mount plants designed for high-consumption factories and commercial hubs.',
        descMr: 'कारखाने आणि व्यावसायिक संकुलांसाठी उच्च-कार्यक्षम रूफटॉप व ग्राउंड-माउंट प्रकल्प.',
        icon: 'Factory',
      },
      {
        titleEn: 'Utility-Scale Solar Parks & BESS',
        titleMr: 'युटिलिटी-स्केल सोलर पार्क व BESS',
        descEn: 'Multi-megawatt grid-tied solar farms and battery energy storage systems powering regional grids.',
        descMr: 'महावितरण ग्रीडला वीज पुरवणारे बहु-मेगावॅट सोलर पार्क आणि बॅटरी स्टोरेज प्रकल्प.',
        icon: 'Zap',
      },
      {
        titleEn: 'Agricultural Solar (PM-KUSUM)',
        titleMr: 'कृषी सोलर (पीएम-कुसुम)',
        descEn: 'Daytime uninterrupted irrigation solar pumps and feeder solarization empowering Maharashtra farmers.',
        descMr: 'शेतकऱ्यांसाठी दिवसा अखंड वीज आणि सिंचन देणारे पीएम-कुसुम सोलर प्रकल्प.',
        icon: 'SunMedium',
      },
      {
        titleEn: 'Residential Rooftop Solar',
        titleMr: 'निवासी रूफटॉप सोलर',
        descEn: 'PM Surya Ghar subsidy-enabled smart rooftop systems cutting home electricity bills to zero.',
        descMr: 'घरगुती वीज बिल शून्य करणारी पीएम सूर्य घर अनुदानयुक्त रूफटॉप प्रणाली.',
        icon: 'Home',
      },
    ],
    coreValues: [
      {
        letter: 'M',
        titleEn: 'Morality',
        titleMr: 'नीतिमत्ता',
        descEn: 'Uncompromising ethical standards in all commercial dealings, regulatory compliances, and customer commitments.',
        descMr: 'सर्व व्यावसायिक व्यवहार, शासकीय नियमांचे पालन आणि ग्राहकांशी दिलेल्या शब्दाला जागणारी उच्च नैतिक मूल्ये.',
      },
      {
        letter: 'I',
        titleEn: 'Integrity',
        titleMr: 'प्रामाणिकपणा',
        descEn: 'Honest generation yield forecasts, transparent billing, and reliable post-commissioning warranties.',
        descMr: 'पारदर्शक व्यवहार, सौर निर्मितीचे अचूक अंदाज आणि प्रकल्प उभारणीनंतर विश्वासार्ह हमी.',
      },
      {
        letter: 'T',
        titleEn: 'Transparency',
        titleMr: 'पारदर्शकता',
        descEn: 'Clear, upfront technical communication from design, component selection, to MSEDCL grid sync.',
        descMr: 'प्रकल्प आराखडा, उपकरणांची निवड ते महावितरण ग्रीड जोडणीपर्यंत प्रत्येक टप्प्यावर स्पष्ट व पारदर्शक संवाद.',
      },
      {
        letter: 'R',
        titleEn: 'Reliability',
        titleMr: 'विश्वासार्हता',
        descEn: 'Proactive remote SCADA telemetry ensuring >99.4% plant availability across all weather conditions.',
        descMr: 'सर्व ऋतूंमध्ये ९९.४% पेक्षा जास्त प्लांट अपटाइम देणारी २४/७ रिमोट स्कॅडा मॉनिटरिंग हमी.',
      },
      {
        letter: 'A',
        titleEn: 'Authenticity',
        titleMr: 'सत्यता आणि अस्सलता',
        descEn: 'Genuine Tier-1 equipment, tested engineering practices, and authentic lifelong stewardship for every client.',
        descMr: 'अस्सल टियर-१ प्रमाणित उपकरणे, दर्जेदार अभियांत्रिकी आणि ग्राहकांसाठी आजन्म सेवा सहाय्य.',
      },
    ],
    teamMembers: [
      {
        id: 'tm-1',
        name: 'Mr. Rahul Nalawade',
        designationEn: 'Founder, Managing Director & CEO',
        designationMr: 'संस्थापक, व्यवस्थापकीय संचालक व मुख्य कार्यकारी अधिकारी',
        bioEn: 'Electrical Engineer, PG Dip in TQM & RE, MBA, Doctorate Program in Project Management. Former President & CEO at Panama RE, Technical Advisor to MEDA, with 25+ years developing 2,400+ MW Wind & Solar across India.',
        bioMr: 'इलेक्ट्रिकल इंजिनिअर, TQM व RE पदव्युत्तर पदविका, MBA व प्रोजेक्ट मॅनेजमेंट डॉक्टरेट अभ्यासक्रम. मेडा तांत्रिक सल्लागार व २५+ वर्षांत २,४००+ मेगावॅट प्रकल्पांचे नेतृत्व.',
        photo: '/uploads/team/rahul-nalawade.jpg',
        linkedin: CEO_DOSSIER.companyLinkedIn,
        order: 1,
      },
      {
        id: 'tm-2',
        name: 'Mr. Mahesh Mane',
        designationEn: 'Director — Projects & Engineering',
        designationMr: 'संचालक — प्रकल्प व अभियांत्रिकी',
        bioEn: 'Electrical Engineer with 20+ years of distinguished execution leadership across high-voltage electrical infrastructure and multi-megawatt solar grid integration.',
        bioMr: 'इलेक्ट्रिकल इंजिनिअर व उच्च-दाब वीज पायाभूत सुविधा तसेच बहु-मेगावॅट सोलर प्रकल्पांच्या प्रत्यक्ष उभारणीतील २०+ वर्षांचा समृद्ध अनुभव.',
        photo: '/uploads/team/swayamurja-mitra-team.jpg',
        linkedin: CEO_DOSSIER.companyLinkedIn,
        order: 2,
      },
      {
        id: 'tm-3',
        name: 'Mr. Anil God',
        designationEn: 'Director — SCM & Finance',
        designationMr: 'संचालक — पुरवठा साखळी व वित्त व्यवस्थापन',
        bioEn: 'Specialist in strategic Tier-1 procurement, vendor contract administration, and project financial modeling for CAPEX and OPEX renewable energy developments.',
        bioMr: 'टियर-१ दर्जाच्या उपकरणांची खरेदी, पुरवठा साखळी व्यवस्थापन आणि सौर ऊर्जा प्रकल्पांचे आर्थिक नियोजन यातील तज्ज्ञ.',
        photo: '/uploads/team/swayamurja-mitra-team.jpg',
        linkedin: CEO_DOSSIER.companyLinkedIn,
        order: 3,
      },
      {
        id: 'tm-4',
        name: 'SwayamUrja-MITRA Engineering Team',
        designationEn: 'Technical Operations, Design & O&M (70+ Professionals)',
        designationMr: 'तांत्रिक ऑपरेशन्स, डिझाईन आणि ओ अँड एम (७०+ तज्ज्ञ)',
        bioEn: 'Cross-functional team of 70+ certified electrical engineers, PVsyst solar designers, BESS specialists, and MSEDCL grid-connectivity experts.',
        bioMr: '७०+ प्रमाणित इलेक्ट्रिकल इंजिनिअर्स, सोलर डिझाइन, BESS आणि महावितरण ग्रीड जोडणी तज्ज्ञांची समर्पित टीम.',
        photo: '/uploads/team/swayamurja-mitra-team.jpg',
        linkedin: CEO_DOSSIER.companyLinkedIn,
        order: 4,
      },
    ],
  };

  const team: CMSTeamMember[] =
    about.teamMembers && about.teamMembers.length > 0 ? about.teamMembers : [];

  const activeTrackRecord =
    TRACK_RECORD_TABS.find((t) => t.id === trackTab) || TRACK_RECORD_TABS[0];

  return (
    <section id="about" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24">
        {/* ══════════════════════════════════════════════
            1. MAGAZINE-STYLE 3-TAB MD & CEO EXECUTIVE DOSSIER
        ══════════════════════════════════════════════ */}
        <div id="about-ceo" className="scroll-mt-24">
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 lg:p-10 text-white shadow-xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Portrait & Executive Identity (ZERO personal contacts) */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-lg mx-auto lg:mx-0">
                  <Image
                    src={about.mdCeoMessage.photo || CEO_DOSSIER.photo}
                    alt={isMr ? CEO_DOSSIER.nameMr : CEO_DOSSIER.name}
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>

                <div className="mt-5 space-y-1.5 w-full">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-medium">
                    <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{isMr ? 'नेतृत्व परिचय' : 'Executive Dossier'}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white font-['Outfit']">
                    {isMr ? CEO_DOSSIER.nameMr : CEO_DOSSIER.name}
                  </h2>
                  <p className="text-xs font-medium text-emerald-400">
                    {isMr ? CEO_DOSSIER.designation.mr : CEO_DOSSIER.designation.en}
                  </p>
                </div>

                {/* Career Proof Card */}
                <div className="mt-5 w-full grid grid-cols-2 gap-3 tabular-nums">
                  <div className="rounded-xl bg-slate-800/80 border border-slate-700/80 p-3">
                    <div className="text-xl font-bold text-amber-400 font-['Outfit']">2,400+ MW</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      {isMr ? 'कारकिर्दीतील प्रकल्प अनुभव' : 'CEO Career Track Record'}
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-800/80 border border-slate-700/80 p-3">
                    <div className="text-xl font-bold text-emerald-400 font-['Outfit']">25+ Yrs</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      {isMr ? 'पवन व सौर ऊर्जा नेतृत्व' : 'Wind & Solar Leadership'}
                    </div>
                  </div>
                </div>

                {/* Official Company Channels Only (NO personal phone/email/social) */}
                <div className="mt-5 w-full flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                  >
                    <span>{isMr ? 'कंपनीशी संपर्क साधा' : 'Connect via SwayamUrja'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={CEO_DOSSIER.companyLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-colors"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5 text-sky-400" />
                    <span>{isMr ? 'कंपनी लिंक्डइन' : 'Company LinkedIn'}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive 3-Tab Dossier */}
              <div className="lg:col-span-8 space-y-6">
                {/* Accessible Tab Bar */}
                <div
                  role="tablist"
                  aria-label={isMr ? 'व्यवस्थापकीय संचालक माहिती विभाग' : 'MD & CEO Dossier Tabs'}
                  className="flex flex-wrap gap-2 border-b border-slate-800 pb-4"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={ceoTab === 'gratitude'}
                    onClick={() => setCeoTab('gratitude')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                      ceoTab === 'gratitude'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <Quote className="w-4 h-4 shrink-0" />
                    <span>{isMr ? 'मनोगत व कृतज्ञता' : 'Gratitude Message'}</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={ceoTab === 'career'}
                    onClick={() => setCeoTab('career')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                      ceoTab === 'career'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 shrink-0" />
                    <span>{isMr ? 'पात्रता व २,४००+ MW कारकीर्द' : 'Qualifications & 2,400+ MW Career'}</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={ceoTab === 'academic'}
                    onClick={() => setCeoTab('academic')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                      ceoTab === 'academic'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    <span>{isMr ? 'शैक्षणिक व सामाजिक योगदान' : 'Academic & Social Impact'}</span>
                  </button>
                </div>

                {/* Tab 1: Gratitude Message */}
                {ceoTab === 'gratitude' && (
                  <div role="tabpanel" className="space-y-5">
                    <div className="relative pl-5 border-l-2 border-amber-400">
                      <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                        &ldquo;{isMr ? CEO_DOSSIER.gratitudeQuote.mr : CEO_DOSSIER.gratitudeQuote.en}&rdquo;
                      </p>
                    </div>

                    {CEO_DOSSIER.gratitudeParagraphs.map((para, i) => (
                      <p key={i} className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {isMr ? para.mr : para.en}
                      </p>
                    ))}

                    <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                      <span>
                        {isMr
                          ? 'आपला स्नेही, श्री. राहुल नलावडे — व्यवस्थापकीय संचालक व सीईओ'
                          : 'Yours Sincerely, Mr. Rahul Nalawade — Managing Director & CEO'}
                      </span>
                      <span className="text-emerald-400 font-medium">
                        {isMr ? '॥ स्वयम्ऊर्जा – शाश्वत ऊर्जा ॥' : 'SwayamUrja Renewable Energy Pvt. Ltd.'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Qualifications & 2,400+ MW Career */}
                {ceoTab === 'career' && (
                  <div role="tabpanel" className="space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold text-amber-400 mb-3">
                        {isMr ? 'शैक्षणिक व व्यावसायिक पात्रता' : 'Academic & Executive Qualifications'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {CEO_DOSSIER.qualifications.map((q) => (
                          <span
                            key={q.en}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{isMr ? q.mr : q.en}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-amber-400 mb-3">
                        {isMr ? 'नेतृत्व व सल्लागार पदे' : 'Leadership & Advisory Milestones'}
                      </h3>
                      <ul className="space-y-2.5">
                        {CEO_DOSSIER.careerHighlights.map((item) => (
                          <li key={item.en} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{isMr ? item.mr : item.en}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-800">
                      <h3 className="text-xs font-semibold text-slate-400 mb-2.5">
                        {isMr
                          ? 'कारकिर्दीत सेवा दिलेले नामांकित उद्योग समूह'
                          : 'Marquee Corporate Groups Served Across Career'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {CEO_DOSSIER.corporateGroupsServed.map((corp) => (
                          <span
                            key={corp}
                            className="px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700/80 text-xs font-medium text-slate-200"
                          >
                            {corp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Academic & Social Impact */}
                {ceoTab === 'academic' && (
                  <div role="tabpanel" className="space-y-4">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {isMr
                        ? 'उद्योगापलीकडे जाऊन भारतातील भावी स्वच्छ ऊर्जा अभियंते, स्टार्टअप संस्थापक आणि शासकीय अधिकाऱ्यांना मार्गदर्शन करण्याचे कार्य श्री. राहुल नलावडे सातत्याने करत आहेत.'
                        : 'Beyond commercial execution, Mr. Rahul Nalawade actively mentors the next generation of clean-energy engineers, deep-tech founders, and public administrators across premier Indian institutions.'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {CEO_DOSSIER.academicContributions.map((item) => (
                        <div
                          key={item.institution.en}
                          className="rounded-xl bg-slate-800/80 border border-slate-700/80 p-4 space-y-1.5"
                        >
                          <div className="flex items-start gap-2">
                            <GraduationCap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <h4 className="text-sm font-bold text-white leading-snug">
                              {isMr ? item.institution.mr : item.institution.en}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed pl-6">
                            {isMr ? item.role.mr : item.role.en}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            2. OFFICIAL EMPANELMENTS & CERTIFICATIONS STRIP
        ══════════════════════════════════════════════ */}
        <div id="about-credentials" className="scroll-mt-24 space-y-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium mb-3">
              <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isMr ? 'अधिकृत मान्यता व प्रमाणपत्रे' : 'Official Empanelments & Certifications'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              {isMr
                ? 'शासकीय संस्था आणि आंतरराष्ट्रीय मानकांद्वारे प्रमाणित'
                : 'Empaneled by National & State Energy Authorities'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMPANELMENTS.map((emp) => (
              <div
                key={emp.code}
                className="rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-emerald-300 p-5 transition-colors flex items-start gap-4"
              >
                <div className="shrink-0 px-3 py-2 rounded-lg bg-slate-900 text-emerald-300 text-xs font-bold font-['Outfit'] tracking-wide">
                  {emp.code}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900">
                    {isMr ? emp.title.mr : emp.title.en}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {isMr ? emp.scope.mr : emp.scope.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            3. EXPANDED PURPOSE, VISION & MISSION
        ══════════════════════════════════════════════ */}
        <div id="about-vision" className="scroll-mt-24 space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium mb-3">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>{isMr ? 'उद्देश, दृष्टिकोन आणि ध्येय' : 'Purpose, Vision & Mission'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              {isMr
                ? 'भारताच्या २०३० (५०० GW) व २०७० (नेट झिरो) उद्दिष्टांशी संलग्न'
                : 'Aligned with India’s 500 GW (2030) & Net Zero (2070) Mission'}
            </h2>
          </div>

          {/* Organizational Purpose Banner */}
          <div className="rounded-2xl bg-emerald-950 text-white p-6 sm:p-8 border border-emerald-900">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {isMr ? 'आमचा मूळ उद्देश' : 'Our Organizational Purpose'}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
                {isMr
                  ? EXPANDED_PURPOSE_VISION_MISSION.purpose.mr
                  : EXPANDED_PURPOSE_VISION_MISSION.purpose.en}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expanded Vision Card */}
            <div className="bg-gradient-to-br from-emerald-50/70 to-white p-6 sm:p-8 rounded-2xl border border-emerald-200/80 shadow-xs space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                    {isMr ? 'आमचा दृष्टिकोन (Vision)' : 'Our Vision'}
                  </h3>
                  <p className="text-xs text-emerald-700 font-medium">
                    {isMr ? 'दीर्घकालीन राष्ट्रीय व सामाजिक प्रभाव' : 'Long-Term National & ESG Impact'}
                  </p>
                </div>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {isMr
                  ? EXPANDED_PURPOSE_VISION_MISSION.visionStatement.mr
                  : EXPANDED_PURPOSE_VISION_MISSION.visionStatement.en}
              </p>

              <ul className="space-y-2.5 pt-2 border-t border-emerald-100">
                {EXPANDED_PURPOSE_VISION_MISSION.visionPillars.map((pillar) => (
                  <li key={pillar.en} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isMr ? pillar.mr : pillar.en}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expanded Mission Card */}
            <div className="bg-gradient-to-br from-amber-50/70 to-white p-6 sm:p-8 rounded-2xl border border-amber-200/80 shadow-xs space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                    {isMr ? 'आमचे ध्येय (Mission)' : 'Our Mission'}
                  </h3>
                  <p className="text-xs text-amber-800 font-medium">
                    {isMr ? 'संकल्पनेपासून कार्यान्वित करण्यापर्यंत उत्कृष्टता' : 'Concept-to-Commissioning Commitments'}
                  </p>
                </div>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {isMr
                  ? EXPANDED_PURPOSE_VISION_MISSION.missionStatement.mr
                  : EXPANDED_PURPOSE_VISION_MISSION.missionStatement.en}
              </p>

              <ul className="space-y-2.5 pt-2 border-t border-amber-100">
                {EXPANDED_PURPOSE_VISION_MISSION.missionCommitments.map((item) => (
                  <li key={item.en} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{isMr ? item.mr : item.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            4. CORE FOCUS, 9 ENGINEERING STRENGTHS & PEC POWER SYNERGY
        ══════════════════════════════════════════════ */}
        <div id="about-focus" className="scroll-mt-24 space-y-12">
          {/* Core Focus 4-Card Row */}
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
                {isMr ? 'आमचे प्रमुख कार्यक्षेत्र (Core Focus)' : 'Our Core Focus'}
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                {isMr
                  ? 'औद्योगिक कारखाने, युटिलिटी सोलर पार्क, कृषी आणि निवासी क्षेत्रांसाठी एकात्मिक स्वच्छ ऊर्जा उपाय'
                  : 'Turnkey engineering across utility scale, industrial manufacturing, agro-solar, and residential sectors'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {about.coreFocus.map((focus, idx) => {
                const icons = [Factory, Zap, SunMedium, Home];
                const IconComp = icons[idx % icons.length];
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 shadow-xs transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-emerald-100 text-slate-700 group-hover:text-emerald-700 flex items-center justify-center mb-4 transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-emerald-800 transition-colors">
                      {isMr ? focus.titleMr : focus.titleEn}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isMr ? focus.descMr : focus.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 9 Engineering Strengths & Emerging Technologies */}
          <div id="about-strengths" className="scroll-mt-24 space-y-6">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium mb-3">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isMr ? 'अभियांत्रिकी सामर्थ्य व आधुनिक तंत्रज्ञान' : 'Engineering Strengths & Emerging Tech'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
                {isMr
                  ? 'ग्राहक स्वयम्ऊर्जाची निवड का करतात — ९ प्रमुख सामर्थ्ये'
                  : 'Why Clients Choose SwayamUrja — 9 Core Strengths'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ENGINEERING_STRENGTHS.map((st, idx) => (
                <div
                  key={st.title.en}
                  className="rounded-xl border border-slate-200 bg-white hover:border-emerald-300 p-5 transition-colors space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-[11px] font-semibold">
                      {isMr ? st.tag.mr : st.tag.en}
                    </span>
                    <span className="text-xs font-bold text-slate-400 tabular-nums">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-['Outfit']">
                    {isMr ? st.title.mr : st.title.en}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isMr ? st.desc.mr : st.desc.en}
                  </p>
                </div>
              ))}
            </div>

            {/* SwayamUrja × PEC Power Strategic Synergy Banner */}
            <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                    <Handshake className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {isMr ? 'धोरणात्मक अभियांत्रिकी सहकार्य' : 'Strategic Infrastructure Synergy'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                    {isMr
                      ? 'स्वयम्ऊर्जा × पीईसी पॉवर (SwayamUrja PEC Power Infra Pvt. Ltd.)'
                      : 'SwayamUrja × PEC Power (SwayamUrja PEC Power Infra Pvt. Ltd.)'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {isMr
                      ? 'युटिलिटी-स्केल सोलर पार्क आणि मोठ्या क्षमतेच्या बॅटरी एनर्जी स्टोरेज (BESS) प्रकल्पांच्या वेगवान व अचूक उभारणीसाठी पीईसी पॉवरसोबतची आमची संयुक्त अभियांत्रिकी शक्ती.'
                      : 'Combining utility-scale high-voltage engineering and BESS execution bandwidth to deliver turnkey MSKVY solar parks and grid-scale battery energy storage projects on schedule.'}
                  </p>
                </div>

                <div className="lg:col-span-5 grid grid-cols-2 gap-3 tabular-nums">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="text-lg sm:text-xl font-bold text-emerald-400 font-['Outfit']">
                      2× 13 MW + 4 MW
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      {isMr ? 'MSKVY युटिलिटी सोलर प्रकल्प' : 'MSKVY Utility Solar Parks'}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="text-lg sm:text-xl font-bold text-amber-400 font-['Outfit']">
                      3× 20 MWh
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      {isMr ? 'BESS पूर्ण · ९० MWh PMC सुरू' : 'BESS Completed · 90 MWh PMC'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            5. INTERACTIVE 4-TAB TRACK RECORD EXPLORER
        ══════════════════════════════════════════════ */}
        <div id="about-track-record" className="scroll-mt-24 space-y-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium mb-3">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isMr ? 'सिद्ध प्रकल्प अनुभव' : 'Verified Track Record Explorer'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              {isMr
                ? 'ईपीसी, सल्लागार, ओ अँड एम आणि २,४००+ MW नेतृत्व वारसा'
                : 'EPC, Advisory, O&M & 2,400+ MW Leadership Legacy'}
            </h2>
          </div>

          {/* 4-Tab Bar */}
          <div
            role="tablist"
            aria-label={isMr ? 'प्रकल्प अनुभव विभाग' : 'Track Record Categories'}
            className="flex flex-wrap justify-center gap-2"
          >
            {TRACK_RECORD_TABS.map((tab) => {
              const active = tab.id === trackTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTrackTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900'
                  }`}
                >
                  {isMr ? tab.label.mr : tab.label.en}
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <div
            role="tabpanel"
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-['Outfit']">
                {isMr ? activeTrackRecord.label.mr : activeTrackRecord.label.en}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-emerald-800 tabular-nums">
                {isMr ? activeTrackRecord.subtitle.mr : activeTrackRecord.subtitle.en}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {activeTrackRecord.groups.map((grp) => (
                <div
                  key={grp.heading.en}
                  className="bg-white rounded-xl border border-slate-200/90 p-5 space-y-3"
                >
                  <h4 className="text-sm font-bold text-slate-900 font-['Outfit']">
                    {isMr ? grp.heading.mr : grp.heading.en}
                  </h4>
                  <ul className="space-y-2">
                    {grp.entries.map((entry) => (
                      <li
                        key={entry.en}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{isMr ? entry.mr : entry.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            6. CHRONOLOGICAL REWARDS & RECOGNITION (2021–2026)
        ══════════════════════════════════════════════ */}
        <div id="about-awards" className="scroll-mt-24 space-y-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium mb-3">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>{isMr ? 'पुरस्कार व राष्ट्रीय सन्मान' : 'Rewards & Recognition'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              {isMr
                ? 'उत्कृष्टतेची सलग ६ वर्षे (२०२१ – २०२६)'
                : 'Six Consecutive Years of Industry Recognition (2021 – 2026)'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 tabular-nums">
            {AWARDS_TIMELINE.map((group) => (
              <div
                key={group.year}
                className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3.5 hover:border-amber-300 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 text-amber-400 text-sm font-bold font-['Outfit']">
                    <Award className="w-4 h-4" />
                    {group.year}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {group.items.length}{' '}
                    {isMr
                      ? group.items.length > 1
                        ? 'सन्मान'
                        : 'सन्मान'
                      : group.items.length > 1
                      ? 'Awards'
                      : 'Award'}
                  </span>
                </div>

                <ul className="space-y-3">
                  {group.items.map((award) => (
                    <li key={award.title.en} className="space-y-0.5">
                      <div className="text-sm font-bold text-slate-900 leading-snug">
                        {isMr ? award.title.mr : award.title.en}
                      </div>
                      <div className="text-xs text-slate-500">
                        {isMr ? award.issuer.mr : award.issuer.en}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            7. OUR CORE VALUES: MITRA
        ══════════════════════════════════════════════ */}
        <div id="about-values" className="scroll-mt-24 space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{isMr ? 'मूळ तत्त्वज्ञान' : 'Foundational Philosophy'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              {isMr ? 'आमची मूळ मूल्ये : MITRA' : 'Our Core Values : MITRA'}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">
              {isMr
                ? 'प्रत्येक प्रकल्पाच्या रचनेत, उभारणीत आणि देखभालीत मार्गदर्शक ठरलेली ५ तत्त्वे'
                : 'The 5 ethical and engineering pillars guiding every SwayamUrja relationship'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {about.coreValues.map((val) => (
              <div
                key={val.letter}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 hover:bg-white hover:border-amber-400 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500 text-white font-bold text-xl flex items-center justify-center mb-3 font-['Outfit']">
                  {val.letter}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 font-['Outfit']">
                  {isMr ? val.titleMr : val.titleEn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isMr ? val.descMr : val.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            8. 70+ SWAYAMURJA-MITRA TEAM CAROUSEL & LEADERSHIP
        ══════════════════════════════════════════════ */}
        <div id="about-team" className="scroll-mt-32 space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold mb-2">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isMr ? 'नेतृत्व व टीम' : 'Leadership & Expertise'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              {isMr ? 'आमची टीम आणि नेतृत्व' : 'Our Leadership & EPC Team'}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">
              {isMr
                ? 'सौर अभियांत्रिकी, स्ट्रक्चरल डिझाइन, BESS आणि महावितरण ग्रिड जोडणीतील ७०+ तज्ज्ञ'
                : '70+ certified solar photovoltaic designers, electrical engineers, and regulatory specialists'}
            </p>
          </div>

          {/* ── Genuine SwayamUrja-MITRA 70+ Team Photo Carousel (4 Real Slides) ── */}
          <div
            className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 text-white max-w-5xl mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-slate-950">
              <Image
                key={activeSlide.src}
                src={activeSlide.src}
                alt={isMr ? activeSlide.captionMr : activeSlide.captionEn}
                fill
                className="object-cover object-center"
                unoptimized
                priority={slideIdx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Prev / Next Controls */}
              <button
                type="button"
                onClick={prevSlide}
                aria-label={isMr ? 'मागील टीम फोटो' : 'Previous team photo'}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/75 hover:bg-slate-900 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label={isMr ? 'पुढील टीम फोटो' : 'Next team photo'}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/75 hover:bg-slate-900 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Top-Right Slide Counter */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 px-3 py-1 rounded-lg bg-slate-950/80 border border-white/15 text-xs font-medium text-slate-200 tabular-nums">
                {slideIdx + 1} / {TEAM_PHOTO_SLIDES.length}
              </div>

              {/* Bottom Caption & 70+ Badge */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 z-10">
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/90 text-emerald-300 border border-emerald-400/30 text-xs font-medium">
                    <Users className="w-3.5 h-3.5" />
                    {isMr ? 'आमचा सर्वात मोठा ठेवा (Our Asset)' : 'Our Asset – Our Driving Force'}
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-['Outfit']">
                    {isMr
                      ? 'स्वयम्ऊर्जा-मित्र (SwayamUrja-MITRA) ७०+ तज्ज्ञांची समर्पित टीम'
                      : 'Team of 70+ SwayamUrja-MITRA Solar EPC Specialists'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                    {isMr ? activeSlide.captionMr : activeSlide.captionEn}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 tabular-nums">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-['Outfit']">70+</div>
                  <div className="text-xs text-slate-200 leading-tight">
                    {isMr ? (
                      <>
                        सौर ऊर्जा
                        <br />
                        अभियंते व मित्र
                      </>
                    ) : (
                      <>
                        Solar EPC
                        <br />
                        Specialists
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Dot Indicators Strip */}
            <div className="bg-slate-950 px-4 py-3 flex items-center justify-center gap-2 border-t border-slate-800">
              {TEAM_PHOTO_SLIDES.map((sl, i) => (
                <button
                  key={sl.src}
                  type="button"
                  onClick={() => setSlideIdx(i)}
                  aria-label={`View team photo ${i + 1}`}
                  aria-current={i === slideIdx ? 'true' : undefined}
                  className={`h-2 rounded-full transition-colors cursor-pointer ${
                    i === slideIdx ? 'w-8 bg-amber-400' : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Leadership Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors flex flex-col sm:flex-row gap-5 items-center sm:items-start"
              >
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
                  <Image
                    src={member.photo || '/uploads/team/rahul-nalawade.jpg'}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-bold text-slate-900 text-lg font-['Outfit']">
                      {member.name}
                    </h3>
                    <a
                      href={CEO_DOSSIER.companyLinkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-600 transition-colors inline-flex justify-center"
                      title={isMr ? 'स्वयम्ऊर्जा लिंक्डइन' : 'SwayamUrja LinkedIn'}
                    >
                      <LinkedInIcon className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/60">
                    {isMr ? member.designationMr : member.designationEn}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
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
