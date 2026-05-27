import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Heading, DisplayHeading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { JsonLd, personJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { lawyers, getLawyer } from "@/content/lawyers";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return lawyers.map((l) => ({ slug: l.slug }));
}

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const lawyer = getLawyer(slug);
  if (!lawyer) return {};
  return buildMetadata({
    title: lawyer.name,
    path: `/people/${slug}`,
    description: lawyer.shortBio,
  });
}

export default async function LawyerPage({ params }: Params) {
  const { slug } = await params;
  const lawyer = getLawyer(slug);
  if (!lawyer) notFound();

  const otherLawyers = lawyers
    .filter((l) => l.slug !== lawyer.slug && l.department === lawyer.department)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={personJsonLd(lawyer)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "People", path: "/people" },
          { name: lawyer.name, path: `/people/${lawyer.slug}` },
        ])}
      />

      <section className="pt-28 md:pt-40">
        <Container className="grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-5">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[color:var(--color-bone)]">
              <Image
                src={lawyer.portrait}
                alt={`${lawyer.name}, ${lawyer.role}`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <Eyebrow>{lawyer.department}</Eyebrow>
            <DisplayHeading className="mt-6">{lawyer.name}</DisplayHeading>
            <p className="mt-6 label-mono text-[color:var(--color-mute)]">
              {lawyer.role}
            </p>

            <div className="mt-10 max-w-[58ch] space-y-5 text-base leading-relaxed text-[color:var(--color-ink)]/86">
              {lawyer.bio.length === 0 ? (
                <>
                  <p>{lawyer.shortBio}</p>
                  <p className="text-sm italic text-[color:var(--color-mute)]">
                    {/* TODO(content): replace short bio above with verbatim long-form bio from legacy /our-team. */}
                    Full biography to follow.
                  </p>
                </>
              ) : (
                lawyer.bio.map((p, i) => <p key={i}>{p}</p>)
              )}
            </div>

            {lawyer.practice && (
              <div className="mt-10 border-t border-[color:var(--color-ink)]/12 pt-6">
                <p className="label-mono text-[color:var(--color-mute)]">
                  Practice
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {lawyer.practice.map((p) => (
                    <li key={p} className="text-sm">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {lawyer.linkedin && (
              <div className="mt-10">
                <a
                  href={lawyer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em]"
                >
                  <span className="inline-flex size-9 items-center justify-center border border-[color:var(--color-ink)]/15 transition-colors group-hover:border-[color:var(--color-ink)]">
                    <Linkedin className="size-3.5" />
                  </span>
                  <span className="gold-underline pb-1">View LinkedIn profile</span>
                </a>
              </div>
            )}
          </div>
        </Container>
      </section>

      {otherLawyers.length > 0 && (
        <section className="border-t border-[color:var(--color-ink)]/12 mt-24 py-20 md:mt-32">
          <Container>
            <div className="mb-12 flex items-end justify-between">
              <Heading level={2}>Also in {lawyer.department}</Heading>
              <ArrowLink href="/people">All people</ArrowLink>
            </div>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {otherLawyers.map((l) => (
                <Link key={l.slug} href={`/people/${l.slug}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[color:var(--color-bone)]">
                    <Image
                      src={l.portrait}
                      alt={`${l.name}, ${l.role}`}
                      fill
                      sizes="(min-width: 1024px) 30vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-5 font-display text-xl">
                    <span className="gold-underline pb-0.5">{l.name}</span>
                  </p>
                  <p className="label-mono text-[color:var(--color-mute)] mt-1">
                    {l.role}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
