import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <section className="pt-28 md:pt-40 pb-24">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <DisplayHeading className="mt-8">Terms of Use</DisplayHeading>
        <p className="mt-10 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-mute)]">
          {/* TODO(legal): replace with the firm's final terms of use. */}
          Final terms of use will be published here prior to launch. Content on
          this website is for general information only and does not constitute
          legal advice.
        </p>
      </Container>
    </section>
  );
}
