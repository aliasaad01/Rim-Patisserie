import { CollectionItem } from "../types";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp";

import weddingImg from "../assets/images/wedding.jpg";
import patisserieImg from "../assets/images/signature.jpg";
import celebrationImg from "../assets/images/celebration.jpg";
import banquetImg from "../assets/images/dessert.jpg";

export const BRAND_INFO = {
  name: "Rim Patisserie",
  nameAr: "حلويات ريم",
  taglineEn: "Where Coastal Syrian Warmth Meets the Poetry of High Pâtisserie.",
  taglineAr: "حيث يلتقي دفء الساحل السوري بفن وصناعة الحلويات الراقية.",
  since: "2003",
  founderEn: "Rim Ibrahim",
  founderAr: "ريم إبراهيم",
  cityEn: "Tartus, Syria",
  cityAr: "طرطوس، سوريا",
  districtEn: "Al-Qusoor District",
  districtAr: "حي القصور",
  eventsCount: "1,700+",
  hoursEn: "9:00 AM – 12:30 AM Daily",
  hoursAr: "يومياً من 9:00 صباحاً حتى 12:30 بعد منتصف الليل",
  phone: "0985155115",
  phoneIntl: "+963985155115",
  instagramHandle: "@rim__patisserie",
  instagramUrl: "https://www.instagram.com/rim__patisserie/",
  facebookName: "Rim Ibrahim",
  facebookUrl: "https://www.facebook.com/share/1LHGyw3NJj/",
  // General contact action: short Arabic greeting built once by
  // src/utils/whatsapp.ts (encoded exactly once). Do not hardcode wa.me URLs.
  whatsappUrl: buildGeneralWhatsAppUrl(),
};

