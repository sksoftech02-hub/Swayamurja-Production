import fs from 'fs';
import path from 'path';
import { 
  CMSProject, 
  CMSTestimonial, 
  CMSArticle, 
  CMSJob, 
  SiteTheme, 
  SiteContent,
  DEFAULT_LAYOUT_SECTIONS,
  DEFAULT_VIDEO_SECTION
} from './types';
import { THEME_PRESETS, DEFAULT_THEME } from './theme-presets';

export { 
  type CMSProject, 
  type CMSTestimonial, 
  type CMSArticle, 
  type CMSJob, 
  type SiteTheme, 
  type SiteContent, 
  THEME_PRESETS, 
  DEFAULT_THEME 
};

export const DEFAULT_PROJECTS: CMSProject[] = [
  {
    id: 'proj-krishna-vishwa',
    category: 'commercial',
    titleEn: 'Krishna Vishwa Vidyapeeth (Deemed University) Solar Rooftop',
    titleMr: 'कृष्णा विश्व विद्यापीठ (अभिमत विद्यापीठ) रूफटॉप सोलर',
    capacity: '1,000 kWp (1.0 MW)',
    locationEn: 'Karad, Dist Satara, Maharashtra',
    locationMr: 'कराड, जि. सातारा, महाराष्ट्र',
    image: '/uploads/projects/krishna-vishwa-vidyapeeth-1000kw.jpg',
    highlightEn: '1 MW institutional rooftop installation powering premier medical education & hospital infrastructure',
    highlightMr: 'वैद्यकीय महाविद्यालय व रुग्णालय कॅम्पसला स्वच्छ सौर ऊर्जा पुरवणारा १,००० किलोवॅट (१ MW) भव्य प्रकल्प'
  },
  {
    id: 'proj-prd-foods',
    category: 'commercial',
    titleEn: 'PRD Foods (Manikchand Group) Industrial Solar Plant',
    titleMr: 'पीआरडी फूड्स (माणिकचंद ग्रुप) औद्योगिक सोलर प्रकल्प',
    capacity: '990 kWp',
    locationEn: 'Hyderabad, Telangana',
    locationMr: 'हैदराबाद, तेलंगणा',
    image: '/uploads/projects/prd-foods-manikchand-990kw.jpg',
    highlightEn: 'Turnkey industrial manufacturing solar EPC offsetting over 65% of plant grid electricity demand',
    highlightMr: 'औद्योगिक उत्पादन युनिटचा ६५%+ वीज वापर सौर ऊर्जेवर आणून वीज बिलात लक्षणीय कपात करणारा प्रकल्प'
  },
  {
    id: 'proj-fern-hotel',
    category: 'commercial',
    titleEn: 'The Fern Residency Hotel Commercial Rooftop Solar',
    titleMr: 'द फर्न रेसिडेन्सी हॉटेल कमर्शियल रूफटॉप सोलर',
    capacity: '350 kWp',
    locationEn: 'Karad, Dist Satara, Maharashtra',
    locationMr: 'कराड, जि. सातारा, महाराष्ट्र',
    image: '/uploads/projects/the-fern-residency-karad-350kw.jpg',
    highlightEn: 'Hospitality commercial rooftop installation powering central HVAC and luxury amenities with zero downtime',
    highlightMr: 'हॉस्पिटॅलिटी व हॉटेल उद्योगासाठी ३५० किलोवॅट उच्च कार्यक्षम रूफटॉप सोलर — अखंड वीज व खर्चात बचत'
  },
  {
    id: 'proj-kolte-patil',
    category: 'residential',
    titleEn: '24K Kolte Patil Society Rooftop Solar',
    titleMr: '२४के कोल्ते पाटील सोसायटी रूफटॉप सोलर',
    capacity: '60 kWp',
    locationEn: 'Pimple Nilakh, Pune, Maharashtra',
    locationMr: 'पिंपळे निलख, पुणे, महाराष्ट्र',
    image: '/uploads/projects/24k-kolte-patil-pune-60kw.jpg',
    highlightEn: 'Premium high-rise residential society net-metered solar powering water pumps, lifts, and common areas',
    highlightMr: 'सोसायटीचे लिफ्ट, पाण्याचे पंप आणि कॉमन दिव्यांचा देखभाल खर्च शून्य करणारा ६० किलोवॅट नेट-मीटर प्रकल्प'
  },
  {
    id: 'proj-jhulelal-temple',
    category: 'residential',
    titleEn: 'Jhulelal Temple Community Rooftop Solar',
    titleMr: 'झुलेलाल मंदिर ट्रस्ट रूफटॉप सोलर',
    capacity: '30 kWp',
    locationEn: 'Pune, Maharashtra',
    locationMr: 'पुणे, महाराष्ट्र',
    image: '/uploads/projects/jhulelal-temple-pune-30kw.jpg',
    highlightEn: 'Community trust rooftop solar providing continuous sustainable green energy for temple premises',
    highlightMr: 'मंदिर परिसर व सामाजिक उपक्रमांसाठी अखंड मोफत स्वच्छ ऊर्जा देणारा ३० किलोवॅट रूफटॉप सौर प्रकल्प'
  },
  {
    id: 'proj-13mw-utility',
    category: 'utility',
    titleEn: '13 MW Utility-Scale Ground-Mounted Solar Park',
    titleMr: '१३ मेगावॅट भव्य युटिलिटी ग्राउंड-माउंटेड सोलर पार्क',
    capacity: '13 MW (13,000 kW)',
    locationEn: 'Tasgaon & Jath, Dist Sangli, Maharashtra',
    locationMr: 'तासगाव व जत, जि. सांगली, महाराष्ट्र',
    image: '/uploads/projects/13mw-utility-solar.jpg',
    highlightEn: 'Megawatt-scale ground-mounted solar park delivering clean power directly into MSEDCL 33kV grid',
    highlightMr: 'महावितरण ३३ केव्ही ग्रीडशी थेट जोडलेला १३ मेगावॅट क्षमतेचा भव्य युटिलिटी ग्राउंड-माउंटेड सोलर पार्क'
  }
];

