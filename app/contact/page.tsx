import { Container } from "@/components/ui/Container";
import { DisplayHeading, Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { ContactForm } from "@/components/marketing/ContactForm";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  path: "/contact",
  description:
    "Speak with Theotis Mutemi Legal Practitioners. Our office is at No. 13 Benakale Road, Northmead, Lusaka.",
});

const mapsQuery = encodeURIComponent(
  `${site.address.streetAddress}, ${site.address.locality}, ${site.address.country}`,
);

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 md:pt-40">
        <Container className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <SectionNumeral n="01" label="Contact" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <Eyebrow>Engage counsel</Eyebrow>
            <DisplayHeading className="mt-8 max-w-[16ch]">
              Tell us about your matter.
            </DisplayHeading>
            <p className="mt-10 max-w-[52ch] text-lg leading-relaxed text-[color:var(--color-mute)]">
              Send us a short brief and we will respond within one working day.
              For urgent matters please call our office during business hours.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 lg:py-40">
        <Container className="grid grid-cols-12 gap-16">
          <div className="col-span-12 md:col-span-7">
            <ContactForm />
          </div>
          <aside className="col-span-12 md:col-span-5">
            <div className="border-t border-[color:var(--color-ink)]/12 pt-8">
              <Heading level={3}>The office</Heading>
              <address className="mt-6 not-italic text-base leading-relaxed text-[color:var(--color-ink)]/86">
                {site.address.streetAddress}
                <br />
                {site.address.postalAddress}
                <br />
                {site.address.locality}, {site.address.country}
              </address>
              <dl className="mt-8 space-y-4 text-sm">
                <div>
                  <dt className="label-mono text-[color:var(--color-mute)]">
                    Hours
                  </dt>
                  <dd className="mt-1">{site.hours}</dd>
                </div>
                <div>
                  <dt className="label-mono text-[color:var(--color-mute)]">
                    Phone
                  </dt>
                  <dd className="mt-1 space-y-1">
                    {site.phones.map((p) => (
                      <div key={p}>
                        <a href={`tel:${p.replace(/\s/g, "")}`}>{p}</a>
                      </div>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="label-mono text-[color:var(--color-mute)]">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </dd>
                </div>
              </dl>
              <div className="mt-10">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]"
                >
                  <span className="gold-underline pb-1">Open in maps →</span>
                </a>
              </div>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
