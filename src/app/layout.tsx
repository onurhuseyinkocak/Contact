import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { mediaVersion, socials } from "@/data/sections";
import "./globals.css";

const sitePath = "/Contact";
const siteTitle = "Onur Huseyin Kocak - AI Product Engineer";
const siteDescription =
  "AI-native product engineer building and shipping iOS, web, automation, and product demo systems from idea to production.";
const ogImage = `${sitePath}/og-image.jpg`;
const siteUrl = "https://onurhuseyinkocak.github.io/Contact/";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onurhuseyinkocak.github.io"),
  title: siteTitle,
  description: siteDescription,
  applicationName: "Onur Huseyin Kocak Portfolio",
  authors: [{ name: "Onur Huseyin Kocak", url: siteUrl }],
  creator: "Onur Huseyin Kocak",
  publisher: "Onur Huseyin Kocak",
  keywords: [
    "AI product engineer",
    "iOS developer",
    "SwiftUI",
    "Next.js",
    "Supabase",
    "AI automation",
    "product engineer portfolio",
  ],
  alternates: {
    canonical: sitePath,
  },
  openGraph: {
    title: siteTitle,
    description: "Live AI products, App Store releases, web platforms, and production-ready product demos.",
    url: sitePath,
    siteName: "Onur Huseyin Kocak Portfolio",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Onur Huseyin Kocak portfolio product demo preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const assetBase = process.env.GITHUB_PAGES === "true" ? sitePath : "";
const criticalVideoPrefetches = [
  "videos/didnthappen-instant.mp4",
  "videos/dreammining-instant.mp4",
  "videos/promtable-instant.mp4",
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Onur Huseyin Kocak",
      url: siteUrl,
      image: "https://onurhuseyinkocak.github.io/Contact/onur-photo.jpg",
      jobTitle: "AI Product Engineer",
      description: siteDescription,
      email: `mailto:${socials.email}`,
      telephone: socials.phone,
      sameAs: [
        socials.linkedin,
        socials.github,
        "https://vibecodingturkey.com",
        "https://promtable.com",
        "https://dream-mining.co",
        "https://xforgea3d.com",
        "https://onarika.net",
      ],
      knowsAbout: [
        "AI product engineering",
        "iOS development",
        "SwiftUI",
        "Next.js",
        "Supabase",
        "AI automation",
        "Product prototyping",
      ],
    },
    {
      "@type": "WebSite",
      name: "Onur Huseyin Kocak Portfolio",
      url: siteUrl,
      description: siteDescription,
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {criticalVideoPrefetches.map((path) => (
          <link
            key={path}
            rel="prefetch"
            href={`${assetBase}/${path}?v=${mediaVersion}`}
            type="video/mp4"
          />
        ))}
      </head>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
