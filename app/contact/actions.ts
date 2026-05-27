"use server";

import { ContactSchema, type ContactPayload } from "@/lib/contact-schema";
import { site } from "@/content/site";

export interface ContactResult {
  ok: boolean;
  fieldErrors?: Record<string, string>;
  message?: string;
}

export async function submitContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors, message: "Please fix the highlighted fields." };
  }

  // Honeypot — silently succeed without emailing if filled
  if (parsed.data.website) {
    return { ok: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  if (!apiKey) {
    // Not configured yet — accept the submission but log a warning.
    // TODO(deploy): set RESEND_API_KEY and CONTACT_TO_EMAIL in Vercel env.
    console.warn(
      "Contact form submitted but Resend is not configured. Set RESEND_API_KEY.",
    );
    return { ok: true };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const subject = `New enquiry — ${parsed.data.matterType}`;
    const body = renderEmailBody(parsed.data);
    const result = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "no-reply@tmlp.com.zm",
      to,
      replyTo: parsed.data.email,
      subject,
      text: body,
    });
    if (result.error) {
      console.error("Resend error:", result.error);
      return {
        ok: false,
        message: "We couldn't send your message. Please try again or email us directly.",
      };
    }
    return { ok: true };
  } catch (err) {
    console.error("Contact submission failed:", err);
    return {
      ok: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

function renderEmailBody(data: ContactPayload): string {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.organisation ? `Organisation: ${data.organisation}` : "",
    `Matter type: ${data.matterType}`,
    "",
    "Message:",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}
