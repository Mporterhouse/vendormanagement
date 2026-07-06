import { NextRequest, NextResponse } from "next/server";
import { validateVendorSubmission } from "@/lib/vendorValidation";
import type { VendorFormPayload } from "@/types/vendor";

const userError =
  "Something went wrong submitting your vendor form. Please try again.";

export async function POST(request: NextRequest) {
  let payload: Partial<VendorFormPayload>;

  try {
    payload = (await request.json()) as Partial<VendorFormPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  if (payload.company_fax) {
    return NextResponse.json({ ok: true });
  }

  const validation = validateVendorSubmission(payload);

  if (!validation.success) {
    return NextResponse.json(
      { ok: false, errors: validation.errors },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.VENDOR_INTAKE_WEBHOOK_URL;
  const webhookSecret = process.env.VENDOR_WEBHOOK_SECRET;

  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, message: "Server is missing VENDOR_INTAKE_WEBHOOK_URL." },
      { status: 500 },
    );
  }

  if (!webhookSecret) {
    return NextResponse.json(
      { ok: false, message: "Server is missing VENDOR_WEBHOOK_SECRET." },
      { status: 500 },
    );
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: webhookSecret,
        submittedAt: new Date().toISOString(),
        data: validation.data,
      }),
    });

    if (!webhookResponse.ok) {
      return NextResponse.json({ ok: false, message: userError }, { status: 502 });
    }

    const responseText = await webhookResponse.text();
    const responseJson = parseWebhookResponse(responseText);

    if (responseJson && responseJson.ok === false) {
      return NextResponse.json({ ok: false, message: userError }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: userError }, { status: 502 });
  }
}

function parseWebhookResponse(text: string): { ok?: boolean } | null {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as { ok?: boolean };
  } catch {
    return null;
  }
}
