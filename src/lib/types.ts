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
}
