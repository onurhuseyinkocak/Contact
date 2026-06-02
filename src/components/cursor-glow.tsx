"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function CursorGlow({ accentColor }: { accentColor: string }) {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 120, damping: 18 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    function onMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY]);

  if (isMobile || reduced) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[2] w-[350px] h-[350px] rounded-full blur-[100px]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        backgroundColor: accentColor,
        opacity: 0.06,
      }}
      transition={{ backgroundColor: { duration: 0.8, ease: "easeInOut" } }}
    />
  );
}
