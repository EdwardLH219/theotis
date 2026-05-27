import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { InsightCard } from "@/components/marketing/InsightCard";
import { insights } from "@/content/insights";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights",
  path: "/insights",
  description:
    "Articles, briefings, and analysis from Theotis Mutemi Legal Practitioners on developments in Zambian and regional law.",
});

export default function InsightsPage() {
  return (
    <>
      <section className="pt-28 md:pt-40">
        <Container className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <SectionNumeral n="01" label="Insights" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <Eyebrow>Stay informed</Eyebrow>
            <DisplayHeading className="mt-8 max-w-[16ch]">
              What we&rsquo;re watching in Zambian law.
            </DisplayHeading>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 lg:py-40">
        <Container>
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {insights.map((i) => (
              <InsightCard key={i.slug} insight={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
