"use client"

import React, { useRef } from 'react';
import { useScroll, type MotionValue } from 'framer-motion';

interface ScrollStoryProps {
  children: (progress: MotionValue<number>) => React.ReactNode;
}

export default function ScrollStory({ children }: ScrollStoryProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={targetRef} className="relative h-[400vh] bg-zinc-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        {children(scrollYProgress)}
      </div>
    </div>
  );
}
