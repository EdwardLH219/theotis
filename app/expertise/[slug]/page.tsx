import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { DisplayHeading, Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { practices } from "@/content/practices";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return practices.map((p) => ({ slug: p.slug }));
}

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const practice = practices.find((p) => p.slug === slug);
  if (!practice) return {};
  return buildMetadata({
    title: practice.title,
    path: `/expertise/${practice.slug}`,
    description: practice.summary,
  });
}

export default async function PracticePage({ params }: Params) {
  const { slug } = await params;
  const practice = practices.find((p) => p.slug === slug);
  if (!practice) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Expertise", path: "/expertise" },
          { name: practice.title, path: `/expertise/${practice.slug}` },
        ])}
      />

      <section className="pt-28 md:pt-40">
        <Container className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <SectionNumeral n={practice.number} label="Practice area" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <Eyebrow>Expertise</Eyebrow>
            <DisplayHeading className="mt-8 max-w-[16ch]">
              {practice.title}
            </DisplayHeading>
            <p className="mt-10 max-w-[58ch] text-lg leading-relaxed text-[color:var(--color-mute)]">
              {practice.summary}
            </p>
          </div>
        </Container>
      </section>

      {practice.image && (
        <section className="pt-16">
          <Container>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[color:var(--color-bone)]">
              <Image
                src={practice.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
          </Container>
        </section>
      )}

      <section className="py-24 md:py-32 lg:py-40">
        <Container className="grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-4">
            <SectionNumeral n="01" label="Approach" />
          </div>
          <div className="col-span-12 md:col-span-8">
            <Heading level={2} className="max-w-[22ch]">
              How we work in {practice.shortTitle.toLowerCase()}.
            </Heading>
            <p className="mt-8 max-w-[60ch] text-base leading-relaxed text-[color:var(--color-ink)]/86">
              {practice.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-[color:var(--color-ink)]/12 bg-[color:var(--color-bone)]/40 py-24 md:py-32 lg:py-40">
        <Container className="grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-4">
            <SectionNumeral n="02" label="Sub-areas" />
            <Heading level={2} className="mt-6 max-w-[14ch]">
              Areas we cover.
            </Heading>
          </div>
          <div className="col-span-12 md:col-span-8">
            <ul className="border-t border-[color:var(--color-ink)]/12">
              {practice.subAreas.map((s) => (
                <li
                  key={s.numeral}
                  id={s.numeral.toLowerCase()}
                  className="grid grid-cols-12 gap-6 border-b border-[color:var(--color-ink)]/12 py-8"
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-mono text-sm text-[color:var(--color-gold)]">
                      {s.numeral}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-11">
                    <Heading level={3}>{s.title}</Heading>
                    {s.summary && (
                      <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-[color:var(--color-mute)]">
                        {s.summary}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 lg:py-40">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Heading level={2} className="max-w-[22ch]">
            Have a {practice.shortTitle.toLowerCase()} matter you would like to
            discuss?
          </Heading>
          <ArrowLink href="/contact">Engage counsel</ArrowLink>
        </Container>
      </section>
    </>
  );
}
