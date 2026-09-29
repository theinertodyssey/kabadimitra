// ─── MOCK DATA LAYER ─────────────────────────────────────────────────────────
// Covers all 6 PS-required datasets:
// Material, Price, Recycler, Transaction, Traceability, Collector

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type Language = "en" | "hi" | "mr";

export type MaterialCategory =
  | "pcb"
  | "crt"
  | "lcd"
  | "battery"
  | "cable"
  | "motor"
  | "plastic"
  | "mixed";

export interface Material {
  id: string;
  category: MaterialCategory;
  subCategory: string;
  description: string;
  imageEmoji: string;
  condition: "good" | "fair" | "poor";
  sourceType: "household" | "commercial" | "industrial";
  estimatedValuePerKg: number; // ₹ per kg
  unit: "kg";
}

export interface PriceRecord {
  id: string;
  materialCategory: MaterialCategory;
  location: string;
  date: string;
  buyingPrice: number;
  sellingPrice: number;
  unit: "kg";
  recyclerName: string;
  marketRangeLow: number;
  marketRangeHigh: number;
  trend: "up" | "down" | "stable";
  trendPercent: number;
}

export interface Recycler {
  id: string;
  name: string;
  facilityLocation: string;
  city: string;
  materialsAccepted: MaterialCategory[];
  authorizationNumber: string;
  authorizationStatus: "active" | "expired" | "pending";
  authorizingBody: string;
  contact: string;
  offeredRates: Partial<Record<MaterialCategory, number>>;
  pickupAvailable: boolean;
  serviceAreaKm: number;
  distanceKm: number;
  rating: number;
  verified: boolean;
}

export interface Transaction {
  id: string;
  lotId: string;
  collectorId: string;
  materialCategory: MaterialCategory;
  materialDescription: string;
  quantityKg: number;
  quotedPrice: number;
  finalPrice: number | null;
  recyclerId: string;
  recyclerName: string;
  collectionLocation: string;
  handoverLocation: string | null;
  dateTime: string;
  paymentStatus: "pending" | "paid" | "partial";
  transactionStatus: "created" | "matched" | "confirmed" | "completed";
}

export interface TraceabilityRecord {
  lotId: string;
  photoRef: string;
  weightKg: number;
  timestamp: string;
  gpsLat: number;
  gpsLng: number;
  gpsAddress: string;
  handoverRef: string;
  recyclerConfirmed: boolean;
  recyclerConfirmTime: string | null;
  qrData: string;
}

export interface Lot {
  id: string;
  category: MaterialCategory;
  description: string;
  imageEmoji: string;
  weightKg: number;
  estimatedValue: number;
  status: "draft" | "priced" | "matched" | "handed_over";
  createdAt: string;
}

export interface SafetyGuidance {
  id: string;
  title: { en: string; hi: string; mr: string };
  hazardLevel: "high" | "medium" | "low";
  icon: string;
  do: { en: string; hi: string; mr: string }[];
  dont: { en: string; hi: string; mr: string }[];
  relatedMaterials: MaterialCategory[];
}

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────

