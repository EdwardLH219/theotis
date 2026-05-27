import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "label-mono inline-flex items-center gap-3 text-[color:var(--color-mute)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="inline-block size-1.5 rounded-full bg-[color:var(--color-gold)]"
      />
      {children}
    </p>
  );
}
