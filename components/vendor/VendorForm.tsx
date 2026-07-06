"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { productCategories } from "@/lib/vendorData";
import {
  emptyVendorSubmission,
  getFieldLabel,
  validateVendorSubmission,
} from "@/lib/vendorValidation";
import type { VendorFieldName, VendorFormPayload, VendorSubmission } from "@/types/vendor";

type FieldConfig = {
  name: VendorFieldName;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "tel" | "url";
  textarea?: boolean;
  options?: string[];
  placeholder?: string;
};

const yesNoOptions = ["Yes", "No", "Not sure"];

const requiredFields = new Set<VendorFieldName>([
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
]);

const sections: Array<{ title: string; fields: FieldConfig[] }> = [
  {
    title: "Company Info",
    fields: [
      { name: "companyName", label: "Company name" },
      { name: "contactName", label: "Contact name" },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "website", label: "Website", type: "url", placeholder: "https://example.com" },
      { name: "instagram", label: "Instagram", placeholder: "@yourbrand" },
      { name: "location", label: "Country / location" },
      { name: "yearsInBusiness", label: "Years in business" },
    ],
  },
  {
    title: "Product Info",
    fields: [
      {
        name: "productCategory",
        label: "Product category",
        options: productCategories.map((category) => category.value),
      },
      { name: "productsOffered", label: "Products offered", textarea: true },
      { name: "customizationMethod", label: "Customization method" },
      { name: "minimumOrderQuantity", label: "Minimum order quantity" },
      { name: "turnaroundTime", label: "Turnaround time" },
      { name: "shippingTime", label: "Shipping time" },
      { name: "offersSamples", label: "Do you offer samples?", options: yesNoOptions },
      { name: "wholesalePricing", label: "Do you offer wholesale pricing?", options: yesNoOptions },
      { name: "dropshipping", label: "Do you offer dropshipping?", options: yesNoOptions },
      { name: "gymTeamStores", label: "Do you offer gym/team stores?", options: yesNoOptions },
    ],
  },
  {
    title: "Pricing",
    fields: [
      { name: "priceAt12", label: "Price per unit at 12 units", placeholder: "$22 to $28" },
      { name: "priceAt24", label: "Price per unit at 24 units", placeholder: "$20 to $26" },
      { name: "priceAt50", label: "Price per unit at 50 units", placeholder: "$18 to $24" },
      { name: "priceAt100", label: "Price per unit at 100 units", placeholder: "$16 to $22" },
      { name: "setupFees", label: "Setup fees" },
      { name: "artFees", label: "Art/design fees" },
      { name: "shippingEstimate", label: "Shipping estimate" },
      { name: "bulkDiscountNotes", label: "Bulk discount notes", textarea: true },
    ],
  },
  {
    title: "Quality Proof",
    fields: [
      { name: "catalogLink", label: "Catalog link", type: "url", placeholder: "https://..." },
      { name: "samplePhotosLink", label: "Sample photos link", type: "url", placeholder: "https://..." },
      { name: "pastWorkLink", label: "Past work link", type: "url", placeholder: "https://..." },
      { name: "otherGyms", label: "Other gyms or teams you work with", textarea: true },
      { name: "warrantyPolicy", label: "Warranty / defect policy", textarea: true },
    ],
  },
  {
    title: "Samples",
    fields: [
      {
        name: "willingToSendSample",
        label: "Are you willing to send a free sample?",
        options: yesNoOptions,
      },
      { name: "sampleBeingSent", label: "What sample will you send?" },
      { name: "trackingNumber", label: "Tracking number, if already shipped" },
      { name: "sampleNotes", label: "Sample notes", textarea: true },
    ],
  },
  {
    title: "Final",
    fields: [
      {
        name: "whyUGC",
        label: "Why should UGC work with you?",
        textarea: true,
        placeholder: "Tell us what makes your quality, pricing, and service a strong fit.",
      },
    ],
  },
];

