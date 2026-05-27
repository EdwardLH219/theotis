import Image from "next/image";
import { site } from "@/content/site";

export function MarqueeAffiliations() {
  const items = [...site.affiliations, ...site.affiliations];
  return (
    <div className="overflow-hidden border-y border-[color:var(--color-ink)]/10 bg-[color:var(--color-paper)] py-10">
      <div className="flex w-max items-center gap-16 animate-marquee">
        {items.map((a, i) => (
          <div
            key={`${a.name}-${i}`}
            className="flex h-12 shrink-0 items-center"
            aria-hidden={i >= site.affiliations.length}
          >
            <Image
              src={a.logo}
              alt={i < site.affiliations.length ? a.name : ""}
              width={200}
              height={64}
              className="h-12 w-auto opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