export const DEFAULT_TESTIMONIALS: CMSTestimonial[] = [
  {
    id: 'test-1',
    clientName: 'Shri Dilip Deshpande',
    roleOrg: 'Homeowner, 8 kW Solar',
    city: 'Kothrud, Pune',
    rating: 5,
    systemSize: '8 kW Rooftop',
    savingsText: 'Bill reduced from ₹9,500 to ₹180/mo',
    commentEn: 'SwayamUrja handled everything from MSEDCL net-metering to the ₹78,000 PM Surya Ghar bank subsidy. Generation is fantastic even during cloudy days!',
    commentMr: 'स्वयमऊर्जाच्या टीमने महावितरण नेट-मीटरिंगपासून ₹७८,००० सबसिडी खात्यात येईपर्यंत सर्व कामे उत्तमरित्या केली. माझे मासिक बिल ₹९,५०० वरून थेट ₹१८० वर आले!'
  },
  {
    id: 'test-2',
    clientName: 'Mr. Arvind Shinde',
    roleOrg: 'Managing Director, Precision Auto Components',
    city: 'Chakan MIDC, Pune',
    rating: 5,
    systemSize: '350 kW C&I Rooftop',
    savingsText: 'Saving ₹4.2 Lakhs monthly',
    commentEn: 'Our factory power cost was exceeding ₹11 per unit. SwayamUrja engineered a 350 kW rooftop plant that recovered its investment in 2.8 years with 40% depreciation.',
    commentMr: 'कारखान्याचा वीज खर्च प्रति युनिट ₹११ पेक्षा जास्त होता. स्वयमऊर्जाच्या ३५० किलोवॅट सोलरमुळे दरमहा ₹४.२ लाखांची बचत होत असून ४०% टॅक्स बेनिफिट मिळाला.'
  },
  {
    id: 'test-3',
    clientName: 'Babanrao Kadam',
    roleOrg: 'Progressive Farmer (Sugarcane & Drip)',
    city: 'Satara District',
    rating: 5,
    systemSize: '7.5 HP Agri Pump',
    savingsText: 'Zero fuel cost, 100% daytime water',
    commentEn: 'Earlier we struggled with midnight load-shedding. Under PM-KUSUM, SwayamUrja installed a 7.5 HP solar pump. Now our sugarcane crop gets water throughout the daytime.',
    commentMr: 'रात्रीच्या भारनियमनामुळे खूप त्रास व्हायचा. स्वयमऊर्जाने पीएम-कुसुम अंतर्गत ७.५ HP सोलर पंप बसवून दिला. आता भरदिवसा संपूर्ण शेतीला पाणी मिळते.'
  },
  {
    id: 'test-4',
    clientName: 'Vikas Sahastrabuddhe',
    roleOrg: 'Chairman, Mayur Pankh Housing Society',
    city: 'Baner, Pune',
    rating: 5,
    systemSize: '30 kW Common Area Solar',
    savingsText: 'Maintenance fee cut by 40%',
    commentEn: 'We installed a 30 kW system for lifts and common pumps. Our monthly common meter bill dropped to zero. Truly professional EPC execution!',
    commentMr: 'आमच्या सोसायटीच्या लिफ्ट व पंपांसाठी ३० किलोवॅट सोलर बसवले. कॉमन एरियाचे बिल पूर्ण शून्य झाले आणि सर्व सभासदांचा मेंटेनन्स खर्च ४०% कमी झाला.'
  }
];

