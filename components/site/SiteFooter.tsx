import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { practices } from "@/content/practices";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
      <Container className="py-20 md:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl leading-tight">
              Theotis Mutemi
              <br />
              Legal Practitioners
            </p>
            <p className="mt-4 max-w-[40ch] text-sm text-[color:var(--color-paper)]/70">
              {site.description}
            </p>
            <p className="label-mono mt-8 text-[color:var(--color-paper)]/60">
              Est. — Lusaka
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="label-mono text-[color:var(--color-paper)]/60">
              Office
            </p>
            <address className="mt-4 not-italic text-sm leading-relaxed text-[color:var(--color-paper)]/80">
              {site.address.streetAddress}
              <br />
              {site.address.postalAddress}
              <br />
              {site.address.locality}, {site.address.country}
            </address>
            <p className="mt-4 text-sm text-[color:var(--color-paper)]/70">
              {site.hours}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="label-mono text-[color:var(--color-paper)]/60">
              Contact
            </p>
            <ul className="mt-4 space-y-1 text-sm text-[color:var(--color-paper)]/80">
              {site.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, "")}`}>{p}</a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
            <p className="label-mono mt-6 text-[color:var(--color-paper)]/60">
              Follow
            </p>
            <ul className="mt-3 space-y-1 text-sm text-[color:var(--color-paper)]/80">
              <li>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={site.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="label-mono text-[color:var(--color-paper)]/60">
              Expertise
            </p>
            <ul className="mt-4 space-y-1 text-sm">
              {practices.map((p) => (
                <li key={p.slug}>
                  <Link href={`/expertise/${p.slug}`} className="hover:text-[color:var(--color-gold)]">
                    {p.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="label-mono mt-6 text-[color:var(--color-paper)]/60">
              Affiliations
            </p>
            <ul className="mt-3 space-y-1 text-sm text-[color:var(--color-paper)]/80">
              {site.affiliations.map((a) => (
                <li key={a.name}>{a.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-[color:var(--color-paper)]/15 pt-8 text-xs text-[color:var(--color-paper)]/60 md:flex-row md:items-center">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/legal/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/legal/terms">Terms</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
