export interface BilingualText {
  en: string;
  mr: string;
}

export interface EmpanelmentItem {
  code: string;
  title: BilingualText;
  scope: BilingualText;
}

export interface StrengthItem {
  title: BilingualText;
  desc: BilingualText;
  tag: BilingualText;
}

export interface AwardYearGroup {
  year: string;
  items: {
    title: BilingualText;
    issuer: BilingualText;
  }[];
}

export interface TrackRecordCategory {
  id: 'epc' | 'advisory' | 'amc' | 'legacy';
  label: BilingualText;
  subtitle: BilingualText;
  groups: {
    heading: BilingualText;
    entries: BilingualText[];
  }[];
}

export const CEO_DOSSIER = {
  name: 'Mr. Rahul Nalawade',
  nameMr: 'श्री. राहुल नलावडे',
  designation: {
    en: 'Founder, Managing Director & CEO',
    mr: 'संस्थापक, व्यवस्थापकीय संचालक व मुख्य कार्यकारी अधिकारी',
  },
  photo: '/uploads/team/rahul-nalawade.jpg',
  companyLinkedIn: 'https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/',
  gratitudeQuote: {
    en: "Guided by our organizational purpose of contributing to the Nation's growth through sustainable and affordable clean energy solutions, every initiative undertaken by us is focused towards building a greener, brighter, and energy-secure future for generations to come.",
    mr: 'शाश्वत आणि परवडणाऱ्या स्वच्छ ऊर्जा उपायांद्वारे राष्ट्राच्या प्रगतीत योगदान देण्याच्या आमच्या ध्येयाने प्रेरित होऊन, आमचा प्रत्येक उपक्रम भावी पिढ्यांसाठी अधिक हरित, उज्ज्वल आणि ऊर्जा-सुरक्षित भविष्य घडवण्यासाठी समर्पित आहे.',
  },
  gratitudeParagraphs: [
    {
      en: 'SwayamUrja Renewable Energy Pvt. Ltd. is a next-generation Renewable Energy company delivering comprehensive End-to-End Solutions across Solar Energy, Wind Energy, Battery Energy Storage Systems (BESS), Green Hydrogen, Pumped Hydro, and emerging Green Technologies. Backed by 25+ years of sector leadership, we have completed 610+ projects, delivered 1,750+ MW of Wind & Solar Advisory, 35+ MW of Solar EPC & I&C, 65+ MW of Solar O&M, and 60+ MWh of executed BESS alongside 300 MWh of BESS PMC.',
      mr: 'स्वयम्ऊर्जा रिन्यूएबल एनर्जी प्रा. लि. ही सौर ऊर्जा, पवन ऊर्जा, बॅटरी एनर्जी स्टोरेज सिस्टम्स (BESS), ग्रीन हायड्रोजन, पम्प्ड हायड्रो आणि आधुनिक हरित तंत्रज्ञानामध्ये संकल्पनेपासून कार्यान्वित करण्यापर्यंत सर्वसमावेशक सेवा देणारी कंपनी आहे. २५+ वर्षांच्या अनुभवाच्या बळावर आम्ही ६१०+ प्रकल्प पूर्ण केले असून, १,७५०+ मेगावॅट पवन व सौर सल्लागार सेवा, ३५+ मेगावॅट सोलर ईपीसी, ६५+ मेगावॅट ओ अँड एम आणि ६०+ MWh कार्यान्वित BESS सह ३०० MWh BESS PMC सेवा दिल्या आहेत.',
    },
    {
      en: 'We express our sincere gratitude to all our esteemed Clients and Stakeholders — including Manikchand Group, Elpro Group, Lohia Jain Group, Krishna Vishwa Vidyapeeth, Ravindra Energy Ltd, The Fern Hotels, CleanMax, and Bajaj Finserv — for their continued trust across EPC, Advisory, AMC, O&M, and RE Infrastructure Services. We also extend our heartfelt appreciation to our dedicated team of 70+ SwayamUrja-MITRA professionals working relentlessly toward sustainability, innovation, and service excellence.',
      mr: 'माणिकचंद ग्रुप, एल्प्रो ग्रुप, लोहिया जैन ग्रुप, कृष्णा विश्व विद्यापीठ, रवींद्र एनर्जी लि., द फर्न हॉटेल्स, क्लीनमॅक्स आणि बजाज फिनसर्व्ह यांसारख्या आमच्या सर्व आदरणीय ग्राहकांनी ईपीसी, सल्लागार, एएमसी आणि ओ अँड एम सेवांवर दाखवलेल्या विश्वासाबद्दल आम्ही मनःपूर्वक कृतज्ञता व्यक्त करतो. तसेच शाश्वतता, नवकल्पना आणि उत्कृष्ट सेवेसाठी अहोरात्र कार्यरत असलेल्या ७०+ स्वयम्ऊर्जा-मित्र परिवाराचेही आम्ही मनापासून आभार मानतो.',
    },
  ],
  qualifications: [
    { en: 'Electrical Engineer', mr: 'इलेक्ट्रिकल इंजिनिअर' },
    { en: 'PG Diploma in Total Quality Management (TQM)', mr: 'पदव्युत्तर पदविका — टोटल क्वालिटी मॅनेजमेंट (TQM)' },
    { en: 'PG Diploma in Renewable Energy', mr: 'पदव्युत्तर पदविका — नवीकरणीय ऊर्जा (Renewable Energy)' },
    { en: 'Master of Business Administration (MBA)', mr: 'व्यवसाय व्यवस्थापन पदव्युत्तर पदवी (MBA)' },
    { en: 'Doctorate Program in Project Management', mr: 'प्रोजेक्ट मॅनेजमेंटमधील डॉक्टरेट अभ्यासक्रम' },
  ],
  careerHighlights: [
    {
      en: '25+ years of distinguished Renewable Energy leadership; instrumental in developing 2,400+ MW of Wind & Solar projects across India.',
      mr: 'नवीकरणीय ऊर्जा क्षेत्रातील २५+ वर्षांचे प्रदीर्घ नेतृत्व; भारतभरात २,४००+ मेगावॅट पवन व सौर प्रकल्पांच्या विकासात महत्त्वपूर्ण भूमिका.',
    },
    {
      en: 'Former President & CEO at Panama Renewable Energy Group, steering large-scale IPP and utility renewable deployments.',
      mr: 'पनामा रिन्यूएबल एनर्जी ग्रुपचे माजी प्रेसिडेंट व सीईओ म्हणून मोठ्या युटिलिटी-स्केल प्रकल्पांचे यशस्वी संचालन.',
    },
    {
      en: 'Technical Advisor to MEDA (Mahaurja) and Maharashtra Government Departments on renewable policy, solar parks, and regulatory execution.',
      mr: 'मेडा (महाऊर्जा) आणि महाराष्ट्र शासनाच्या विविध विभागांसाठी नवीकरणीय ऊर्जा धोरण व सोलर पार्कचे तांत्रिक सल्लागार.',
    },
  ],
  corporateGroupsServed: [
    'Tata', 'Reliance', 'Jindal', 'Bajaj', 'Kirloskar', 'Bharat Forge',
    'CLP', 'CleanMax', 'Ravindra Energy', 'Welspun', 'Manikchand',
    'Ghodawat', 'Elpro', 'Lohia-Jain',
  ],
  academicContributions: [
    {
      institution: { en: 'Savitribai Phule Pune University (SPPU)', mr: 'सावित्रीबाई फुले पुणे विद्यापीठ (SPPU)' },
      role: {
        en: 'Guest Lecturer (M.Tech & B.Voc) teaching Wind Energy, Solar PV & Entrepreneurship Development to Renewable Energy students.',
        mr: 'M.Tech आणि B.Voc च्या नवीकरणीय ऊर्जा विद्यार्थ्यांना पवन ऊर्जा, सौर ऊर्जा व उद्योजकता विकासाचे अतिथी व्याख्याते.',
      },
    },
    {
      institution: { en: 'IIT Palakkad — Technology IHub Foundation', mr: 'आयआयटी पलक्कड — टेक्नॉलॉजी आयहब फाउंडेशन' },
      role: {
        en: 'Startup Evaluator mentoring and evaluating deep-tech and clean-energy ventures.',
        mr: 'डीप-टेक आणि स्वच्छ ऊर्जा स्टार्टअप्सचे मूल्यांकनकार (Startup Evaluator).',
      },
    },
    {
      institution: { en: 'IIT Madras & National Forums', mr: 'आयआयटी मद्रास व राष्ट्रीय व्यासपीठे' },
      role: {
        en: 'Keynote Speaker, Mentor & Industry Trainer across premier engineering and energy conferences.',
        mr: 'देशातील नामांकित अभियांत्रिकी व ऊर्जा परिषदांमध्ये मुख्य वक्ते, मार्गदर्शक आणि प्रशिक्षक.',
      },
    },
    {
      institution: { en: 'YASHADA, Pune', mr: 'यशदा (YASHADA), पुणे' },
      role: {
        en: 'Renewable Energy Trainer conducting capacity-building programs for government officers and administrators.',
        mr: 'शासकीय अधिकारी व प्रशासकांसाठी नवीकरणीय ऊर्जा प्रशिक्षक.',
      },
    },
    {
      institution: { en: 'MCDC (Maharashtra Co-operative Development Corp.)', mr: 'एमसीडीसी (महाराष्ट्र सहकार विकास महामंडळ)' },
      role: {
        en: 'Renewable Energy Trainer empowering co-operative institutions with solar and clean-energy adoption.',
        mr: 'सहकारी संस्थांना सौर व स्वच्छ ऊर्जा स्वीकारण्यासाठी सक्षम करणारे नवीकरणीय ऊर्जा प्रशिक्षक.',
      },
    },
  ],
};

