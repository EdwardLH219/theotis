import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PracticeArea } from "@/content/practices";

interface PracticeCardProps {
  practice: PracticeArea;
}

export function PracticeCard({ practice }: PracticeCardProps) {
  return (
    <Link
      href={`/expertise/${practice.slug}`}
      className="group block border-t border-[color:var(--color-ink)]/12 pt-8 transition-colors hover:border-[color:var(--color-ink)]"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <p className="font-mono text-sm tabular-nums text-[color:var(--color-gold)]">
            {practice.number}.
          </p>
          <h3 className="mt-6 font-display text-3xl leading-tight md:text-4xl">
            <span className="gold-underline pb-1">{practice.title}</span>
          </h3>
          <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-[color:var(--color-mute)]">
            {practice.summary}
          </p>
        </div>
        <ArrowUpRight
          aria-hidden
          className="mt-2 size-5 shrink-0 text-[color:var(--color-ink)]/60 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--color-gold-deep)]"
        />
      </div>
    </Link>
  );
}
