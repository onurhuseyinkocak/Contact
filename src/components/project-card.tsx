"use client";

import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import type { Section } from "@/data/sections";

export function ProjectCard({ section }: { section: Section }) {
  const [flipped, setFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [6, -6]);
  const rotateY = useTransform(x, [-150, 150], [-6, 6]);

  function handleMouseMove(e: React.MouseEvent) {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  if (!section.projectScreenshot && !section.flipBackContent) return null;

  return (
    <motion.div
      ref={cardRef}
      className="w-full max-w-[420px] aspect-[4/3] cursor-pointer"
      style={{
        perspective: 1200,
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setFlipped((f) => !f)}
      whileHover={reduced ? {} : { scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <div
        className={`flip-card-inner relative w-full h-full ${flipped ? "flipped" : ""}`}
      >
        {/* ── Front ── */}
        <div
          className="flip-card-front absolute inset-0 rounded-2xl overflow-hidden glass-card"
          style={{
            boxShadow: `0 0 60px -15px ${section.accentColor}20, inset 0 0 0 1px ${section.accentColor}10`,
          }}
        >
          {section.projectScreenshot && !imgError ? (
            <Image
              src={section.projectScreenshot}
              alt={`${section.title} screenshot`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 420px"
              onError={() => setImgError(true)}
            />
          ) : (
            <ProjectPlaceholder section={section} />
          )}

          {/* Flip hint */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/5">
            <p className="text-[9px] text-white/30 font-mono tracking-wide">
              tap to flip
            </p>
          </div>
        </div>

        {/* ── Back ── */}
        <div
          className="flip-card-back absolute inset-0 rounded-2xl overflow-hidden glass-card p-6 sm:p-8 flex flex-col justify-center"
          style={{
            boxShadow: `0 0 60px -15px ${section.accentColor}20, inset 0 0 0 1px ${section.accentColor}10`,
          }}
        >
          <div
            className="flex items-center gap-2 mb-4"
          >
            <div
              className="w-5 h-[1px]"
              style={{ backgroundColor: section.accentColor + "50" }}
            />
            <p
              className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase"
              style={{ color: section.accentColor + "80" }}
            >
              Behind the build
            </p>
          </div>

          <h3 className="text-base sm:text-lg font-semibold text-white mb-3">
            {section.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
            {section.flipBackContent}
          </p>

          {section.url && (
            <a
              href={section.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors hover:brightness-125"
              style={{ color: section.accentColor }}
              onClick={(e) => e.stopPropagation()}
            >
              Visit project
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* Premium placeholder when no screenshot */
function ProjectPlaceholder({ section }: { section: Section }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(${section.accentColor}30 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Center content */}
      <div className="relative text-center z-10">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border mx-auto flex items-center justify-center mb-4"
          style={{
            borderColor: section.accentColor + "15",
            background: `radial-gradient(circle, ${section.accentColor}08, transparent)`,
          }}
        >
          <p
            className="text-2xl sm:text-3xl font-bold opacity-30"
            style={{ color: section.accentColor }}
          >
            {section.title.charAt(0)}
          </p>
        </div>
        <p className="text-[10px] sm:text-xs text-white/20 font-mono">
          {section.subtitle}
        </p>
      </div>

      {/* Corner accents */}
      {[
        "top-3 left-3",
        "top-3 right-3 rotate-90",
        "bottom-3 left-3 -rotate-90",
        "bottom-3 right-3 rotate-180",
      ].map((pos) => (
        <div
          key={pos}
          className={`absolute ${pos} w-4 h-4 opacity-10`}
        >
          <div
            className="w-full h-[1px]"
            style={{ backgroundColor: section.accentColor }}
          />
          <div
            className="w-[1px] h-full absolute top-0 left-0"
            style={{ backgroundColor: section.accentColor }}
          />
        </div>
      ))}
    </div>
  );
}
