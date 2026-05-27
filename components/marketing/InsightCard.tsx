import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Insight } from "@/content/insights";

interface InsightCardProps {
  insight: Insight;
}

const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group block"
      aria-label={insight.title}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--color-bone)]">
        <Image
          src={insight.cover}
          alt=""
          width={1600}
          height={900}
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 90vw"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex items-center justify-between text-xs">
        <time
          dateTime={insight.publishedAt}
          className="label-mono text-[color:var(--color-mute)]"
        >
          {formatter.format(new Date(insight.publishedAt))}
        </time>
        <span className="label-mono text-[color:var(--color-mute)]">
          {insight.readingTimeMinutes} min read
        </span>
      </div>
      <h3 className="mt-3 font-display text-2xl leading-tight">
        <span className="gold-underline pb-0.5">{insight.title}</span>
      </h3>
      <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-[color:var(--color-mute)]">
        {insight.excerpt}
      </p>
      <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
        Read
        <ArrowUpRight
          aria-hidden
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
