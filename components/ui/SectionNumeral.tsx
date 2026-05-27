import { cn } from "@/lib/cn";

interface SectionNumeralProps {
  n: string;
  label: string;
  className?: string;
}

export function SectionNumeral({ n, label, className }: SectionNumeralProps) {
  return (
    <div
      className={cn(
        "flex items-baseline gap-4 text-[color:var(--color-mute)]",
        className,
      )}
    >
      <span className="font-mono text-sm tabular-nums text-[color:var(--color-gold)]">
        {n}.
      </span>
      <span className="label-mono">{label}</span>
    </div>
  );
}
