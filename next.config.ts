import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath: "/Contact",
        assetPrefix: "/Contact/",
        trailingSlash: true,
      }
    : {}),
  devIndicators: false,
};

export default nextConfig;
