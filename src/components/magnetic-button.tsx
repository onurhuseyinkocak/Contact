"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "motion/react";

export function MagneticButton({
  children,
  href,
  className = "",
  style,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const moveX = useTransform(x, [-100, 100], [-6, 6]);
  const moveY = useTransform(y, [-100, 100], [-6, 6]);

  function handleMouseMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const isProtocolAction =
    href?.startsWith("mailto:") || href?.startsWith("tel:");
  const isExternal =
    href &&
    !href.startsWith("#") &&
    !isProtocolAction &&
    (!href.startsWith("/") || href.endsWith(".pdf"));
  const isAnchor = href && href.startsWith("#");

  function handleClick(e: React.MouseEvent) {
    if (isAnchor && href) {
      e.preventDefault();
      document
        .getElementById(href.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
    }
    onClick?.();
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: reduced ? 0 : moveX, y: reduced ? 0 : moveY }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          onClick={handleClick}
          className={className}
          style={style}
        >
          {children}
        </a>
      ) : (
        <button onClick={onClick} className={className} style={style}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
