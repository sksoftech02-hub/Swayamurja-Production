'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { DEFAULT_THEME, SiteTheme } from '@/lib/theme-presets';
import { Zap, Factory, ArrowRight, CheckCircle, ShieldCheck, Activity } from 'lucide-react';

/* ─── Real Solar Engineering Showcase (Authentic Photography + Live Telemetry) ─── */
interface RealSolarShowcaseProps {
  themeType?: string;
  primaryColor?: string;
  secondaryColor?: string;
  isMr?: boolean;
}

const RealSolarEngineeringShowcase: React.FC<RealSolarShowcaseProps> = ({
  themeType = 'midnight-slate',
  primaryColor = '#f59e0b',
  secondaryColor = '#0284c7',
  isMr = false,
}) => {
  const isLight = themeType === 'clean-light';
  const [activeTab, setActiveTab] = React.useState<'industrial' | 'rooftop'>('industrial');
  const [liveKw, setLiveKw] = React.useState(5.42);

  // Subtle realistic telemetry micro-fluctuation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLiveKw(parseFloat((5.35 + Math.random() * 0.18).toFixed(2)));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const projects = {
    industrial: {
      title: isMr ? '१३ MW युटिलिटी व MIDC औद्योगिक प्रकल्प' : '13 MW Utility & MIDC Industrial EPC',
      location: isMr ? 'सोलापूर व चाकण MIDC, महाराष्ट्र' : 'Solapur & Chakan MIDC, Maharashtra',
      image: 'https://swayamurja.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-07-at-9.27.46-PM-scaled.jpeg',
      badge: isMr ? '५०+ एकर प्रत्यक्ष प्रकल्प' : 'Flagship 50+ Acres EPC',
      spec: isMr ? '३३ kV समर्पित सबस्टेशन जोडणी' : '33 kV Dedicated Substation Integration',
      efficiency: '22.8% Bifacial TOPCon',
    },
    rooftop: {
      title: isMr ? 'व्यावसायिक व निवासी रूफटॉप सोलर' : 'Commercial & Turnkey Rooftop Solar',
      location: isMr ? 'पुणे, नाशिक व पश्चिम महाराष्ट्र' : 'Pune, Nashik & Western Maharashtra',
      image: 'https://swayamurja.com/wp-content/uploads/2024/11/SAVE_20241117_130600-scaled.jpg',
      badge: isMr ? '१००% नेट-मीटरिंग हमी' : '100% Net-Metering Approved',
      spec: isMr ? 'शून्य वीजबिल + ४०% प्राप्तिकर घसारा' : 'Zero Electricity Bill + 40% Tax Write-off',
      efficiency: 'Tier-1 Mono PERC High-Yield',
    },
  };

  const current = projects[activeTab];

  return (
    <div className="relative w-full max-w-[560px] mx-auto select-none">
      {/* ── Outer Ambient Glow Halo ── */}
      <div
        className="absolute -inset-4 rounded-3xl blur-2xl opacity-60 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 60% 30%, ${primaryColor}40, ${secondaryColor}25, transparent 70%)`,
        }}
      />

      {/* ── Main Frame Card ── */}
      <div
        className={`relative rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300 backdrop-blur-xl ${
          isLight ? 'border-slate-200/90 bg-white/80 shadow-slate-300/50' : 'border-slate-800/80 bg-slate-950/70 shadow-black/80'
        }`}
      >
        {/* Top Control Bar: Real Project Selector */}
        <div className="p-3 sm:p-3.5 flex items-center justify-between border-b border-white/10 bg-slate-900/60 backdrop-blur-md">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('industrial')}
              style={activeTab === 'industrial' ? { backgroundColor: primaryColor, color: '#ffffff' } : {}}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                activeTab === 'industrial'
                  ? 'shadow-xs font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isMr ? '🏭 १३ MW युटिलिटी' : '🏭 13 MW Utility Scale'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rooftop')}
              style={activeTab === 'rooftop' ? { backgroundColor: primaryColor, color: '#ffffff' } : {}}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                activeTab === 'rooftop'
                  ? 'shadow-xs font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isMr ? '🏢 रूफटॉप सोलर' : '🏢 Rooftop Solar'}
            </button>
          </div>

          {/* Official Verification Badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-[11px] font-bold text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>MNRE EPC</span>
          </div>
        </div>

        {/* Real Installation Image Showcase */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 group">
          <img
            src={current.image}
            alt={current.title}
            onError={(e) => {
              e.currentTarget.src = '/images/whatsapp_showcase.jpeg';
            }}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Subtle real glass glare sweep across solar panels */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)',
              backgroundSize: '200% 200%',
            }}
          />

          {/* Subtle gradient vignette to make telemetry cards stand out crisply */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />

          {/* ── Top-Left Floating Live Telemetry Badge ── */}
          <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white shadow-lg animate-float-gentle">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div className="text-left leading-tight">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {isMr ? 'थेट ऊर्जा उत्पादन' : 'Live EPC Output'}
              </span>
              <span className="text-xs sm:text-sm font-extrabold font-['Outfit']" style={{ color: primaryColor }}>
                {liveKw} kW <span className="text-[10px] text-emerald-400 font-semibold">(Peak Grid)</span>
              </span>
            </div>
          </div>

          {/* ── Bottom-Right Floating Engineering Spec Badge ── */}
          <div className="absolute bottom-3 right-3 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white shadow-xl">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="text-right leading-tight">
              <span className="text-xs font-extrabold block text-white font-['Outfit']">
                {current.efficiency}
              </span>
              <span className="text-[10px] font-semibold text-slate-300 block">
                {isMr ? '२५ वर्षे वॉरंटी' : '25-Yr Performance Warranty'}
              </span>
            </div>
          </div>

          {/* ── Bottom-Left Caption ── */}
          <div className="absolute bottom-3 left-3 right-auto sm:right-auto max-w-[240px] text-left leading-tight">
            <span className="text-xs font-bold text-white block drop-shadow-md">
              {current.location}
            </span>
            <span className="text-[11px] text-slate-300 block drop-shadow-md font-medium">
              {current.badge}
            </span>
          </div>
        </div>

        {/* Bottom Technical Spec Bar */}
        <div className="px-4 py-3 bg-slate-950/90 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-semibold">{current.spec}</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-[11px]" style={{ color: primaryColor }}>
            <span>99.4% Uptime</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Animated counter ─── */
const Counter: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return (
    <span>
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
};

/* ─── Main Hero Component (Clean Logo Colors & Multi-Theme) ─── */
export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const theme: SiteTheme = content?.theme || DEFAULT_THEME;
  const announcement = content?.announcement;

  // Background styling based on active theme
  const getThemeBg = () => {
    switch (theme.heroBackground) {
      case 'clean-light':
        return 'bg-gradient-to-br from-slate-50 via-amber-50/40 to-white text-slate-900';
      case 'dark-navy':
        return 'bg-gradient-to-br from-[#060e20] via-[#091530] to-[#060d1b] text-white';
      case 'emerald-green':
        return 'bg-gradient-to-br from-[#021f12] via-[#083825] to-[#042016] text-white';
      case 'midnight-slate':
      default:
        // Default Official SwayamUrja Logo Theme: Deep Sapphire Slate with Warm Amber & Clean Blue glows!
        return 'bg-gradient-to-br from-[#0b1329] via-[#0f172a] to-[#0a1528] text-white';
    }
  };

  const isLight = theme.heroBackground === 'clean-light';

  // 3 Logo-Inspired Badges: Sky Blue (Water/Clean), Amber (Sun), Emerald (Leaf)
  const badges = [
    { label: isMr ? 'MNRE नोंदणीकृत' : 'MNRE Registered', color: theme.secondaryColor || '#0284c7' },
    { label: isMr ? '२५ वर्षे वॉरंटी' : '25-Yr Yield Warranty', color: theme.primaryColor || '#f59e0b' },
    { label: isMr ? 'MSEDCL नेट-मीटर' : 'Net Metering Ready', color: theme.accentColor || '#16a34a' },
  ];

  return (
    <section className={`relative overflow-hidden min-h-[90vh] flex flex-col transition-colors duration-500 ${getThemeBg()}`}>
      {/* ── Ambient Lighting Glows (Warm Amber + Sky Blue from Logo) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-8%] left-[-4%] w-[550px] h-[550px] rounded-full blur-[110px]"
          style={{ backgroundColor: `${theme.primaryColor || '#f59e0b'}18` }}
        />
        <div
          className="absolute top-[12%] right-[-6%] w-[500px] h-[500px] rounded-full blur-[100px] animate-pulse-glow"
          style={{ backgroundColor: `${theme.secondaryColor || '#0284c7'}18` }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[750px] h-[250px] bg-blue-900/15 rounded-full blur-[80px]" />

        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,158,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(2,132,199,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* ── Top Announcement Banner (CMS driven) ── */}
      {announcement?.enabled && (
        <div
          className="relative z-10 text-white shadow-xs"
          style={{
            background: `linear-gradient(90deg, ${theme.primaryColor || '#f59e0b'}, ${theme.secondaryColor || '#0284c7'})`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-xs sm:text-sm font-bold">
            <span className="animate-bounce-soft">⚡</span>
            <span>{isMr ? announcement.textMr : announcement.textEn}</span>
            <a href="#contact" className="underline underline-offset-2 hover:no-underline font-extrabold text-white">
              {isMr ? 'आता संपर्क करा →' : 'Contact Now →'}
            </a>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 w-full py-12 lg:py-16 items-center">
          {/* ── LEFT: Text content ── */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Logo-Colored Badges */}
            <div className="flex flex-wrap gap-2">
              {badges.map((b, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: `${b.color}20`,
                    borderColor: `${b.color}60`,
                    color: b.color,
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border animate-slide-up delay-${i * 100}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ backgroundColor: b.color }} />
                  {b.label}
                </span>
              ))}
            </div>

            {/* Headline */}
            <div className="space-y-2 animate-slide-up delay-200">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Outfit'] leading-[1.12]">
                {isMr ? (
                  <>
                    सौरऊर्जेने <span className="text-shimmer" style={{ color: theme.primaryColor }}>भविष्य</span> घडवा
                  </>
                ) : (
                  <>
                    Power Your Future
                    <br />
                    with <span className="text-shimmer" style={{ color: theme.primaryColor }}>Clean Solar</span>
                  </>
                )}
              </h1>
              <p className={`text-base sm:text-lg leading-relaxed max-w-lg ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {isMr
                  ? 'स्वयमऊर्जा — महाराष्ट्रातील अग्रगण्य सोलर EPC कंपनी. घर, कारखाना किंवा शेती — संपूर्ण सोलर उपाय.'
                  : "SwayamUrja — Maharashtra's leading Solar EPC enterprise. Concept-to-commissioning solutions for homes, industries & farms."}
              </p>
            </div>

            {/* Trust points */}
            <ul className="space-y-2 animate-slide-up delay-300">
              {(isMr
                ? [
                    '₹७८,०००+ PM सूर्य घर थेट सबसिडी',
                    'MSEDCL नेट-मीटरिंग व ग्रीड अप्रूव्हल १००%',
                    'टियर-१ Bifacial TOPCon उच्च-कार्यक्षम मॉड्युल्स',
                  ]
                : [
                    'Up to ₹78,000 PM Surya Ghar direct bank subsidy',
                    '100% turnkey MSEDCL net-metering approvals',
                    'Tier-1 Bifacial TOPCon high-yield modules',
                  ]
              ).map((point, i) => (
                <li key={i} className={`flex items-center gap-2.5 text-sm ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: theme.primaryColor || '#f59e0b' }} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons with Logo Colors */}
            <div className="flex flex-wrap gap-3 pt-1 animate-slide-up delay-400">
              {/* Primary Theme CTA */}
              <Link
                href="#calculator"
                style={{
                  backgroundColor: theme.primaryColor || '#f59e0b',
                  color: '#ffffff',
                  boxShadow: `0 10px 25px -5px ${theme.primaryColor || '#f59e0b'}80`,
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl
                           hover:opacity-95 text-white font-extrabold text-[15px]
                           hover:-translate-y-0.5
                           transition-all duration-200 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-white" />
                <span>{isMr ? 'सोलर कॅल्क्युलेटर' : 'Calculate Savings'}</span>
              </Link>

              {/* Secondary Theme CTA */}
              <Link
                href="#contact"
                style={{
                  borderColor: `${theme.secondaryColor || '#0284c7'}80`,
                  color: theme.secondaryColor || '#38bdf8',
                }}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-[15px] transition-all duration-200 border cursor-pointer ${
                  isLight
                    ? 'border-slate-300 text-slate-800 hover:bg-slate-100'
                    : 'hover:bg-white/5'
                }`}
              >
                <Factory className="w-4 h-4" style={{ color: theme.primaryColor || '#f59e0b' }} />
                <span>{isMr ? 'मोफत साइट सर्वे' : 'Book Free Survey'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Social proof strip */}
            <div
              className={`flex flex-wrap items-center gap-6 pt-3 border-t animate-slide-up delay-500 ${
                isLight ? 'border-slate-200' : 'border-slate-800/80'
              }`}
            >
              {[
                { n: 1600, s: '+ MW', l: isMr ? 'विकसित पवन व सौर' : 'Developed India' },
                { n: 550, s: '+', l: isMr ? 'पूर्ण प्रकल्प' : 'Clean Energy Projects' },
                { n: 25, s: '+ Yrs', l: isMr ? 'क्षेत्रातील अनुभव' : 'Sector Leadership' },
              ].map((stat, i) => (
                <div key={i} className="text-left min-w-[70px]">
                  <div
                    className="text-2xl font-extrabold font-['Outfit'] leading-none"
                    style={{ color: theme.primaryColor || '#f59e0b' }}
                  >
                    {mounted ? <Counter end={stat.n} suffix={stat.s} duration={2000} /> : `${stat.n}${stat.s}`}
                  </div>
                  <div className={`text-[11px] font-medium mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{stat.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Real Solar Engineering Showcase (Option 1) ── */}
          <div className="order-1 lg:order-2 flex justify-center items-center animate-slide-right delay-300 w-full">
            <RealSolarEngineeringShowcase
              themeType={theme.heroBackground}
              primaryColor={theme.primaryColor}
              secondaryColor={theme.secondaryColor}
              isMr={isMr}
            />
          </div>
        </div>
      </div>

      {/* ── Scroll Explore Indicator ── */}
      <div className="relative z-10 flex justify-center pb-5">
        <a
          href="#services"
          className={`flex flex-col items-center gap-1 transition-colors group ${isLight ? 'text-slate-400 hover:text-slate-600' : 'text-slate-400 hover:text-amber-400'}`}
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Explore</span>
          <div className="w-5 h-8 border-2 border-current rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};
