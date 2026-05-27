import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { Hero } from "@/components/marketing/Hero";
import { PracticeCard } from "@/components/marketing/PracticeCard";
import { LawyerCard } from "@/components/marketing/LawyerCard";
import { InsightCard } from "@/components/marketing/InsightCard";
import { MarqueeAffiliations } from "@/components/marketing/MarqueeAffiliations";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { practices } from "@/content/practices";
import { lawyers } from "@/content/lawyers";
import { insights } from "@/content/insights";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Theotis Mutemi Legal Practitioners",
  path: "/",
});

const featuredLawyers = lawyers.filter((l) => l.isPartner).slice(0, 3);
const featuredInsights = insights.slice(0, 3);

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 02 — Introducing the firm ----------------------------------- */}
      <section className="py-24 md:py-32 lg:py-40">
        <Container className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <SectionNumeral n="01" label="The firm" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <Eyebrow>Introducing the firm</Eyebrow>
              <Heading level={1} className="mt-8 max-w-[18ch]">
                We epitomize legal excellence, offering a comprehensive suite
                of services tailored to meet the intricate needs of businesses.
              </Heading>
              <p className="mt-10 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-mute)]">
                With a focus on precision, expertise, and unwavering
                dedication, we are your premier partner in navigating the
                complex legal landscape.
              </p>
              <div className="mt-10">
                <ArrowLink href="/about">More about the firm</ArrowLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 03 — Practice areas ----------------------------------------- */}
      <section className="border-t border-[color:var(--color-ink)]/12 bg-[color:var(--color-bone)]/40 py-24 md:py-32 lg:py-40">
        <Container className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <SectionNumeral n="02" label="Our expertise" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <Heading level={2} className="max-w-[20ch]">
              Three departments, working as one.
            </Heading>
            <Stagger
              className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-3"
              step={0.08}
            >
              {practices.map((p) => (
                <StaggerItem key={p.slug}>
                  <PracticeCard practice={p} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* 04 — Why partner with us ------------------------------------ */}
      <section className="py-24 md:py-32 lg:py-40">
        <Container className="grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-7">
            <SectionNumeral n="03" label="Why partner with us" />
            <Heading level={2} className="mt-8 max-w-[20ch]">
              We understand the corporate world&rsquo;s demands and complexities.
            </Heading>
            <p className="mt-10 max-w-[58ch] text-lg leading-relaxed text-[color:var(--color-mute)]">
              Our team of seasoned professionals combines legal expertise with
              a corporate mindset to deliver results that align with your
              business objectives. Whether you seek proactive legal advice or
              robust representation in litigation, we are committed to
              exceeding your expectations.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5">
            <dl className="grid grid-cols-2 gap-px bg-[color:var(--color-ink)]/12">
              <Stat label="Lead partner experience" value="28+ yrs" />
              <Stat label="Recognition" value="Chambers 2026" />
              <Stat label="Corporate units" value="13" />
              <Stat label="Affiliations" value="International" />
            </dl>
          </div>
        </Container>
      </section>

      {/* 05 — Featured lawyers --------------------------------------- */}
      <section className="border-t border-[color:var(--color-ink)]/12 py-24 md:py-32 lg:py-40">
        <Container>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-3">
              <SectionNumeral n="04" label="The partners" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <Heading level={2} className="max-w-[16ch]">
                Counsel led by the partners who built it.
              </Heading>
            </div>
          </div>
          <Stagger
            className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3"
            step={0.08}
          >
            {featuredLawyers.map((l) => (
              <StaggerItem key={l.slug}>
                <LawyerCard lawyer={l} />
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-12">
            <ArrowLink href="/people">All people</ArrowLink>
          </div>
        </Container>
      </section>

      {/* 06 — Insights ----------------------------------------------- */}
      <section className="border-t border-[color:var(--color-ink)]/12 bg-[color:var(--color-bone)]/40 py-24 md:py-32 lg:py-40">
        <Container>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-3">
              <SectionNumeral n="05" label="Latest insights" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <Heading level={2} className="max-w-[20ch]">
                What we&rsquo;re watching in Zambian law.
              </Heading>
            </div>
          </div>
          <Stagger
            className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3"
            step={0.08}
          >
            {featuredInsights.map((i) => (
              <StaggerItem key={i.slug}>
                <InsightCard insight={i} />
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-12">
            <ArrowLink href="/insights">All insights</ArrowLink>
          </div>
        </Container>
      </section>

      {/* 07 — Affiliations marquee ----------------------------------- */}
      <MarqueeAffiliations />

      {/* 08 — Contact CTA strip -------------------------------------- */}
      <section className="bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
        <Container className="flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
          <p className="font-display text-3xl leading-tight md:text-4xl md:max-w-[24ch]">
            Ready to elevate your business with top-tier legal solutions?
          </p>
          <ArrowLink
            href="/contact"
            className="text-[color:var(--color-paper)]"
          >
            Speak with us
          </ArrowLink>
        </Container>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[color:var(--color-paper)] p-6 md:p-8">
      <dt className="label-mono text-[color:var(--color-mute)]">{label}</dt>
      <dd className="mt-3 font-display text-3xl leading-none">{value}</dd>
    </div>
  );
}
