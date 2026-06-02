"use client";

import { motion } from "motion/react";
import { sections } from "@/data/sections";

export function NavDots({ activeIndex }: { activeIndex: number }) {
  const active = sections[activeIndex];

  return (
    <nav
      className="fixed right-3 sm:right-5 md:right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 md:flex"
      aria-label="Section navigation"
    >
      {sections.map((section, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={section.id}
            onClick={() => {
              document
                .getElementById(section.id)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative flex min-h-8 min-w-8 items-center justify-end gap-2 py-1"
            aria-label={`Go to ${section.title}`}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Tooltip */}
            <span className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[9px] font-mono text-white/40 whitespace-nowrap pr-1">
              {section.id === "hero"
                ? "Start"
                : section.id === "cta"
                  ? "Contact"
                  : section.title}
            </span>

            {/* Dot/line */}
            <motion.div
              className="rounded-full"
              animate={{
                width: isActive ? 16 : 6,
                height: 6,
                backgroundColor: isActive
                  ? active.accentColor
                  : "rgba(255,255,255,0.12)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          </button>
        );
      })}
    </nav>
  );
}