export const EMPANELMENTS: EmpanelmentItem[] = [
  {
    code: 'ISO 9001:2015',
    title: { en: 'TÜV SÜD Certified', mr: 'TÜV SÜD प्रमाणित' },
    scope: { en: 'Quality Management System', mr: 'गुणवत्ता व्यवस्थापन प्रणाली' },
  },
  {
    code: 'MNRE',
    title: { en: 'PM Surya Ghar Portal', mr: 'पीएम सूर्य घर पोर्टल' },
    scope: { en: 'Empaneled Residential RTS Vendor', mr: 'निवासी रूफटॉप सोलर अधिकृत पॅनेल' },
  },
  {
    code: 'MSEDCL',
    title: { en: 'Mahavitaran Empaneled', mr: 'महावितरण अधिकृत पॅनेल' },
    scope: { en: 'Grid-Tied Solar EPC Execution', mr: 'ग्रीड-टाइड सोलर ईपीसी अंमलबजावणी' },
  },
  {
    code: 'MEDA',
    title: { en: 'Mahaurja Empaneled', mr: 'महाऊर्जा अधिकृत पॅनेल' },
    scope: { en: 'Solar Park & RE Advisory', mr: 'सोलर पार्क व नवीकरणीय ऊर्जा सल्लागार' },
  },
  {
    code: 'MAHAPREIT',
    title: { en: 'Technical Advisory', mr: 'तांत्रिक सल्लागार पॅनेल' },
    scope: { en: 'Empaneled for RE Projects', mr: 'नवीकरणीय ऊर्जा प्रकल्पांसाठी सल्लागार' },
  },
  {
    code: 'MSME',
    title: { en: 'Govt. of India Registered', mr: 'भारत सरकार नोंदणीकृत' },
    scope: { en: 'Recognized Clean-Tech Startup', mr: 'मान्यताप्राप्त स्वच्छ ऊर्जा स्टार्टअप' },
  },
];