export const DEFAULT_ARTICLES: CMSArticle[] = [
  {
    id: 'art-1',
    titleEn: 'PM Surya Ghar 2026: Complete Step-by-Step Subsidy Guide for Maharashtra',
    titleMr: 'पीएम सूर्य घर योजना २०२६: महाराष्ट्रातील घरमालकांसाठी थेट बँक सबसिडी संपूर्ण माहिती',
    category: 'Government Policy',
    readTime: '4 min read',
    publishDate: 'Nov 2026',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    excerptEn: 'Learn how to claim direct bank transfer subsidies up to ₹78,000 for your home rooftop with MSEDCL net-metering.',
    excerptMr: 'घरच्या छतावर सोलर बसवून ₹७८,००० थेट बँक सबसिडी आणि महावितरण नेट-मीटरिंग कसे मिळवायचे ते जाणून घ्या.',
    contentEn: 'The PM Surya Ghar: Muft Bijli Yojana launched by the Government of India provides a historic opportunity for homeowners across Maharashtra. The financial assistance is tiered: 1 kW receives ₹30,000, 2 kW receives ₹60,000, and systems 3 kW or larger receive the maximum subsidy of ₹78,000 disbursed directly into your Aadhaar-linked bank account within 30 days of meter installation.',
    contentMr: 'पंतप्रधान नरेंद्र मोदी यांच्या नेतृत्वाखाली सुरू झालेली पीएम सूर्य घर: मोफत वीज योजना महाराष्ट्रातील घरमालकांसाठी एक सुवर्णसंधी आहे. या योजनेअंतर्गत १ किलोवॅटसाठी ₹३०,०००, २ किलोवॅटसाठी ₹६०,००० आणि ३ किलोवॅट किंवा अधिक क्षमतेसाठी ₹७८,००० कमाल थेट सबसिडी बँक खात्यात जमा केली जाते.'
  },
  {
    id: 'art-2',
    titleEn: 'How Maharashtra Factories Save 70% Power Costs with 40% Tax Depreciation',
    titleMr: 'चाकण व तळेगावमधील कारखाने सोलर आणि ४०% प्राप्तिकर घसारा लाभाने वीज खर्च ७०% कसा कमी करतात?',
    category: 'Industrial Solar (C&I)',
    readTime: '5 min read',
    publishDate: 'Oct 2026',
    image: 'https://images.unsplash.com/photo-1508873696983-2df57046475a?auto=format&fit=crop&w=800&q=80',
    excerptEn: 'Industrial tariffs in Maharashtra exceed ₹11/unit. Solar power reduces this to ₹2.80/unit with substantial tax write-offs in Year 1.',
    excerptMr: 'महाराष्ट्रातील औद्योगिक वीज दर ₹११+/युनिट झाले आहेत. रूफटॉप सोलरमुळे हा खर्च ₹२.८० वर येतो आणि पहिल्याच वर्षी ४०% टॅक्स सेव्हिंग मिळते.',
    contentEn: 'Commercial and industrial consumers in Maharashtra face some of the highest power tariffs in the nation. By investing in captive solar rooftop systems, CFOs can write off 40% of the capital expenditure under Section 32 of the Income Tax Act in the very first year, effectively recovering up to 30% of the project cost instantly in tax savings.',
    contentMr: 'चाकण, तळेगाव, भोसरी आणि रांजणगाव एमआयडीसीतील कारखान्यांसाठी वीज खर्च हा उत्पादन खर्चातील सर्वात मोठा घटक असतो. सोलर बसवल्याने आयकर कलम ३२ अंतर्गत पहिल्याच वर्षी ४०% घसारा लाभ मिळतो, ज्यामुळे प्रकल्पाचा खर्च अवघ्या अडीच ते तीन वर्षांत वसूल होतो.'
  },
  {
    id: 'art-3',
    titleEn: 'MSEDCL Net-Metering Guidelines & Bi-Directional Meter Process',
    titleMr: 'महावितरण नेट-मीटरिंग नियम व बाय-डायरेक्शनल मीटर जोडणी प्रक्रिया',
    category: 'Technical Guide',
    readTime: '3 min read',
    publishDate: 'Nov 2026',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
    excerptEn: 'Understanding how surplus solar energy units generated during peak sunshine are credited against night consumption.',
    excerptMr: 'दुपारी निर्माण झालेली जास्तीची वीज महावितरण ग्रिडला पाठवून रात्री मोफत कशी वापरायची याची संपूर्ण माहिती.',
    contentEn: 'Net metering is a billing mechanism that credits solar energy system owners for the electricity they add to the grid. During daytime hours, your panels produce excess energy exported to MSEDCL. At night, you draw power back from the grid. At the end of the billing cycle, you only pay for the net units consumed.',
    contentMr: 'नेट-मीटरिंग म्हणजे सोलर सिस्टीममधून निर्माण झालेली अतिरिक्त वीज महावितरणच्या ग्रिडला निर्यात करणे आणि रात्री ती परत वापरणे. महिन्याच्या शेवटी निव्वळ (Net) युनिट्सचे बिल येते. बहुतांश घरगुती ग्राहकांचे बिल यामुळे शून्य होते.'
  }
];

