import type { DesignConcept, ProductCategory } from "@/types/vendor";

export const productCategories: ProductCategory[] = [
  {
    title: "BJJ Gear",
    value: "BJJ Gear",
    examples: "Gis, rashguards, shorts, belts",
    description:
      "Durable grappling gear built for rounds, washing, and regular team reorders.",
  },
  {
    title: "Boxing Gear",
    value: "Boxing Gear",
    examples: "Gloves, wraps, bags, pads",
    description:
      "Training equipment with real wrist support, clean branding, and repeatable sizing.",
  },
  {
    title: "Apparel",
    value: "Apparel",
    examples: "T-shirts, hoodies, hats, sweats",
    description:
      "Everyday gym apparel that feels premium and keeps the UGC look sharp.",
  },
  {
    title: "Custom Merch",
    value: "Custom Merch",
    examples: "Screen print, embroidery, sublimation",
    description:
      "Production partners for clean logo work, event drops, and special releases.",
  },
  {
    title: "Gym Supplies",
    value: "Gym Supplies",
    examples: "Tape, cleaning supplies, mats, bags",
    description:
      "Reliable consumables and facility products that hold up in a busy gym.",
  },
  {
    title: "Event and Promo Items",
    value: "Event and Promo Items",
    examples: "Medals, banners, flyers, signage",
    description:
      "Professional event materials for seminars, tournaments, and local promotions.",
  },
];

export const designConcepts: DesignConcept[] = [
  {
    id: "classic-logo-tee",
    name: "UGC Classic Logo Tee",
    productType: "T-shirt",
    preferredColors: "Black, white, forest green, gray",
    method: "Screen print or DTG",
    logoPlacement: "Front chest or full front",
    quantityRange: "24 to 100",
    quoteNeeds: "Price breaks at 24, 50, and 100 units",
    notes: "Clean everyday gym shirt, not overly busy",
  },
  {
    id: "nogi-rashguard",
    name: "UGC NoGi Rashguard",
    productType: "Long sleeve or short sleeve rashguard",
    preferredColors: "Black, dark green, white accents",
    method: "Sublimation",
    logoPlacement: "Chest, back, sleeves",
    quantityRange: "12 to 50",
    quoteNeeds: "Unit price, mockup fee, minimum order quantity",
    notes: "Must be durable for grappling, not thin costume material",
  },
  {
    id: "boxing-gloves",
    name: "UGC Boxing Gloves",
    productType: "Boxing gloves",
    preferredColors: "Black, green, white",
    method: "Custom leather or synthetic leather",
    logoPlacement: "Wrist strap and back of glove",
    quantityRange: "12 to 48",
    quoteNeeds: "Unit price by quantity, available weights, sample availability",
    notes: "Quality and wrist support matter more than cheap pricing",
  },
  {
    id: "hoodie",
    name: "UGC Hoodie",
    productType: "Pullover hoodie",
    preferredColors: "Black, charcoal, gray, forest green",
    method: "Screen print, embroidery, or puff print",
    logoPlacement: "Chest, sleeve, or back",
    quantityRange: "24 to 100",
    quoteNeeds: "Blank brand, print method, price breaks",
    notes: "Should feel premium, not like a cheap event hoodie",
  },
  {
    id: "kids-program-shirt",
    name: "UGC Kids Program Shirt",
    productType: "Youth t-shirt",
    preferredColors: "Black, green, white",
    method: "Screen print or DTG",
    logoPlacement: "Front chest or full front",
    quantityRange: "24 to 100",
    quoteNeeds: "Youth sizing, reorder pricing, turnaround",
    notes: "Durable enough for kids training and washing",
  },
  {
    id: "event-shirt",
    name: "UGC Event Shirt",
    productType: "Event or competition shirt",
    preferredColors: "Black, white, green, gray",
    method: "Screen print or sublimation",
    logoPlacement: "Front, back sponsors, sleeve",
    quantityRange: "24 to 150",
    quoteNeeds: "Rush turnaround, price breaks, sponsor logo cost",
    notes:
      "Useful for seminars, tournaments, charity events, or special gym drops",
  },
];

export const scorecardRows = [
  ["Product quality", "30%"],
  ["Pricing", "25%"],
  ["Turnaround time", "15%"],
  ["Customization quality", "15%"],
  ["Communication", "10%"],
  ["Brand fit", "5%"],
] as const;

export const requiredVendorFields = [
  "companyName",
  "contactName",
  "email",
  "productCategory",
  "productsOffered",
  "minimumOrderQuantity",
  "turnaroundTime",
  "priceAt24",
  "willingToSendSample",
  "whyUGC",
] as const;