export const EXPANDED_PURPOSE_VISION_MISSION = {
  purpose: {
    en: "Contributing to India's growth and energy security through sustainable, affordable clean energy solutions — aligned with the Nation's 500 GW Renewable Energy target by 2030 and Net Zero commitment by 2070.",
    mr: 'शाश्वत व परवडणाऱ्या स्वच्छ ऊर्जा उपायांद्वारे भारताच्या प्रगतीत व ऊर्जा सुरक्षेत योगदान देणे — २०३० पर्यंत ५०० गिगावॅट नवीकरणीय ऊर्जा आणि २०७० पर्यंत नेट झिरो या राष्ट्रीय उद्दिष्टांशी सुसंगत वाटचाल.',
  },
  visionStatement: {
    en: "To become India's most trusted, end-to-end Renewable Energy Services Partner — accelerating the clean energy transition across Residential, Commercial, Industrial, Agricultural, and Utility sectors while creating measurable environmental and socio-economic value.",
    mr: 'निवासी, व्यावसायिक, औद्योगिक, कृषी आणि युटिलिटी क्षेत्रांमध्ये स्वच्छ ऊर्जा संक्रमणास गती देणारा तसेच पर्यावरणपूरक व सामाजिक-आर्थिक मूल्य निर्माण करणारा भारतातील सर्वात विश्वासार्ह नवीकरणीय ऊर्जा भागीदार बनणे.',
  },
  visionPillars: [
    {
      en: 'Aligned with 500 GW (2030), Net Zero (2070), PM Surya Ghar, PM-KUSUM, Saur Gram (Model Solar Village) & Green Open Access.',
      mr: '५०० GW (२०३०), नेट झिरो (२०७०), पीएम सूर्य घर, पीएम-कुसुम, सौर ग्राम (मॉडेल सोलर व्हिलेज) आणि ग्रीन ओपन अ‍ॅक्सेसशी सुसंगत.',
    },
    {
      en: 'All Renewable Energy Under One Roof: Solar, Wind, BESS, Hybrid, Repowering, Pumped Hydro & Green Hydrogen Advisory.',
      mr: 'एकाच छताखाली सर्व नवीकरणीय ऊर्जा सेवा: सौर, पवन, BESS, हायब्रिड, रिपॉवरिंग, पम्प्ड हायड्रो आणि ग्रीन हायड्रोजन सल्लागार.',
    },
    {
      en: 'ESG & Community Empowerment: Local employment, skill development, healthcare, education support & ecological harmony.',
      mr: 'ESG व सामाजिक सबलीकरण: स्थानिक रोजगार निर्मिती, कौशल्य विकास, आरोग्य व शिक्षण उपक्रम आणि पर्यावरणीय समतोल.',
    },
  ],
  missionStatement: {
    en: 'To engineer de-risked, high-yield, concept-to-commissioning clean energy assets with zero-accident safety, Tier-1 reliability, and MITRA-driven transparency for every client across India.',
    mr: 'शून्य-अपघात सुरक्षा, टियर-१ विश्वासार्हता आणि MITRA मूल्यांवर आधारित पारदर्शकतेसह संपूर्ण भारतातील ग्राहकांसाठी उच्च-कार्यक्षम, संकल्पनेपासून कार्यान्वित करण्यापर्यंत स्वच्छ ऊर्जा प्रकल्प उभारणे.',
  },
  missionCommitments: [
    {
      en: '100% Safety & EHS compliance across every site — proven track record of ZERO accidents.',
      mr: 'प्रत्येक प्रकल्प स्थळावर १००% सुरक्षा व EHS नियमांचे पालन — शून्य अपघातांचा सिद्ध विक्रम.',
    },
    {
      en: 'Scalable annual deployment readiness of 100 MW Renewable Energy + 100 MWh BESS.',
      mr: 'दरवर्षी १०० मेगावॅट नवीकरणीय ऊर्जा + १०० MWh BESS प्रकल्प उभारणीची सक्षम क्षमता.',
    },
    {
      en: 'Lifecycle asset stewardship via remote SCADA monitoring, Energy Audits, Power Quality RCA & CAPA.',
      mr: 'रिमोट SCADA मॉनिटरिंग, एनर्जी ऑडिट, पॉवर क्वालिटी (RCA व CAPA) द्वारे संपूर्ण आयुष्यभर प्रकल्प देखभाल.',
    },
    {
      en: 'Customer-centric transparency backed by ISO 9001:2015 (TÜV SÜD) processes and MITRA core values.',
      mr: 'ISO 9001:2015 (TÜV SÜD) प्रक्रिया आणि MITRA मूळ मूल्यांवर आधारित ग्राहक-केंद्रित पारदर्शकता.',
    },
  ],
};

