import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <section className="py-32">
      <Container className="max-w-2xl text-center">
        <Eyebrow>404</Eyebrow>
        <DisplayHeading className="mt-8">Page not found.</DisplayHeading>
        <p className="mt-8 text-lg text-[color:var(--color-mute)]">
          The page you&rsquo;re looking for isn&rsquo;t here. Let&rsquo;s get
          you back on track.
        </p>
        <div className="mt-10 inline-flex justify-center">
          <ArrowLink href="/">Return home</ArrowLink>
        </div>
        <p className="mt-12 text-sm text-[color:var(--color-mute)]">
          Or try{" "}
          <Link
            href="/expertise"
            className="text-[color:var(--color-ink)] underline decoration-[color:var(--color-gold)] underline-offset-4"
          >
            our expertise
          </Link>
          ,{" "}
          <Link
            href="/people"
            className="text-[color:var(--color-ink)] underline decoration-[color:var(--color-gold)] underline-offset-4"
          >
            people
          </Link>
          , or{" "}
          <Link
            href="/insights"
            className="text-[color:var(--color-ink)] underline decoration-[color:var(--color-gold)] underline-offset-4"
          >
            insights
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
