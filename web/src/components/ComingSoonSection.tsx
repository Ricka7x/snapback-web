"use client"

import { motion } from "framer-motion"
import { TerminalIcon, KeyIcon, LightningIcon, ProhibitIcon } from "@phosphor-icons/react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const pills = [
  { icon: <TerminalIcon size={16} weight="light" className="text-accent/60" />, label: "Command palette" },
  { icon: <KeyIcon size={16} weight="light" className="text-accent/60" />, label: "Mode-scoped shortcuts" },
  { icon: <LightningIcon size={16} weight="light" className="text-accent/60" />, label: "Instant context switch" },
  { icon: <ProhibitIcon size={16} weight="light" className="text-accent/60" />, label: "Zero key conflicts" },
]

export default function ComingSoonSection() {
  return (
    <section className="bg-[#0c0e14] py-28 md:py-40 relative overflow-hidden">
      {/* Giant decorative M */}
      <span
        aria-hidden
        className="absolute -right-8 top-1/2 -translate-y-1/2 font-display font-bold text-accent/4 leading-none select-none pointer-events-none"
        style={{ fontSize: "22rem" }}
      >
        M
      </span>

      {/* Accent glow */}
      <div
        className="absolute top-0 right-0 w-150 h-150 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, rgba(254,100,69,0.07) 0%, transparent 65%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-start relative z-10">
        {/* Left */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-accent/15 border border-accent/25 text-accent text-[10px] uppercase tracking-[0.2em] font-semibold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Coming Soon · Pro
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(32px,4.5vw,56px)] font-semibold tracking-[-0.03em] text-white leading-[1.06] mb-6"
          >
            Spaces. One shortcut for everything.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-zinc-400 text-lg leading-[1.8] font-text max-w-xl mb-10"
          >
            Pro introduces Spaces: Raycast-style command palette switching for your entire environment. One keystroke swaps your full context, workspaces and all. Reuse the same shortcuts across spaces without conflicts.
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-5 pt-8 border-t border-white/6"
          >
            <a
              href="https://x.com/snapbackapp_dev"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border border-accent/20 text-white/70 text-sm font-medium hover:border-accent/50 hover:text-white transition-all glass"
            >
              Follow for updates
            </a>
            <p className="text-zinc-600 text-xs font-text">
              Free users keep everything they have now.
            </p>
          </motion.div>
        </motion.div>

        {/* Right — pills */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="flex flex-col gap-2.5 lg:w-56 shrink-0"
        >
          {pills.map((pill) => (
            <motion.div
              key={pill.label}
              variants={fadeUp}
              className="px-4 py-3 rounded-xl border border-accent/10 text-zinc-300 text-sm font-text flex items-center gap-3 glass"
            >
              {pill.icon}
              {pill.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
