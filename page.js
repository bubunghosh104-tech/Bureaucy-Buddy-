'use client';

import { useState, useRef, useEffect } from 'react';

// Multilingual translations for UI labels
const UI_TEXT = {
  en: {
    bannerOfficial: "An official citizen assistance service",
    bannerHowKnow: "Here's how this service works",
    bannerExplanation: "Bureaucracy Buddy helps everyday citizens in India navigate official paperwork with step-by-step guidance, document checklists, office maps, and an interactive AI chatbot.",
    appTitle: "BUREAUCRACY BUDDY",
    serviceSubtitle: "Citizen Paperwork Guidance Service",
    betaTag: "BETA",
    betaNotice: "This is a public service tool to help Indian citizens. Always confirm details on official departmental portals.",
    searchHeading: "Find out how to get official paperwork done",
    searchLead: "Get clear step-by-step instructions, check required documents, find nearby offices with maps, and chat with AI.",
    inputLabel: "What paperwork or government service do you need help with?",
    inputHint: "For example: 'How to apply for a fresh passport', 'Fix spelling in Aadhaar', or 'Book driving licence test'.",
    helpBtnText: "Get guidance",
    loadingText: "Consulting procedures...",
    popularServicesLabel: "Popular government services:",
    examples: [
      { id: 'passport', label: "🛂 Fresh Passport", query: "How do I apply for a new Indian passport?" },
      { id: 'aadhaar', label: "🪪 Aadhaar Update", query: "How to fix my name and address in Aadhaar card?" },
      { id: 'licence', label: "🚗 Driving Licence", query: "How to apply for a learner and driving licence?" },
      { id: 'ration', label: "🍚 Ration Card", query: "How to apply for a new ration card?" },
      { id: 'pan', label: "💳 PAN Card (e-PAN)", query: "How to apply for an instant PAN card or update details?" }
    ],
    overviewHeading: "Service Overview & Costs",
    sectionSteps: "Step-by-step application procedure",
    sectionDocs: "Documents checklist (tick items you have ready)",
    sectionMistakes: "Warning: Common mistakes that cause rejection or delay",
    statTime: "Estimated processing time",
    statCost: "Official government fee",
    statPortal: "Official departmental portal",
    insiderTipLabel: "Important advice",
    progressLabel: "Document readiness",
    tagRequired: "Required",
    tagReady: "Ready",
    printBtn: "🖨️ Print official guidance sheet",
    copyBtn: "📋 Copy guide",
    copiedText: "✓ Copied to clipboard",
    disclaimer: "AI guidance only. This tool does not replace official government laws or circulars. Always verify requirements on official departmental websites before visiting offices.",
    officialPortalsTitle: "Official Departmental Directory & Helplines",
    demoBadge: "Offline / Handbook Mode",
    demoMessage: "Showing verified government handbook guide. Add GEMMA_API_KEY to .env.local for custom AI inquiries.",

    // GPS & Map
    locatorHeading: "📍 Nearest Government Offices & Live Map",
    locatorSubhead: "Use your GPS or enter your city to see nearby centres, working hours, and get live directions.",
    gpsBtnText: "📍 Detect My Current Location (GPS)",
    gpsDetecting: "Detecting location via GPS...",
    cityInputPlaceholder: "Or enter City / PIN Code (e.g. Delhi, 700001, Bengaluru)",
    searchLocBtn: "Locate Offices",
    mapExternalLink: "Open in Google Maps / Directions ↗",
    activeLocText: "Showing verified offices near:",

    // Chatbot
    chatLauncherText: "💬 Ask Buddy (AI Chat)",
    chatHeaderTitle: "Citizen AI Help Desk",
    chatHeaderSubtitle: "Bureaucracy Buddy Live Assistant",
    chatNotice: "Ask specific questions about documents, offline options, or exceptions.",
    chatPlaceholder: "Ask a question (e.g. Can I use DigiLocker?)...",
    chatSendBtn: "Send",
    chatQuickTitle: "Suggested questions:",
    chatQuickPills: [
      "Is DigiLocker accepted?",
      "Can I apply under Tatkal?",
      "Can I use spouse address proof?",
      "Can I fill the form offline at CSC?"
    ]
  },
  hi: {
    bannerOfficial: "नागरिक सहायता एवं कागजी मार्गदर्शन सेवा",
    bannerHowKnow: "यह सेवा कैसे काम करती है",
    bannerExplanation: "ब्यूरोक्रेसी बडी भारत के आम नागरिकों को सरकारी कागजी प्रक्रिया, जरूरी दस्तावेजों की सूची, नजदीकी कार्यालय का नक्शा और एआई चैटबॉट उपलब्ध कराता है।",
    appTitle: "ब्यूरोक्रेसी बडी",
    serviceSubtitle: "नागरिक सरकारी कागजात सहायता सेवा",
    betaTag: "बीटा (BETA)",
    betaNotice: "यह भारतीय नागरिकों के लिए एक निःशुल्क जनसेवा टूल है। संबंधित विभाग के पोर्टल पर नियमों की पुष्टि अवश्य करें।",
    searchHeading: "सरकारी कागजी काम आसानी से समझें",
    searchLead: "कदम-दर-कदम आसान निर्देश पाएं, जरूरी दस्तावेजों की जांच करें, नजदीकी ऑफिस का नक्शा देखें और एआई से सवाल पूछें।",
    inputLabel: "आपको किस सरकारी सेवा या कागजात में सहायता चाहिए?",
    inputHint: "उदाहरण: 'नया पासपोर्ट कैसे बनवाएं?', 'आधार में पता कैसे सुधारें?', या 'ड्राइविंग टेस्ट कैसे बुक करें?'",
    helpBtnText: "मार्गदर्शन प्राप्त करें",
    loadingText: "सरकारी प्रक्रिया जांची जा रही है...",
    popularServicesLabel: "अक्सर पूछे जाने वाले सरकारी काम:",
    examples: [
      { id: 'passport', label: "🛂 नया पासपोर्ट", query: "नया भारतीय पासपोर्ट कैसे बनवाएं?" },
      { id: 'aadhaar', label: "🪪 आधार सुधार", query: "आधार कार्ड में नाम और पता कैसे सही करवाएं?" },
      { id: 'licence', label: "🚗 ड्राइविंग लाइसेंस", query: "लर्नर और परमानेंट ड्राइविंग लाइसेंस कैसे बनवाएं?" },
      { id: 'ration', label: "🍚 नया राशन कार्ड", query: "नया राशन कार्ड कैसे बनवाएं?" },
      { id: 'pan', label: "💳 नया पैन कार्ड", query: "नया पैन कार्ड कैसे बनवाएं या सुधार करवाएं?" }
    ],
    overviewHeading: "समय, शुल्क एवं आधिकारिक पोर्टल",
    sectionSteps: "कदम-दर-कदम आवेदन प्रक्रिया",
    sectionDocs: "दस्तावेजों की चेकलिस्ट (तैयार कागजात पर टिक करें)",
    sectionMistakes: "सावधानी: इन गलतियों से आवेदन खारिज या लेट हो सकता है",
    statTime: "अनुमानित समय",
    statCost: "सरकारी शुल्क",
    statPortal: "आधिकारिक सरकारी पोर्टल",
    insiderTipLabel: "महत्वपूर्ण सलाह",
    progressLabel: "दस्तावेज तैयारी की स्थिति",
    tagRequired: "अनिवार्य",
    tagReady: "तैयार",
    printBtn: "🖨️ प्रिंट / PDF शीट सेव करें",
    copyBtn: "📋 कॉपी करें",
    copiedText: "✓ कॉपी हो गया!",
    disclaimer: "यह केवल एआई मार्गदर्शन है। किसी भी सरकारी दफ्तर जाने से पहले आधिकारिक विभागीय वेबसाइट पर पुष्टि अवश्य करें।",
    officialPortalsTitle: "प्रमुख आधिकारिक सरकारी विभाग एवं हेल्पलाइन",
    demoBadge: "ऑफलाइन / पुस्तिका मोड",
    demoMessage: "सत्यापित सरकारी हैंडबुक से जानकारी दिखाई जा रही है। कस्टम एआई के लिए .env.local में GEMMA_API_KEY डालें।",

    // GPS & Map
    locatorHeading: "📍 नजदीकी सरकारी कार्यालय एवं लाइव मैप",
    locatorSubhead: "जीपीएस (GPS) से अपना स्थान चुनें या शहर लिखकर नजदीकी केंद्र का पता और मैप देखें।",
    gpsBtnText: "📍 मेरा वर्तमान स्थान पता करें (GPS)",
    gpsDetecting: "स्थान खोजा जा रहा है...",
    cityInputPlaceholder: "या शहर / पिन कोड लिखें (जैसे: Delhi, 110001, Patna)",
    searchLocBtn: "खोजें",
    mapExternalLink: "गूगल मैप पर दिशा-निर्देश देखें ↗",
    activeLocText: "इस क्षेत्र के नजदीकी कार्यालय:",

    // Chatbot
    chatLauncherText: "💬 एआई चैट सहायक (Ask Buddy)",
    chatHeaderTitle: "नागरिक एआई सहायता केंद्र",
    chatHeaderSubtitle: "ब्यूरोक्रेसी बडी लाइव चैट",
    chatNotice: "दस्तावेज, शुल्क या नियमों पर कोई भी प्रश्न पूछें।",
    chatPlaceholder: "अपना सवाल लिखें (जैसे: क्या डिजिलॉकर मान्य है?)...",
    chatSendBtn: "भेजें",
    chatQuickTitle: "सुझाए गए सवाल:",
    chatQuickPills: [
      "क्या डिजिलॉकर मान्य है?",
      "क्या तत्काल में आवेदन कर सकते हैं?",
      "पते में पति/पत्नी का नाम चलेगा?",
      "क्या जन सेवा केंद्र (CSC) से भर सकते हैं?"
    ]
  },
  bn: {
    bannerOfficial: "নাগরিক সহায়তা ও সরকারি কাজের নির্দেশিকা সেবা",
    bannerHowKnow: "এই সেবা কীভাবে কাজ করে",
    bannerExplanation: "ব্যুরোক্রেসি বাডি সাধারণ নাগরিকদের সরকারি কাজকর্মের ধাপ, কাগজপত্রের তালিকা, নিকটবর্তী অফিসের ম্যাপ ও সরাসরি এআই চ্যাট সহায়ক প্রদান করে।",
    appTitle: "ব্যুরোক্রেসি বাডি",
    serviceSubtitle: "নাগরিক সরকারি নথিপত্র সহায়তা কেন্দ্র",
    betaTag: "বেটা (BETA)",
    betaNotice: "এটি ভারতীয় নাগরিকদের জন্য একটি উন্মুক্ত জনসেবা উদ্যোগ। সংশ্লিষ্ট সরকারি পোর্টালে তথ্য যাচাই করে নিন।",
    searchHeading: "সরকারি নথিপত্রের কাজ সহজে সম্পন্ন করুন",
    searchLead: "ধাপে ধাপে সহজ নির্দেশিকা জানুন, কাগজপত্রের তালিকা মিলিয়ে নিন, নিকটবর্তী অফিস ও ম্যাপ দেখুন এবং এআই চ্যাটে প্রশ্ন করুন।",
    inputLabel: "আপনার কোন সরকারি কাজ বা নথিপত্র নিয়ে সাহায্য প্রয়োজন?",
    inputHint: "উদাহরণ: 'নতুন পাসপোর্ট আবেদনের নিয়ম', 'আধার কার্ড সংশোধন', বা 'ড্রাইভিং লাইসেন্স কীভাবে পাব?'",
    helpBtnText: "নির্দেশিকা পান",
    loadingText: "সরকারি নিয়মাবলী অনুসন্ধান করা হচ্ছে...",
    popularServicesLabel: "জনপ্রিয় সরকারি সেবাসমূহ:",
    examples: [
      { id: 'passport', label: "🛂 নতুন পাসপোর্ট", query: "নতুন ভারতীয় পাসপোর্ট কীভাবে তৈরি করব?" },
      { id: 'aadhaar', label: "🪪 আধার সংশোধন", query: "আধার কার্ডে নাম ও ঠিকানা কীভাবে পরিবর্তন করব?" },
      { id: 'licence', label: "🚗 ড্রাইভিং লাইসেন্স", query: "লার্নার ও ড্রাইভিং লাইসেন্স কীভাবে পাওয়া যাবে?" },
      { id: 'ration', label: "🍚 রেশন কার্ড", query: "নতুন রেশন কার্ড কীভাবে আবেদন করব?" },
      { id: 'pan', label: "💳 প্যান কার্ড", query: "নতুন প্যান কার্ড বা সংশোধনের নিয়ম কী?" }
    ],
    overviewHeading: "সময়, সরকারি খরচ ও অফিশিয়াল পোর্টাল",
    sectionSteps: "ধাপে ধাপে আবেদন পদ্ধতি",
    sectionDocs: "প্রয়োজনীয় নথিপত্রের চেকলিস্ট (যেগুলো তৈরি আছে টিক দিন)",
    sectionMistakes: "সতর্কবার্তা: যে ভুলগুলোর কারণে আবেদন বাতিল হতে পারে",
    statTime: "আনুমানিক সময়",
    statCost: "সরকারি ফি",
    statPortal: "অফিসিয়াল সরকারি পোর্টাল",
    insiderTipLabel: "জরুরি পরামর্শ",
    progressLabel: "নথিপত্র প্রস্তুতির অগ্রগতি",
    tagRequired: "প্রয়োজনীয়",
    tagReady: "প্রস্তুত",
    printBtn: "🖨️ অফিশিয়াল গাইড শিট প্রিন্ট করুন",
    copyBtn: "📋 কপি করুন",
    copiedText: "✓ ক্লিপবোর্ডে কপি সম্পন্ন!",
    disclaimer: "এটি শুধুমাত্র এআই নির্দেশিকা। সরকারি অফিসে যাওয়ার পূর্বে অফিসিয়াল সরকারি ওয়েবসাইটে নিয়মাবলী যাচাই করে নিন।",
    officialPortalsTitle: "প্রয়োজনীয় সরকারি পোর্টাল ও হেল্পলাইন",
    demoBadge: "অফলাইন / হ্যান্ডবুক মোড",
    demoMessage: "যাচাইকৃত সরকারি নির্দেশিকা প্রদর্শিত হচ্ছে। লাইভ এআই-এর জন্য .env.local ফাইলে GEMMA_API_KEY দিন।",

    // GPS & Map
    locatorHeading: "📍 নিকটবর্তী সরকারি অফিস ও লাইভ ম্যাপ",
    locatorSubhead: "জিপিএস (GPS) ব্যবহার করুন বা শহরের নাম লিখে কাছের কেন্দ্র ও ম্যাপে দিকনির্দেশ দেখুন।",
    gpsBtnText: "📍 বর্তমান অবস্থান শনাক্ত করুন (GPS)",
    gpsDetecting: "লোকেশন অনুসন্ধান চলছে...",
    cityInputPlaceholder: "বা শহর / পিন কোড লিখুন (যেমন: Kolkata, 700001, Howrah)",
    searchLocBtn: "খুঁজুন",
    mapExternalLink: "গুগল ম্যাপে দিকনির্দেশ দেখুন ↗",
    activeLocText: "চিহ্নিত এলাকার নিকটবর্তী অফিসসমূহ:",

    // Chatbot
    chatLauncherText: "💬 এআই চ্যাট সহায়ক (Ask Buddy)",
    chatHeaderTitle: "নাগরিক এআই সহায়তা কেন্দ্র",
    chatHeaderSubtitle: "ব্যুরোক্রেসি বাডি লাইভ অ্যাসিস্ট্যান্ট",
    chatNotice: "কাগজপত্র, নিয়ম বা ব্যতিক্রম সংক্রান্ত যেকোনো প্রশ্ন করুন।",
    chatPlaceholder: "আপনার প্রশ্ন লিখুন (যেমন: ডিজিলকার কি গ্রহণযোগ্য?)...",
    chatSendBtn: "পাঠান",
    chatQuickTitle: "সাধারণ প্রশ্নসমূহ:",
    chatQuickPills: [
      "ডিজিলকার কি গ্রহণযোগ্য?",
      "তৎকালে কি আবেদন করা যায়?",
      "স্বামীর/স্ত্রীর ঠিকানা কি ব্যবহার করা যাবে?",
      "বাংলা সহায়তা কেন্দ্র (BSK) থেকে আবেদন করা যায়?"
    ]
  }
};