export const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: "KabadiMitra",
    tagline: "Your Digital Scrap Partner",
    home: "Home",
    createLot: "Create Lot",
    priceBoard: "Price Board",
    findRecycler: "Find Recycler",
    handover: "Handover",
    earnings: "Earnings",
    safety: "Safety",
    recyclerPortal: "Recycler Portal",
    welcomeBack: "Welcome back,",
    todayEarnings: "Today's Earnings",
    totalTransactions: "Total Transactions",
    pendingPayments: "Pending Payments",
    currentRates: "Current Buying Rates",
    tapToSpeak: "Tap to hear price",
    offlineBanner: "Offline Mode — Showing cached data",
    onlineBanner: "Online — Live prices",
    photoMaterial: "Photo your material",
    selectCategory: "Select Category",
    enterWeight: "Enter Weight (kg)",
    getEstimate: "Get Estimate",
    aiEstimate: "AI Estimated Value",
    matchRecycler: "Match with Recycler",
    nearbyRecyclers: "Nearby Recyclers",
    distance: "Distance",
    offeredRate: "Offered Rate",
    pickupAvailable: "Pickup Available",
    authorized: "CPCB Authorized",
    generateHandover: "Generate Handover Record",
    handoverRecord: "Handover Record",
    scanQR: "Scan to verify",
    myEarnings: "My Earnings",
    totalEarned: "Total Earned",
    thisMonth: "This Month",
    safetyGuide: "Safety Guide",
    doThis: "Do This ✓",
    avoidThis: "Avoid This ✗",
    pcb: "Circuit Board",
    crt: "CRT Monitor",
    lcd: "LCD / Screen",
    battery: "Battery",
    cable: "Wire / Cable",
    motor: "Motor / Magnet",
    plastic: "Plastic",
    mixed: "Mixed Scrap",
    confirmHandover: "Confirm Handover",
    lotId: "Lot ID",
    weight: "Weight",
    location: "Location",
    timestamp: "Date & Time",
    recyclerName: "Recycler",
    status: "Status",
    paid: "Paid",
    pending: "Pending",
    completed: "Completed",
    confirmed: "Confirmed",
    createNewLot: "Create New Lot",
    viewPrices: "View Prices",
    trendUp: "↑ Rising",
    trendDown: "↓ Falling",
    trendStable: "→ Stable",
    perKg: "per kg",
    marketRange: "Market Range",
    collectorsName: "Ramesh Kale",
    city: "Pune",
    verifiedRecycler: "Verified Recycler",
  },
  hi: {
    appName: "काबाड़ीमित्र",
    tagline: "आपका डिजिटल कबाड़ साथी",
    home: "होम",
    createLot: "लॉट बनाएं",
    priceBoard: "भाव बोर्ड",
    findRecycler: "रीसायकलर खोजें",
    handover: "हैंडओवर",
    earnings: "कमाई",
    safety: "सुरक्षा",
    recyclerPortal: "रीसायकलर पोर्टल",
    welcomeBack: "वापस आए,",
    todayEarnings: "आज की कमाई",
    totalTransactions: "कुल लेनदेन",
    pendingPayments: "बकाया भुगतान",
    currentRates: "वर्तमान खरीद दर",
    tapToSpeak: "भाव सुनने के लिए दबाएं",
    offlineBanner: "ऑफलाइन — कैश डेटा दिखाया जा रहा है",
    onlineBanner: "ऑनलाइन — लाइव भाव",
    photoMaterial: "कबाड़ की फोटो लें",
    selectCategory: "श्रेणी चुनें",
    enterWeight: "वजन दर्ज करें (किग्रा)",
    getEstimate: "अनुमान लगाएं",
    aiEstimate: "AI अनुमानित मूल्य",
    matchRecycler: "रीसायकलर से मिलाएं",
    nearbyRecyclers: "नजदीकी रीसायकलर",
    distance: "दूरी",
    offeredRate: "ऑफर दर",
    pickupAvailable: "पिकअप उपलब्ध",
    authorized: "CPCB अधिकृत",
    generateHandover: "हैंडओवर रिकॉर्ड बनाएं",
    handoverRecord: "हैंडओवर रिकॉर्ड",
    scanQR: "सत्यापन के लिए स्कैन करें",
    myEarnings: "मेरी कमाई",
    totalEarned: "कुल कमाई",
    thisMonth: "इस महीने",
    safetyGuide: "सुरक्षा गाइड",
    doThis: "यह करें ✓",
    avoidThis: "यह न करें ✗",
    pcb: "सर्किट बोर्ड",
    crt: "CRT मॉनिटर",
    lcd: "LCD / स्क्रीन",
    battery: "बैटरी",
    cable: "तार / केबल",
    motor: "मोटर / चुंबक",
    plastic: "प्लास्टिक",
    mixed: "मिश्रित कबाड़",
    confirmHandover: "हैंडओवर की पुष्टि करें",
    lotId: "लॉट आईडी",
    weight: "वजन",
    location: "स्थान",
    timestamp: "दिनांक और समय",
    recyclerName: "रीसायकलर",
    status: "स्थिति",
    paid: "भुगतान हुआ",
    pending: "लंबित",
    completed: "पूर्ण",
    confirmed: "पुष्टि हुई",
    createNewLot: "नया लॉट बनाएं",
    viewPrices: "भाव देखें",
    trendUp: "↑ बढ़ रहा है",
    trendDown: "↓ घट रहा है",
    trendStable: "→ स्थिर",
    perKg: "प्रति किग्रा",
    marketRange: "बाजार सीमा",
    collectorsName: "रमेश काले",
    city: "पुणे",
    verifiedRecycler: "सत्यापित रीसायकलर",
  },
  mr: {
    appName: "काबाडीमित्र",
    tagline: "तुमचा डिजिटल भंगार साथी",
    home: "होम",
    createLot: "लॉट तयार करा",
    priceBoard: "भाव बोर्ड",
    findRecycler: "रिसायकलर शोधा",
    handover: "हस्तांतरण",
    earnings: "कमाई",
    safety: "सुरक्षा",
    recyclerPortal: "रिसायकलर पोर्टल",
    welcomeBack: "परत आलात,",
    todayEarnings: "आजची कमाई",
    totalTransactions: "एकूण व्यवहार",
    pendingPayments: "थकबाकी",
    currentRates: "सध्याचे खरेदी दर",
    tapToSpeak: "भाव ऐकण्यासाठी दाबा",
    offlineBanner: "ऑफलाइन — कॅश डेटा दाखवत आहे",
    onlineBanner: "ऑनलाइन — थेट भाव",
    photoMaterial: "भंगाराचा फोटो काढा",
    selectCategory: "श्रेणी निवडा",
    enterWeight: "वजन प्रविष्ट करा (किग्रा)",
    getEstimate: "अंदाज घ्या",
    aiEstimate: "AI अंदाजित मूल्य",
    matchRecycler: "रिसायकलरशी जुळवा",
    nearbyRecyclers: "जवळचे रिसायकलर",
    distance: "अंतर",
    offeredRate: "ऑफर दर",
    pickupAvailable: "पिकअप उपलब्ध",
    authorized: "CPCB अधिकृत",
    generateHandover: "हस्तांतरण नोंद तयार करा",
    handoverRecord: "हस्तांतरण नोंद",
    scanQR: "सत्यापनासाठी स्कॅन करा",
    myEarnings: "माझी कमाई",
    totalEarned: "एकूण कमाई",
    thisMonth: "या महिन्यात",
    safetyGuide: "सुरक्षा मार्गदर्शक",
    doThis: "हे करा ✓",
    avoidThis: "हे करू नका ✗",
    pcb: "सर्किट बोर्ड",
    crt: "CRT मॉनिटर",
    lcd: "LCD / स्क्रीन",
    battery: "बॅटरी",
    cable: "तार / केबल",
    motor: "मोटर / चुंबक",
    plastic: "प्लास्टिक",
    mixed: "मिश्र भंगार",
    confirmHandover: "हस्तांतरण निश्चित करा",
    lotId: "लॉट आयडी",
    weight: "वजन",
    location: "ठिकाण",
    timestamp: "दिनांक व वेळ",
    recyclerName: "रिसायकलर",
    status: "स्थिती",
    paid: "भरणा झाला",
    pending: "प्रलंबित",
    completed: "पूर्ण",
    confirmed: "निश्चित",
    createNewLot: "नवीन लॉट तयार करा",
    viewPrices: "भाव पहा",
    trendUp: "↑ वाढत आहे",
    trendDown: "↓ घसरत आहे",
    trendStable: "→ स्थिर",
    perKg: "प्रति किग्रा",
    marketRange: "बाजार श्रेणी",
    collectorsName: "रमेश काळे",
    city: "पुणे",
    verifiedRecycler: "सत्यापित रिसायकलर",
  },
};

