import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { mediaVersion } from "@/data/sections";
import "./globals.css";

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
  title: "Onur Huseyin Kocak - AI Product Engineer",
  description:
    "AI-native product engineer building and shipping iOS, web, automation, and product demo systems from idea to production.",
  openGraph: {
    title: "Onur Huseyin Kocak - AI Product Engineer",
    description:
      "Live AI products, App Store releases, web platforms, and production-ready product demos.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const assetBase = process.env.GITHUB_PAGES === "true" ? "/Contact" : "";
const criticalVideoPreloads = [
  "videos/didnthappen-preview.mp4",
  "videos/dreammining-preview.mp4",
  "videos/promtable-preview.mp4",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        {criticalVideoPreloads.map((path) => (
          <link
            key={path}
            rel="preload"
            as="video"
            href={`${assetBase}/${path}?v=${mediaVersion}`}
            type="video/mp4"
            fetchPriority="high"
          />
        ))}
      </head>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
