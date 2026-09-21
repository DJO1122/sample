import { NextResponse } from "next/server";
import { leadServerSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { logLeadToSheet, sendLeadEmail, type LeadRecord } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Bodies larger than this are rejected before parsing. */
const MAX_BODY_BYTES = 8 * 1024;

const GENERIC_ERROR =
  "We could not send your request. Please call us on 99949 10101.";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function json(body: unknown, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json({ ok: false, error: GENERIC_ERROR }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Request too large." }, 413);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Request too large." }, 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: GENERIC_ERROR }, 400);
  }

  const ip = clientIp(request);
  const limit = await checkRateLimit(ip);
  if (!limit.success) {
    return json(
      {
        ok: false,
        error:
          "Too many requests from this connection. Please try again later or call us.",
      },
      429,
    );
  }

  const parsed = leadServerSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors = parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return json({ ok: false, error: "Please check the form.", fieldErrors }, 400);
  }

  const data = parsed.data;

  // Honeypot: a filled hidden field means a bot. Answer 200 so it learns nothing.
  if (data.company) {
    return json({ ok: true }, 200);
  }

  const humanVerified = await verifyTurnstile(
    data.turnstileToken,
    ip === "unknown" ? null : ip,
  );
  if (!humanVerified) {
    return json(
      { ok: false, error: "Bot check failed. Please reload the page and retry." },
      403,
    );
  }

  const lead: LeadRecord = {
    name: data.name,
    mobile: data.mobile,
    area: data.area,
    address: data.address,
    plan: data.plan,
    callbackTime: data.callbackTime,
    message: data.message,
    consent: data.consent,
    submittedAt: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    }),
  };

  try {
    await sendLeadEmail(lead);
  } catch (error) {
    console.error("[lead] send failed", error);
    return json({ ok: false, error: GENERIC_ERROR }, 502);
  }

  await logLeadToSheet(lead);

  return json({ ok: true }, 200);
}

export async function GET() {
  return json({ ok: false, error: "Method not allowed" }, 405);
}