// ─── MATERIAL DATASET ─────────────────────────────────────────────────────────

export const materials: Material[] = [
  {
    id: "m1",
    category: "pcb",
    subCategory: "Motherboard",
    description: "Computer motherboards and circuit boards",
    imageEmoji: "🖥️",
    condition: "fair",
    sourceType: "commercial",
    estimatedValuePerKg: 30,
    unit: "kg",
  },
  {
    id: "m2",
    category: "crt",
    subCategory: "CRT TV",
    description: "Old CRT televisions",
    imageEmoji: "📺",
    condition: "poor",
    sourceType: "household",
    estimatedValuePerKg: 8,
    unit: "kg",
  },
  {
    id: "m3",
    category: "lcd",
    subCategory: "LCD Monitor",
    description: "LCD/LED monitors and panels",
    imageEmoji: "🖥️",
    condition: "fair",
    sourceType: "commercial",
    estimatedValuePerKg: 15,
    unit: "kg",
  },
  {
    id: "m4",
    category: "battery",
    subCategory: "Lithium Battery",
    description: "Laptop and phone batteries",
    imageEmoji: "🔋",
    condition: "poor",
    sourceType: "household",
    estimatedValuePerKg: 45,
    unit: "kg",
  },
  {
    id: "m5",
    category: "cable",
    subCategory: "Copper Cable",
    description: "Copper wiring and cables",
    imageEmoji: "🔌",
    condition: "good",
    sourceType: "commercial",
    estimatedValuePerKg: 380,
    unit: "kg",
  },
  {
    id: "m6",
    category: "motor",
    subCategory: "Electric Motor",
    description: "Motors with neodymium magnets",
    imageEmoji: "⚙️",
    condition: "fair",
    sourceType: "industrial",
    estimatedValuePerKg: 25,
    unit: "kg",
  },
  {
    id: "m7",
    category: "plastic",
    subCategory: "ABS Plastic",
    description: "Hard plastic casings",
    imageEmoji: "🧱",
    condition: "fair",
    sourceType: "household",
    estimatedValuePerKg: 5,
    unit: "kg",
  },
  {
    id: "m8",
    category: "mixed",
    subCategory: "Mixed E-Waste",
    description: "Mixed electronic components",
    imageEmoji: "♻️",
    condition: "poor",
    sourceType: "household",
    estimatedValuePerKg: 12,
    unit: "kg",
  },
];

