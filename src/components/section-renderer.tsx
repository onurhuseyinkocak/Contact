"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { sections, socials } from "@/data/sections";
import type { Section } from "@/data/sections";
import { DepthStage } from "./depth-stage";
import { MagneticButton } from "./magnetic-button";
import { CursorGlow } from "./cursor-glow";
import { NavDots } from "./nav-dots";

const VIDEO_PRELOAD_LOOKAHEAD = 3;

export function SectionRenderer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [splashDone, setSplashDone] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const reduced = useReducedMotion();
  const active = sections[activeIndex];

  const setRef = useCallback((el: HTMLElement | null, i: number) => {
    sectionRefs.current[i] = el;
  }, []);

  /* Splash timer */
  useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), 220);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobileViewport(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  /* Intersection observer — runs after first render so refs are populated */
  useEffect(() => {
    const refs = sectionRefs.current.filter(Boolean);
    if (refs.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIdx = -1;
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = sectionRefs.current.indexOf(
            entry.target as HTMLElement
          );
          if (idx !== -1 && entry.intersectionRatio > bestRatio) {
            bestIdx = idx;
            bestRatio = entry.intersectionRatio;
          }
        });
        if (bestIdx !== -1 && bestRatio >= 0.25) {
          setActiveIndex(bestIdx);
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    refs.forEach((ref) => observer.observe(ref!));
    return () => observer.disconnect();
  }, [splashDone]); // re-run when splash done to ensure refs ready

  useEffect(() => {
    let frame = 0;

    const updateFromViewportCenter = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      let bestIdx = -1;
      let bestDistance = Number.POSITIVE_INFINITY;

      sectionRefs.current.forEach((section, i) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIdx = i;
        }
      });

      if (bestIdx !== -1) {
        setActiveIndex((current) => (current === bestIdx ? current : bestIdx));
      }
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateFromViewportCenter);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [splashDone]);

  return (
    <>
      {/* Splash overlay — content renders behind it */}
      <AnimatePresence>
        {!splashDone && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[60] bg-black flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.12 }}
              className="text-center"
            >
              <div className="w-8 h-8 border-2 border-white/10 border-t-white/60 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[10px] font-mono text-white/20 tracking-[0.4em] uppercase">
                Loading depth
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content — always rendered so refs populate */}
      <div>
        <CursorGlow accentColor={active.accentColor} />
        <NavDots activeIndex={activeIndex} />
        <DepthStage
          activeIndex={activeIndex}
          accentColor={active.accentColor}
          reduced={reduced}
        />

        {/* Fixed background layer */}
        <div className="fixed inset-0 z-0">
          {sections.map((section, i) => (
            <div
              key={section.id}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{
                background: section.backgroundGradient,
                opacity: i === activeIndex ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* Fixed product video — desktop only */}
        <div className="hidden md:block fixed top-0 right-0 w-[45%] h-screen z-[8] pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center pr-8 lg:pr-14">
            <motion.div
              animate={
                !isMobileViewport && active.id === "hero"
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: -18, scale: 0.98 }
              }
              initial={false}
              transition={{
                duration: reduced ? 0.1 : 0.42,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pointer-events-auto"
              style={{
                pointerEvents:
                  !isMobileViewport && active.id === "hero" ? "auto" : "none",
              }}
            >
              <HeroSignalPanel />
            </motion.div>

            {!isMobileViewport &&
              sections
                .filter((section) => section.videoSrc && section.id !== "hero")
                .map((section) => {
                  const sectionIndex = sections.indexOf(section);
                  const isCurrent = active.id === section.id;
                  const shouldWarm =
                    sectionIndex >= activeIndex - 1 &&
                    sectionIndex <= activeIndex + VIDEO_PRELOAD_LOOKAHEAD;
                  return (
                    <motion.div
                      key={section.id}
                      animate={
                        isCurrent
                          ? { opacity: 1, y: 0, scale: 1 }
                          : { opacity: 0, y: 18, scale: 0.98 }
                      }
                      initial={false}
                      transition={{
                        duration: reduced ? 0.1 : 0.42,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute inset-0 flex items-center justify-center pr-8 lg:pr-14"
                      style={{ pointerEvents: isCurrent ? "auto" : "none" }}
                    >
                      <ProjectVideo
                        section={section}
                        active={isCurrent}
                        shouldLoad={isCurrent || shouldWarm}
                      />
                    </motion.div>
                  );
                })}
          </div>
        </div>

        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-40 h-[2px] origin-left"
          style={{ backgroundColor: active.accentColor }}
          animate={{ scaleX: (activeIndex + 1) / sections.length }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Section counter */}
        <div className="fixed bottom-6 left-6 md:left-8 z-40 hidden mix-blend-difference md:block">
          <p className="text-[10px] font-mono text-white/30">
            <span className="text-white/60">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-1.5 text-white/15">/</span>
            {String(sections.length).padStart(2, "0")}
          </p>
        </div>

        {/* Scrollable sections */}
        <div className="relative z-10">
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => setRef(el, i)}
              className="min-h-[100svh] snap-start"
            >
              {section.id === "hero" ? (
                <HeroContent section={section} isActive={i === activeIndex} />
              ) : section.id === "cta" ? (
                <CTAContent section={section} isActive={i === activeIndex} />
              ) : (
                <ProjectContent
                  section={section}
                  isActive={i === activeIndex}
                  isMobileViewport={isMobileViewport}
                  shouldLoadVideo={
                    isMobileViewport &&
                    i >= activeIndex - 1 &&
                    i <= activeIndex + VIDEO_PRELOAD_LOOKAHEAD
                  }
                />
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Hero ── */
function HeroContent({
  section,
  isActive,
}: {
  section: Section;
  isActive: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="min-h-[100svh] flex flex-col justify-center overflow-hidden">
      <div className="hero-copy-fit w-full md:w-[55%] px-5 sm:px-10 md:px-16 lg:px-20 py-7 md:py-0">
        <div className="max-w-xl">
          <motion.p
            className="mb-3 text-[10px] font-mono uppercase tracking-[0.35em] sm:mb-4 sm:text-xs"
            style={{ color: section.accentColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 0.7, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: reduced ? 0.1 : 0.5, delay: 0.1 }}
          >
            Onur Huseyin Kocak
          </motion.p>

          <motion.h1
            className="hero-title-fit font-bold leading-[1.06] tracking-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: reduced ? 0.1 : 0.6, delay: 0.2 }}
          >
            {section.title}
            <br />
            <span style={{ color: section.accentColor }}>
              {section.subtitle}
            </span>
          </motion.h1>

          <motion.p
            className="mt-3 max-w-md text-sm leading-relaxed text-white/40 sm:mt-4 sm:text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: reduced ? 0.1 : 0.5, delay: 0.4 }}
          >
            {section.description}
          </motion.p>

          {section.proofPoints && (
            <motion.div
              className="hero-proof-fit mt-4 max-w-lg border-y border-white/10 py-3 sm:mt-6 sm:py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: reduced ? 0.1 : 0.5, delay: 0.5 }}
            >
              <div className="grid gap-2.5">
                {section.proofPoints.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: section.accentColor }}
                    />
                    <span className="text-xs sm:text-sm text-white/55">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            className="mt-5 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: reduced ? 0.1 : 0.5, delay: 0.6 }}
          >
            <MagneticButton
              href={`#${sections[1].id}`}
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-black transition-all hover:brightness-110 active:scale-95 sm:px-7 sm:py-3"
              style={{ backgroundColor: section.accentColor }}
            >
              View shipped work
            </MagneticButton>
            <MagneticButton
              href="#cta"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/5 active:scale-95 sm:px-7 sm:py-3"
            >
              Hire / build with me
            </MagneticButton>
          </motion.div>

          <motion.div
            className="hero-stats-fit mt-6 flex gap-6 sm:mt-9 sm:gap-8"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduced ? 0.1 : 0.5, delay: 0.8 }}
          >
            {[
              { n: "6", label: "Featured Ships" },
              { n: "5", label: "Product Demos" },
              { n: "3", label: "Core Stacks" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: section.accentColor }}
                >
                  {stat.n}
                </p>
                <p className="text-[10px] sm:text-xs text-white/25 mt-1 font-mono">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function HeroSignalPanel() {
  const metrics = [
    { label: "Live products", value: "6" },
    { label: "App Store", value: "2" },
    { label: "Core stack", value: "AI+iOS+Web" },
  ];
  const proof = [
    "Owns product, UI, app logic, APIs, and launch details",
    "Ships with working demos, videos, and live links",
    "Builds fast MVPs without losing production polish",
  ];
  const stack = ["SwiftUI", "Next.js", "Supabase", "AI agents", "Automation"];

  return (
    <div
      className="hero-signal-panel w-[min(520px,38vw)] rounded-[1.4rem] border border-white/10 bg-black/55 p-5 shadow-2xl backdrop-blur-xl"
      style={{
        boxShadow: "0 34px 100px -42px rgba(96, 165, 250, 0.72)",
        transform:
          "perspective(1200px) rotateY(-7deg) rotateX(2deg) translateZ(0)",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            aria-hidden="true"
            className="h-14 w-14 shrink-0 rounded-2xl bg-cover bg-center ring-1 ring-white/15"
            style={{ backgroundImage: `url(${socials.photo})` }}
          />
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/45">
              AI product engineer
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-white">
              Onur Huseyin Kocak
            </p>
          </div>
        </div>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[10px] font-mono text-emerald-200/80">
          Available
        </span>
      </div>

      <div className="mt-6 border-y border-white/10 py-5">
        <p className="max-w-sm text-2xl font-semibold leading-tight text-white">
          I take ambiguous product briefs from concept to production.
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="min-w-0">
              <p className="truncate text-xl font-semibold text-sky-300">
                {metric.value}
              </p>
              <p className="mt-1 text-[9px] font-mono uppercase tracking-[0.16em] text-white/40">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {proof.map((item, index) => (
          <div key={item} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3">
            <span className="text-[10px] font-mono text-sky-300/70">
              0{index + 1}
            </span>
            <span className="text-sm leading-relaxed text-white/60">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/60"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Project Section ── */
function ProjectContent({
  section,
  isActive,
  isMobileViewport,
  shouldLoadVideo,
}: {
  section: Section;
  isActive: boolean;
  isMobileViewport: boolean;
  shouldLoadVideo: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="min-h-[100svh] flex flex-col justify-center overflow-hidden">
      <div className="project-mobile-video md:hidden px-5 pt-5 sm:px-6 sm:pt-8">
        <ProjectVideo
          section={section}
          compact
          active={isActive && isMobileViewport}
          shouldLoad={shouldLoadVideo}
        />
      </div>

      <div className="project-copy-fit w-full md:w-[55%] px-5 sm:px-10 md:px-16 lg:px-20 py-7 md:py-0">
        <div className="max-w-xl">
          <motion.div
            className="mb-4 flex items-center gap-3 sm:mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: reduced ? 0.1 : 0.5 }}
          >
            <div
              className="w-8 h-[1px]"
              style={{ backgroundColor: section.accentColor + "50" }}
            />
            <p
              className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: section.accentColor + "90" }}
            >
              {section.subtitle}
            </p>
          </motion.div>

          <motion.h2
            className="project-title-fit font-bold leading-[1.08] tracking-tight text-white"
            initial={{ opacity: 0, y: 25 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: reduced ? 0.1 : 0.6, delay: 0.1 }}
          >
            {section.title}
          </motion.h2>

          <motion.p
            className="mt-3 max-w-md text-sm leading-relaxed text-white/40 sm:mt-4 sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: reduced ? 0.1 : 0.5, delay: 0.2 }}
          >
            {section.description}
          </motion.p>

          {(section.url || section.iosUrl) && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={
                isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
              }
              transition={{ duration: reduced ? 0.1 : 0.5, delay: 0.3 }}
              className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3"
            >
              {section.url && (
                <MagneticButton
                  href={section.url}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-all hover:brightness-110 active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
                  style={{
                    color: "#020617",
                    backgroundColor: section.accentColor,
                  }}
                >
                  {section.linkLabel ?? "Open project"}
                  <ExternalLink size={13} strokeWidth={2.5} />
                </MagneticButton>
              )}
              {section.iosUrl && (
                <MagneticButton
                  href={section.iosUrl}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-medium transition-all hover:bg-white/5 active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
                  style={{
                    color: section.accentColor,
                    borderColor: section.accentColor + "35",
                  }}
                >
                  {section.iosLabel ?? "Open iOS App"}
                  <ExternalLink size={13} strokeWidth={2.5} />
                </MagneticButton>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: reduced ? 0.1 : 0.5, delay: 0.4 }}
          >
            <ProjectFacts section={section} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── CTA ── */
function CTAContent({
  section,
  isActive,
}: {
  section: Section;
  isActive: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="cta-section-fit min-h-[100svh] flex flex-col justify-center py-5 md:py-8">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="grid max-w-6xl items-center gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.78fr)]">
          <div className="cta-copy-fit order-2 max-w-xl lg:order-none">
          <motion.h2
            className="cta-title-fit font-bold leading-[1.08] tracking-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: reduced ? 0.1 : 0.6 }}
          >
            {section.title}
            <br />
            <span className="text-white/30">{section.subtitle}</span>
          </motion.h2>

          <motion.p
            className="cta-desc-fit mt-3 max-w-md text-sm leading-relaxed text-white/35 sm:mt-4 sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: reduced ? 0.1 : 0.5, delay: 0.15 }}
          >
            {section.description}
          </motion.p>

          <motion.div
            className="cta-proof-fit mt-4 max-w-lg border-y border-white/10 py-3 sm:mt-5 sm:py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: reduced ? 0.1 : 0.5, delay: 0.22 }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-[0.24em] text-white/25">
                  For teams
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  AI-native product engineer who can take ownership across UI,
                  app logic, APIs, and launch details.
                </p>
              </div>
              <div>
                <p className="text-[9px] font-mono uppercase tracking-[0.24em] text-white/25">
                  For founders
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  MVPs, automation systems, product videos, and working demos
                  built fast enough to validate real demand.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p
            className="cta-built-fit mt-4 text-[10px] font-mono text-white/15 sm:mt-5"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Built with obsession. Shipped with AI.
          </motion.p>
          </div>

          <motion.div
            className="order-1 lg:order-none"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={
              isActive
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 22, scale: 0.98 }
            }
            transition={{ duration: reduced ? 0.1 : 0.55, delay: 0.25 }}
          >
            <ContactPanel />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProjectVideo({
  section,
  compact = false,
  active = true,
  shouldLoad = true,
}: {
  section: Section;
  compact?: boolean;
  active?: boolean;
  shouldLoad?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visibleVideoSrc, setVisibleVideoSrc] = useState<string | null>(null);
  const isVideoVisible =
    active && shouldLoad && visibleVideoSrc === section.videoSrc;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (section.videoSrc && video.getAttribute("src") !== section.videoSrc) {
      video.setAttribute("src", section.videoSrc);
    }

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.load();

    return () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [shouldLoad, section.videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    let cancelled = false;
    const retryDelays = [0, 120, 320, 700, 1400, 2600];
    const retryTimers: number[] = [];

    const revealIfMoving = () => {
      if (!cancelled && video.readyState >= 2) {
        setVisibleVideoSrc(section.videoSrc ?? null);
      }
    };

    const playActiveVideo = () => {
      if (cancelled || !active) return;

      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      const attempt = video.play();

      if (attempt) {
        void attempt.then(revealIfMoving).catch(() => undefined);
      }
    };

    if (active) {
      retryDelays.forEach((delay) => {
        retryTimers.push(window.setTimeout(playActiveVideo, delay));
      });
      video.addEventListener("loadedmetadata", playActiveVideo);
      video.addEventListener("loadeddata", playActiveVideo);
      video.addEventListener("canplay", playActiveVideo);
      video.addEventListener("playing", revealIfMoving);
      video.addEventListener("timeupdate", revealIfMoving);
      window.addEventListener("scroll", playActiveVideo, { passive: true });
      window.addEventListener("pointerdown", playActiveVideo, { passive: true });
      window.addEventListener("touchstart", playActiveVideo, { passive: true });
      document.addEventListener("visibilitychange", playActiveVideo);
    } else {
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      cancelled = true;
      retryTimers.forEach((timer) => window.clearTimeout(timer));
      video.removeEventListener("loadedmetadata", playActiveVideo);
      video.removeEventListener("loadeddata", playActiveVideo);
      video.removeEventListener("canplay", playActiveVideo);
      video.removeEventListener("playing", revealIfMoving);
      video.removeEventListener("timeupdate", revealIfMoving);
      window.removeEventListener("scroll", playActiveVideo);
      window.removeEventListener("pointerdown", playActiveVideo);
      window.removeEventListener("touchstart", playActiveVideo);
      document.removeEventListener("visibilitychange", playActiveVideo);
    };
  }, [active, shouldLoad, section.videoSrc]);

  if (!section.videoSrc) return null;

  const isPhone = section.videoOrientation === "phone";
  const frameClass = isPhone
    ? compact
      ? "mx-auto aspect-[9/19.5] w-[min(132px,34vw)] rounded-[1.6rem]"
      : "mx-auto aspect-[9/19.5] w-[min(300px,32vw)] rounded-[2rem]"
    : compact
      ? "aspect-[1280/668] w-full rounded-[1.1rem]"
      : "aspect-[1280/668] w-full rounded-[1.4rem] md:w-[min(640px,38vw)]";

  return (
    <div
      className={[
        "relative overflow-hidden bg-black/80 shadow-2xl",
        "ring-1 ring-white/10",
        frameClass,
        compact ? "mb-6" : "",
      ].join(" ")}
      style={{
        boxShadow: `0 30px 90px -35px ${section.accentColor}66`,
        transform: compact
          ? undefined
          : `perspective(1200px) rotateY(${isPhone ? "-8deg" : "-7deg"}) rotateX(${isPhone ? "3deg" : "2deg"})`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        aria-label={`${section.title} product video poster`}
        role="img"
        className="absolute inset-0 h-full w-full bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: section.videoPoster
            ? `url(${section.videoPoster})`
            : undefined,
        }}
      />

      {shouldLoad && (
        <video
          ref={videoRef}
          className={[
            "absolute inset-0 h-full w-full object-contain transition-opacity duration-150",
            isVideoVisible ? "opacity-100" : "opacity-0",
          ].join(" ")}
          src={section.videoSrc}
          poster={section.videoPoster}
          autoPlay={active}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={(event) => {
            if (active) {
              setVisibleVideoSrc(section.videoSrc ?? null);
              void event.currentTarget.play().catch(() => undefined);
            }
          }}
          onCanPlay={(event) => {
            if (active) {
              setVisibleVideoSrc(section.videoSrc ?? null);
              void event.currentTarget.play().catch(() => undefined);
            }
          }}
          onPlaying={() => setVisibleVideoSrc(section.videoSrc ?? null)}
          onTimeUpdate={() => setVisibleVideoSrc(section.videoSrc ?? null)}
          aria-label={`${section.title} product video`}
        />
      )}
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="contact-panel-fit max-h-[calc(100svh-2rem)] overflow-y-auto overscroll-contain rounded-[1.2rem] border border-white/10 bg-black/35 p-4 shadow-2xl backdrop-blur-xl md:max-h-none md:overflow-visible md:p-5">
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className="contact-photo-fit h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-white/15 sm:h-20 sm:w-20"
          style={{
            backgroundImage: `url(${socials.photo})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="min-w-0">
          <p className="contact-name-fit text-base font-semibold text-white">
            Onur Huseyin Kocak
          </p>
          <p className="contact-subtitle-fit mt-1 text-sm leading-relaxed text-white/45">
            AI product engineer. iOS, web, automation, MVP builds.
          </p>
        </div>
      </div>

      <div className="contact-rows-fit mt-3 grid gap-1.5 border-y border-white/10 py-3 text-sm sm:mt-4 sm:gap-2 sm:py-4">
        <a
          href={`mailto:${socials.email}`}
          className="grid min-h-11 grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg px-2.5 py-1.5 text-white/75 transition hover:bg-white/5 sm:px-3 sm:py-2"
        >
          <span>Email</span>
          <span className="min-w-0 text-right font-mono text-[10px] text-white/60 [overflow-wrap:anywhere] sm:text-xs">
            {socials.email}
          </span>
        </a>
        <a
          href={`tel:${socials.phone}`}
          className="grid min-h-11 grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg px-2.5 py-1.5 text-white/75 transition hover:bg-white/5 sm:px-3 sm:py-2"
        >
          <span>Phone</span>
          <span className="min-w-0 text-right font-mono text-[10px] text-white/60 [overflow-wrap:anywhere] sm:text-xs">
            {socials.phone}
          </span>
        </a>
        <a
          href={socials.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="grid min-h-11 grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg px-2.5 py-1.5 text-white/75 transition hover:bg-white/5 sm:px-3 sm:py-2"
        >
          <span>WhatsApp</span>
          <span className="min-w-0 text-right font-mono text-[10px] text-white/60 sm:text-xs">
            Start chat
          </span>
        </a>
      </div>

      <div className="contact-links-fit mt-3 grid grid-cols-3 gap-2">
        {[
          { href: socials.linkedin, label: "LinkedIn" },
          { href: socials.github, label: "GitHub" },
          { href: socials.resume, label: "Resume" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/15 px-3 text-xs font-medium text-white/70 transition hover:bg-white/5"
          >
            {link.label}
          </a>
        ))}
      </div>

      <ContactForm />
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const replyTo = String(form.get("email") ?? "");
    const budget = String(form.get("budget") ?? "");
    const message = String(form.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "visitor"}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Reply email: ${replyTo}`, `Budget / scope: ${budget}`, "", message]
        .filter(Boolean)
        .join("\n")
    );

    setSubmitted(true);
    window.location.href = `mailto:${socials.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form-fit mt-3 grid gap-2.5 sm:mt-4 sm:gap-3" onSubmit={handleSubmit}>
      <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
        <label className="grid min-w-0 gap-1.5">
          <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-white/45">
            Name
          </span>
          <input
            name="name"
            required
            autoComplete="name"
            className="h-9 w-full min-w-0 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/35 sm:h-10"
            placeholder="Your name"
          />
        </label>
        <label className="grid min-w-0 gap-1.5">
          <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-white/45">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="h-9 w-full min-w-0 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/35 sm:h-10"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="grid min-w-0 gap-1.5">
        <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-white/45">
          Project / budget
        </span>
        <input
          name="budget"
          className="h-9 w-full min-w-0 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/35 sm:h-10"
          placeholder="MVP, iOS app, automation, hiring..."
        />
      </label>
      <label className="grid min-w-0 gap-1.5">
        <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-white/45">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={3}
          className="w-full min-w-0 resize-none rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm leading-relaxed text-white outline-none transition placeholder:text-white/25 focus:border-white/35"
          placeholder="Tell me what you want to build or which role you are hiring for."
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-95"
        >
          Send via email
        </button>
        <a
          href={socials.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/5 active:scale-95"
        >
          WhatsApp
        </a>
      </div>
      {submitted && (
        <p aria-live="polite" className="text-xs text-white/40">
          Your email app should open. If it does not, use WhatsApp or email
          directly.
        </p>
      )}
    </form>
  );
}

function ProjectFacts({ section }: { section: Section }) {
  const facts = [
    { label: "Role", value: section.role },
    { label: "Stack", value: section.stack?.join(" / ") },
    { label: "Status", value: section.status },
    { label: "Outcome", value: section.outcome },
  ].filter((fact): fact is { label: string; value: string } =>
    Boolean(fact.value)
  );

  if (facts.length === 0) return null;

  return (
    <dl className="project-facts-fit mt-6 grid max-w-lg gap-x-5 gap-y-3 border-y border-white/10 py-4 sm:grid-cols-2 sm:gap-y-4 sm:py-5">
      {facts.map((fact) => (
        <div key={fact.label} className="min-w-0">
          <dt className="text-[9px] font-mono uppercase tracking-[0.24em] text-white/25">
            {fact.label}
          </dt>
          <dd className="mt-1.5 text-xs sm:text-sm leading-relaxed text-white/60">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
