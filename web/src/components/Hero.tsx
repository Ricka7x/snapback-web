"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Magnetic } from "./ui";
import { DOWNLOAD_URL } from "@/lib/constants";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={containerRef} className="bg-zinc-950 min-h-dvh pb-0 overflow-hidden relative mesh-gradient">
      {/* Single distant ambient — one light source, not competing blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
        className="absolute top-0 left-0 w-[50vw] h-[60vh] bg-primary/6 blur-[160px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 min-h-dvh flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center w-full py-32 lg:py-40">

          {/* Left: Text content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 text-primary/70 text-[11px] font-semibold uppercase tracking-[0.16em] mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block" />
              Beta
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(48px,6vw,80px)] font-semibold leading-[0.92] tracking-[-0.035em] text-white mb-8"
            >
              Your <em>workspace</em>,<br />
              <em>exactly</em> how<br />
              you left it.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-zinc-400 text-lg md:text-xl leading-[1.7] max-w-md mb-12 font-text"
            >
              Snapback restores every app, every window, and every z-index stack
              exactly where you need them — and opens your apps if they're closed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
            >
              <Magnetic>
                <a
                  href={DOWNLOAD_URL}
                  download
                  aria-label="Download Snapback for macOS"
                  className="group relative px-8 py-4 bg-primary text-white font-semibold rounded-2xl transition-all duration-300 hover:bg-primary-hover hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(21,86,219,0.28)] active:scale-[0.98] active:brightness-90 shadow-lg flex items-center gap-2.5"
                >
                  Get Snapback
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </Magnetic>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">Free · macOS 12.4+</span>
            </motion.div>
          </div>

          {/* Right: App screenshot — hidden on mobile, full bleed on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 32, y: 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative"
          >
            {/* Subtle glow behind screenshot */}
            <div className="absolute inset-0 -m-8 bg-primary/8 blur-[80px] rounded-full pointer-events-none" />
            <motion.div style={{ y }} className="relative">
              <img
                src="/assets/workspaces.webp"
                alt="Snapback workspace management interface"
                className="w-full rounded-[20px] border border-white/8 shadow-[0_48px_96px_-20px_rgba(0,0,0,0.8)] block"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