export const ENGINEERING_STRENGTHS: StrengthItem[] = [
  {
    tag: { en: 'Safety First', mr: 'सुरक्षा प्रथम' },
    title: { en: '100% Safety & EHS — ZERO Accidents', mr: '१००% सुरक्षा व EHS — शून्य अपघात' },
    desc: {
      en: 'Strict ISO 9001:2015 site protocols, PPE discipline, and certified electrical safety across all 610+ installations.',
      mr: 'सर्व ६१०+ प्रकल्पांमध्ये कडक ISO 9001:2015 सुरक्षा प्रणाली, PPE पालन आणि प्रमाणित विद्युत सुरक्षा.',
    },
  },
  {
    tag: { en: 'Structural Mastery', mr: 'स्ट्रक्चरल कौशल्य' },
    title: { en: 'All Roof & Terrain Types', mr: 'सर्व प्रकारच्या छतांवर व जमिनीवर उभारणी' },
    desc: {
      en: 'Proven engineering across RCC, GI Roof with Conical Truss, Curved Roof, Saw-Tooth Roof, and Utility Ground-Mount.',
      mr: 'RCC, कोनिकल ट्रस असलेले GI छत, कर्व्ह्ड रूफ, सॉ-टूथ रूफ आणि युटिलिटी ग्राउंड-माउंट प्रकल्पांचा समृद्ध अनुभव.',
    },
  },
  {
    tag: { en: 'Turnkey Lifecycle', mr: 'संपूर्ण टर्नकी सेवा' },
    title: { en: 'Concept to Commissioning', mr: 'संकल्पनेपासून कार्यान्वित होईपर्यंत' },
    desc: {
      en: 'End-to-end execution covering land acquisition, statutory permits, civil & electrical infrastructure, and asset management.',
      mr: 'जमीन संपादन, शासकीय परवानग्या, सिव्हिल व इलेक्ट्रिकल पायाभूत सुविधा आणि प्रकल्प व्यवस्थापनापर्यंत सर्व सेवा.',
    },
  },
  {
    tag: { en: 'Policy & DPRs', mr: 'धोरण व DPR' },
    title: { en: 'Regulatory Advocacy & DPRs', mr: 'नियामक सल्लागार व सविस्तर प्रकल्प अहवाल' },
    desc: {
      en: 'Deep command over MERC/CERC frameworks, Green Open Access, net metering, and bankable Detailed Project Reports.',
      mr: 'MERC/CERC नियमावली, ग्रीन ओपन अ‍ॅक्सेस, नेट मीटरिंग आणि बँकेबल सविस्तर प्रकल्प अहवाल (DPR) निर्मिती.',
    },
  },
  {
    tag: { en: 'Precision Tech', mr: 'अचूक तंत्रज्ञान' },
    title: { en: 'Drone & GIS Site Mapping', mr: 'ड्रोन व GIS साईट मॅपिंग' },
    desc: {
      en: 'High-accuracy aerial topography, shadow analysis, and thermal inspection to maximize plant yield and reliability.',
      mr: 'प्रकल्प उत्पादनक्षमता वाढवण्यासाठी अचूक हवाई सर्वेक्षण, सावली विश्लेषण आणि थर्मल तपासणी.',
    },
  },
  {
    tag: { en: 'Diagnostics', mr: 'ऊर्जा तपासणी' },
    title: { en: 'Energy Audits & Power Quality', mr: 'एनर्जी ऑडिट व पॉवर क्वालिटी' },
    desc: {
      en: 'Comprehensive industrial energy audits, harmonics analysis, Root Cause Analysis (RCA), and CAPA optimization.',
      mr: 'औद्योगिक एनर्जी ऑडिट, हार्मोनिक्स विश्लेषण, रूट कॉज अ‍ॅनालिसिस (RCA) आणि CAPA सुधारणा.',
    },
  },
  {
    tag: { en: 'Future Energy', mr: 'भविष्यातील ऊर्जा' },
    title: { en: 'Green Hydrogen & Hybrid Advisory', mr: 'ग्रीन हायड्रोजन व हायब्रिड सल्लागार' },
    desc: {
      en: 'Strategic advisory on Wind-Solar Hybrid, Repowering, BESS, Electrolysers, Storage, and Fuel Cell ecosystems.',
      mr: 'पवन-सौर हायब्रिड, रिपॉवरिंग, BESS, इलेक्ट्रोलायझर्स, स्टोरेज आणि फ्युएल सेल तंत्रज्ञानासाठी सल्लागार सेवा.',
    },
  },
  {
    tag: { en: 'Annual Scale', mr: 'वार्षिक क्षमता' },
    title: { en: '100 MW RE + 100 MWh BESS / Year', mr: '१०० MW नवीकरणीय ऊर्जा + १०० MWh BESS / वर्ष' },
    desc: {
      en: 'Dedicated engineering, SCM, and field execution bandwidth ready for utility-scale solar and storage deployments.',
      mr: 'युटिलिटी-स्केल सौर आणि बॅटरी स्टोरेज प्रकल्पांसाठी सक्षम अभियांत्रिकी, पुरवठा साखळी व फिल्ड टीम.',
    },
  },
  {
    tag: { en: 'Dual-Sector', mr: 'द्वि-क्षेत्रीय कौशल्य' },
    title: { en: 'Wind + Solar + BESS Under One Roof', mr: 'पवन + सौर + BESS एकाच छताखाली' },
    desc: {
      en: 'Rare multi-technology engineering team experienced across 1,750+ MW Wind & Solar advisory and utility BESS.',
      mr: '१,७५०+ मेगावॅट पवन व सौर सल्लागार आणि युटिलिटी BESS चा अनुभव असलेली दुर्मिळ बहु-तांत्रिक अभियांत्रिकी टीम.',
    },
  },
];

