
import { cn } from "@/lib/utils";
import { motion, type VariantProps, type Variants, type ViewportOptions } from "framer-motion";
import React from "react";

type MarginType = number | string;

type AnimatedGroupProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  variants?: {
    container: Variants;
    item: Variants;
  };
  delay?: number;
  staggerDelay?: number;
  viewport?: ViewportOptions;
  margin?: MarginType;
};

export const AnimatedGroup = ({
  as = "div",
  className,
  children,
  variants = {
    container: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.25,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 8 },
      visible: {
        opacity: 1,
        y: 0,
      },
    },
  },
  viewport,
  margin,
}: AnimatedGroupProps) => {
  const Component = motion[as as keyof typeof motion] || motion.div;

  const childrenArray = React.Children.toArray(children);

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport || { once: true, margin: margin ? String(margin) : undefined }}
      variants={variants.container}
    >
      {childrenArray.map((child, i) => {
        return (
          <motion.div key={i} variants={variants.item}>
            {child}
          </motion.div>
        );
      })}
    </Component>
  );
};
