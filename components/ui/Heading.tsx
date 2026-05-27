import { cn } from "@/lib/cn";
import type { ElementType, ReactNode } from "react";

interface DisplayHeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}

export function DisplayHeading({
  children,
  className,
  as: Tag = "h1",
}: DisplayHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display text-[length:var(--text-display)] leading-[var(--text-display--line-height)] tracking-[var(--text-display--letter-spacing)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

interface HeadingProps {
  level: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}

const HEADING_STYLES = {
  1: "text-[length:var(--text-h1)] leading-[var(--text-h1--line-height)] tracking-[var(--text-h1--letter-spacing)]",
  2: "text-[length:var(--text-h2)] leading-[var(--text-h2--line-height)] tracking-[var(--text-h2--letter-spacing)]",
  3: "text-[length:var(--text-h3)] leading-[var(--text-h3--line-height)]",
  4: "text-xl leading-tight",
} as const;

export function Heading({ level, children, className }: HeadingProps) {
  const Tag = `h${level}` as ElementType;
  return (
    <Tag className={cn("font-display", HEADING_STYLES[level], className)}>
      {children}
    </Tag>
  );
}
