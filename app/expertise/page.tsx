import { Container } from "@/components/ui/Container";
import { DisplayHeading, Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { PracticeCard } from "@/components/marketing/PracticeCard";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { practices } from "@/content/practices";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Expertise",
  path: "/expertise",
  description:
    "Three departments and thirteen specialised corporate units. Browse TMLP's full practice across litigation, corporate, and alternative dispute resolution.",
});

export default function ExpertiseIndexPage() {
  return (
    <>
      <section className="pt-28 md:pt-40">
        <Container className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <SectionNumeral n="01" label="Expertise" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <Eyebrow>Practice areas</Eyebrow>
            <DisplayHeading className="mt-8 max-w-[16ch]">
              Three departments. Thirteen specialised units.
            </DisplayHeading>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 lg:py-40">
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
            {practices.map((p) => (
              <PracticeCard key={p.slug} practice={p} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[color:var(--color-ink)]/12 bg-[color:var(--color-bone)]/40 py-24 md:py-32 lg:py-40">
        <Container className="grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-4">
            <SectionNumeral n="02" label="Corporate sub-units" />
            <Heading level={2} className="mt-6 max-w-[14ch]">
              The thirteen corporate disciplines.
            </Heading>
            <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-[color:var(--color-mute)]">
              Each unit is led by counsel who has spent their career on the
              specialised body of law it covers.
            </p>
            <div className="mt-8">
              <ArrowLink href="/expertise/corporate">
                Open the corporate practice
              </ArrowLink>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <ul className="grid grid-cols-1 gap-px bg-[color:var(--color-ink)]/12 md:grid-cols-2">
              {practices
                .find((p) => p.slug === "corporate")!
                .subAreas.map((s) => (
                  <li
                    key={s.numeral}
                    className="bg-[color:var(--color-paper)] p-5"
                  >
                    <span className="font-mono text-xs text-[color:var(--color-gold)]">
                      {s.numeral}
                    </span>
                    <p className="mt-1 text-sm font-medium leading-snug">
                      {s.title}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
