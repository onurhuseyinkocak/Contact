import type { MetadataRoute } from "next";

const siteUrl = "https://onurhuseyinkocak.github.io/Contact";
const origin = "https://onurhuseyinkocak.github.io";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/Contact/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: origin,
  };
}
