export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO date
  author: string;
  cover: string;
  readingTimeMinutes: number;
}

export const insights: Insight[] = [
  {
    slug: "zambias-draft-adr-bill-2026",
    title: "Zambia's Draft ADR Bill 2026 — What It Means for Businesses",
    excerpt:
      "A first look at the Draft Alternative Dispute Resolution Bill and the practical impact for corporates operating in Zambia.",
    publishedAt: "2026-02-14",
    author: "Theotis Mutemi Legal Practitioners",
    cover: "/images/insights/zambias-draft-adr-bill-2026.jpg",
    readingTimeMinutes: 6,
  },
  {
    slug: "road-traffic-offences-zambia-vehicle-impound",
    title: "Road Traffic Offences in Zambia: When Can Your Vehicle Be Impounded?",
    excerpt:
      "When the RTSA may impound a vehicle, what your rights are, and the recovery process under current Zambian law.",
    publishedAt: "2026-01-09",
    author: "Theotis Mutemi Legal Practitioners",
    cover: "/images/insights/road-traffic-offences-zambia-vehicle-impound.jpg",
    readingTimeMinutes: 5,
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
