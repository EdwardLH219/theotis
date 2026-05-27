"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, type ContactPayload } from "@/lib/contact-schema";
import { submitContact } from "@/app/contact/actions";
import { cn } from "@/lib/cn";

const FIELD_LABEL =
  "label-mono block text-[color:var(--color-mute)]";
const INPUT_BASE =
  "mt-3 block w-full border-0 border-b border-[color:var(--color-ink)]/20 bg-transparent py-3 text-base text-[color:var(--color-ink)] placeholder:text-[color:var(--color-mute)]/50 focus:border-[color:var(--color-gold)] focus:outline-none focus:ring-0";

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ContactPayload>({
    resolver: zodResolver(ContactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      organisation: "",
      matterType: "Corporate",
      message: "",
      website: "",
    },
  });

  const onSubmit = (data: ContactPayload) => {
    setSubmitError(null);
    startTransition(async () => {
      const result = await submitContact(data);
      if (result.ok) {
        setSuccess(true);
        reset();
      } else {
        if (result.fieldErrors) {
          for (const [field, msg] of Object.entries(result.fieldErrors)) {
            setError(field as keyof ContactPayload, { message: msg });
          }
        }
        setSubmitError(result.message ?? "Something went wrong.");
      }
    });
  };

  if (success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-[color:var(--color-gold)]/40 bg-[color:var(--color-bone)]/50 p-10"
      >
        <p className="label-mono text-[color:var(--color-mute)]">Received</p>
        <p className="mt-4 font-display text-3xl leading-tight md:text-4xl">
          Thank you.
        </p>
        <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-[color:var(--color-ink)]/86">
          We will respond within one working day. For urgent matters, please
          call our office directly during business hours.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {/* Honeypot — visually hidden, ignored by screen readers and most users */}
      <div className="sr-only" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          {...register("website")}
        />
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <Field
          label="Name"
          id="name"
          error={errors.name?.message}
          {...register("name")}
          autoComplete="name"
          required
        />
        <Field
          label="Email"
          id="email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
          autoComplete="email"
          required
        />
        <Field
          label="Organisation"
          id="organisation"
          error={errors.organisation?.message}
          {...register("organisation")}
          autoComplete="organization"
        />
        <div>
          <label htmlFor="matterType" className={FIELD_LABEL}>
            Matter type
          </label>
          <select
            id="matterType"
            {...register("matterType")}
            className={cn(INPUT_BASE, "appearance-none pr-8")}
          >
            <option value="Corporate">Corporate</option>
            <option value="Litigation">Litigation</option>
            <option value="ADR">ADR</option>
            <option value="Other">Other</option>
          </select>
          {errors.matterType?.message && (
            <p className="mt-2 text-sm text-[color:var(--color-gold-deep)]">
              {errors.matterType.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={FIELD_LABEL}>
          How can we help?
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          className={cn(INPUT_BASE, "min-h-32 resize-y")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message?.message && (
          <p
            id="message-error"
            className="mt-2 text-sm text-[color:var(--color-gold-deep)]"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {submitError && (
        <p role="alert" className="text-sm text-[color:var(--color-gold-deep)]">
          {submitError}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-2 bg-[color:var(--color-ink)] px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-paper)] transition-colors hover:bg-[color:var(--color-line)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send enquiry"}
          <span
            aria-hidden
            className="ml-1 h-px w-6 bg-[color:var(--color-gold)] transition-[width] duration-300 group-hover:w-10"
          />
        </button>
      </div>
    </form>
  );
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const Field = function Field({ label, id, error, type = "text", ...rest }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={FIELD_LABEL}>
        {label}
        {rest.required && (
          <span className="ml-1 text-[color:var(--color-gold)]" aria-hidden>
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        className={INPUT_BASE}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-sm text-[color:var(--color-gold-deep)]"
        >
          {error}
        </p>
      )}
    </div>
  );
};
