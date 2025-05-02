
import React from "react";
import { cn } from "@/lib/utils";

interface GradientSelectorProps {
  selectedGradient: string;
  onSelectGradient: (gradient: string) => void;
}

const gradients = [
  {
    id: "gradient-1",
    style: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
    name: "Soft Cream"
  },
  {
    id: "gradient-2",
    style: "linear-gradient(180deg, rgb(254,100,121) 0%, rgb(251,221,186) 100%)",
    name: "Sunset Peach"
  },
  {
    id: "gradient-3",
    style: "linear-gradient(184.1deg, rgba(249,255,182,1) 44.7%, rgba(226,255,172,1) 67.2%)",
    name: "Spring Fresh"
  },
  {
    id: "gradient-4", 
    style: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
    name: "Purple Haze"
  },
  {
    id: "gradient-5",
    style: "linear-gradient(90deg, hsla(29, 92%, 70%, 1) 0%, hsla(0, 87%, 73%, 1) 100%)",
    name: "Warm Coral"
  },
  {
    id: "gradient-6",
    style: "linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)",
    name: "Deep Blue"
  },
  {
    id: "gradient-7",
    style: "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)",
    name: "Sky Blue"
  },
  {
    id: "gradient-8",
    style: "linear-gradient(to right, #ee9ca7, #ffdde1)",
    name: "Soft Pink"
  }
];

export function GradientSelector({ selectedGradient, onSelectGradient }: GradientSelectorProps) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium mb-3">Choose a Background Gradient</h3>
      <div className="grid grid-cols-4 gap-3">
        {gradients.map((gradient) => (
          <button
            key={gradient.id}
            className={cn(
              "w-full aspect-[2/1] rounded-md cursor-pointer transition-all hover:ring-2 hover:ring-primary/50",
              selectedGradient === gradient.style ? "ring-2 ring-primary" : "ring-1 ring-border"
            )}
            style={{ background: gradient.style }}
            onClick={() => onSelectGradient(gradient.style)}
            title={gradient.name}
            aria-label={`Select ${gradient.name} gradient`}
          />
        ))}
      </div>
    </div>
  );
}
