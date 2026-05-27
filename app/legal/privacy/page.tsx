import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="pt-28 md:pt-40 pb-24">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <DisplayHeading className="mt-8">Privacy Policy</DisplayHeading>
        <p className="mt-10 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-mute)]">
          {/* TODO(legal): replace this page with a final privacy policy approved
              by the firm prior to launch. */}
          A full privacy policy will be published here. Until then, please
          contact us at <a href="mailto:info@tmlp.com.zm">info@tmlp.com.zm</a>{" "}
          with any questions about how we handle personal information.
        </p>
      </Container>
    </section>
  );
}
