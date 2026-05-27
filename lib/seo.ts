import type { Metadata } from "next";
import { site } from "@/content/site";

interface PageMeta {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

export function buildMetadata({
  title,
  description = site.description,
  path = "/",
  ogImage,
  type = "website",
  publishedTime,
}: PageMeta): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle =
    title === site.name ? title : `${title} — ${site.shortName}`;
  const image =
    ogImage ??
    `/opengraph-image?title=${encodeURIComponent(title)}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      locale: "en_GB",
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