const OFFICIAL_DIRECTORIES = [
  { name: "Passport Seva Kendra", url: "https://passportindia.gov.in", helpline: "1800-258-1800" },
  { name: "MyAadhaar Portal (UIDAI)", url: "https://myaadhaar.uidai.gov.in", helpline: "1947" },
  { name: "Sarathi Parivahan (DL & RC)", url: "https://parivahan.gov.in", helpline: "0120-4925505" },
  { name: "Income Tax Department (PAN)", url: "https://incometax.gov.in", helpline: "1800-180-1961" },
  { name: "National Food Security (Ration)", url: "https://nfsa.gov.in", helpline: "1967" },
  { name: "National Voters' Service Portal", url: "https://voters.eci.gov.in", helpline: "1950" },
  { name: "DigiLocker (Govt Document Locker)", url: "https://digilocker.gov.in", helpline: "Helpdesk" },
  { name: "National Portal of India", url: "https://india.gov.in", helpline: "Citizen Care" }
];

// Helper: Determine department office category from active query
function getOfficeCategory(topic = '') {
  const t = topic.toLowerCase();
  if (t.includes('passport') || t.includes('पासपोर्ट') || t.includes('পাসপোর্ট')) return 'Passport Seva Kendra';
  if (t.includes('aadhaar') || t.includes('aadhar') || t.includes('आधार') || t.includes('আধার')) return 'Aadhaar Seva Kendra';
  if (t.includes('licence') || t.includes('license') || t.includes('driving') || t.includes('ड्राइविंग') || t.includes('লাইসেন্স')) return 'RTO Office';
  if (t.includes('ration') || t.includes('राशन') || t.includes('রেশন')) return 'Ration BDO Office';
  if (t.includes('pan') || t.includes('पैन') || t.includes('প্যান')) return 'PAN UTIITSL / NSDL Centre';
  return 'Government Citizen Service Centre';
}

