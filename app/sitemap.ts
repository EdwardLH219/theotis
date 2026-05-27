import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { lawyers } from "@/content/lawyers";
import { practices } from "@/content/practices";
import { insights } from "@/content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();
  const staticPaths = [
    "",
    "/about",
    "/expertise",
    "/people",
    "/insights",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: today,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  return [
    ...staticPaths,
    ...practices.map((p) => ({
      url: `${site.url}/expertise/${p.slug}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...lawyers.map((l) => ({
      url: `${site.url}/people/${l.slug}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...insights.map((i) => ({
      url: `${site.url}/insights/${i.slug}`,
      lastModified: new Date(i.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
