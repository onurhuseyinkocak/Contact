export interface Section {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  characterImage: string;
  characterAlt: string;
  backgroundImage: string;
  backgroundGradient: string;
  accentColor: string;
  accentGlow: string;
  projectScreenshot: string;
  flipBackContent: string;
  floatingObjects: string[];
  url?: string;
  iosUrl?: string;
  linkLabel?: string;
  iosLabel?: string;
  role?: string;
  stack?: string[];
  status?: string;
  outcome?: string;
  caseStudy?: {
    problem: string;
    build: string;
    result: string;
  };
  proofPoints?: string[];
  videoSrc?: string;
  videoPoster?: string;
  videoOrientation?: "phone" | "desktop";
  characterRotation?: number;
  characterScale?: number;
}

export const mediaVersion = "20260602-hard-start";
const media = (path: string) => `${path}?v=${mediaVersion}`;

export const sections: Section[] = [
  {
    id: "hero",
    title: "AI iOS & web products,",
    subtitle: "shipped from idea to production.",
    description:
      "I design, build, and launch production apps with AI agents, SwiftUI, Next.js, Supabase, and a product-first execution loop.",
    characterImage: "/images/onur/hero-suit.png",
    characterAlt: "Onur in a premium suit, greeting",
    backgroundImage: "/images/backgrounds/hero-command-room.jpg",
    backgroundGradient:
      "radial-gradient(ellipse at 30% 50%, #0a1628 0%, #050a14 40%, #000000 100%)",
    accentColor: "#60a5fa",
    accentGlow: "rgba(96, 165, 250, 0.15)",
    projectScreenshot: "",
    flipBackContent: "",
    floatingObjects: [
      "/images/objects/terminal.png",
      "/images/objects/ai-chip.png",
    ],
    proofPoints: [
      "Founder-level product ownership",
      "Live links, demos, App Store releases",
      "AI-native build workflow",
    ],
    videoSrc: media("videos/vibecodingturkey-instant.mp4"),
    videoPoster: media("posters/vibecodingturkey-demo.jpg"),
    videoOrientation: "desktop",
    characterScale: 1.05,
  },
  {
    id: "didnthappen",
    title: "Didn't Happen",
    subtitle: "CBT-informed anxiety evidence tracker",
    description:
      "A CBT-informed app that helps people see how often feared outcomes do not happen. Track worries, collect proof, and practice evidence-based reframing.",
    characterImage: "/images/onur/didnthappen-detective.png",
    characterAlt: "Onur as a calm anxiety detective",
    backgroundImage: "/images/backgrounds/didnthappen-evidence-room.jpg",
    backgroundGradient:
      "radial-gradient(ellipse at 70% 40%, #1a1040 0%, #0d0820 40%, #050510 100%)",
    accentColor: "#a78bfa",
    accentGlow: "rgba(167, 139, 250, 0.15)",
    projectScreenshot: "/images/projects/didnthappen-screenshot.png",
    flipBackContent:
      "Built with SwiftUI + SwiftData. Adapty for subscriptions. Shipped to App Store with 175-territory paywall. The idea came from my own anxiety patterns.",
    floatingObjects: [
      "/images/objects/worry-bubble.png",
      "/images/objects/checkmark.png",
      "/images/objects/proof-card.png",
    ],
    url: "https://apps.apple.com/app/didnt-happen/id6762467761",
    linkLabel: "Open App Store",
    role: "Founder / iOS engineer",
    stack: ["SwiftUI", "SwiftData", "Adapty"],
    status: "App Store",
    outcome: "A worry-to-proof habit loop with subscription-ready monetization.",
    caseStudy: {
      problem:
        "Anxiety apps often miss the CBT principle that evidence review can weaken catastrophic predictions.",
      build:
        "Built a SwiftUI + SwiftData worry log around CBT-style cognitive reframing, proof review, and Adapty monetization.",
      result:
        "Shipped to App Store as an evidence-informed worry-to-proof product with subscription plumbing.",
    },
    videoSrc: media("videos/didnthappen-instant.mp4"),
    videoPoster: media("posters/didnthappen-demo.jpg"),
    videoOrientation: "phone",
    characterRotation: -2,
  },
  {
    id: "dreammining",
    title: "Dream Mining",
    subtitle: "AI Jungian dream analysis",
    description:
      "Dream cards, psyche maps, voice dream logging. Mine the depths of your subconscious with AI-powered Jungian analysis.",
    characterImage: "/images/onur/dreammining-explorer.png",
    characterAlt: "Onur as a dream explorer",
    backgroundImage: "/images/backgrounds/dreammining-cave.jpg",
    backgroundGradient:
      "radial-gradient(ellipse at 40% 60%, #1a0a2e 0%, #0d0518 40%, #050008 100%)",
    accentColor: "#c084fc",
    accentGlow: "rgba(192, 132, 252, 0.15)",
    projectScreenshot: "/images/projects/dreammining-screenshot.png",
    flipBackContent:
      "Cross-platform: iOS + Android + Web. AI dream interpretation engine. Dream cards with symbolic archetypes. Voice-to-dream logging with Whisper.",
    floatingObjects: [
      "/images/objects/dream-card.png",
      "/images/objects/moon.png",
      "/images/objects/psyche-map.png",
    ],
    url: "https://dream-mining.co",
    linkLabel: "Open Web",
    role: "Founder / AI product builder",
    stack: ["iOS", "Android", "Web", "Whisper"],
    status: "Live web",
    outcome: "Voice dream logging and symbolic AI interpretation across platforms.",
    caseStudy: {
      problem:
        "Dream journals are passive; users need capture, memory, and interpretation in one flow.",
      build:
        "Built dream logging, AI Jungian analysis, card views, psyche maps, and voice input.",
      result:
        "Live web experience that turns dream entries into reusable symbolic insight.",
    },
    videoSrc: media("videos/dreammining-instant.mp4"),
    videoPoster: media("posters/dreammining-demo.jpg"),
    videoOrientation: "desktop",
    characterRotation: 3,
    characterScale: 1.02,
  },
  {
    id: "promtable",
    title: "Promtable",
    subtitle: "Web + iOS prompt vault",
    description:
      "A vault of prompts that actually work. Discover, copy, and share battle-tested prompts across every AI model.",
    characterImage: "/images/onur/promtable-vault.png",
    characterAlt: "Onur as prompt vault master",
    backgroundImage: "/images/backgrounds/promtable-vault.jpg",
    backgroundGradient:
      "radial-gradient(ellipse at 60% 50%, #0a1a10 0%, #050d08 40%, #000500 100%)",
    accentColor: "#4ade80",
    accentGlow: "rgba(74, 222, 128, 0.15)",
    projectScreenshot: "/images/projects/promtable-screenshot.png",
    flipBackContent:
      "Next.js + Supabase. Community-driven prompt sharing. Categories, tags, copy-to-clipboard, usage stats. Growing prompt library.",
    floatingObjects: [
      "/images/objects/prompt-card.png",
      "/images/objects/vault.png",
      "/images/objects/command-line.png",
    ],
    url: "https://promtable.com",
    linkLabel: "Open Web",
    iosUrl: "https://apps.apple.com/app/id6770004106",
    iosLabel: "Open iOS App",
    role: "Founder / full-stack builder",
    stack: ["Next.js", "Supabase", "SwiftUI"],
    status: "Web + App Store",
    outcome: "Prompt discovery, copy/share flows, and a growing reusable prompt library.",
    caseStudy: {
      problem:
        "Useful prompts are scattered and hard to reuse across models and workflows.",
      build:
        "Built web + iOS prompt discovery with Supabase, tags, copy, share, and library flows.",
      result:
        "Shipped live web and App Store surfaces for reusable, battle-tested prompts.",
    },
    videoSrc: media("videos/promtable-instant.mp4"),
    videoPoster: media("posters/promtable-demo.jpg"),
    videoOrientation: "phone",
    characterRotation: -1,
  },
  {
    id: "vibecodingturkey",
    title: "Vibe Coding Turkey",
    subtitle: "AI coding education platform",
    description:
      "Teaching people to build real apps with natural language, Claude Code, AI agents, and product-first execution. A classroom on the moon.",
    characterImage: "/images/onur/vibecodingturkey-astronaut.png",
    characterAlt: "Onur as astronaut mentor on the moon",
    backgroundImage: "/images/backgrounds/vibecodingturkey-moon.jpg",
    backgroundGradient:
      "radial-gradient(ellipse at 50% 30%, #141428 0%, #0a0a18 40%, #020208 100%)",
    accentColor: "#38bdf8",
    accentGlow: "rgba(56, 189, 248, 0.15)",
    projectScreenshot: "/images/projects/vibecodingturkey-screenshot.png",
    flipBackContent:
      "Next.js platform. Idea > Prompt > Agent > Build > Debug > Ship pipeline. Live community. First vibe coding platform in Turkey.",
    floatingObjects: [
      "/images/objects/laptop.png",
      "/images/objects/rocket.png",
      "/images/objects/code-block.png",
    ],
    url: "https://vibecodingturkey.com",
    linkLabel: "Open Platform",
    role: "Founder / educator / builder",
    stack: ["Next.js", "AI agents", "Community"],
    status: "Live platform",
    outcome: "A Turkish product-building education brand around AI coding workflows.",
    caseStudy: {
      problem:
        "Non-technical builders need a practical path from idea to shipped app, not generic AI tutorials.",
      build:
        "Built a Next.js education platform around lessons, dashboards, AI agents, and build workflows.",
      result:
        "Live Turkish AI coding brand with a product-building curriculum and working platform.",
    },
    videoSrc: media("videos/vibecodingturkey-instant.mp4"),
    videoPoster: media("posters/vibecodingturkey-demo.jpg"),
    videoOrientation: "desktop",
    characterScale: 1.08,
    characterRotation: 2,
  },
  {
    id: "xforgea3d",
    title: "XForge A3D",
    subtitle: "3D print commerce lab",
    description:
      "3D/AI product experiments and fabrication-focused creative systems. From digital to physical, forged with precision.",
    characterImage: "/images/onur/xforgea3d-cyberpunk.png",
    characterAlt: "Onur as cyberpunk 3D printer engineer",
    backgroundImage: "/images/backgrounds/xforgea3d-lab.jpg",
    backgroundGradient:
      "radial-gradient(ellipse at 40% 40%, #1a1a0a 0%, #0d0d05 40%, #050500 100%)",
    accentColor: "#fbbf24",
    accentGlow: "rgba(251, 191, 36, 0.15)",
    projectScreenshot: "/images/projects/xforgea3d-screenshot.png",
    flipBackContent:
      "E-commerce + 3D product showcase. Custom Medusa storefront. Real 3D printing business with AI-enhanced product design pipeline.",
    floatingObjects: [
      "/images/objects/3d-printer.png",
      "/images/objects/filament.png",
      "/images/objects/wireframe.png",
    ],
    url: "https://xforgea3d.com",
    linkLabel: "Open Store",
    role: "Founder / commerce builder",
    stack: ["Medusa", "3D printing", "AI design"],
    status: "Live commerce",
    outcome: "A digital-to-physical product lab with storefront and product demos.",
    caseStudy: {
      problem:
        "The 3D printing business needed a credible storefront and product demo system.",
      build:
        "Built commerce presence, product showcase, and AI-assisted design-to-fabrication workflow.",
      result:
        "Live store positioning a digital-to-physical product lab for custom 3D experiments.",
    },
    videoSrc: media("videos/xforgea3d-instant.mp4"),
    videoPoster: media("posters/xforgea3d-demo.jpg"),
    videoOrientation: "desktop",
    characterRotation: -3,
  },
  {
    id: "onarika",
    title: "Onarika",
    subtitle: "Automation command center",
    description:
      "Automation systems for content, growth, and product operations. The mission control behind everything.",
    characterImage: "/images/onur/onarika-operator.png",
    characterAlt: "Onur as automation operator at mission control",
    backgroundImage: "/images/backgrounds/onarika-mission-control.jpg",
    backgroundGradient:
      "radial-gradient(ellipse at 60% 60%, #0a1420 0%, #050a10 40%, #000005 100%)",
    accentColor: "#f472b6",
    accentGlow: "rgba(244, 114, 182, 0.15)",
    projectScreenshot: "/images/projects/onarika-screenshot.png",
    flipBackContent:
      "Next.js + FastAPI + Supabase. Multi-account social automation. Content generation pipeline. Cron-based scheduling. AI-powered everything.",
    floatingObjects: [
      "/images/objects/workflow-node.png",
      "/images/objects/robot-arm.png",
      "/images/objects/social-icon.png",
    ],
    url: "https://onarika.net",
    linkLabel: "Open Site",
    role: "Full-stack automation builder",
    stack: ["Next.js", "FastAPI", "Supabase", "Cron"],
    status: "Live system",
    outcome: "Content, growth, and operations automation controlled from one interface.",
    caseStudy: {
      problem:
        "Content and growth operations were scattered across manual tools and repeatable tasks.",
      build:
        "Built automation command center with Next.js, FastAPI, Supabase, cron, and AI pipelines.",
      result:
        "Live system for controlling content, growth, and operations workflows from one interface.",
    },
    videoSrc: media("videos/onarika-instant.mp4"),
    videoPoster: media("posters/onarika-demo.jpg"),
    videoOrientation: "desktop",
    characterRotation: 1,
    characterScale: 1.03,
  },
  {
    id: "cta",
    title: "Hire me to ship.",
    subtitle: "Work with me to build.",
    description:
      "I am useful when the brief is ambiguous, speed matters, and the product still has to feel real, polished, and production-ready.",
    characterImage: "/images/onur/cta-founder.png",
    characterAlt: "Onur in founder mode, arms open",
    backgroundImage: "/images/backgrounds/cta-solar-system.jpg",
    backgroundGradient:
      "radial-gradient(ellipse at 50% 50%, #0f0f1a 0%, #080810 40%, #000000 100%)",
    accentColor: "#f8fafc",
    accentGlow: "rgba(248, 250, 252, 0.1)",
    projectScreenshot: "",
    flipBackContent: "",
    floatingObjects: [],
    characterScale: 1.1,
  },
];

export const socials = {
  linkedin: "https://linkedin.com/in/onurhuseyinkocak",
  github: "https://github.com/onurhuseyinkocak",
  email: "info@vibecodingturkey.com",
  phone: "+905447131550",
  whatsapp: "https://wa.me/905447131550",
  resume: "onur-huseyin-kocak-resume.pdf",
  photo: "onur-photo.jpg",
};