export function VendorForm() {
  const [form, setForm] = useState<VendorSubmission>(emptyVendorSubmission);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<VendorFieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const requiredNote = useMemo(
    () =>
      Array.from(requiredFields)
        .map((field) => getFieldLabel(field))
        .join(", "),
    [],
  );

  useEffect(() => {
    function handleCategory(event: Event) {
      const customEvent = event as CustomEvent<string>;
      setForm((current) => ({ ...current, productCategory: customEvent.detail }));
      setErrors((current) => ({ ...current, productCategory: undefined }));
    }

    window.addEventListener("ugc:setCategory", handleCategory);
    return () => window.removeEventListener("ugc:setCategory", handleCategory);
  }, []);

  function updateField(name: VendorFieldName, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");

    const payload: VendorFormPayload = { ...form, company_fax: honeypot };
    const validation = validateVendorSubmission(payload);

    if (!validation.success) {
      setErrors(validation.errors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/vendor-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        errors?: Partial<Record<VendorFieldName, string>>;
      };

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(emptyVendorSubmission);
      setHoneypot("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="submit-pricing" className="section-shell py-20">
      <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-ugc-green">
            Submit Pricing
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-5xl">
            Vendor Submission Form
          </h2>
          <p className="mt-5 text-sm leading-7 text-zinc-300">
            Required fields: {requiredNote}. Pricing can be a range, such as
            $22 to $28, if final pricing depends on garment, size, or finish.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="card-border rounded-lg p-4 sm:p-6">
          <input
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            name="company_fax"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />

          <div className="grid gap-8">
            {sections.map((section) => (
              <fieldset key={section.title} className="min-w-0">
                <legend className="mb-4 border-b border-white/10 pb-3 text-lg font-black uppercase tracking-[0.12em] text-white">
                  {section.title}
                </legend>
                <div className="grid gap-4 md:grid-cols-2">
                  {section.fields.map((field) => (
                    <FormField
                      key={field.name}
                      field={{ ...field, required: requiredFields.has(field.name) }}
                      value={form[field.name]}
                      error={errors[field.name]}
                      onChange={(value) => updateField(field.name, value)}
                    />
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          {status === "success" ? (
            <div className="mt-6 rounded-md border border-ugc-green/40 bg-ugc-green/10 p-4 text-sm font-bold leading-6 text-green-100">
              Thanks for submitting. We review vendor submissions periodically.
              If your product, pricing, and quality fit what we need, we will
              reach out. Please do not send follow-up DMs unless we contact you
              first.
            </div>
          ) : null}

          {status === "error" ? (
            <div className="mt-6 rounded-md border border-red-300/30 bg-red-500/10 p-4 text-sm font-bold leading-6 text-red-100">
              Something went wrong submitting your vendor form. Please try
              again.
            </div>
          ) : null}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-6 w-full rounded-md bg-ugc-green px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting..." : "Submit Vendor Pricing"}
          </button>
        </form>
      </div>
    </section>
  );
}

function FormField({
  field,
  value,
  error,
  onChange,
}: {
  field: FieldConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const id = `vendor-${field.name}`;
  const commonProps = {
    id,
    name: field.name,
    value,
    required: field.required,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      onChange(event.target.value),
  };

  return (
    <div className={field.textarea ? "md:col-span-2" : ""}>
      <label htmlFor={id} className="field-label">
        {field.label}
        {field.required ? <span className="text-ugc-green"> *</span> : null}
      </label>
      {field.options ? (
        <select {...commonProps} className="field mt-2">
          <option value="">Select an option</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.textarea ? (
        <textarea
          {...commonProps}
          className="field mt-2 min-h-28 resize-y"
          placeholder={field.placeholder}
        />
      ) : (
        <input
          {...commonProps}
          type={field.type ?? "text"}
          className="field mt-2"
          placeholder={field.placeholder}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
