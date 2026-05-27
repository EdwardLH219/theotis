import { cn } from "@/lib/cn";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  variant?: "default" | "subtle";
}

export function ArrowLink({
  href,
  children,
  className,
  external,
  variant = "default",
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-2",
        variant === "default"
          ? "font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink)]"
          : "text-base text-[color:var(--color-ink)]",
        "transition-colors hover:text-[color:var(--color-gold-deep)]",
        className,
      )}
    >
      <span className="gold-underline pb-1">{children}</span>
      <ArrowUpRight
        aria-hidden
        className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
