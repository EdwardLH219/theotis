import { notFound } from "next/navigation";
import Image from "next/image";
import path from "node:path";
import fs from "node:fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { insights, getInsight } from "@/content/insights";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

interface Params {
  params: Promise<{ slug: string }>;
}

const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

async function readMdx(slug: string): Promise<string | null> {
  const filePath = path.join(
    process.cwd(),
    "content",
    "insights",
    `${slug}.mdx`,
  );
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return buildMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${slug}`,
    type: "article",
    publishedTime: insight.publishedAt,
  });
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display text-3xl mt-12 mb-4 leading-tight" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display text-2xl mt-12 mb-4 leading-tight" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-display text-xl mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 max-w-[65ch] leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 list-disc space-y-2 pl-6 max-w-[65ch]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 list-decimal space-y-2 pl-6 max-w-[65ch]" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
};

export default async function InsightPage({ params }: Params) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const source = await readMdx(slug);
  const body = source
    ? await compileMDX({
        source,
        components: mdxComponents,
        options: { parseFrontmatter: true },
      })
    : null;

  return (
    <article>
      <JsonLd data={articleJsonLd(insight)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: insight.title, path: `/insights/${slug}` },
        ])}
      />

      <section className="pt-28 md:pt-40">
        <Container className="max-w-3xl">
          <Eyebrow>Insights</Eyebrow>
          <DisplayHeading className="mt-8 text-balance">
            {insight.title}
          </DisplayHeading>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <time
              dateTime={insight.publishedAt}
              className="label-mono text-[color:var(--color-mute)]"
            >
              {formatter.format(new Date(insight.publishedAt))}
            </time>
            <span className="label-mono text-[color:var(--color-mute)]">
              {insight.readingTimeMinutes} min read
            </span>
            <span className="label-mono text-[color:var(--color-mute)]">
              {insight.author}
            </span>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[color:var(--color-bone)]">
            <Image
              src={insight.cover}
              alt=""
              fill
              priority
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32 lg:pb-40">
        <Container className="max-w-3xl">
          {body ? (
            <div className="prose-editorial text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-ink)]/86">
              {body.content}
            </div>
          ) : (
            <p>{insight.excerpt}</p>
          )}

          <div className="mt-16 border-t border-[color:var(--color-ink)]/12 pt-8">
            <ArrowLink href="/insights">All insights</ArrowLink>
          </div>
        </Container>
      </section>
    </article>
  );
}
