"use client"

import { motion } from "framer-motion";
import { Magnetic } from "./ui";

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
              className="w-16 h-16 rounded-lg"
            />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display text-[clamp(40px,7vw,72px)] font-semibold leading-[1] tracking-[-0.03em] text-white mb-8 text-glow"
          >
            ready to <em>snap back</em>?
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
            className="flex flex-col items-center gap-4"
          >
            <Magnetic>
              <a
                href="/releases/Snapback-0.1.2.dmg"
                download
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-2xl transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95"
              >
                Get Snapback
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </Magnetic>
            
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">Always Free · MacOS 13+</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
