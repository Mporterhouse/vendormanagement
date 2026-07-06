# Upstate Grappling Club Vendor Intake

A polished public vendor intake portal for Upstate Grappling Club. Vendors use `/vendors` to review product categories and design concepts, submit pricing, and get sample-shipping instructions.

The form submits to a Next.js API route first. That backend route validates the submission, checks a honeypot field, adds a timestamp, and forwards the payload to a Google Apps Script Web App that appends vendor data to a Google Sheet.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel-ready serverless API route
- No database required for v1

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open:

```text
http://localhost:3000/vendors
```

Use real values in `.env.local` for local testing only. Do not commit `.env.local` to GitHub.

## Required Environment Variables

Create these in `.env.local` for local development and in Vercel Project Settings -> Environment Variables for deployment:

```bash
VENDOR_INTAKE_WEBHOOK_URL=your_google_apps_script_web_app_url_here
VENDOR_WEBHOOK_SECRET=your_shared_secret_here
```

The production values supplied for this project should be entered in Vercel, not hardcoded in frontend code or committed files.

## Deploy To Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Go to Vercel Project Settings -> Environment Variables.
4. Add `VENDOR_INTAKE_WEBHOOK_URL`.
5. Add `VENDOR_WEBHOOK_SECRET`.
6. Deploy.

The frontend never receives either value. The API route reads them from `process.env`.

## Logo

The UGC logo should live at:

```text
public/ugc-logo.png
```

This project already references that path in the header and hero. Replace the file with a new logo if needed, but keep the same filename or update the image paths in the components.

## Update Product Categories

Edit `lib/vendorData.ts` and update the `productCategories` array. Category cards and the form dropdown are both generated from that data.

## Update Design Concepts

Edit `lib/vendorData.ts` and update the `designConcepts` array. The design concept cards and modal details are generated from that data.

## Replace Sample Shipping Address

Edit `components/vendor/SampleInstructions.tsx` and replace:

```text
ADD BUSINESS SHIPPING ADDRESS HERE
ADD ZIP CODE HERE
```

The page intentionally shows a visible reminder until the address is updated.

## Google Sheet Submission Flow

1. The browser submits the form to `app/api/vendor-submission/route.ts`.
2. The server validates required fields and URL/email formats.
3. The server checks the hidden `company_fax` honeypot. If it is filled, the route returns success without sending the webhook.
4. The server posts this payload to `process.env.VENDOR_INTAKE_WEBHOOK_URL`:

```json
{
  "secret": "process.env.VENDOR_WEBHOOK_SECRET",
  "submittedAt": "2026-07-06T00:00:00.000Z",
  "data": {
    "companyName": "",
    "contactName": "",
    "email": "",
    "phone": "",
    "website": "",
    "instagram": "",
    "location": "",
    "yearsInBusiness": "",
    "productCategory": "",
    "productsOffered": "",
    "customizationMethod": "",
    "minimumOrderQuantity": "",
    "turnaroundTime": "",
    "shippingTime": "",
    "offersSamples": "",
    "wholesalePricing": "",
    "dropshipping": "",
    "gymTeamStores": "",
    "priceAt12": "",
    "priceAt24": "",
    "priceAt50": "",
    "priceAt100": "",
    "setupFees": "",
    "artFees": "",
    "shippingEstimate": "",
    "bulkDiscountNotes": "",
    "catalogLink": "",
    "samplePhotosLink": "",
    "pastWorkLink": "",
    "otherGyms": "",
    "warrantyPolicy": "",
    "willingToSendSample": "",
    "sampleBeingSent": "",
    "trackingNumber": "",
    "sampleNotes": "",
    "whyUGC": ""
  }
}
```

If the Apps Script returns `ok: false` or the request fails, vendors see:

```text
Something went wrong submitting your vendor form. Please try again.
```

## Security Notes

- Do not hardcode the Google Apps Script URL in frontend code.
- Do not expose `VENDOR_WEBHOOK_SECRET` in browser code.
- Do not commit `.env.local`.
- `.env.example` should only contain placeholder values.
- No submissions are stored in localStorage.
