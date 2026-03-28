"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Section wrapper
export function Section({ bg = "main", children, className = "", mesh = false, id }: { bg?: "main" | "alt", children: React.ReactNode, className?: string, mesh?: boolean, id?: string }) {
  const bgClass = bg === "alt" ? "bg-zinc-900" : "bg-zinc-950";
  // Add scroll margin for anchor navigation if id is present
  const scrollMarginClass = id ? "scroll-mt-24 md:scroll-mt-32" : "";
  return (
    <section id={id} className={`${bgClass} ${mesh ? "mesh-gradient" : ""} ${scrollMarginClass} ${className} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto py-20 md:py-40 px-6 lg:px-12 relative z-10">{children}</div>
    </section>
  );
}

// Two-column layout
export function TwoCol({ 
  left, 
  right, 
  reverseOnDesktop = false, 
}: { 
  left: React.ReactNode, 
  right: React.ReactNode, 
  reverseOnDesktop?: boolean, 
}) {
  return (
    <div className="grid gap-10 md:gap-16 items-center grid-cols-1 md:grid-cols-2">
      <div className={`${reverseOnDesktop ? "md:order-2" : ""}`}>
        {left}
      </div>
      <div className={`${reverseOnDesktop ? "md:order-1" : ""}`}>
        {right}
      </div>
    </div>
  );
}

// Content blocks with cinematic reveal
export function Copy({ eyebrow, heading, body, headingSize = "text-[clamp(32px,5vw,52px)]" }: { eyebrow: string, heading: React.ReactNode, body: string, headingSize?: string }) {
  return (
    <div className="relative">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-primary/70 text-[11px] font-semibold uppercase tracking-[0.16em] block mb-5 pl-3 border-l-2 border-primary/40 w-fit"
      >
        {eyebrow}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`${headingSize} font-display font-semibold leading-[1.05] mb-6 text-white tracking-[-0.02em]`}
      >
        {heading}
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ delay: 0.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-zinc-400 text-lg leading-[1.8] max-w-prose font-medium"
      >
        {body}
      </motion.p>
    </div>
  );
}

// Media display with cinematic reveal and tilt
export function Shot({ src, alt }: { src: string, alt: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  
  // Parallax while scrolling through
  const { scrollYProgress: activeProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(activeProgress, [0, 1], [40, -40]);
  const rotateX = useTransform(activeProgress, [0, 1], [5, -5]);

  return (
    <motion.div 
      ref={ref}
      style={{ y: scrollY, opacity, scale }}
      className="relative group"
    >
      <div className="absolute -inset-10 rounded-[3rem] bg-primary/10 blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <motion.div
        style={{ y, rotateX, perspective: 1000 }}
        className="relative rounded-[20px] border border-white/8 shadow-[0_40px_80px_-16px_rgba(0,0,0,0.7)] overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_56px_96px_-20px_rgba(0,0,0,0.85)]"
      >
        <img
          src={src}
          alt={alt}
          className="w-full block"
        />
      </motion.div>
    </motion.div>
  );
}

export function Magnetic({ children, distance = 0.5 }: { children: React.ReactElement, distance?: number }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * distance;
    const y = (clientY - (top + height / 2)) * distance;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(position.x, springConfig);
  const springY = useSpring(position.y, springConfig);

  useEffect(() => {
    springX.set(position.x);
    springY.set(position.y);
  }, [position.x, position.y, springX, springY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}