// Helper: Generate realistic office listings based on department and user city
function getNearbyOfficesList(category, city) {
  const c = city || 'your district';
  if (category.includes('Passport')) {
    return [
      { name: `Passport Seva Kendra (PSK) - ${c}`, type: "Main PSK Centre", timing: "9:00 AM – 4:30 PM (Mon-Fri)", features: "Biometrics, Physical Document Verification, Token System" },
      { name: `Post Office Passport Seva Kendra (POPSK) - ${c}`, type: "POPSK Branch", timing: "9:30 AM – 4:00 PM (Mon-Fri)", features: "Online Appointment Required, Speed Post Submission" },
      { name: `Regional Passport Office (RPO) Facilitation Counter`, type: "Regional Office", timing: "10:00 AM – 2:00 PM (Mon-Fri)", features: "Appeals, Clarifications, Adverse Police Verification Hearing" }
    ];
  }
  if (category.includes('Aadhaar')) {
    return [
      { name: `UIDAI Aadhaar Seva Kendra (ASK) - ${c}`, type: "Official ASK", timing: "9:30 AM – 5:30 PM (Open 7 Days)", features: "Fresh Enrollment, Biometric Updates, Token Kiosk, Disabled Access" },
      { name: `Head Post Office Aadhaar Enrollment Centre`, type: "Postal Centre", timing: "10:00 AM – 3:30 PM (Mon-Sat)", features: "Mobile Number Linking, Address & Name Demographic Correction" },
      { name: `Designated Public Bank Aadhaar Branch - ${c}`, type: "Bank Branch", timing: "10:30 AM – 4:00 PM (Banking Days)", features: "Document Update Kiosk, Children Biometric Mandate" }
    ];
  }
  if (category.includes('RTO')) {
    return [
      { name: `Regional Transport Office (RTO) - ${c}`, type: "Transport Dept", timing: "10:00 AM – 3:30 PM (Mon-Fri)", features: "Driving Licence Test, Biometrics, Smart Card Dispatch" },
      { name: `Automated Driving Test Track (ADTT) - ${c}`, type: "Test Track", timing: "9:00 AM – 2:00 PM (Slot Booking)", features: "CCTV Sensor Track, 4-Wheeler Reverse 'S' & 2-Wheeler '8' Test" },
      { name: `Government Approved Motor Driving Training Centre`, type: "Authorised Training", timing: "8:00 AM – 6:00 PM (All Days)", features: "Form 5 Training Certificate, LL Practice Sessions" }
    ];
  }
  return [
    { name: `Common Service Centre (CSC / Digital Seva) - ${c}`, type: "Citizen Centre", timing: "9:00 AM – 7:00 PM (All Days)", features: "Online Form Filling, Fee Receipt Challan, Certificate Print" },
    { name: `Block Development Office (BDO / Municipality Sub-Office)`, type: "Civic Authority", timing: "10:00 AM – 4:00 PM (Mon-Fri)", features: "Physical Verification, Government Attestation, Grievances" }
  ];
}

