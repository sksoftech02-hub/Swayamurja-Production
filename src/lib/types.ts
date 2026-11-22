export type Language = 'en' | 'mr';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  monthlyBill?: string;
  recommendedKw?: string;
  subsidyAmount?: string;
  city: string;
  notes?: string;
  status: 'New' | 'Contacted' | 'Site Survey Scheduled' | 'Deal Closed' | 'Dropped';
  createdAt: string;
}

export interface MapProject {
  id: string;
  tag: { en: string; mr: string };
  title: { en: string; mr: string };
  desc: { en: string; mr: string };
  location: { en: string; mr: string };
  capacity: string;
  annualYield: string;
  gridSubstation: string;
}

export interface CMSProject {
  id: string;
  category: 'utility' | 'commercial' | 'residential' | 'agri';
  titleEn: string;
  titleMr: string;
  capacity: string;
  locationEn: string;
  locationMr: string;
  image: string;
  highlightEn: string;
  highlightMr: string;
}

export interface CMSTestimonial {
  id: string;
  clientName: string;
  roleOrg: string;
  city: string;
  rating: number;
  systemSize: string;
  savingsText: string;
  commentEn: string;
  commentMr: string;
}

export interface CMSArticle {
  id: string;
  titleEn: string;
  titleMr: string;
  category: string;
  readTime: string;
  publishDate: string;
  image: string;
  excerptEn: string;
  excerptMr: string;
  contentEn: string;
  contentMr: string;
}

export interface CMSJob {
  id: string;
  titleEn: string;
  titleMr: string;
  department: string;
  experienceEn: string;
  experienceMr: string;
  locationEn: string;
  locationMr: string;
  skills: string;
  isActive: boolean;
}

export interface CMSClient {
  id: string;
  name: string;
  logo: string; // server path e.g. /uploads/clients/client-1.png
  website?: string;
  order?: number;
}

export interface CMSTeamMember {
  id: string;
  name: string;
  designationEn: string;
  designationMr: string;
  bioEn: string;
  bioMr: string;
  photo: string; // server path e.g. /uploads/team/rahul-nalawade.jpg
  linkedin?: string;
  order?: number;
}

export interface AboutUsContent {
  taglineEn: string;
  taglineMr: string;
  mdCeoMessage: {
    name: string;
    designationEn: string;
    designationMr: string;
    photo: string;
    quoteEn: string;
    quoteMr: string;
    messageEn: string;
    messageMr: string;
  };
  visionEn: string;
  visionMr: string;
  missionEn: string;
  missionMr: string;
  coreFocus: {
    titleEn: string;
    titleMr: string;
    descEn: string;
    descMr: string;
    icon?: string;
  }[];
  coreValues: {
    letter: string;
    titleEn: string;
    titleMr: string;
    descEn: string;
    descMr: string;
  }[];
  teamMembers: CMSTeamMember[];
}

export { type SiteTheme, THEME_PRESETS, DEFAULT_THEME } from './theme-presets';
import { SiteTheme } from './theme-presets';

export interface SiteContent {
  theme?: SiteTheme;
  blogLinkedInUrl?: string;
  clients?: CMSClient[];
  aboutUs?: AboutUsContent;
  stats: {
    totalMw: string;
    totalMwLabel: { en: string; mr: string };
    clients: string;
    clientsLabel: { en: string; mr: string };
    co2Offset: string;
    co2Label: { en: string; mr: string };
    uptime: string;
    uptimeLabel: { en: string; mr: string };
  };
  announcement: {
    enabled: boolean;
    textEn: string;
    textMr: string;
  };
  tariffs: {
    residentialUnitRate: number;
    commercialUnitRate: number;
    housingUnitRate: number;
    pmSuryaGhar1Kw: number;
    pmSuryaGhar2Kw: number;
    pmSuryaGhar3KwMax: number;
  };
  companyContact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    workingHours: string;
  };
  projects: CMSProject[];
  testimonials: CMSTestimonial[];
  articles: CMSArticle[];
  openJobs: CMSJob[];
  videoSection?: VideoSectionContent;
  layoutSections?: HomepageSection[];
}

export interface VideoSectionContent {
  enabled: boolean;
  videoUrl: string;
  badgeEn: string;
  badgeMr: string;
  titleEn: string;
  titleMr: string;
  subtitleEn: string;
  subtitleMr: string;
  locationEn: string;
  locationMr: string;
  plantCapacity: string;
}

