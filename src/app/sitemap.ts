import type { MetadataRoute } from "next";

const siteUrl = "https://onurhuseyinkocak.github.io/Contact";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: "2026-06-02",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