export const categoryMeta: Record<
  MaterialCategory,
  { emoji: string; color: string; bgColor: string }
> = {
  pcb: { emoji: "🖥️", color: "text-blue-700", bgColor: "bg-blue-50" },
  crt: { emoji: "📺", color: "text-purple-700", bgColor: "bg-purple-50" },
  lcd: { emoji: "💻", color: "text-indigo-700", bgColor: "bg-indigo-50" },
  battery: { emoji: "🔋", color: "text-red-700", bgColor: "bg-red-50" },
  cable: { emoji: "🔌", color: "text-yellow-700", bgColor: "bg-yellow-50" },
  motor: { emoji: "⚙️", color: "text-gray-700", bgColor: "bg-gray-50" },
  plastic: { emoji: "🧱", color: "text-teal-700", bgColor: "bg-teal-50" },
  mixed: { emoji: "♻️", color: "text-green-700", bgColor: "bg-green-50" },
};

// ─── PRICE DATASET ────────────────────────────────────────────────────────────

export const priceRecords: PriceRecord[] = [
  {
    id: "p1",
    materialCategory: "pcb",
    location: "Pune",
    date: "2026-09-28",
    buyingPrice: 28,
    sellingPrice: 32,
    unit: "kg",
    recyclerName: "GreenTech Recyclers",
    marketRangeLow: 25,
    marketRangeHigh: 35,
    trend: "up",
    trendPercent: 8,
  },
  {
    id: "p2",
    materialCategory: "crt",
    location: "Pune",
    date: "2026-09-28",
    buyingPrice: 7,
    sellingPrice: 9,
    unit: "kg",
    recyclerName: "EcoWaste Solutions",
    marketRangeLow: 5,
    marketRangeHigh: 10,
    trend: "down",
    trendPercent: 5,
  },
  {
    id: "p3",
    materialCategory: "lcd",
    location: "Pune",
    date: "2026-09-28",
    buyingPrice: 14,
    sellingPrice: 17,
    unit: "kg",
    recyclerName: "GreenTech Recyclers",
    marketRangeLow: 12,
    marketRangeHigh: 20,
    trend: "stable",
    trendPercent: 0,
  },
  {
    id: "p4",
    materialCategory: "battery",
    location: "Pune",
    date: "2026-09-28",
    buyingPrice: 42,
    sellingPrice: 50,
    unit: "kg",
    recyclerName: "SafeCell Recycling",
    marketRangeLow: 38,
    marketRangeHigh: 55,
    trend: "up",
    trendPercent: 12,
  },
  {
    id: "p5",
    materialCategory: "cable",
    location: "Pune",
    date: "2026-09-28",
    buyingPrice: 370,
    sellingPrice: 400,
    unit: "kg",
    recyclerName: "CopperMax Recyclers",
    marketRangeLow: 350,
    marketRangeHigh: 420,
    trend: "up",
    trendPercent: 3,
  },
  {
    id: "p6",
    materialCategory: "motor",
    location: "Pune",
    date: "2026-09-28",
    buyingPrice: 22,
    sellingPrice: 28,
    unit: "kg",
    recyclerName: "MetalCycle India",
    marketRangeLow: 18,
    marketRangeHigh: 30,
    trend: "stable",
    trendPercent: 1,
  },
  {
    id: "p7",
    materialCategory: "plastic",
    location: "Pune",
    date: "2026-09-28",
    buyingPrice: 4,
    sellingPrice: 6,
    unit: "kg",
    recyclerName: "PlastiRecycle Co",
    marketRangeLow: 3,
    marketRangeHigh: 8,
    trend: "down",
    trendPercent: 10,
  },
  {
    id: "p8",
    materialCategory: "mixed",
    location: "Pune",
    date: "2026-09-28",
    buyingPrice: 11,
    sellingPrice: 14,
    unit: "kg",
    recyclerName: "EcoWaste Solutions",
    marketRangeLow: 8,
    marketRangeHigh: 16,
    trend: "stable",
    trendPercent: 2,
  },
];

