import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "lg";
}

export function Prose({ children, className, size = "default" }: ProseProps) {
  return (
    <div
      className={cn(
        "prose-editorial",
        size === "lg"
          ? "text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)]"
          : "text-[length:var(--text-body)] leading-[var(--text-body--line-height)]",
        "text-[color:var(--color-ink)]/86",
        className,
      )}
    >
      {children}
    </div>
  );
}
