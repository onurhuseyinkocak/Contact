"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import type { Section } from "@/data/sections";

export function Character({ section }: { section: Section }) {
  const reduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);
  const [prevId, setPrevId] = useState(section.id);

  /* Reset imgError on section change */
  if (section.id !== prevId) {
    setPrevId(section.id);
    setImgError(false);
  }

  return (
    <div className="relative w-full h-full flex items-end justify-center overflow-hidden">
      {/* Accent glow behind character */}
      <motion.div
        className="absolute bottom-[5%] left-1/2 w-[60%] aspect-square rounded-full blur-[120px]"
        animate={{
          backgroundColor: section.accentGlow,
          x: "-50%",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ opacity: 0.4 }}
      />

      {/* Secondary rim glow */}
      <motion.div
        className="absolute bottom-[15%] left-1/2 w-[40%] aspect-[1/1.5] rounded-full blur-[80px]"
        animate={{
          backgroundColor: section.accentColor + "12",
          x: "-50%",
        }}
        transition={{ duration: 0.8 }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={section.id}
          className="relative z-10 w-full h-[85%] flex items-end justify-center"
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: section.characterScale ?? 1,
            rotate: section.characterRotation ?? 0,
          }}
          exit={{ opacity: 0, y: -30, scale: 0.96 }}
          transition={{
            duration: reduced ? 0.05 : 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Subtle floating */}
          <motion.div
            className="relative w-full h-full"
            animate={
              reduced
                ? {}
                : { y: [0, -10, 0] }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {!imgError ? (
              <Image
                src={section.characterImage}
                alt={section.characterAlt}
                fill
                className="object-contain object-bottom character-sticker"
                sizes="(max-width: 768px) 85vw, 42vw"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <CharacterPlaceholder section={section} />
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CharacterPlaceholder({ section }: { section: Section }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* Silhouette shape */}
        <div
          className="w-40 h-56 md:w-52 md:h-72 rounded-t-full rounded-b-3xl border-2 border-dashed relative overflow-hidden"
          style={{ borderColor: section.accentColor + "30" }}
        >
          {/* Head */}
          <div
            className="absolute top-6 left-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-dashed"
            style={{ borderColor: section.accentColor + "25" }}
          />
          {/* Body hint */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[55%] rounded-t-2xl border-2 border-dashed border-b-0"
            style={{ borderColor: section.accentColor + "20" }}
          />
          {/* Glow */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background: `radial-gradient(ellipse at 50% 30%, ${section.accentColor}, transparent 70%)`,
            }}
          />
        </div>
        {/* Label */}
        <p className="text-[9px] font-mono text-center mt-3 opacity-25 text-white">
          {section.characterImage.split("/").pop()?.replace(".png", "")}
        </p>
      </div>
    </div>
  );
}