// Historical price trend data (last 6 months)
export const historicalPrices: Record<MaterialCategory, number[]> = {
  pcb: [22, 24, 25, 26, 26, 28],
  crt: [9, 8, 8, 7, 7, 7],
  lcd: [13, 14, 14, 14, 15, 14],
  battery: [35, 37, 38, 40, 41, 42],
  cable: [340, 345, 355, 360, 365, 370],
  motor: [21, 22, 22, 23, 22, 22],
  plastic: [6, 5, 5, 5, 4, 4],
  mixed: [10, 11, 11, 11, 12, 11],
};

// ─── RECYCLER DATASET ─────────────────────────────────────────────────────────

export const recyclers: Recycler[] = [
  {
    id: "r1",
    name: "GreenTech Recyclers Pvt Ltd",
    facilityLocation: "Bhosari MIDC, Pune",
    city: "Pune",
    materialsAccepted: ["pcb", "lcd", "motor", "mixed", "cable"],
    authorizationNumber: "CPCB/MH/EW/2024/1123",
    authorizationStatus: "active",
    authorizingBody: "CPCB",
    contact: "+91 98765 43210",
    offeredRates: { pcb: 28, lcd: 14, motor: 22, mixed: 11, cable: 370 },
    pickupAvailable: true,
    serviceAreaKm: 30,
    distanceKm: 4.2,
    rating: 4.7,
    verified: true,
  },
  {
    id: "r2",
    name: "EcoWaste Solutions",
    facilityLocation: "Hadapsar Industrial Area, Pune",
    city: "Pune",
    materialsAccepted: ["crt", "mixed", "plastic", "lcd"],
    authorizationNumber: "CPCB/MH/EW/2023/0876",
    authorizationStatus: "active",
    authorizingBody: "CPCB",
    contact: "+91 87654 32109",
    offeredRates: { crt: 7, mixed: 11, plastic: 4, lcd: 13 },
    pickupAvailable: true,
    serviceAreaKm: 20,
    distanceKm: 6.8,
    rating: 4.3,
    verified: true,
  },
  {
    id: "r3",
    name: "SafeCell Recycling",
    facilityLocation: "Pimpri Industrial Zone, Pune",
    city: "Pune",
    materialsAccepted: ["battery"],
    authorizationNumber: "CPCB/MH/EW/2024/2201",
    authorizationStatus: "active",
    authorizingBody: "CPCB",
    contact: "+91 76543 21098",
    offeredRates: { battery: 42 },
    pickupAvailable: false,
    serviceAreaKm: 15,
    distanceKm: 9.1,
    rating: 4.9,
    verified: true,
  },
  {
    id: "r4",
    name: "CopperMax Recyclers",
    facilityLocation: "Chinchwad, Pune",
    city: "Pune",
    materialsAccepted: ["cable", "motor"],
    authorizationNumber: "CPCB/MH/EW/2022/0441",
    authorizationStatus: "active",
    authorizingBody: "CPCB",
    contact: "+91 65432 10987",
    offeredRates: { cable: 370, motor: 24 },
    pickupAvailable: true,
    serviceAreaKm: 25,
    distanceKm: 11.5,
    rating: 4.5,
    verified: true,
  },
  {
    id: "r5",
    name: "MetalCycle India",
    facilityLocation: "Nagar Road, Pune",
    city: "Pune",
    materialsAccepted: ["motor", "mixed", "cable", "pcb"],
    authorizationNumber: "CPCB/MH/EW/2021/0312",
    authorizationStatus: "active",
    authorizingBody: "CPCB",
    contact: "+91 54321 09876",
    offeredRates: { motor: 22, mixed: 10, cable: 365, pcb: 26 },
    pickupAvailable: false,
    serviceAreaKm: 40,
    distanceKm: 14.3,
    rating: 4.1,
    verified: true,
  },
];

