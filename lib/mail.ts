import { Resend } from "resend";
import { getPlanOptions } from "@/data/plans";
import { SITE } from "@/data/site";
import { CALLBACK_TIMES, type LeadInput } from "@/lib/validation";
import { cleanSingleLine, cleanText, escapeHtml } from "@/lib/sanitize";

export interface LeadRecord extends Omit<LeadInput, "company"> {
  submittedAt: string;
}

function labelForPlan(value: string): string {
  return getPlanOptions().find((option) => option.value === value)?.label ?? value;
}

function labelForCallback(value: string): string {
  return (
    CALLBACK_TIMES.find((slot) => slot.value === value)?.label ?? value
  );
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #E2E8F0;color:#64748B;font-size:13px;white-space:nowrap">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #E2E8F0;color:#0F172A;font-size:14px;font-weight:600">${escapeHtml(value)}</td>
  </tr>`;
}

function buildHtml(lead: LeadRecord): string {
  const rows = [
    row("Name", cleanSingleLine(lead.name)),
    row("Mobile", `+91 ${cleanSingleLine(lead.mobile)}`),
    row("Area", cleanSingleLine(lead.area)),
    row("Address", cleanText(lead.address)),
    row("Preferred plan", labelForPlan(lead.plan)),
    row("Call-back time", labelForCallback(lead.callbackTime)),
    row("Message", lead.message ? cleanText(lead.message) : "-"),
    row("Consent given", "Yes"),
    row("Submitted", lead.submittedAt),
  ].join("");

  return `<!doctype html><html><body style="margin:0;background:#F7F8FC;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:560px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #E2E8F0">
      <div style="background:#1E1B4B;padding:18px 20px;color:#fff">
        <div style="font-size:18px;font-weight:700">New connection request</div>
        <div style="font-size:13px;opacity:.8">${escapeHtml(SITE.domain)}</div>
      </div>
      <table style="width:100%;border-collapse:collapse">${rows}</table>
      <div style="padding:14px 20px;color:#64748B;font-size:12px">
        Call the customer back on +91 ${escapeHtml(cleanSingleLine(lead.mobile))}.
      </div>
    </div>
  </body></html>`;
}

function buildText(lead: LeadRecord): string {
  return [
    "New connection request",
    `Name: ${cleanSingleLine(lead.name)}`,
    `Mobile: +91 ${cleanSingleLine(lead.mobile)}`,
    `Area: ${cleanSingleLine(lead.area)}`,
    `Address: ${cleanText(lead.address)}`,
    `Preferred plan: ${labelForPlan(lead.plan)}`,
    `Call-back time: ${labelForCallback(lead.callbackTime)}`,
    `Message: ${lead.message ? cleanText(lead.message) : "-"}`,
    `Submitted: ${lead.submittedAt}`,
  ].join("\n");
}

/** Sends the lead to the sales inbox. Throws if Resend rejects it. */
export async function sendLeadEmail(lead: LeadRecord): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email transport is not configured");
    }
    console.info("[lead] email transport not configured, skipping send");
    return;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: to.split(",").map((address) => address.trim()),
    replyTo: `${cleanSingleLine(lead.name)} <${SITE.email}>`,
    subject: `New connection request - ${cleanSingleLine(lead.name)} (${cleanSingleLine(lead.area)})`,
    html: buildHtml(lead),
    text: buildText(lead),
  });

  if (error) throw new Error(error.message);
}

/**
 * Optional second copy of the lead, posted to a private Google Apps Script
 * web app that appends a row to a sheet. Never blocks the customer response.
 */
export async function logLeadToSheet(lead: LeadRecord): Promise<void> {
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.SHEET_WEBHOOK_SECRET
          ? { "x-webhook-secret": process.env.SHEET_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        ...lead,
        planLabel: labelForPlan(lead.plan),
      }),
      signal: AbortSignal.timeout(8000),
    });
  } catch (error) {
    console.error("[lead] sheet log failed", error);
  }
}