export const COLLECTIONS_DATA: CollectionItem[] = [
  {
    id: "haute-wedding-couture",
    titleEn: "Wedding Cake",
    titleAr: "كيك الأعراس",
    category: "wedding",
    categoryLabelEn: "Wedding Cakes",
    categoryLabelAr: "كيك الأعراس",
    shortDescriptionEn:
      "Elegant cakes designed to complement your special day.",
    shortDescriptionAr: "تصاميم كيك راقية مصممة لتناسب حفل زفافكم الاستثنائي.",
    descriptionEn:
      "Five-tier architectural wedding sculpture adorned with handcrafted English sugar roses, cascading blush petals, and 24k gold leaf gilding. Tailored for grand Tartus gala receptions.",
    descriptionAr:
      "تحفة معمارية من خمس طبقات تزدان بورود السكر الإنجليزية المشغولة يدوياً بتلات ناعمة ولمسات من ورق الذهب الخالص عيار 24. مصممة خصيصاً لأفراح طرطوس الكبرى.",
    servings: "120–180 portions",
    leadTimeEn: "14 days notice",
    leadTimeAr: "حجز مسبق قبل 14 يوماً",
    flavorNotesEn: [
      "Madagascar Bourbon Vanilla",
      "Velvet White Chocolate",
      "Damask Rose Petal Infusion",
    ],
    flavorNotesAr: [
      "فانيليا مدغشقر البوربون",
      "شوكولا بيضاء مخملية",
      "تقطير بتلات الورد الجوري",
    ],
    image: weddingImg,
    highlight: "Handmade Sugar Floral Cascade",
    dimensions: "5 Tiers · 95cm height",
  },
  {
    id: "whimsical-celebration-tiers",
    titleEn: "Birthday Cake",
    titleAr: "كيك أعياد الميلاد",
    category: "celebration",
    categoryLabelEn: "Birthday Cakes",
    categoryLabelAr: "كيك أعياد الميلاد",
    shortDescriptionEn:
      "Celebration cakes with designs tailored to your occasion.",
    shortDescriptionAr: "كيك احتفالي مميز بتصاميم مخصصة لتناسب أعياد ميلادكم.",
    descriptionEn:
      "Bespoke celebratory creation blending gold-leaf brushwork, sugar garden peonies, and pastel macaron garnishes with personalized custom calligraphy.",
    descriptionAr:
      "تصميم احتفالي خاص يجمع بين لمسات الذهب المذهب بالريشة وورود الفاوانيا السكرية ولمسات الماكرون الناعمة، مع خط يدوي مخصص للاسم والمناسبة.",
    servings: "25–40 portions",
    leadTimeEn: "5 days notice",
    leadTimeAr: "طلب مسبق قبل 5 أيام",
    flavorNotesEn: [
      "Belgian Salted Caramel",
      "Valrhona Cocoa Sponge",
      "Fresh Berry Coulis",
    ],
    flavorNotesAr: [
      "كراميل مملح بلجيكي",
      "سبونج كاكاو فالرونا",
      "كوليس التوت الطازج",
    ],
    image: celebrationImg,
    highlight: "24k Gold Accents & Calligraphy",
    dimensions: "3 Tiers · 60cm height",
  },
  {
    id: "l-entremet-signature",
    titleEn: "French Pastries",
    titleAr: "حلويات فرنسية",
    category: "patisserie",
    categoryLabelEn: "Pastries",
    categoryLabelAr: "حلويات فرنسية",
    shortDescriptionEn:
      "A selection of French pastries for everyday treats and special gatherings.",
    shortDescriptionAr:
      "تشكيلة مختارة من الحلويات الفرنسية الراقية لجلساتكم ومناسباتكم.",
    descriptionEn:
      "Mirror-glazed wild raspberry entremet atop a crunchy Syrian pistachio biscuit, paired with artisan tartlets and delicate rose macarons. Freshly baked every morning.",
    descriptionAr:
      "أنتروميه التوت البري بجليز المرآة اللامع على طبقة مقرمشة من بسكويت الفستق الحلبي، بجانب تارتولات فاخرة وماكرون وردي ناعم. يُحضّر طازجاً كل صباح في مشغلنا.",
    servings: "8–12 portions",
    leadTimeEn: "24 hours notice",
    leadTimeAr: "طلب مسبق قبل 24 ساعة",
    flavorNotesEn: [
      "Wild Raspberry Mirror Glaze",
      "Roasted Aleppo Pistachio",
      "Tahitian Vanilla Mousse",
    ],
    flavorNotesAr: [
      "جليز توت بري لامع",
      "فستق حلبي محمص",
      "موس فانيليا تاهيتي",
    ],
    image: patisserieImg,
    highlight: "Mirror Glaze Technique",
    dimensions: "22cm diameter · 6cm height",
  },
  {
    id: "grand-dessert-banquet",
    titleEn: "Dessert Table",
    titleAr: "طاولات الضيافة",
    category: "banquet",
    categoryLabelEn: "Dessert Tables",
    categoryLabelAr: "طاولات الضيافة",
    shortDescriptionEn:
      "A coordinated selection of sweets for celebrations and special events.",
    shortDescriptionAr:
      "تنسيق متكامل من أطايب الضيافة والحلويات للاحتفالات والمناسبات.",
    descriptionEn:
      "Curated dessert tablescape featuring bespoke tiered centrepiece, French macaron pyramids, glass-cloche tartlets, and candlelit staging along the Tartus Mediterranean coastline.",
    descriptionAr:
      "طاولة ضيافة متكاملة تشتمل على كعكة المركز الفاخرة، أهرامات الماكرون الفرنسي، تارتولات الزجاج الفاخرة، مع تنسيق إضاءة شموع خلاب يناسب أجواء ساحل طرطوس.",
    servings: "50–400 guests",
    leadTimeEn: "21 days notice",
    leadTimeAr: "حجز مسبق قبل 21 يوماً",
    flavorNotesEn: [
      "Parisian Pistachio Macarons",
      "Dark Berry Tartlets",
      "Handcrafted Petit Fours",
    ],
    flavorNotesAr: [
      "ماكرون الفستق الحلبي الباريسي",
      "تارتولات التوت الأسود",
      "بيتي فور فاخر مشغول يدوياً",
    ],
    image: banquetImg,
    highlight: "Complete Event Staging",
    dimensions: "Custom 3–6m Buffet Table",
  },
];