// ─── TRANSACTION DATASET ─────────────────────────────────────────────────────

export const transactions: Transaction[] = [
  {
    id: "t1",
    lotId: "LOT-2409-001",
    collectorId: "c1",
    materialCategory: "cable",
    materialDescription: "Copper cables from demolished building",
    quantityKg: 8.5,
    quotedPrice: 370,
    finalPrice: 370,
    recyclerId: "r1",
    recyclerName: "GreenTech Recyclers Pvt Ltd",
    collectionLocation: "Kothrud, Pune",
    handoverLocation: "Bhosari MIDC, Pune",
    dateTime: "2026-09-25T14:30:00",
    paymentStatus: "paid",
    transactionStatus: "completed",
  },
  {
    id: "t2",
    lotId: "LOT-2409-002",
    collectorId: "c1",
    materialCategory: "pcb",
    materialDescription: "Old computer motherboards",
    quantityKg: 5.2,
    quotedPrice: 28,
    finalPrice: 28,
    recyclerId: "r1",
    recyclerName: "GreenTech Recyclers Pvt Ltd",
    collectionLocation: "Deccan, Pune",
    handoverLocation: "Bhosari MIDC, Pune",
    dateTime: "2026-09-20T10:15:00",
    paymentStatus: "paid",
    transactionStatus: "completed",
  },
  {
    id: "t3",
    lotId: "LOT-2409-003",
    collectorId: "c1",
    materialCategory: "battery",
    materialDescription: "Laptop batteries — 23 units",
    quantityKg: 3.1,
    quotedPrice: 42,
    finalPrice: null,
    recyclerId: "r3",
    recyclerName: "SafeCell Recycling",
    collectionLocation: "Shivajinagar, Pune",
    handoverLocation: null,
    dateTime: "2026-09-28T09:00:00",
    paymentStatus: "pending",
    transactionStatus: "matched",
  },
  {
    id: "t4",
    lotId: "LOT-2409-004",
    collectorId: "c1",
    materialCategory: "crt",
    materialDescription: "CRT televisions — 4 units",
    quantityKg: 28,
    quotedPrice: 7,
    finalPrice: null,
    recyclerId: "r2",
    recyclerName: "EcoWaste Solutions",
    collectionLocation: "Aundh, Pune",
    handoverLocation: null,
    dateTime: "2026-09-27T16:45:00",
    paymentStatus: "pending",
    transactionStatus: "confirmed",
  },
];

// ─── TRACEABILITY DATASET ─────────────────────────────────────────────────────

