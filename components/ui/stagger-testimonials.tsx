// components/ui/stagger-testimonials.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export interface StaggerTestimonialItem {
  tempId: string | number;
  testimonial: string;
  by: string;
  imgSrc?: string;
}

interface TestimonialCardProps {
  position: number;
  testimonial: StaggerTestimonialItem;
  handleMove: (steps: number) => void;
  cardSize: number;
  isMobile: boolean; // Add isMobile prop
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize,
  isMobile
}) => {
  const isCenter = position === 0;
  
  // Calculate spread: On mobile, keep them tight (stacked). On desktop, spread them out.
  const spreadFactor = isMobile ? 20 : (cardSize / 1.5); 
  const scaleFactor = isMobile && !isCenter ? 0.9 : 1;
  const opacityFactor = isMobile && !isCenter ? 0.6 : 1;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out bg-card",
        isCenter 
          ? "z-10 bg-blue-600 text-white border-blue-600 shadow-xl" 
          : "z-0 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        opacity: opacityFactor,
        // The unique geometric shape
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
      
      {/* Image / Avatar */}
      <img
        src={testimonial.imgSrc || "/assets/images/flag.jpeg"} 
        alt={testimonial.by}
        className="mb-4 h-14 w-14 rounded-full bg-slate-100 object-cover shadow-sm"
      />

      {/* Quote */}
      <h3 className={cn(
        "font-medium leading-relaxed overflow-hidden",
        // Adjust font size for mobile vs desktop
        isMobile ? "text-sm line-clamp-6" : "text-lg line-clamp-5",
        isCenter ? "text-white" : "text-slate-900 dark:text-white"
      )}>
        "{testimonial.testimonial}"
      </h3>

      {/* Author */}
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-blue-100" : "text-slate-500 dark:text-slate-400"
      )}>
        - {testimonial.by}
      </p>
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
      
      // On mobile: take 90% of screen width, but max out at 300px
      // On desktop: fixed 365px
      setCardSize(isMobileView ? Math.min(width * 0.9, 300) : 365);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      // Reduce height on mobile to avoid excessive whitespace
      style={{ height: isMobile ? 450 : 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
          
        // Optimization: Don't render cards that are too far away on mobile
        // to prevent weird overflow/glitching
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
      
      {/* Navigation Buttons - Adjusted position for mobile */}
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