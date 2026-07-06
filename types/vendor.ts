export type VendorSubmission = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  instagram: string;
  location: string;
  yearsInBusiness: string;
  productCategory: string;
  productsOffered: string;
  customizationMethod: string;
  minimumOrderQuantity: string;
  turnaroundTime: string;
  shippingTime: string;
  offersSamples: string;
  wholesalePricing: string;
  dropshipping: string;
  gymTeamStores: string;
  priceAt12: string;
  priceAt24: string;
  priceAt50: string;
  priceAt100: string;
  setupFees: string;
  artFees: string;
  shippingEstimate: string;
  bulkDiscountNotes: string;
  catalogLink: string;
  samplePhotosLink: string;
  pastWorkLink: string;
  otherGyms: string;
  warrantyPolicy: string;
  willingToSendSample: string;
  sampleBeingSent: string;
  trackingNumber: string;
  sampleNotes: string;
  whyUGC: string;
};

export type VendorFormPayload = VendorSubmission & {
  company_fax?: string;
};

export type VendorFieldName = keyof VendorSubmission;

export type ProductCategory = {
  title: string;
  value: string;
  description: string;
  examples: string;
};

export type DesignConcept = {
  id: string;
  name: string;
  productType: string;
  preferredColors: string;
  method: string;
  logoPlacement: string;
  quantityRange: string;
  quoteNeeds: string;
  notes: string;
};