export const traceabilityRecords: TraceabilityRecord[] = [
  {
    lotId: "LOT-2409-001",
    photoRef: "cable_lot_001.jpg",
    weightKg: 8.5,
    timestamp: "2026-09-25T14:30:00",
    gpsLat: 18.4922,
    gpsLng: 73.8556,
    gpsAddress: "Kothrud, Pune, Maharashtra",
    handoverRef: "HO-GT-250926-001",
    recyclerConfirmed: true,
    recyclerConfirmTime: "2026-09-25T15:45:00",
    qrData:
      "KABADIMITRA|LOT-2409-001|HO-GT-250926-001|GreenTech Recyclers|8.5kg|cable|2026-09-25T14:30:00|18.4922,73.8556",
  },
  {
    lotId: "LOT-2409-003",
    photoRef: "battery_lot_003.jpg",
    weightKg: 3.1,
    timestamp: "2026-09-28T09:00:00",
    gpsLat: 18.5309,
    gpsLng: 73.8474,
    gpsAddress: "Shivajinagar, Pune, Maharashtra",
    handoverRef: "HO-SC-280926-003",
    recyclerConfirmed: false,
    recyclerConfirmTime: null,
    qrData:
      "KABADIMITRA|LOT-2409-003|HO-SC-280926-003|SafeCell Recycling|3.1kg|battery|2026-09-28T09:00:00|18.5309,73.8474",
  },
];

// ─── COLLECTOR DATASET ────────────────────────────────────────────────────────

export const collector = {
  id: "c1",
  preferredLanguage: "mr" as Language,
  operatingArea: "Pune West (Kothrud, Deccan, Aundh)",
  city: "Pune",
  joinedDate: "2026-06-01",
  totalEarned: 8240,
  thisMonthEarned: 3145,
  todayEarned: 0,
  totalTransactions: 18,
  pendingAmount: 322,
};

// ─── SAFETY GUIDANCE DATASET ─────────────────────────────────────────────────

