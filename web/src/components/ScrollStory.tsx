"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollStoryProps {
  children: (progress: any) => React.ReactNode;
}

export default function ScrollStory({ children }: ScrollStoryProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        {children(scrollYProgress)}
      </div>
    </div>
  );
}
