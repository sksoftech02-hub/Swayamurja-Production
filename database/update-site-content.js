const fs = require('fs');
const path = require('path');

const contentFile = path.join(__dirname, '..', 'data', 'site-content.json');
const content = JSON.parse(fs.readFileSync(contentFile, 'utf8'));

// 1. LinkedIn URL
content.blogLinkedInUrl = "https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/";

// 2. Clients
content.clients = [
  { id: "c-1", name: "Ajanta Universal Fabrics Ltd", logo: "/uploads/clients/client-1.png", order: 1 },
  { id: "c-2", name: "Sun Ut Tech", logo: "/uploads/clients/client-2.png", order: 2 },
  { id: "c-3", name: "Fluorotech Group (FTG)", logo: "/uploads/clients/client-3.png", order: 3 },
  { id: "c-4", name: "Shri K. R. Ramdasi Sansthan", logo: "/uploads/clients/client-4.png", order: 4 },
  { id: "c-5", name: "BAPS Swaminarayan Sansthan", logo: "/uploads/clients/client-5.png", order: 5 },
  { id: "c-6", name: "Spark Engineers", logo: "/uploads/clients/spark-engineers.png", order: 6 },
  { id: "c-7", name: "Unique Tools", logo: "/uploads/clients/unique-tools.png", order: 7 },
  { id: "c-8", name: "Industrial Partner 8", logo: "/uploads/clients/client-8.png", order: 8 },
  { id: "c-9", name: "MIDC Manufacturing 9", logo: "/uploads/clients/client-9.png", order: 9 },
  { id: "c-10", name: "Solar Agro Power 10", logo: "/uploads/clients/client-10.png", order: 10 },
  { id: "c-11", name: "Textile Mills 11", logo: "/uploads/clients/client-11.png", order: 11 },
  { id: "c-12", name: "Commercial Hub 12", logo: "/uploads/clients/client-12.png", order: 12 },
  { id: "c-13", name: "Steel Works 13", logo: "/uploads/clients/client-13.png", order: 13 },
  { id: "c-14", name: "Food Processing 14", logo: "/uploads/clients/client-14.png", order: 14 },
  { id: "c-15", name: "Automotive Ancillary 15", logo: "/uploads/clients/client-15.png", order: 15 },
  { id: "c-16", name: "Pharma Packaging 16", logo: "/uploads/clients/client-16.png", order: 16 },
  { id: "c-17", name: "Polymer Industries 17", logo: "/uploads/clients/client-17.png", order: 17 },
  { id: "c-18", name: "Foundry & Forging 18", logo: "/uploads/clients/client-18.png", order: 18 },
  { id: "c-19", name: "Cold Storage Complex 19", logo: "/uploads/clients/client-19.png", order: 19 },
  { id: "c-20", name: "Sugar Allied Works 20", logo: "/uploads/clients/client-20.png", order: 20 },
  { id: "c-21", name: "Precision Machining 21", logo: "/uploads/clients/client-21.png", order: 21 }
];

// 3. About Us
content.aboutUs = {
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
    {
      letter: "M",
      titleEn: "Mastery in Engineering",
      titleMr: "अभियांत्रिकी प्रभुत्व",
      descEn: "Tier-1 component selection, rigorous structural calculations, and zero-defect installation standards.",
      descMr: "दर्जेदार उपकरणे, सुरक्षित रचना आणि अचूक कामाचे निकष."
    },
    {
      letter: "I",
      titleEn: "Integrity & Transparency",
      titleMr: "प्रामाणिकपणा आणि पारदर्शकता",
      descEn: "Honest yield forecasts, transparent billing, and reliable post-commissioning warranties.",
      descMr: "पारदर्शक व्यवहार, अचूक अंदाज आणि विश्वासार्ह सेवा."
    },
    {
      letter: "T",
      titleEn: "Timely Execution",
      titleMr: "वेळेवर पूर्तता",
      descEn: "Strict milestone adherence from civil foundation to MSEDCL net-meter synchronisation.",
      descMr: "साइट सर्व्हेपासून ते महावितरण नेट-मीटरिंगपर्यंत सर्व कामे वेळेवर."
    },
    {
      letter: "R",
      titleEn: "Reliability & Uptime",
      titleMr: "विश्वासार्हता आणि सातत्य",
      descEn: "Proactive remote SCADA telemetry ensuring >99% plant availability across all weather conditions.",
      descMr: "अखंड कामगिरी आणि २४/७ रिमोट मॉनिटरिंग हमी."
    },
    {
      letter: "A",
      titleEn: "Accountability to Customers",
      titleMr: "ग्राहकांशी बांधिलकी",
      descEn: "Lifelong operational stewardship and rapid on-ground response for peak kilowatt generation.",
      descMr: "प्रकल्प उभारणीनंतरही अखंड देखभाल आणि जलद सेवा सहाय्य."
    }
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

fs.writeFileSync(contentFile, JSON.stringify(content, null, 2), 'utf8');
console.log('Successfully updated site-content.json with blogLinkedInUrl, clients, and aboutUs!');
