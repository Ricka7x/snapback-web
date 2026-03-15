"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Animation from "./Animation";
import { Magnetic } from "./ui";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="bg-black pt-24 pb-0 md:pt-44 overflow-hidden relative mesh-gradient">
      {/* Background glow for hero */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" 
      />
      
      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-8 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5"
        >
          Free for macOS
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(44px,8vw,84px)] font-semibold leading-[0.95] tracking-[-0.03em] text-white mb-8 text-glow"
        >
          Your workspace,<br />
          exactly how you left it.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-zinc-400 text-xl md:text-2xl leading-[1.65] max-w-2xl mx-auto mb-12 font-medium opacity-90"
        >
          Capture your entire work state. Snapback restores every app, every window, 
          and every z-index stack exactly where you need them. It even opens your apps for you.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <Magnetic distance={0.3}>
            <a
              href="#download"
              className="inline-flex items-center gap-2.5 bg-primary text-white font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:bg-primary-hover hover:scale-105 hover:shadow-[0_0_30px_rgba(21,86,219,0.4)]"
            >
              Download for Mac (Free)
            </a>
          </Magnetic>
          <p className="text-zinc-500 text-xs font-medium  tracking-widest opacity-60">
            No account required. Instant download.
          </p>
        </motion.div>
      </div>

      {/* Parallax Background Elements */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      </motion.div>

      {/* ScrollStory will follow immediately */}
    </section>
  );
}
