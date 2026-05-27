import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DisplayHeading, Heading } from "@/components/ui/Heading";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  path: "/about",
  description:
    "A premier Zambian law firm recognised for exceptional legal and consultancy services, with nearly four decades of combined partner experience.",
});

const VALUES = [
  {
    n: "I",
    title: "Tenacity & Teamwork",
    body: "We work hard, together, until the result is right.",
  },
  {
    n: "II",
    title: "Mastery",
    body: "We treat the practice of law as a craft — never finished, always sharpened.",
  },
  {
    n: "III",
    title: "Leadership",
    body: "We hold ourselves to the standards expected of the institutions we advise.",
  },
  {
    n: "IV",
    title: "Precision & Principle",
    body: "Accurate work, clearly reasoned, and delivered with personal integrity.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-28 md:pt-40">
        <Container className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <SectionNumeral n="01" label="About" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <Eyebrow>About the firm</Eyebrow>
            <DisplayHeading className="mt-8">A premier Zambian law firm.</DisplayHeading>
            <p className="mt-10 max-w-[58ch] text-lg leading-relaxed text-[color:var(--color-mute)]">
              Theotis Mutemi Legal Practitioners is a premier law firm in
              Zambia, recognized for exceptional legal and consultancy
              services. With nearly four decades of combined experience among
              our partners, we excel in delivering tailored solutions across
              various areas of law. Under the visionary leadership of our
              Managing Partner, Anne Desiree Armanda Theotis, we are dedicated
              to achieving optimal outcomes for our clients while upholding the
              highest standards of professionalism and integrity.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 lg:py-40">
        <Container>
          <Reveal>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[color:var(--color-bone)]">
              <Image
                src="/images/_FFM7070-Edit.jpg"
                alt="A candid view of the TMLP office in Lusaka"
                fill
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 md:py-32 lg:py-40">
        <Container className="grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-4">
            <SectionNumeral n="02" label="Vision · Mission · Legacy" />
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="space-y-12">
              <div>
                <Heading level={3} className="text-[color:var(--color-gold-deep)]">
                  Vision
                </Heading>
                <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-[color:var(--color-ink)]/86">
                  To be Zambia&rsquo;s most trusted firm for businesses making
                  consequential decisions — across borders, sectors, and
                  generations.
                  {/* TODO(content): replace with verbatim vision statement from legacy /about-us. */}
                </p>
              </div>
              <div>
                <Heading level={3} className="text-[color:var(--color-gold-deep)]">
                  Mission
                </Heading>
                <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-[color:var(--color-ink)]/86">
                  To pair rigorous legal craftsmanship with a corporate
                  mindset, so that our advice is both defensible in law and
                  useful in commerce.
                  {/* TODO(content): replace with verbatim mission statement. */}
                </p>
              </div>
              <div>
                <Heading level={3} className="text-[color:var(--color-gold-deep)]">
                  Legacy
                </Heading>
                <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-[color:var(--color-ink)]/86">
                  Nearly four decades of combined partner experience across
                  business litigation, corporate advisory, and alternative
                  dispute resolution — built one matter at a time, in Lusaka.
                  {/* TODO(content): replace with verbatim legacy statement. */}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[color:var(--color-ink)]/12 bg-[color:var(--color-bone)]/40 py-24 md:py-32 lg:py-40">
        <Container className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <SectionNumeral n="03" label="Values" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <Heading level={2} className="max-w-[18ch]">
              Four pillars hold the practice up.
            </Heading>
            <div className="mt-16 grid grid-cols-1 gap-px bg-[color:var(--color-ink)]/12 md:grid-cols-2">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="bg-[color:var(--color-paper)] p-8 md:p-10"
                >
                  <p className="font-display text-4xl text-[color:var(--color-gold)]">
                    {v.n}
                  </p>
                  <Heading level={3} className="mt-6">
                    {v.title}
                  </Heading>
                  <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-[color:var(--color-mute)]">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 lg:py-40">
        <Container className="grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-4">
            <SectionNumeral n="04" label="Affiliations & partnerships" />
          </div>
          <div className="col-span-12 md:col-span-8">
            <Heading level={2}>Global Law Experts</Heading>
            <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-[color:var(--color-ink)]/86">
              {/* TODO(content): replace with verbatim Global Law Experts write-up from legacy /about-us. */}
              Through our membership of Global Law Experts and continuing
              relationships with the Europlaw Group and the Association of
              European Attorneys, we resource cross-border matters with trusted
              counterpart firms across Europe, Africa, and beyond.
            </p>
            <div className="mt-10">
              <ArrowLink href="/contact">Speak with us</ArrowLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
