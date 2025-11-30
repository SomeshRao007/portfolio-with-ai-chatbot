// components/ui/stagger-testimonials.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

// 1. Update Interface to accept separate fields
export interface StaggerTestimonialItem {
  tempId: string | number;
  testimonial: string;
  author: string;   // Changed from 'by'
  role: string;     // New field
  company: string;  // New field
  imgSrc?: string;
}

interface TestimonialCardProps {
  position: number;
  testimonial: StaggerTestimonialItem;
  handleMove: (steps: number) => void;
  cardSize: number;
  isMobile: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize,
  isMobile
}) => {
  const isCenter = position === 0;
  
  const spreadFactor = isMobile ? 20 : (cardSize / 1.5); 
  const scaleFactor = isMobile && !isCenter ? 0.9 : 1;
  const opacityFactor = isMobile && !isCenter ? 0.6 : 1;

  // dynamic text colors based on card position
  const titleColor = isCenter ? "text-white" : "text-slate-900 dark:text-white";
  const subTextColor = isCenter ? "text-blue-100" : "text-slate-500 dark:text-slate-400";

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out bg-card flex flex-col justify-center", // Added flex col
        isCenter 
          ? "z-10 bg-blue-600 text-white border-blue-600 shadow-xl" 
          : "z-0 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        opacity: opacityFactor,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${spreadFactor * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          scale(${scaleFactor})
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(0,0,0,0.1)" : "none"
      }}
    >
       {/* Corner Decoration */}
      <span
        className="absolute block origin-top-right rotate-45 bg-slate-200 dark:bg-slate-600"
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />
      
      {/* 2. New Header Layout: Image + Details Side-by-Side */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={testimonial.imgSrc} 
          alt={testimonial.author}
          className="h-14 w-14 rounded-full bg-slate-100 object-cover shadow-sm shrink-0"
        />
        
        <div className="flex flex-col text-left">
          <span className={cn("font-bold text-lg leading-tight", titleColor)}>
            {testimonial.author}
          </span>
          <span className={cn("text-xs uppercase tracking-wide font-semibold mt-1", subTextColor)}>
            {testimonial.role}
          </span>
          <span className={cn("text-xs", subTextColor)}>
            {testimonial.company}
          </span>
        </div>
      </div>

      {/* Quote */}
      <h3 className={cn(
        "font-medium leading-relaxed overflow-hidden",
        isMobile ? "text-sm line-clamp-6" : "text-lg line-clamp-5",
        titleColor
      )}>
        "{testimonial.testimonial}"
      </h3>
      
      {/* Removed the absolute positioned author at bottom since it's now at the top */}
    </div>
  );
};

interface StaggerTestimonialsProps {
  items: StaggerTestimonialItem[];
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({ items }) => {
  const [cardSize, setCardSize] = useState(365);
  const [isMobile, setIsMobile] = useState(false);
  const [testimonialsList, setTestimonialsList] = useState(items);

  useEffect(() => {
    setTestimonialsList(items);
  }, [items]);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const isMobileView = width < 640;
      setIsMobile(isMobileView);
      setCardSize(isMobileView ? Math.min(width * 0.9, 300) : 365);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: isMobile ? 450 : 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
          
        if(isMobile && Math.abs(position) > 2) return null;

        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
            isMobile={isMobile}
          />
        );
      })}
      
      <div className={cn(
        "absolute flex -translate-x-1/2 gap-4 z-20 left-1/2",
        isMobile ? "bottom-4" : "bottom-10"
      )}>
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
            "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white dark:text-white",
            "shadow-lg"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
            "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white dark:text-white",
            "shadow-lg"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};