
import { cn } from "@/lib/utils";
import { MotionProps, motion } from "framer-motion";
import React from "react";

type MarginType = number | string;

type AnimatedGroupProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  variants?: MotionProps["variants"];
  delay?: number;
  staggerDelay?: number;
  viewport?: MotionProps["viewport"];
  margin?: MarginType;
};

export const AnimatedGroup = ({
  as = "div",
  className,
  children,
  variants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
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
      viewport={viewport || { once: true, margin: margin }}
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
