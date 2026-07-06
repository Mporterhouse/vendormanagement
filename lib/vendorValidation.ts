import { requiredVendorFields } from "@/lib/vendorData";
import type { VendorFieldName, VendorFormPayload, VendorSubmission } from "@/types/vendor";

export const emptyVendorSubmission: VendorSubmission = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  instagram: "",
  location: "",
  yearsInBusiness: "",
  productCategory: "",
  productsOffered: "",
  customizationMethod: "",
  minimumOrderQuantity: "",
  turnaroundTime: "",
  shippingTime: "",
  offersSamples: "",
  wholesalePricing: "",
  dropshipping: "",
  gymTeamStores: "",
  priceAt12: "",
  priceAt24: "",
  priceAt50: "",
  priceAt100: "",
  setupFees: "",
  artFees: "",
  shippingEstimate: "",
  bulkDiscountNotes: "",
  catalogLink: "",
  samplePhotosLink: "",
  pastWorkLink: "",
  otherGyms: "",
  warrantyPolicy: "",
  willingToSendSample: "",
  sampleBeingSent: "",
  trackingNumber: "",
  sampleNotes: "",
  whyUGC: "",
};

const urlFields: VendorFieldName[] = ["website", "catalogLink", "samplePhotosLink", "pastWorkLink"];

const fieldLabels: Record<VendorFieldName, string> = {
  companyName: "Company name",
  contactName: "Contact name",
  email: "Email",
  phone: "Phone",
  website: "Website",
  instagram: "Instagram",
  location: "Country / location",
  yearsInBusiness: "Years in business",
  productCategory: "Product category",
  productsOffered: "Products offered",
  customizationMethod: "Customization method",
  minimumOrderQuantity: "Minimum order quantity",
  turnaroundTime: "Turnaround time",
  shippingTime: "Shipping time",
  offersSamples: "Do you offer samples?",
  wholesalePricing: "Do you offer wholesale pricing?",
  dropshipping: "Do you offer dropshipping?",
  gymTeamStores: "Do you offer gym/team stores?",
  priceAt12: "Price per unit at 12 units",
  priceAt24: "Price per unit at 24 units",
  priceAt50: "Price per unit at 50 units",
  priceAt100: "Price per unit at 100 units",
  setupFees: "Setup fees",
  artFees: "Art/design fees",
  shippingEstimate: "Shipping estimate",
  bulkDiscountNotes: "Bulk discount notes",
  catalogLink: "Catalog link",
  samplePhotosLink: "Sample photos link",
  pastWorkLink: "Past work link",
  otherGyms: "Other gyms or teams",
  warrantyPolicy: "Warranty / defect policy",
  willingToSendSample: "Are you willing to send a free sample?",
  sampleBeingSent: "What sample will you send?",
  trackingNumber: "Tracking number",
  sampleNotes: "Sample notes",
  whyUGC: "Why should UGC work with you?",
};

export type VendorValidationResult =
  | { success: true; data: VendorSubmission }
  | { success: false; errors: Partial<Record<VendorFieldName, string>> };

export function getFieldLabel(name: VendorFieldName) {
  return fieldLabels[name];
}

export function normalizeVendorPayload(payload: Partial<VendorFormPayload>): VendorSubmission {
  return (Object.keys(emptyVendorSubmission) as VendorFieldName[]).reduce(
    (submission, key) => ({
      ...submission,
      [key]: String(payload[key] ?? "").trim(),
    }),
    { ...emptyVendorSubmission },
  );
}

export function validateVendorSubmission(
  payload: Partial<VendorFormPayload>,
): VendorValidationResult {
  const data = normalizeVendorPayload(payload);
  const errors: Partial<Record<VendorFieldName, string>> = {};

  for (const field of requiredVendorFields) {
    if (!data[field]) {
      errors[field] = `${fieldLabels[field]} is required.`;
    }
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  for (const field of urlFields) {
    if (data[field] && !isValidUrl(data[field])) {
      errors[field] = "Enter a valid URL, including https:// when possible.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