export const TRACK_RECORD_TABS: TrackRecordCategory[] = [
  {
    id: 'epc',
    label: { en: 'EPC Solar & BESS', mr: 'सोलर ईपीसी व BESS' },
    subtitle: {
      en: '35+ MW Solar EPC & I&C · 60+ MWh Executed BESS · 300 MWh BESS PMC',
      mr: '३५+ मेगावॅट सोलर ईपीसी · ६०+ MWh कार्यान्वित BESS · ३०० MWh BESS PMC',
    },
    groups: [
      {
        heading: { en: 'Residential & Housing Societies (320+ PMSGY)', mr: 'निवासी व गृहनिर्माण संस्था (३२०+ पीएम सूर्य घर)' },
        entries: [
          { en: 'Bora House & Pudhari Publications', mr: 'बोरा हाऊस व पुढारी पब्लिकेशन्स' },
          { en: '24K Society & Paranjape Forest Trails', mr: '२४के सोसायटी व परांजपे फॉरेस्ट ट्रेल्स' },
          { en: 'Cassia Society, Bella Vista & Parkwayz', mr: 'कॅसिया सोसायटी, बेला व्हिस्टा व पार्कवेझ' },
          { en: 'Salunkhe Parivar, Harmony & 320+ PM Surya Ghar Homes', mr: 'साळुंखे परिवार, हार्मनी व ३२०+ पीएम सूर्य घर प्रकल्प' },
        ],
      },
      {
        heading: { en: 'Commercial & Institutional', mr: 'व्यावसायिक व शैक्षणिक संस्था' },
        entries: [
          { en: 'Krishna Vishwa Vidyapeeth (KVV)', mr: 'कृष्णा विश्व विद्यापीठ (KVV)' },
          { en: 'Elpro International School', mr: 'एल्प्रो इंटरनॅशनल स्कूल' },
          { en: 'The Fern Hotels & Resorts', mr: 'द फर्न हॉटेल्स अँड रिसॉर्ट्स' },
          { en: 'Suyash Gurukul & Parmar House', mr: 'सुयश गुरुकुल व परमार हाऊस' },
        ],
      },
      {
        heading: { en: 'Industrial Manufacturing', mr: 'औद्योगिक प्रकल्प' },
        entries: [
          { en: 'Manikchand Group', mr: 'माणिकचंद ग्रुप' },
          { en: 'Unique Tools & Moniji Enterprises', mr: 'युनिक टूल्स व मोनिजी एंटरप्रायझेस' },
          { en: 'Trimurti Stampings & Industrial Parks', mr: 'त्रिमूर्ती स्टॅम्पिंग्स व औद्योगिक संकुले' },
        ],
      },
      {
        heading: { en: 'Utility Solar & BESS (with PEC Power)', mr: 'युटिलिटी सोलर व BESS (PEC पॉवर सहकार्य)' },
        entries: [
          { en: '2× 13 MW + 4 MW MSKVY Utility Solar Parks', mr: '२× १३ मेगावॅट + ४ मेगावॅट MSKVY युटिलिटी सोलर पार्क' },
          { en: '3× 10 MW / 20 MWh BESS Executed (60+ MWh)', mr: '३× १० MW / २० MWh BESS यशस्वी पूर्ण (६०+ MWh)' },
          { en: '90 MWh BESS PMC Currently in Progress', mr: '९० MWh BESS PMC प्रकल्प प्रगतीपथावर' },
        ],
      },
    ],
  },
  {
    id: 'advisory',
    label: { en: 'Advisory & DPRs', mr: 'सल्लागार व DPR' },
    subtitle: {
      en: '1,750+ MW Wind & Solar Advisory, Feasibility Studies & Detailed Project Reports',
      mr: '१,७५०+ मेगावॅट पवन व सौर सल्लागार, व्यवहार्यता अभ्यास आणि सविस्तर प्रकल्प अहवाल',
    },
    groups: [
      {
        heading: { en: 'Large-Scale Corporate & Utility Advisory', mr: 'मोठे कॉर्पोरेट व युटिलिटी सल्लागार' },
        entries: [
          { en: 'Bajaj Finserv — 400 MW (Satara) & 40 MW (Ahilyanagar)', mr: 'बजाज फिनसर्व्ह — ४०० मेगावॅट (सातारा) व ४० मेगावॅट (अहिल्यानगर)' },
          { en: 'Welspun Group — 300 MW Solar Advisory (Gujarat)', mr: 'वेल्स्पन ग्रुप — ३०० मेगावॅट सोलर सल्लागार (गुजरात)' },
          { en: 'MEDA (Mahaurja) — 100 MW Solar Park Advisory', mr: 'मेडा (महाऊर्जा) — १०० मेगावॅट सोलर पार्क सल्लागार' },
        ],
      },
      {
        heading: { en: 'Municipal Corporations & Public Bodies', mr: 'महानगरपालिका व शासकीय संस्था' },
        entries: [
          { en: 'Baramati Municipal Corporation', mr: 'बारामती नगरपरिषद' },
          { en: 'Solapur Municipal Corporation', mr: 'सोलापूर महानगरपालिका' },
          { en: 'Mahaurja & State Renewable Initiatives', mr: 'महाऊर्जा व राज्यस्तरीय नवीकरणीय ऊर्जा उपक्रम' },
        ],
      },
      {
        heading: { en: 'IPPs, Developers & Industry Partners', mr: 'आयपीपी, डेव्हलपर्स व उद्योग भागीदार' },
        entries: [
          { en: 'Mivaan Power & Solararc', mr: 'मिवान पॉवर व सोलरआर्क' },
          { en: 'ECE India & Arkaya Solar', mr: 'ईसीई इंडिया व अर्काया सोलर' },
          { en: 'Sunlit Solar & Accurate Group', mr: 'सनलिट सोलर व अ‍ॅक्युरेट ग्रुप' },
        ],
      },
    ],
  },
  {
    id: 'amc',
    label: { en: 'AMC, O&M & Audits', mr: 'AMC, O&M व ऑडिट' },
    subtitle: {
      en: '65+ MW Active Solar O&M Portfolio & Industrial Power Quality Audits',
      mr: '६५+ मेगावॅट सक्रिय सोलर O&M आणि औद्योगिक पॉवर क्वालिटी ऑडिट',
    },
    groups: [
      {
        heading: { en: 'Commercial & Institutional AMC', mr: 'व्यावसायिक व शैक्षणिक AMC' },
        entries: [
          { en: 'Elpro Group', mr: 'एल्प्रो ग्रुप' },
          { en: 'Lohia Jain Group', mr: 'लोहिया जैन ग्रुप' },
          { en: 'Krishna Vishwa Vidyapeeth (KVV)', mr: 'कृष्णा विश्व विद्यापीठ (KVV)' },
        ],
      },
      {
        heading: { en: 'Industrial & Utility O&M', mr: 'औद्योगिक व युटिलिटी O&M' },
        entries: [
          { en: 'Ravindra Energy Ltd & CleanMax', mr: 'रवींद्र एनर्जी लि. व क्लीनमॅक्स' },
          { en: 'Manikchand Group', mr: 'माणिकचंद ग्रुप' },
          { en: 'Ajanta Universal & Soham Agro', mr: 'अजंता युनिव्हर्सल व सोहम अ‍ॅग्रो' },
        ],
      },
      {
        heading: { en: 'Energy & Power Quality Audits', mr: 'एनर्जी व पॉवर क्वालिटी ऑडिट' },
        entries: [
          { en: 'Krishna Vishwa Vidyapeeth & Arnolds School', mr: 'कृष्णा विश्व विद्यापीठ व अर्नोल्ड्स स्कूल' },
          { en: 'Unity Builders & Sanghavi Movers', mr: 'युनिटी बिल्डर्स व संघवी मूव्हर्स' },
          { en: 'Abhishek Industries & Sorigin Group', mr: 'अभिषेक इंडस्ट्रीज व सोरिजिन ग्रुप' },
        ],
      },
    ],
  },
  {
    id: 'legacy',
    label: { en: 'Leadership Legacy', mr: 'नेतृत्व वारसा (२,४००+ MW)' },
    subtitle: {
      en: 'Landmark Wind & Solar Deployments Delivered Across MD & CEO’s 25+ Year Career',
      mr: 'व्यवस्थापकीय संचालकांच्या २५+ वर्षांच्या कारकिर्दीतील ऐतिहासिक पवन व सौर प्रकल्प',
    },
    groups: [
      {
        heading: { en: 'Utility Wind Power Developments', mr: 'युटिलिटी पवन ऊर्जा विकास' },
        entries: [
          { en: 'Regen Powertech — 250+ MW Wind', mr: 'रीजेन पॉवरटेक — २५०+ मेगावॅट पवन ऊर्जा' },
          { en: 'Kenersys — 150+ MW Wind', mr: 'केनर्सिस — १५०+ मेगावॅट पवन ऊर्जा' },
          { en: 'Siemens Gamesa — 150+ MW Wind', mr: 'सीमेन्स गमेसा — १५०+ मेगावॅट पवन ऊर्जा' },
          { en: 'Energon — 60 MW Wind', mr: 'एनर्जॉन — ६० मेगावॅट पवन ऊर्जा' },
        ],
      },
      {
        heading: { en: 'Utility-Scale Solar Plants', mr: 'युटिलिटी-स्केल सौर प्रकल्प' },
        entries: [
          { en: 'Cleantech Solar — 2× 28 MW (Beed & Yavatmal)', mr: 'क्लीनटेक सोलर — २× २८ मेगावॅट (बीड व यवतमाळ)' },
          { en: 'Panama Solar — 11.5 MWp (Beed)', mr: 'पनामा सोलर — ११.५ MWp (बीड)' },
          { en: 'Gilada Group — 7.5 MWp (Sangli)', mr: 'गिलाडा ग्रुप — ७.५ MWp (सांगली)' },
        ],
      },
      {
        heading: { en: 'Iconic Airports, Automotive & C&I', mr: 'विमानतळ, ऑटोमोटिव्ह व नामवंत C&I' },
        entries: [
          { en: 'Tata Motors — 2 MW (Pimpri) & 4 MW (Lucknow)', mr: 'टाटा मोटर्स — २ मेगावॅट (पिंपरी) व ४ मेगावॅट (लखनौ)' },
          { en: 'Bangalore Airport (3.2 MWp) & Mumbai Airport (1.5 MWp)', mr: 'बंगळुरू विमानतळ (३.२ MWp) व मुंबई विमानतळ (१.५ MWp)' },
          { en: 'Manikchand (990 kWp Shirur), Minda (750 kWp Chakan) & Elpro (500 kWp)', mr: 'माणिकचंद (९९० kWp शिरूर), मिंडा (७५० kWp चाकण) व एल्प्रो (५०० kWp)' },
        ],
      },
    ],
  },
];

