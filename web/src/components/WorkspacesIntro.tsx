"use client"

import { motion } from "framer-motion";
import { Section } from "./ui";

export default function WorkspacesIntro() {
  return (
    <Section bg="alt" mesh>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-primary text-[11px] font-bold uppercase tracking-[0.12em] block mb-5"
        >
          Workspaces
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="font-display text-[clamp(36px,6vw,60px)] font-semibold leading-[1.08] tracking-[-0.015em] text-white mb-6 text-glow"
        >
          One shortcut.<br />
          Every window where it belongs.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-zinc-400 text-xl leading-[1.65] font-medium opacity-90"
        >
          Save everything: every app, every display, and every position. Bring it back
          instantly, move between workflows as fast as you switch between tasks.
        </motion.p>
      </motion.div>
    </Section>
  );
}
