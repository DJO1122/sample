"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { getPlanOptions, isKnownPlanValue } from "@/data/plans";
import { WHATSAPP_URL } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { leadSchema, CALLBACK_TIMES, type LeadInput } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Turnstile } from "@/components/Turnstile";
import { CTAButton } from "@/components/CTAButton";

type Status = "idle" | "submitting" | "success" | "error";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
      {message}
    </p>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-royal";
const labelClass = "block text-sm font-semibold text-navy";

export function ContactForm() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const planOptions = useMemo(() => getPlanOptions(), []);
  const groups = useMemo(
    () => Array.from(new Set(planOptions.map((option) => option.group))),
    [planOptions],
  );

  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      mobile: "",
      area: "",
      address: "",
      plan: "",
      callbackTime: "anytime",
      message: "",
      consent: false,
      company: "",
    },
  });

  // Deep links from the plan cards: /contact?plan=pro-200
  useEffect(() => {
    const requested = searchParams.get("plan");
    if (requested && isKnownPlanValue(requested)) {
      setValue("plan", requested, { shouldValidate: true });
    }
  }, [searchParams, setValue]);

  const onToken = useCallback((value: string) => setToken(value), []);

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");
    setServerError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken: token }),
      });

      const data = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setServerError(data.error ?? t("contactPage.errorTitle"));
        setStatus("error");
        setResetSignal((value) => value + 1);
        return;
      }

      reset();
      setStatus("success");
      setResetSignal((value) => value + 1);
    } catch {
      setServerError(t("contactPage.errorTitle"));
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="card p-8 text-center"
        role="status"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50"
        >
          <CheckCircle2 className="h-9 w-9 text-emerald-600" aria-hidden="true" />
        </motion.span>
        <h2 className="mt-5 font-display text-2xl font-bold text-navy">
          {t("contactPage.successTitle")}
        </h2>
        <p className="mt-2 text-muted">{t("contactPage.successBody")}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href={WHATSAPP_URL} variant="primary" size="sm">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t("contactPage.successWhatsapp")}
          </CTAButton>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm font-semibold text-royal hover:underline"
          >
            {t("contactPage.successAgain")}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold text-navy">
        {t("contactPage.formTitle")}
      </h2>

      {status === "error" && serverError && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className={labelClass}>
            {t("contactPage.name")} <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={cn(inputClass, "mt-1.5", errors.name && "border-red-400")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="mobile" className={labelClass}>
            {t("contactPage.mobile")} <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <div className="mt-1.5 flex">
            <span className="grid place-items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-muted">
              +91
            </span>
            <input
              id="mobile"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel-national"
              placeholder="9994910101"
              className={cn(inputClass, "rounded-l-none", errors.mobile && "border-red-400")}
              aria-invalid={Boolean(errors.mobile)}
              aria-describedby={errors.mobile ? "mobile-error" : undefined}
              {...register("mobile")}
            />
          </div>
          <FieldError id="mobile-error" message={errors.mobile?.message} />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="area" className={labelClass}>
            {t("contactPage.area")} <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="area"
            type="text"
            autoComplete="address-level3"
            placeholder="Poyampalayam"
            className={cn(inputClass, "mt-1.5", errors.area && "border-red-400")}
            aria-invalid={Boolean(errors.area)}
            aria-describedby={errors.area ? "area-error" : undefined}
            {...register("area")}
          />
          <FieldError id="area-error" message={errors.area?.message} />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="callbackTime" className={labelClass}>
            {t("contactPage.callback")}
          </label>
          <select
            id="callbackTime"
            className={cn(inputClass, "mt-1.5")}
            {...register("callbackTime")}
          >
            {CALLBACK_TIMES.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className={labelClass}>
            {t("contactPage.address")} <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            rows={3}
            autoComplete="street-address"
            className={cn(inputClass, "mt-1.5 resize-y", errors.address && "border-red-400")}
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? "address-error" : undefined}
            {...register("address")}
          />
          <FieldError id="address-error" message={errors.address?.message} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="plan" className={labelClass}>
            {t("contactPage.plan")} <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <select
            id="plan"
            className={cn(inputClass, "mt-1.5", errors.plan && "border-red-400")}
            aria-invalid={Boolean(errors.plan)}
            aria-describedby={errors.plan ? "plan-error" : undefined}
            {...register("plan")}
          >
            <option value="">{t("contactPage.planPlaceholder")}</option>
            {groups.map((group) => (
              <optgroup key={group} label={group}>
                {planOptions
                  .filter((option) => option.group === group)
                  .map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
          <FieldError id="plan-error" message={errors.plan?.message} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            {t("contactPage.message")}
          </label>
          <textarea
            id="message"
            rows={3}
            className={cn(inputClass, "mt-1.5 resize-y")}
            {...register("message")}
          />
          <FieldError id="message-error" message={errors.message?.message} />
        </div>
      </div>

      {/* Honeypot: hidden from people and from screen readers, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-royal"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            {...register("consent")}
          />
          <span>
            {t("contactPage.consent")}{" "}
            <Link href="/privacy" className="font-semibold text-royal hover:underline">
              {t("footer.privacy")}
            </Link>
          </span>
        </label>
        <FieldError id="consent-error" message={errors.consent?.message} />
      </div>

      <Turnstile onToken={onToken} resetSignal={resetSignal} />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
      >
        {status === "submitting" && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {status === "submitting"
          ? t("contactPage.submitting")
          : t("contactPage.submit")}
      </button>

      <p className="mt-3 text-center text-xs text-muted">
        {t("contactPage.coverage")}
      </p>
    </form>
  );
}
