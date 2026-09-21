import { z } from "zod";
import { isKnownPlanValue } from "@/data/plans";

/**
 * One schema, used by React Hook Form in the browser AND by the route handler
 * on the server. The server never trusts the client-side pass.
 */
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "Name is too long"),
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  area: z
    .string()
    .trim()
    .min(2, "Please enter your area or locality")
    .max(120, "Area is too long"),
  address: z
    .string()
    .trim()
    .min(10, "Please enter your full address")
    .max(400, "Address is too long"),
  plan: z
    .string()
    .trim()
    .min(1, "Please choose a plan")
    .refine(isKnownPlanValue, "Please choose a plan from the list"),
  callbackTime: z.enum(
    ["morning", "afternoon", "evening", "anytime"],
    "Please choose a call-back time",
  ),
  message: z.string().trim().max(1000, "Message is too long").optional(),
  // boolean (not z.literal(true)) so React Hook Form can start it unchecked
  // while still refusing to submit without consent.
  consent: z
    .boolean()
    .refine((value) => value === true, "Please accept the privacy policy to continue"),
  /**
   * Honeypot. Real users never fill this in, but the schema deliberately
   * ACCEPTS any value: rejecting it here would return a validation error
   * naming the field, which tells a bot exactly what tripped it. The route
   * handler checks it after validation and answers 200 so the bot learns
   * nothing.
   */
  company: z.string().max(200).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Server-side schema adds the Turnstile token. */
export const leadServerSchema = leadSchema.extend({
  turnstileToken: z.string().trim().min(1, "Bot check failed").max(2048),
});

export type LeadServerInput = z.infer<typeof leadServerSchema>;

export const CALLBACK_TIMES = [
  { value: "morning", label: "Morning (9 AM - 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM - 4 PM)" },
  { value: "evening", label: "Evening (4 PM - 9 PM)" },
  { value: "anytime", label: "Anytime" },
] as const;
