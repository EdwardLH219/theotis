import { cn } from "@/lib/cn";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "link";

const VARIANTS: Record<Variant, string> = {
  primary:
    "group inline-flex items-center gap-2 bg-[color:var(--color-ink)] text-[color:var(--color-paper)] px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] hover:bg-[color:var(--color-line)] transition-colors duration-300",
  ghost:
    "group inline-flex items-center gap-2 border border-[color:var(--color-ink)]/15 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink)] hover:border-[color:var(--color-ink)] transition-colors duration-300",
  link: "group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink)] hover:text-[color:var(--color-gold-deep)] transition-colors",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

interface ButtonAsButtonProps
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

interface ButtonAsLinkProps
  extends CommonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> {
  href: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className, ...rest } = props;
  const classes = cn(VARIANTS[variant], className);

  const inner = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--color-gold)] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
        />
      </span>
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {inner}
      </Link>
    );
  }
  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {inner}
    </button>
  );
}
