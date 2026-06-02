"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState, useMemo } from "react";

interface FloatPos {
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
}

function generatePositions(count: number): FloatPos[] {
  const base: FloatPos[] = [
    { x: "6%", y: "12%", size: 44, delay: 0, duration: 5, rotation: 12 },
    { x: "82%", y: "20%", size: 36, delay: 1.2, duration: 6.5, rotation: -8 },
    { x: "10%", y: "68%", size: 32, delay: 0.4, duration: 4.5, rotation: 15 },
    { x: "75%", y: "72%", size: 40, delay: 1.8, duration: 5.5, rotation: -12 },
    { x: "45%", y: "8%", size: 28, delay: 0.7, duration: 4, rotation: 20 },
    { x: "88%", y: "50%", size: 30, delay: 1.4, duration: 5.8, rotation: -18 },
  ];
  return base.slice(0, count);
}

/* Geometric shape fallbacks — no images needed */
const shapes = [
  /* Circle */
  (color: string, size: number) => (
    <div
      className="rounded-full border opacity-20"
      style={{
        width: size,
        height: size,
        borderColor: color + "40",
        background: `radial-gradient(circle, ${color}08 0%, transparent 70%)`,
      }}
    />
  ),
  /* Diamond */
  (color: string, size: number) => (
    <div
      className="rotate-45 border opacity-15"
      style={{
        width: size * 0.7,
        height: size * 0.7,
        borderColor: color + "35",
        background: `linear-gradient(135deg, ${color}06, transparent)`,
      }}
    />
  ),
  /* Ring */
  (color: string, size: number) => (
    <div
      className="rounded-full border-2 opacity-15"
      style={{
        width: size,
        height: size,
        borderColor: color + "25",
      }}
    />
  ),
  /* Dot cluster */
  (color: string, size: number) => (
    <div className="relative" style={{ width: size, height: size }}>
      {[0, 1, 2].map((j) => (
        <div
          key={j}
          className="absolute rounded-full"
          style={{
            width: size * 0.2,
            height: size * 0.2,
            backgroundColor: color + "30",
            left: `${20 + j * 25}%`,
            top: `${30 + (j % 2) * 30}%`,
          }}
        />
      ))}
    </div>
  ),
  /* Cross */
  (color: string, size: number) => (
    <div className="relative opacity-15" style={{ width: size, height: size }}>
      <div
        className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2"
        style={{ backgroundColor: color + "40" }}
      />
      <div
        className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2"
        style={{ backgroundColor: color + "40" }}
      />
    </div>
  ),
  /* Triangle outline */
  (color: string, size: number) => (
    <div
      className="opacity-15"
      style={{
        width: 0,
        height: 0,
        borderLeft: `${size * 0.4}px solid transparent`,
        borderRight: `${size * 0.4}px solid transparent`,
        borderBottom: `${size * 0.7}px solid ${color}25`,
      }}
    />
  ),
];

export function FloatingObjects({
  objects,
  accentColor,
}: {
  objects: string[];
  accentColor: string;
}) {
  const reduced = useReducedMotion();
  const positions = useMemo(
    () => generatePositions(Math.max(objects.length, 4)),
    [objects.length]
  );

  /* Always show at least geometric shapes even without images */
  const count = Math.max(objects.length, 4);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const pos = positions[i % positions.length];
        const imgSrc = objects[i] ?? null;
        return (
          <FloatingItem
            key={i}
            src={imgSrc}
            pos={pos}
            index={i}
            accentColor={accentColor}
            reduced={!!reduced}
          />
        );
      })}
    </div>
  );
}

function FloatingItem({
  src,
  pos,
  index,
  accentColor,
  reduced,
}: {
  src: string | null;
  pos: FloatPos;
  index: number;
  accentColor: string;
  reduced: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const showShape = !src || imgError;
  const ShapeFn = shapes[index % shapes.length];

  return (
    <motion.div
      className="absolute"
      style={{ left: pos.x, top: pos.y }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: reduced ? 0 : [0, -14, 0],
        rotate: reduced ? 0 : [0, pos.rotation, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay: pos.delay },
        scale: { duration: 0.8, delay: pos.delay, ease: [0.16, 1, 0.3, 1] },
        y: {
          duration: pos.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: pos.delay,
        },
        rotate: {
          duration: pos.duration * 1.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: pos.delay,
        },
      }}
    >
      {!showShape ? (
        <Image
          src={src!}
          alt=""
          width={pos.size}
          height={pos.size}
          className="opacity-50"
          onError={() => setImgError(true)}
        />
      ) : (
        ShapeFn(accentColor, pos.size)
      )}
    </motion.div>
  );
}