export const safetyGuidance: SafetyGuidance[] = [
  {
    id: "s1",
    title: {
      en: "Cable Burning",
      hi: "केबल जलाना",
      mr: "केबल जाळणे",
    },
    hazardLevel: "high",
    icon: "🔥",
    relatedMaterials: ["cable"],
    do: [
      {
        en: "Sell cables directly to authorized recyclers for copper extraction",
        hi: "कॉपर निष्कर्षण के लिए केबल सीधे अधिकृत रीसायकलर को बेचें",
        mr: "तांब्यासाठी थेट अधिकृत रिसायकलरला केबल विका",
      },
      {
        en: "Store cables in dry, ventilated area before handover",
        hi: "हैंडओवर से पहले केबल सूखे, हवादार स्थान पर रखें",
        mr: "हस्तांतरणापूर्वी केबल कोरड्या, हवेशीर जागी ठेवा",
      },
    ],
    dont: [
      {
        en: "Never burn cables to extract copper — toxic fumes cause lung damage",
        hi: "कॉपर निकालने के लिए केबल कभी मत जलाएं — जहरीले धुएं से फेफड़े खराब होते हैं",
        mr: "तांब्यासाठी केबल कधीही जाळू नका — विषारी धुरामुळे फुफ्फुसाचे नुकसान होते",
      },
      {
        en: "Do not burn near homes, water sources, or food preparation areas",
        hi: "घरों, पानी के स्रोतों या खाना पकाने वाली जगहों के पास मत जलाएं",
        mr: "घरे, पाण्याचे स्रोत किंवा स्वयंपाकघराजवळ जाळू नका",
      },
    ],
  },
  {
    id: "s2",
    title: {
      en: "Battery Handling",
      hi: "बैटरी संभालना",
      mr: "बॅटरी हाताळणी",
    },
    hazardLevel: "high",
    icon: "🔋",
    relatedMaterials: ["battery"],
    do: [
      {
        en: "Keep batteries in cool, dry place — away from direct sunlight",
        hi: "बैटरी ठंडी, सूखी जगह पर रखें — सीधी धूप से दूर",
        mr: "बॅटरी थंड, कोरड्या ठिकाणी ठेवा — थेट सूर्यप्रकाशापासून दूर",
      },
      {
        en: "Use gloves when handling swollen or leaking batteries",
        hi: "फूली हुई या लीक हो रही बैटरी छूते समय दस्ताने पहनें",
        mr: "फुगलेल्या किंवा गळणाऱ्या बॅटऱ्या हाताळताना हातमोजे वापरा",
      },
    ],
    dont: [
      {
        en: "Never puncture, crush, or dismantle batteries — explosion risk",
        hi: "बैटरी कभी न छेदें, कुचलें या खोलें — विस्फोट का खतरा",
        mr: "बॅटऱ्या कधीही छेदू नका, चिरडू नका किंवा उघडू नका — स्फोटाचा धोका",
      },
      {
        en: "Do not throw batteries in regular waste or fire",
        hi: "बैटरी सामान्य कचरे या आग में न डालें",
        mr: "बॅटऱ्या सामान्य कचऱ्यात किंवा आगीत टाकू नका",
      },
    ],
  },
  {
    id: "s3",
    title: {
      en: "CRT Screen Handling",
      hi: "CRT स्क्रीन संभालना",
      mr: "CRT स्क्रीन हाताळणी",
    },
    hazardLevel: "high",
    icon: "📺",
    relatedMaterials: ["crt"],
    do: [
      {
        en: "Carry CRTs upright — the neck/funnel is fragile",
        hi: "CRT को सीधे ले जाएं — गर्दन/फनल नाजुक होती है",
        mr: "CRT सरळ वाहून न्या — मान/फनेल नाजूक असते",
      },
      {
        en: "Wear safety glasses and gloves when moving CRTs",
        hi: "CRT हिलाते समय सुरक्षा चश्मा और दस्ताने पहनें",
        mr: "CRT हलवताना सुरक्षा चष्मा आणि हातमोजे घाला",
      },
    ],
    dont: [
      {
        en: "Never break CRT glass — contains lead that enters soil and water",
        hi: "CRT का कांच कभी न तोड़ें — इसमें सीसा होता है जो मिट्टी और पानी में मिलता है",
        mr: "CRT काच कधीही तोडू नका — यात शिसे आहे जे माती आणि पाण्यात मिसळते",
      },
      {
        en: "Do not manually disassemble CRTs — leave it to authorized recyclers",
        hi: "CRT को खुद से मत खोलें — अधिकृत रीसायकलर पर छोड़ें",
        mr: "CRT स्वतः उघडू नका — अधिकृत रिसायकलरवर सोडा",
      },
    ],
  },
  {
    id: "s4",
    title: {
      en: "Circuit Board (PCB) Handling",
      hi: "सर्किट बोर्ड संभालना",
      mr: "सर्किट बोर्ड हाताळणी",
    },
    hazardLevel: "medium",
    icon: "🖥️",
    relatedMaterials: ["pcb"],
    do: [
      {
        en: "Store PCBs in dry bags — moisture reduces value",
        hi: "PCB को सूखे बैग में रखें — नमी से मूल्य कम होता है",
        mr: "PCB कोरड्या पिशव्यांमध्ये साठवा — ओलाव्यामुळे मूल्य कमी होते",
      },
      {
        en: "Sort by type (motherboards, RAM, GPU) for better pricing",
        hi: "बेहतर कीमत के लिए प्रकार के अनुसार छांटें",
        mr: "चांगल्या किमतीसाठी प्रकारानुसार वर्गीकरण करा",
      },
    ],
    dont: [
      {
        en: "Never use acid to extract gold — causes severe burns and toxic runoff",
        hi: "सोना निकालने के लिए एसिड का उपयोग कभी न करें — गंभीर जलन और जहरीला बहाव",
        mr: "सोने काढण्यासाठी आम्ल कधीही वापरू नका — तीव्र भाजणे आणि विषारी प्रवाह",
      },
      {
        en: "Do not burn PCBs — releases brominated dioxins causing cancer",
        hi: "PCB मत जलाएं — ब्रोमिनेटेड डाइऑक्सिन निकलती है जो कैंसर का कारण बनती है",
        mr: "PCB जाळू नका — ब्रोमिनेटेड डायऑक्सिन निघतात ज्यामुळे कर्करोग होतो",
      },
    ],
  },
];

// ─── ACTIVE LOTS (for prototype state) ───────────────────────────────────────

export const activeLots: Lot[] = [
  {
    id: "LOT-2409-003",
    category: "battery",
    description: "Laptop batteries — 23 units",
    imageEmoji: "🔋",
    weightKg: 3.1,
    estimatedValue: 42,
    status: "matched",
    createdAt: "2026-09-28T09:00:00",
  },
  {
    id: "LOT-2409-004",
    category: "crt",
    description: "CRT televisions — 4 units",
    imageEmoji: "📺",
    weightKg: 28,
    estimatedValue: 7,
    status: "handed_over",
    createdAt: "2026-09-27T16:45:00",
  },
];