export const STORY_MILESTONES = [
  {
    year: "2003",
    titleEn: "Established in Tartus",
    titleAr: "التأسيس في طرطوس",
    descriptionEn:
      "Founded by Rim Ibrahim in Tartus, Syria, dedicated to bespoke celebration cakes and fine pastry.",
    descriptionAr:
      "تأسست في طرطوس بسوريا بإشراف ريم إبراهيم لصناعة كيك المناسبات والحلويات الراقية.",
  },
  {
    year: "2019",
    titleEn: "Al-Qusoor Boutique",
    titleAr: "بوتيك حي القصور",
    descriptionEn:
      "Opened our dedicated boutique and atelier in the Al-Qusoor district, serving guests daily.",
    descriptionAr:
      "افتتاح بوتيك ومشغل ريم في حي القصور لاستقبال الزوار يومياً.",
  },
  {
    year: "Today",
    titleEn: "Custom Celebrations",
    titleAr: "كيك وحلويات المناسبات",
    descriptionEn:
      "Crafting wedding cakes, celebration tiers, and daily artisanal pastries for every occasion.",
    descriptionAr:
      "تصميم كيك الأعراس والحفلات والحلويات اليومية لكافة المناسبات الخاصة.",
  },
];

export const ATELIER_OPTIONS = {
  occasions: [
    {
      id: "wedding",
      labelEn: "Royal Wedding Reception",
      labelAr: "حفل زفاف ملكي",
    },
    {
      id: "birthday",
      labelEn: "Milestone Birthday & Anniversary",
      labelAr: "عيد ميلاد أو ذكرى سنوية",
    },
    {
      id: "children",
      labelEn: "Whimsical Children’s Fantasy",
      labelAr: "حفل أطفال بتصميم مميز",
    },
    {
      id: "engagement",
      labelEn: "Engagement & Khotoba Ceremony",
      labelAr: "حفل خطوبة وملكة",
    },
    {
      id: "banquet",
      labelEn: "Full Sweet Table & Event Catering",
      labelAr: "طاولة ضيافة وبوفيه حلو كامل",
    },
  ],
  tierOptions: [
    {
      id: "1-tier",
      labelEn: "1 Tier Art Centrepiece (10–18 guests)",
      labelAr: "طبقة واحدة فنية (10–18 شخص)",
    },
    {
      id: "2-tier",
      labelEn: "2 Tiers Intimate Gala (25–35 guests)",
      labelAr: "طبقتان أنيقتان (25–35 شخص)",
    },
    {
      id: "3-tier",
      labelEn: "3 Tiers Grand Celebration (50–70 guests)",
      labelAr: "3 طبقات احتفالية (50–70 شخص)",
    },
    {
      id: "5-tier",
      labelEn: "4–5 Tiers Royal Architectural (100–180+ guests)",
      labelAr: "4 إلى 5 طبقات ملكية كبرى (100–180+ شخص)",
    },
  ],
  flavorProfiles: [
    {
      id: "pistachio-rose",
      labelEn: "Syrian Pistachio & Rosewater Cream",
      labelAr: "فستق حلبي مع كريمة ماء الورد",
    },
    {
      id: "madagascar-vanilla",
      labelEn: "Madagascar Vanilla & Wild Raspberry",
      labelAr: "فانيليا مدغشقر مع توت بري طازج",
    },
    {
      id: "valrhona-chocolate",
      labelEn: "Belgian Valrhona Ganache & Salted Caramel",
      labelAr: "غاناش شوكولا بلجيكية مع كراميل مملح",
    },
    {
      id: "hazelnut-praline",
      labelEn: "Roasted Hazelnut Praline & Espresso",
      labelAr: "برالينيه البندق المحمص مع نسيم الإسبريسو",
    },
    {
      id: "white-choc-passion",
      labelEn: "Velvet White Chocolate & Passionfruit",
      labelAr: "شوكولا بيضاء مخملية مع باشون فروت",
    },
  ],
  artFinishes: [
    {
      id: "sugar-botanicals",
      labelEn: "Hand-sculpted English Sugar Roses",
      labelAr: "ورود سكرية يدوية مشغولة بدقة",
    },
    {
      id: "gold-leaf",
      labelEn: "24K Edible Gold Leaf & Royal Gilded Trim",
      labelAr: "تذهيب يدوي بورق الذهب عيار 24",
    },
    {
      id: "custom-fondant-art",
      labelEn: "Whimsical 3D Figurine / Sculpted Characters",
      labelAr: "مجسمات ثلاثية الأبعاد وشخصيات عجينة السكر",
    },
    {
      id: "macaron-garland",
      labelEn: "French Macaron Towers & Pearl Beading",
      labelAr: "تزيين بماكرون باريسي ولآلئ سكرية",
    },
    {
      id: "neon-drip",
      labelEn: "Artisanal Color Drip & Candlelight Palette",
      labelAr: "دريب ملون فني وتدرجات لونية ساحرة",
    },
  ],
};
