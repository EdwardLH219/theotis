import { site } from "@/content/site";
import type { Lawyer } from "@/content/lawyers";
import type { Insight } from "@/content/insights";

export function legalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    email: site.email,
    telephone: site.phones[0],
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.streetAddress,
      addressLocality: site.address.locality,
      postalCode: site.address.postalAddress,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.latitude,
      longitude: site.address.longitude,
    },
    openingHours: "Mo-Fr 08:00-17:00",
    areaServed: "Zambia",
    sameAs: [site.socials.x, site.socials.linkedin],
    serviceType: [
      "Business & Corporate Litigation",
      "Corporate Advisory",
      "Mergers & Acquisitions",
      "Alternative Dispute Resolution",
      "Banking & Finance",
      "Employment & Labour",
      "Mining & Construction",
      "Tax Advisory",
    ],
  };
}

export function personJsonLd(lawyer: Lawyer) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: lawyer.name,
    jobTitle: lawyer.role,
    worksFor: {
      "@type": "LegalService",
      name: site.name,
      url: site.url,
    },
    image: `${site.url}${lawyer.portrait}`,
    url: `${site.url}/people/${lawyer.slug}`,
    ...(lawyer.linkedin ? { sameAs: [lawyer.linkedin] } : {}),
  };
}

export function articleJsonLd(insight: Insight) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    datePublished: insight.publishedAt,
    dateModified: insight.publishedAt,
    description: insight.excerpt,
    image: `${site.url}${insight.cover}`,
    author: {
      "@type": "Organization",
      name: insight.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/brand/tmlp-logo.png`,
      },
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

interface JsonLdProps {
  data: unknown;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
