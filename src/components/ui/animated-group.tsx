
"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface AnimatedGroupProps {
  children: ReactNode;
  variants: Variants;
  className?: string;
  duration?: number;
  delay?: number;
  once?: boolean;
  margin?: string;
}

export function AnimatedGroup({
  children,
  variants,
  className,
  once = true,
  margin = "-100px",
}: AnimatedGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