export const DEFAULT_JOBS: CMSJob[] = [
  {
    id: 'job-1',
    titleEn: 'Solar Design & PVsyst Engineer',
    titleMr: 'सोलर डिझाईन आणि PVsyst इंजिनिअर',
    department: 'Engineering & Design',
    experienceEn: '2-4 Years',
    experienceMr: '२-४ वर्षे अनुभव',
    locationEn: 'Pune (Baner HQ)',
    locationMr: 'पुणे (बाणेर मुख्यालय)',
    skills: 'AutoCAD, PVsyst, 3D SketchUp, Single Line Diagrams (SLD), MSEDCL Net-metering rules.',
    isActive: true
  },
  {
    id: 'job-2',
    titleEn: 'Solar Site Supervisor / EPC Project Incharge',
    titleMr: 'सोलर साइट सुपरवायझर / EPC प्रकल्प इनचार्ज',
    department: 'Operations & Execution',
    experienceEn: '1-3 Years',
    experienceMr: '१-३ वर्षे अनुभव',
    locationEn: 'Pune / Solapur Sites',
    locationMr: 'पुणे / सोलापूर प्रकल्प',
    skills: 'Civil foundation, module mounting structure (MMS), HT/LT cabling, invertor commissioning.',
    isActive: true
  },
  {
    id: 'job-3',
    titleEn: 'Business Development Manager (C&I Solar)',
    titleMr: 'बिझनेस डेव्हलपमेंट मॅनेजर (C&I सोलर)',
    department: 'Corporate Sales',
    experienceEn: '3-6 Years',
    experienceMr: '३-६ वर्षे अनुभव',
    locationEn: 'Pune (MIDC Belt: Chakan/Talegaon)',
    locationMr: 'पुणे (चाकण व तळेगाव MIDC)',
    skills: 'B2B industrial client acquisition, 40% tax depreciation presentations, CAPEX/OPEX models.',
    isActive: true
  }
];

export const DEFAULT_CONTENT: SiteContent = {
  theme: DEFAULT_THEME,
  stats: {
    totalMw: '1,600+ MW',
    totalMwLabel: { en: 'Wind & Solar Developed', mr: 'विकसित पवन व सौर प्रकल्प' },
    clients: '550+',
    clientsLabel: { en: 'Completed Clean Energy Projects', mr: 'यशस्वी पूर्ण प्रकल्प' },
    co2Offset: '45,000+ T',
    co2Label: { en: 'Annual CO₂ Offset', mr: 'वार्षिक कार्बन उत्सर्जन कपात' },
    uptime: '99.4%',
    uptimeLabel: { en: 'SCADA Plant Availability', mr: 'अपटाइम गुणवत्ता हमी' }
  },
  announcement: {
    enabled: true,
    textEn: '⚡ PM Surya Ghar: Direct Bank Subsidy up to ₹78,000 available across Maharashtra! Free site survey available this week.',
    textMr: '⚡ पीएम सूर्य घर योजना: महाराष्ट्रात थेट बँक सबसिडी ₹७८,००० पर्यंत उपलब्ध! या आठवड्यात मोफत साइट सर्व्हे सुरू.'
  },
  tariffs: {
    residentialUnitRate: 8.5,
    commercialUnitRate: 11.5,
    housingUnitRate: 9.2,
    pmSuryaGhar1Kw: 30000,
    pmSuryaGhar2Kw: 60000,
    pmSuryaGhar3KwMax: 78000
  },
  companyContact: {
    phone: '+91 92721 00623',
    whatsapp: '+91 92721 00623',
    email: 'crm@swayamurja.com',
    address: 'T9, A-1001, Brahma Business Park, New Kalyani Nagar, Wadgaon Sheri, Pune, Maharashtra 411014',
    workingHours: 'Mon - Sat: 9:30 AM - 6:30 PM'
  },
  projects: DEFAULT_PROJECTS,
  testimonials: DEFAULT_TESTIMONIALS,
  articles: DEFAULT_ARTICLES,
  openJobs: DEFAULT_JOBS
};

