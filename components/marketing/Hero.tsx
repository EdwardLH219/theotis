import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative pt-28 md:pt-40">
      <Container className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <Eyebrow>Theotis Mutemi · Legal Practitioners</Eyebrow>
          <DisplayHeading className="mt-8">
            Counsel for Zambia&rsquo;s most consequential matters.
          </DisplayHeading>
          <p className="mt-10 max-w-[55ch] text-lg leading-relaxed text-[color:var(--color-mute)]">
            {site.description}
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button href="/expertise" variant="primary">
              Explore our expertise
            </Button>
            <Button href="/contact" variant="ghost">
              Speak with us
            </Button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-bone)]">
              <Image
                src="/images/_FFM7051-Edit.jpg"
                alt="The partners of Theotis Mutemi Legal Practitioners"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder="empty"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-5 flex items-center justify-between border-t border-[color:var(--color-gold)]/70 pt-4">
              <span className="label-mono text-[color:var(--color-mute)]">
                Est. — Lusaka
              </span>
              <span className="label-mono text-[color:var(--color-ink)]">
                Chambers &amp; Partners 2026
              </span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