export interface HomepageSection {
  id: string;
  type: string;
  name: string;
  titleEn?: string;
  titleMr?: string;
  enabled: boolean;
  order: number;
  isSystem?: boolean;
}

export const DEFAULT_LAYOUT_SECTIONS: HomepageSection[] = [
  { id: 'video', type: 'video', name: '13 MW Solar Plant Aerial Video', titleEn: '13 MW Solar Plant Installation', titleMr: '१३ मेगावॅट सोलर प्लांट प्रकल्प', enabled: true, order: 1, isSystem: true },
  { id: 'hero', type: 'hero', name: 'Hero Welcome Banner', titleEn: 'Hero Header', titleMr: 'मुख्य हेडर', enabled: true, order: 2, isSystem: true },
  { id: 'clients', type: 'clients', name: 'Our Clients Logo Slideshow', titleEn: 'Trusted Clients', titleMr: 'आमचे ग्राहक', enabled: true, order: 3, isSystem: true },
  { id: 'about', type: 'about', name: 'About Us & Leadership Gratitude', titleEn: 'About SwayamUrja & MD Message', titleMr: 'आमच्याबद्दल आणि व्यवस्थापकीय संचालक संदेश', enabled: true, order: 4, isSystem: true },
  { id: 'services', type: 'services', name: 'Solar Services & Solutions', titleEn: 'End-to-End Solar EPC Services', titleMr: 'सौर ऊर्जा सेवा', enabled: true, order: 5, isSystem: true },
  { id: 'projects', type: 'projects', name: 'Portfolio Projects Gallery', titleEn: 'Flagship Commissioned Plants', titleMr: 'पूर्ण झालेले प्रकल्प', enabled: true, order: 6, isSystem: true },
  { id: 'map', type: 'map', name: 'Maharashtra Presence Map', titleEn: 'District Footprint & Capacity', titleMr: 'महाराष्ट्र राज्य व्याप्ती', enabled: true, order: 7, isSystem: true },
  { id: 'schemes', type: 'schemes', name: 'Government Subsidies & Schemes', titleEn: 'PM Surya Ghar & MSME Subsidies', titleMr: 'शासकीय सौर योजना व अनुदान', enabled: true, order: 8, isSystem: true },
  { id: 'calculator', type: 'calculator', name: 'Solar Savings ROI Calculator', titleEn: 'Net Metering & Solar Savings Calculator', titleMr: 'सौर बचत कॅल्क्युलेटर', enabled: true, order: 9, isSystem: true },
  { id: 'testimonials', type: 'testimonials', name: 'Client Feedback & Reviews', titleEn: 'Verified Client Reviews', titleMr: 'ग्राहकांचे अभिप्राय', enabled: true, order: 10, isSystem: true },
  { id: 'careers', type: 'careers', name: 'Careers & Open Vacancies', titleEn: 'Join SwayamUrja Renewable Energy', titleMr: 'करिअर संधी', enabled: true, order: 11, isSystem: true },
  { id: 'contact', type: 'contact', name: 'Contact Us & Site Survey Form', titleEn: 'Get In Touch & Site Survey', titleMr: 'संपर्क व साईट सर्वेक्षण', enabled: true, order: 12, isSystem: true },
];

export const DEFAULT_VIDEO_SECTION: VideoSectionContent = {
  enabled: true,
  videoUrl: '/uploads/video/13mw-solar-plant.mp4',
  badgeEn: '13 MW SOLAR PLANT INSTALL',
  badgeMr: '१३ मेगावॅट सोलर प्लांट स्थापना',
  titleEn: 'Empowering Maharashtra With Megawatt-Scale Solar Plants',
  titleMr: 'महाराष्ट्राला सौर ऊर्जेने समृद्ध करणारी मेगा-प्रकल्प उभारणी',
  subtitleEn: 'Watch our high-voltage 13 MW ground-mounted utility solar power plant in full operation.',
  subtitleMr: 'आमच्या १३ मेगावॅट उच्च क्षमतेच्या सौर ऊर्जा प्रकल्पाची प्रत्यक्ष दृश्ये.',
  locationEn: 'Maharashtra, India',
  locationMr: 'महाराष्ट्र, भारत',
  plantCapacity: '13 MW'
};