const CONTENT_FILE = path.join(process.cwd(), 'data', 'site-content.json');

// In-Memory cache to prevent synchronous disk I/O bottlenecks under high traffic
let cachedContent: SiteContent | null = null;

function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getSiteContent(): SiteContent {
  // If memory cache exists, return immediately without touching the filesystem
  if (cachedContent) {
    return cachedContent;
  }

  try {
    ensureDataDir();
    if (!fs.existsSync(CONTENT_FILE)) {
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(DEFAULT_CONTENT, null, 2), 'utf-8');
      cachedContent = DEFAULT_CONTENT;
      return DEFAULT_CONTENT;
    }
    const data = fs.readFileSync(CONTENT_FILE, 'utf-8');
    const parsed = JSON.parse(data) as SiteContent;
    cachedContent = {
      ...DEFAULT_CONTENT,
      ...parsed,
      theme: parsed.theme || DEFAULT_THEME,
      projects: Array.isArray(parsed.projects) ? parsed.projects : DEFAULT_PROJECTS,
      testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : DEFAULT_TESTIMONIALS,
      articles: Array.isArray(parsed.articles) ? parsed.articles : DEFAULT_ARTICLES,
      openJobs: Array.isArray(parsed.openJobs) ? parsed.openJobs : DEFAULT_JOBS,
      blogLinkedInUrl: parsed.blogLinkedInUrl || 'https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/',
      clients: Array.isArray(parsed.clients) ? parsed.clients : [],
      aboutUs: parsed.aboutUs || undefined,
      videoSection: parsed.videoSection || DEFAULT_VIDEO_SECTION,
      layoutSections: Array.isArray(parsed.layoutSections) && parsed.layoutSections.length > 0 ? parsed.layoutSections : DEFAULT_LAYOUT_SECTIONS,
    };
    return cachedContent;
  } catch (err) {
    console.error('Error reading site content:', err);
    return DEFAULT_CONTENT;
  }
}

export function updateSiteContent(updated: Partial<SiteContent>): SiteContent {
  ensureDataDir();
  const current = getSiteContent();
  const merged: SiteContent = {
    ...current,
    ...updated,
    stats: { ...current.stats, ...(updated.stats || {}) },
    announcement: { ...current.announcement, ...(updated.announcement || {}) },
    tariffs: { ...current.tariffs, ...(updated.tariffs || {}) },
    companyContact: { ...current.companyContact, ...(updated.companyContact || {}) },
    theme: updated.theme !== undefined ? updated.theme : (current.theme || DEFAULT_THEME),
    projects: updated.projects !== undefined ? updated.projects : current.projects,
    testimonials: updated.testimonials !== undefined ? updated.testimonials : current.testimonials,
    articles: updated.articles !== undefined ? updated.articles : current.articles,
    openJobs: updated.openJobs !== undefined ? updated.openJobs : current.openJobs,
    blogLinkedInUrl: updated.blogLinkedInUrl !== undefined ? updated.blogLinkedInUrl : (current.blogLinkedInUrl || 'https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/'),
    clients: updated.clients !== undefined ? updated.clients : current.clients,
    aboutUs: updated.aboutUs !== undefined ? updated.aboutUs : current.aboutUs,
    videoSection: updated.videoSection !== undefined ? updated.videoSection : current.videoSection,
    layoutSections: updated.layoutSections !== undefined ? updated.layoutSections : current.layoutSections,
  };
  
  // Update in-memory cache instantly
  cachedContent = merged;

  // Persist to disk atomically
  try {
    const tempFile = `${CONTENT_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(merged, null, 2), 'utf-8');
    fs.renameSync(tempFile, CONTENT_FILE);
  } catch (err) {
    console.error('Error persisting content to disk:', err);
    // Fallback direct write
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(merged, null, 2), 'utf-8');
  }

  return merged;
}
