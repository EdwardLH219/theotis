import { Container } from "@/components/ui/Container";
import { DisplayHeading, Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { LawyerCard } from "@/components/marketing/LawyerCard";
import { lawyersByDepartment, departments } from "@/content/lawyers";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "People",
  path: "/people",
  description:
    "Meet the partners, associates, and advocates of Theotis Mutemi Legal Practitioners.",
});

export default function PeoplePage() {
  const byDept = lawyersByDepartment();
  return (
    <>
      <section className="pt-28 md:pt-40">
        <Container className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <SectionNumeral n="01" label="People" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <Eyebrow>Our team</Eyebrow>
            <DisplayHeading className="mt-8 max-w-[16ch]">
              The counsel behind the work.
            </DisplayHeading>
          </div>
        </Container>
      </section>

      {departments.map((dept) => {
        const members = byDept[dept];
        if (!members || members.length === 0) return null;
        return (
          <section
            key={dept}
            className="border-t border-[color:var(--color-ink)]/12 py-20 md:py-28"
          >
            <Container>
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 md:col-span-3">
                  <p className="label-mono text-[color:var(--color-mute)]">
                    Department
                  </p>
                  <Heading level={2} className="mt-3">
                    {dept}
                  </Heading>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    {members.map((l) => (
                      <LawyerCard key={l.slug} lawyer={l} />
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