export const AWARDS_TIMELINE: AwardYearGroup[] = [
  {
    year: '2026',
    items: [
      {
        title: { en: 'Service Excellence Award', mr: 'सेवा उत्कृष्टता पुरस्कार (Service Excellence Award)' },
        issuer: { en: 'Renewable Energy Industry Recognition', mr: 'नवीकरणीय ऊर्जा उद्योग सन्मान' },
      },
      {
        title: { en: 'Project Excellence Award', mr: 'प्रकल्प उत्कृष्टता पुरस्कार (Project Excellence Award)' },
        issuer: { en: 'Solar & Clean Energy Execution Excellence', mr: 'सौर व स्वच्छ ऊर्जा प्रकल्प उभारणी उत्कृष्टता' },
      },
    ],
  },
  {
    year: '2025',
    items: [
      {
        title: { en: 'Solar EPC Company of the Year (Residential)', mr: 'सोलर ईपीसी कंपनी ऑफ द इयर (निवासी)' },
        issuer: { en: 'National Solar Industry Awards', mr: 'राष्ट्रीय सौर ऊर्जा उद्योग पुरस्कार' },
      },
      {
        title: { en: 'Sustainability Team of the Year — Customer Satisfaction', mr: 'सस्टेनेबिलिटी टीम ऑफ द इयर — ग्राहक समाधान' },
        issuer: { en: 'Clean Energy Leadership Forum', mr: 'स्वच्छ ऊर्जा नेतृत्व मंच' },
      },
      {
        title: { en: 'Top 50 Solar Business Leaders in India', mr: 'भारतातील टॉप ५० सौर व्यवसाय नेते' },
        issuer: { en: 'EQ / C2Z Leadership Recognition', mr: 'EQ / C2Z नेतृत्व सन्मान' },
      },
    ],
  },
  {
    year: '2024',
    items: [
      {
        title: { en: 'Rising Star — Green Energy Advisory & Services', mr: 'रायझिंग स्टार — हरित ऊर्जा सल्लागार व सेवा' },
        issuer: { en: 'Solar Industry Excellence', mr: 'सौर उद्योग उत्कृष्टता सन्मान' },
      },
      {
        title: { en: 'Rising Star — Solar EPC (Residential & C&I)', mr: 'रायझिंग स्टार — सोलर ईपीसी (निवासी व C&I)' },
        issuer: { en: 'Dual-Category EPC Recognition', mr: 'द्वि-श्रेणी ईपीसी सन्मान' },
      },
      {
        title: { en: 'Best Green Energy Startup of the Year', mr: 'सर्वोत्कृष्ट हरित ऊर्जा स्टार्टअप ऑफ द इयर' },
        issuer: { en: 'National Renewable Startup Awards', mr: 'राष्ट्रीय नवीकरणीय स्टार्टअप पुरस्कार' },
      },
    ],
  },
  {
    year: '2023',
    items: [
      {
        title: { en: 'Most Inspiring Solar Professional of the Year', mr: 'मोस्ट इन्स्पायरिंग सोलर प्रोफेशनल ऑफ द इयर' },
        issuer: { en: 'Honored for Social Contribution — Mr. Rahul Nalawade', mr: 'सामाजिक योगदानासाठी सन्मान — श्री. राहुल नलावडे' },
      },
    ],
  },
  {
    year: '2022',
    items: [
      {
        title: { en: 'Top 40 Most Influential Solar Leaders in India', mr: 'भारतातील टॉप ४० प्रभावशाली सौर नेते' },
        issuer: { en: 'National Leadership Recognition — Mr. Rahul Nalawade', mr: 'राष्ट्रीय नेतृत्व सन्मान — श्री. राहुल नलावडे' },
      },
    ],
  },
  {
    year: '2021',
    items: [
      {
        title: { en: 'Most Promising Young Leader of the Year', mr: 'मोस्ट प्रॉमिसिंग यंग लीडर ऑफ द इयर' },
        issuer: { en: 'SolarQuarter Leadership Award — Mr. Rahul Nalawade', mr: 'सोलरक्वार्टर लीडरशिप अवॉर्ड — श्री. राहुल नलावडे' },
      },
    ],
  },
];
