import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import type { Lawyer } from "@/content/lawyers";

interface LawyerCardProps {
  lawyer: Lawyer;
  priority?: boolean;
}

export function LawyerCard({ lawyer, priority }: LawyerCardProps) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`/people/${lawyer.slug}`}
        className="relative block overflow-hidden bg-[color:var(--color-bone)]"
        aria-label={`${lawyer.name}, ${lawyer.role}`}
      >
        <div className="aspect-[3/4] w-full">
          <Image
            src={lawyer.portrait}
            alt={`${lawyer.name}, ${lawyer.role}`}
            width={1200}
            height={1600}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            priority={priority}
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-[color:var(--color-ink)]/85 via-[color:var(--color-ink)]/35 to-transparent p-6 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm leading-relaxed text-[color:var(--color-paper)]">
            {lawyer.shortBio}
          </p>
        </div>
      </Link>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <Link
            href={`/people/${lawyer.slug}`}
            className="font-display text-xl leading-tight"
          >
            <span className="gold-underline pb-0.5">{lawyer.name}</span>
          </Link>
          <p className="mt-1 label-mono text-[color:var(--color-mute)]">
            {lawyer.role}
          </p>
        </div>
        {lawyer.linkedin && (
          <a
            href={lawyer.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${lawyer.name} on LinkedIn`}
            className="mt-1 inline-flex size-8 items-center justify-center border border-[color:var(--color-ink)]/12 text-[color:var(--color-ink)]/70 transition-colors hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]"
          >
            <Linkedin className="size-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}