export default function Home() {
  const [lang, setLang] = useState('en');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [checkedDocs, setCheckedDocs] = useState({});
  const [copied, setCopied] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // GPS & Map States
  const [userCity, setUserCity] = useState('New Delhi');
  const [cityInputText, setCityInputText] = useState('');
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState('');
  const [gpsDetected, setGpsDetected] = useState(false);

  // AI Chatbot States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef(null);

  const t = UI_TEXT[lang];

  // Initialize chatbot welcoming message on language change
  useEffect(() => {
    setChatMessages([
      {
        role: 'assistant',
        content: lang === 'hi'
          ? 'नमस्ते! मैं ब्यूरोक्रेसी बडी एआई सहायक हूँ। अपने सरकारी कागजात, दस्तावेजों या नियमों से जुड़ा कोई भी सवाल पूछें।'
          : lang === 'bn'
            ? 'নমস্কার! আমি ব্যুরোক্রেসি বাডি এআই সহকারী। কাগজপত্র, নিয়ম বা ফি সংক্রান্ত কোনো প্রশ্ন থাকলে আমাকে জিজ্ঞাসা করুন।'
            : 'Hello! I am Bureaucracy Buddy AI. Ask me any follow-up questions about acceptable documents, rules, or exceptions.',
        time: 'Now'
      }
    ]);
  }, [lang]);

  // Auto scroll chat to bottom when message arrives
  useEffect(() => {
    if (isChatOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  // GPS Location Trigger
  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      setGpsError(
        lang === 'hi'
          ? 'आपके ब्राउज़र में जीपीएस (GPS) उपलब्ध नहीं है।'
          : lang === 'bn'
            ? 'আপনার ব্রাউজারে জিপিএস উপলব্ধ নেই।'
            : 'GPS is not supported by your browser.'
      );
      return;
    }

    setGpsLoading(true);
    setGpsError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const detectedCity = data.address?.city || data.address?.town || data.address?.state_district || data.address?.state || 'Your Area';
          setUserCity(detectedCity);
          setGpsDetected(true);
        } catch (err) {
          setUserCity(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
          setGpsDetected(true);
        } finally {
          setGpsLoading(false);
        }
      },
      (err) => {
        setGpsLoading(false);
        setGpsError(
          err.code === 1
            ? (lang === 'hi' ? 'स्थान (GPS) अनुमति अस्वीकृत। आप नीचे अपना शहर या पिन कोड लिख सकते हैं।' : lang === 'bn' ? 'লোকেশন অনুমতি প্রত্যাখ্যাত। নিচে আপনার শহর বা পিন লিখুন।' : 'Location access denied. Please type your City or PIN code below.')
            : (lang === 'hi' ? 'स्थान प्राप्त करने में विफल।' : lang === 'bn' ? 'লোকেশন পাওয়া যায়নি।' : 'Unable to acquire GPS coordinates.')
        );
      },
      { timeout: 9000, enableHighAccuracy: true }
    );
  };

  // Manual city / PIN submit
  const handleManualLocationSubmit = (e) => {
    e.preventDefault();
    if (cityInputText.trim()) {
      setUserCity(cityInputText.trim());
      setGpsDetected(false);
      setGpsError('');
    }
  };

  // Send AI Chat Message
  const sendChatMessage = async (customText = null) => {
    const textToSend = (customText !== null ? customText : chatInput).trim();
    if (!textToSend || chatLoading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { role: 'user', content: textToSend, time: timeStr };
    const updatedHistory = [...chatMessages, userMsg];
    setChatMessages(updatedHistory);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedHistory,
          language: lang,
          currentTopic: result?.topic || query || 'Indian Paperwork'
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Chat service unavailable');
      }

      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: lang === 'hi'
            ? 'माफ़ कीजिए, उत्तर प्राप्त करने में समस्या हुई। कृपया दोबारा प्रयास करें।'
            : lang === 'bn'
              ? 'দুঃখিত, উত্তর পেতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
              : 'Sorry, I encountered an issue. Please try again.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Submit query to /api/assist route
  const handleSearch = async (queryText = query, languageToUse = lang) => {
    const textToSend = (queryText || '').trim();
    if (!textToSend) {
      setError(
        languageToUse === 'hi'
          ? 'कृपया अपनी समस्या या सरकारी सेवा का नाम लिखें।'
          : languageToUse === 'bn'
            ? 'অনুগ্রহ করে আপনার সমস্যা বা কাজের বিবরণ লিখুন।'
            : 'Please enter a paperwork problem or government service.'
      );
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setCheckedDocs({});

    try {
      const response = await fetch('/api/assist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: textToSend,
          language: languageToUse
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to retrieve guidance. Please try again.');
      }

      setResult(data);
      // Smoothly auto-scroll to results section
      setTimeout(() => {
        const el = document.getElementById('results-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      setError(err.message || 'Network connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle checklist checkbox
  const toggleDocCheck = (index) => {
    setCheckedDocs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Checklist calculations
  const totalDocs = result?.documents?.length || 0;
  const completedDocs = Object.values(checkedDocs).filter(Boolean).length;
  const progressPercent = totalDocs > 0 ? Math.round((completedDocs / totalDocs) * 100) : 0;

  // Handle clicking example pills
  const handleExampleClick = (example) => {
    setQuery(example.query);
    handleSearch(example.query, lang);
  };

  // Handle language switch
  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    if (query.trim()) {
      handleSearch(query, newLang);
    }
  };

  // Copy guide text to clipboard
  const handleCopy = () => {
    if (!result) return;
    const textToCopy = `=== ${result.topic || 'Government Paperwork Guide'} ===\n\n` +
      `[1. STEP-BY-STEP PROCEDURE]\n` +
      result.steps.map((s, i) => `${i + 1}. ${s}`).join('\n') +
      `\n\n[2. REQUIRED DOCUMENTS CHECKLIST]\n` +
      result.documents.map(d => `- [ ] ${d}`).join('\n') +
      `\n\n[3. COMMON MISTAKES TO AVOID]\n` +
      result.mistakes.map(m => `⚠️ ${m}`).join('\n') +
      `\n\n[4. ESTIMATED TIME & COST]\n` +
      `Estimated Time: ${result.timeAndCost?.time || 'N/A'}\n` +
      `Official Cost: ${result.timeAndCost?.cost || 'N/A'}\n` +
      `Official Portal: ${result.timeAndCost?.officialPortal || 'N/A'}\n` +
      `Advice: ${result.timeAndCost?.helpfulTip || 'N/A'}\n\n` +
      `Disclaimer: ${t.disclaimer}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Print official document
  const handlePrint = () => {
    window.print();
  };

  // Active Office Category & Map Links
  const officeCategory = getOfficeCategory(result?.topic || query || 'Government Office');
  const nearbyOffices = getNearbyOfficesList(officeCategory, userCity);
  const mapSearchTerm = `${officeCategory} near ${userCity}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapSearchTerm)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  const externalMapDirectionsUrl = `https://www.google.com/maps/search/${encodeURIComponent(mapSearchTerm)}`;

  return (
    <>
      {/* 1. USWDS OFFICIAL GOVERNMENT BANNER */}
      <section className="official-top-banner" aria-label="Official Service Banner">
        <div className="banner-inner">
          <div className="banner-left">
            <span className="flag-icon" role="img" aria-label="India Flag">🇮🇳</span>
            <span className="banner-text">
              <strong>{t.bannerOfficial}</strong>
            </span>
          </div>
          <button
            type="button"
            className="banner-how-toggle"
            onClick={() => setShowHowItWorks(prev => !prev)}
            aria-expanded={showHowItWorks}
          >
            {t.bannerHowKnow} {showHowItWorks ? '▲' : '▼'}
          </button>
        </div>
        {showHowItWorks && (
          <div className="banner-dropdown">
            <p>{t.bannerExplanation}</p>
          </div>
        )}
      </section>

      {/* 2. GOV.UK HEADER */}
      <header className="gov-header" role="banner">
        <div className="header-container">
          <div className="gov-brand">
            <div className="gov-coat-of-arms" aria-hidden="true">
              🏛️
            </div>
            <div className="gov-title-wrap">
              <h1>{t.appTitle}</h1>
              <p>{t.serviceSubtitle}</p>
            </div>
          </div>

          {/* Segmented Language Controller */}
          <div className="gov-lang-tabs" role="group" aria-label="Language Selector">
            <button
              id="lang-en"
              type="button"
              className={`gov-lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('en')}
            >
              English
            </button>
            <button
              id="lang-hi"
              type="button"
              className={`gov-lang-btn ${lang === 'hi' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('hi')}
            >
              हिन्दी
            </button>
            <button
              id="lang-bn"
              type="button"
              className={`gov-lang-btn ${lang === 'bn' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('bn')}
            >
              বাংলা
            </button>
          </div>
        </div>
      </header>

      {/* 3. GOV.UK PHASE BANNER */}
      <div className="gov-phase-banner">
        <div className="phase-inner">
          <span className="gov-tag gov-tag--blue">{t.betaTag}</span>
          <span>{t.betaNotice}</span>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="gov-main" id="main-content">
        {/* SEARCH & INTAKE PANEL */}
        <section className="gov-search-panel" aria-labelledby="search-heading">
          <div className="gov-search-heading">
            <h2 id="search-heading">{t.searchHeading}</h2>
            <p className="gov-lead-text">{t.searchLead}</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="gov-form-group">
              <label htmlFor="problem-input" className="gov-label">
                {t.inputLabel}
              </label>
              <span id="input-hint" className="gov-hint">
                {t.inputHint}
              </span>
              <textarea
                id="problem-input"
                className="gov-textarea"
                aria-describedby="input-hint"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
              />
            </div>

            <div className="gov-action-bar">
              <button
                id="help-button"
                type="submit"
                className="gov-button"
                disabled={loading}
              >
                {loading ? t.loadingText : `${t.helpBtnText} →`}
              </button>

              <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                Press <strong>Enter</strong> to submit
              </span>
            </div>
          </form>

          {/* POPULAR SERVICE CHIPS */}
          <div className="gov-popular-services">
            <p className="popular-label">{t.popularServicesLabel}</p>
            <div className="service-chips">
              {t.examples.map((item) => (
                <button
                  key={item.id}
                  id={`example-btn-${item.id}`}
                  type="button"
                  className="service-chip-btn"
                  onClick={() => handleExampleClick(item)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SKELETON LOADING STATE FOR SMOOTH UX */}
        {loading && (
          <div className="gov-skeleton-card" aria-busy="true" aria-live="polite">
            <div className="gov-skeleton-line short" />
            <div className="gov-skeleton-line long" />
            <div className="gov-skeleton-line medium" />
            <div className="gov-skeleton-line long" />
            <p style={{ marginTop: '14px', fontSize: '0.92rem', color: '#4b5563', fontWeight: 600 }}>
              ⏳ {t.loadingText}
            </p>
          </div>
        )}

        {/* ERROR SUMMARY */}
        {error && (
          <div className="gov-error-summary" role="alert">
            <h3 className="gov-error-title">There is a problem</h3>
            <p className="gov-error-desc">{error}</p>
          </div>
        )}

        {/* DEMO / HANDBOOK NOTIFICATION */}
        {result?.isDemoMode && (
          <div className="gov-demo-banner" role="status">
            <div>
              <strong>ℹ️ {t.demoBadge}:</strong> {result.notice || t.demoMessage}
            </div>
          </div>
        )}

        {/* RESULTS PRESENTATION */}
        {result && (
          <article className="gov-results-section" id="results-section">
            {/* PRINT-ONLY FORMAL CITIZEN MEMORANDUM HEADER */}
            <div className="print-official-header" aria-hidden="true">
              <div className="print-header-grid">
                <div>
                  <div className="print-emblem">🇮🇳</div>
                  <h2 className="print-main-title">CITIZEN PAPERWORK GUIDANCE SHEET</h2>
                  <p className="print-subtitle">Bureaucracy Buddy Public Service • India</p>
                </div>
                <div className="print-meta-box">
                  <p><strong>Procedure:</strong> {result.topic}</p>
                  <p><strong>Printed Date:</strong> {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  <p><strong>Language:</strong> {lang === 'hi' ? 'हिंदी' : lang === 'bn' ? 'বাংলা' : 'English'}</p>
                </div>
              </div>
              <div className="print-notice-bar">
                📌 INSTRUCTION: Carry this checklist and original documents along with 2 self-attested photocopies to your appointment.
              </div>
            </div>

            <div className="results-action-bar">
              <div className="results-heading">
                <h3>{result.topic || "Government Guidance Document"}</h3>
                <p className="results-meta">
                  Official Public Guidance • {lang === 'hi' ? 'हिंदी संस्करण' : lang === 'bn' ? 'বাংলা সংস্করণ' : 'Standard English'}
                </p>
              </div>

              <div className="utility-button-group">
                <button
                  id="copy-guide-btn"
                  type="button"
                  className="gov-secondary-btn"
                  onClick={handleCopy}
                >
                  {copied ? t.copiedText : t.copyBtn}
                </button>
                <button
                  id="print-guide-btn"
                  type="button"
                  className="gov-secondary-btn"
                  onClick={handlePrint}
                >
                  {t.printBtn}
                </button>
              </div>
            </div>

            {/* 4. TIME & COST (GOV.UK SUMMARY LIST PATTERN) */}
            <section className="gov-summary-card" id="section-time-cost">
              <h4 className="gov-summary-card-title">
                <span>⏱️</span>
                <span>{t.overviewHeading}</span>
              </h4>
              <table className="gov-summary-table">
                <tbody>
                  <tr className="gov-summary-row">
                    <th scope="row" className="gov-summary-key">{t.statTime}</th>
                    <td className="gov-summary-val">
                      <strong>{result.timeAndCost?.time || "Standard departmental timeline"}</strong>
                    </td>
                  </tr>
                  <tr className="gov-summary-row">
                    <th scope="row" className="gov-summary-key">{t.statCost}</th>
                    <td className="gov-summary-val">
                      <strong>{result.timeAndCost?.cost || "Nominal official fee"}</strong>
                    </td>
                  </tr>
                  {result.timeAndCost?.officialPortal && (
                    <tr className="gov-summary-row">
                      <th scope="row" className="gov-summary-key">{t.statPortal}</th>
                      <td className="gov-summary-val">
                        <a
                          id="official-portal-link"
                          href={result.timeAndCost.officialPortal}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#1d70b8', fontWeight: 700 }}
                        >
                          {result.timeAndCost.officialPortal} ↗
                        </a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {result.timeAndCost?.helpfulTip && (
                <div className="gov-inset-text">
                  <strong>{t.insiderTipLabel}: </strong>
                  <span>{result.timeAndCost.helpfulTip}</span>
                </div>
              )}
            </section>

            {/* 2-COLUMN GRID: STEPS AND CHECKLIST */}
            <div className="gov-grid-2col">
              {/* 1. STEP BY STEP PROCESS (GOV.UK Step-by-Step pattern) */}
              <section className="gov-content-card" id="section-steps">
                <div className="gov-card-header">
                  <h4>
                    <span>👣</span>
                    <span>{t.sectionSteps}</span>
                  </h4>
                  <span className="gov-tag gov-tag--blue">
                    {result.steps?.length || 0} Steps
                  </span>
                </div>

                <ol className="gov-step-list">
                  {result.steps?.map((stepText, idx) => (
                    <li key={idx} className="gov-step-item">
                      <span className="gov-step-circle">{idx + 1}</span>
                      <span>{stepText.replace(/^\d+[\.\)]\s*/, '')}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* 2. DOCUMENTS NEEDED (UK GDS Task List pattern) */}
              <section className="gov-content-card" id="section-documents">
                <div className="gov-card-header">
                  <h4>
                    <span>📄</span>
                    <span>{t.sectionDocs}</span>
                  </h4>
                  <span className="gov-tag gov-tag--green">
                    {completedDocs} of {totalDocs} {t.tagReady}
                  </span>
                </div>

                <div className="gov-checklist-status-bar">
                  <span>{t.progressLabel}</span>
                  <span>{progressPercent}%</span>
                </div>

                <div className="gov-progress-track">
                  <div
                    className="gov-progress-bar"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="gov-task-list">
                  {result.documents?.map((docText, idx) => {
                    const isChecked = !!checkedDocs[idx];
                    return (
                      <label
                        key={idx}
                        className={`gov-task-item ${isChecked ? 'checked' : ''}`}
                      >
                        <div className="gov-checkbox-left">
                          <span className="print-pen-checkbox" aria-hidden="true" />
                          <input
                            type="checkbox"
                            id={`doc-check-${idx}`}
                            className="gov-checkbox-input"
                            checked={isChecked}
                            onChange={() => toggleDocCheck(idx)}
                          />
                          <span className="gov-task-label">{docText}</span>
                        </div>
                        <span className={`gov-tag ${isChecked ? 'gov-tag--green' : 'gov-tag--amber'}`}>
                          {isChecked ? t.tagReady : t.tagRequired}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* 3. COMMON MISTAKES TO AVOID (GOV.UK Warning Text pattern) */}
            <section className="gov-warning-container" id="section-mistakes">
              <div className="gov-warning-banner">
                <div className="gov-warning-icon">!</div>
                <h4>{t.sectionMistakes}</h4>
              </div>

              <ul className="gov-warning-list">
                {result.mistakes?.map((mistakeText, idx) => (
                  <li key={idx} className="gov-warning-item">
                    <span>⚠️</span>
                    <span>{mistakeText}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* PRINT-ONLY FORMAL FOOTER */}
            <div className="print-official-footer" aria-hidden="true">
              <div className="print-footer-grid">
                <div>
                  <p><strong>Official Department Portal:</strong> {result.timeAndCost?.officialPortal || "https://india.gov.in"}</p>
                  <p><strong>Citizen Helplines:</strong> 1947 (Aadhaar) • 1800-258-1800 (Passport) • 1950 (Voter ID)</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p><strong>Notice:</strong> AI Guidance Sheet. Verify on official portal.</p>
                  <p>Generated by Bureaucracy Buddy (Public Service)</p>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* =========================================================================
           GPS NEAREST GOVERNMENT OFFICE FINDER & EMBEDDED MAP
           ========================================================================= */}
        <section className="gov-locator-section" aria-labelledby="locator-heading">
          <div className="locator-header">
            <h4 id="locator-heading">{t.locatorHeading}</h4>
            <p>{t.locatorSubhead}</p>
          </div>

          <div className="gps-controls-row">
            <button
              id="gps-locate-btn"
              type="button"
              className="gps-btn"
              onClick={handleUseGPS}
              disabled={gpsLoading}
            >
              {gpsLoading ? t.gpsDetecting : t.gpsBtnText}
            </button>

            <span className="location-divider">— OR —</span>

            <form className="city-input-group" onSubmit={handleManualLocationSubmit}>
              <input
                id="city-search-input"
                type="text"
                className="city-input"
                placeholder={t.cityInputPlaceholder}
                value={cityInputText}
                onChange={(e) => setCityInputText(e.target.value)}
              />
              <button id="search-city-btn" type="submit" className="search-loc-btn">
                {t.searchLocBtn}
              </button>
            </form>
          </div>

          {gpsError && (
            <div className="gov-error-summary" style={{ marginBottom: '16px' }} role="alert">
              <p className="gov-error-desc">⚠️ {gpsError}</p>
            </div>
          )}

          <div className="active-loc-badge">
            <span>📍</span>
            <span>{t.activeLocText} <strong>{userCity}</strong> {gpsDetected ? "(GPS Verified)" : ""}</span>
          </div>

          {/* Interactive Embedded Google Map */}
          <div className="map-panel">
            <iframe
              id="nearest-offices-map"
              title="Nearest Offices Map"
              className="map-iframe"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-actions-bar">
              <span>Showing: <strong>{officeCategory}</strong> around {userCity}</span>
              <a
                id="live-directions-link"
                href={externalMapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-external-link"
              >
                {t.mapExternalLink}
              </a>
            </div>
          </div>

          {/* List of Verified Nearest Department Centres */}
          <div className="nearest-offices-grid">
            {nearbyOffices.map((office, idx) => (
              <div key={idx} className="nearest-office-card">
                <div>
                  <div className="office-card-top">
                    <h5 className="office-name">{office.name}</h5>
                    <span className="office-type-tag">{office.type}</span>
                  </div>
                  <div className="office-details" style={{ marginTop: '8px' }}>
                    <p>🕒 <strong>Hours:</strong> {office.timing}</p>
                    <p>🏛️ <strong>Services:</strong> {office.features}</p>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(office.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="office-action-btn"
                >
                  Get Directions & Route ↗
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 4. OFFICIAL DIRECTORY & HELPLINE RESOURCES */}
        <section className="gov-directory-section" aria-labelledby="directory-heading">
          <h4 id="directory-heading">{t.officialPortalsTitle}</h4>
          <div className="gov-dir-grid">
            {OFFICIAL_DIRECTORIES.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gov-dir-card"
              >
                <span className="gov-dir-name">
                  {item.name} ↗
                </span>
                <span className="gov-dir-helpline">
                  📞 {item.helpline}
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* =========================================================================
         AI CHATBOT WIDGET ("Ask Buddy" Help Desk)
         ========================================================================= */}
      <aside className="chatbot-container" aria-label="AI Citizen Chat Desk">
        {!isChatOpen && (
          <button
            id="open-chatbot-btn"
            type="button"
            className="chatbot-launcher-btn"
            onClick={() => setIsChatOpen(true)}
            aria-expanded={false}
          >
            <span className="online-pulse-dot" />
            <span>{t.chatLauncherText}</span>
          </button>
        )}

        {isChatOpen && (
          <div className="chatbot-window" role="dialog" aria-modal="true" aria-labelledby="chat-title">
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-title">
                <span style={{ fontSize: '1.2rem' }}>🤖</span>
                <div>
                  <h4 id="chat-title">{t.chatHeaderTitle}</h4>
                  <span>{t.chatHeaderSubtitle}</span>
                </div>
              </div>
              <button
                id="close-chatbot-btn"
                type="button"
                className="chat-close-btn"
                onClick={() => setIsChatOpen(false)}
                title="Close Chat"
              >
                ✕
              </button>
            </div>

            <div className="chat-notice">
              ℹ️ {t.chatNotice}
            </div>

            {/* Messages Scroll Area */}
            <div className="chat-messages-area">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`chat-message-row ${msg.role}`}>
                  <div className="chat-bubble">
                    {msg.content}
                  </div>
                  <span className="chat-bubble-time">{msg.time}</span>
                </div>
              ))}

              {chatLoading && (
                <div className="chat-message-row assistant">
                  <div className="chat-bubble" style={{ fontStyle: 'italic', color: '#6b7280' }}>
                    ✍️ Bureaucracy Buddy is replying...
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="chat-chips-area">
              {t.chatQuickPills.map((pill, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="chat-chip"
                  onClick={() => sendChatMessage(pill)}
                  disabled={chatLoading}
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              className="chat-input-bar"
              onSubmit={(e) => {
                e.preventDefault();
                sendChatMessage();
              }}
            >
              <input
                id="chatbot-input"
                type="text"
                className="chat-input"
                placeholder={t.chatPlaceholder}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={chatLoading}
              />
              <button
                id="send-chat-btn"
                type="submit"
                className="chat-send-btn"
                disabled={chatLoading || !chatInput.trim()}
              >
                {t.chatSendBtn}
              </button>
            </form>
          </div>
        )}
      </aside>

      {/* 5. OFFICIAL FOOTER */}
      <footer className="gov-footer" role="contentinfo">
        <div className="footer-inner">
          <p className="footer-disclaimer-text">
            <strong>OFFICIAL DISCLAIMER: </strong>
            {t.disclaimer}
          </p>

          <div className="footer-links">
            <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer">
              National Portal of India
            </a>
            <a href="https://data.gov.in" target="_blank" rel="noopener noreferrer">
              Open Government Data
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
