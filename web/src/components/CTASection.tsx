"use client"

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section id="download" className="bg-black py-24 md:py-40 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10"
        style={{
          backgroundImage: "url('/assets/wallpaper.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] pointer-events-none" />
        
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
            className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-10 shadow-xl backdrop-blur-md"
          >
            <img
              src='/assets/logo.svg'
              alt="Snapback"
              className="w-12 h-12 rounded-lg"
            />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display text-[clamp(40px,7vw,72px)] font-semibold leading-[1] tracking-[-0.03em] text-white mb-8 text-glow"
          >
            ready to snap back?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white/80 text-xl md:text-2xl leading-[1.65] mb-12 font-medium max-w-xxl mx-auto"
          >
            download snapback for free and experience the most<br className="hidden md:block" />
            seamless window management on mac.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <a
              href="#"
              className="inline-block bg-white text-black font-bold text-xl px-12 py-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]"
            >
              download for mac (free)
            </a>
            <p className="text-white/40 text-[11px] font-bold tracking-widest font-mono">macos 13 ventura or later · no account needed</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
