"use client"

import { motion } from "framer-motion"
import { TerminalIcon, KeyIcon, LightningIcon, XLogoIcon, LayoutIcon, LinkIcon, ArrowRightIcon, PaletteIcon, ArrowsOutSimpleIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { PRO_AVAILABLE, PRO_PRICE } from "@/lib/constants"
import { trackEvent } from "@/lib/analytics"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const cards = [
  {
    icon: <TerminalIcon size={18} weight="light" className="text-accent/60 shrink-0" />,
    title: "Quick command",
    body: "Press one key, type what you need. No memorizing shortcuts.",
  },
  {
    icon: <KeyIcon size={18} weight="light" className="text-accent/60 shrink-0" />,
    title: "Spaces",
    body: "Group shortcuts by what you're doing. Use the same keys for different tasks.",
  },
  {
    icon: <LightningIcon size={18} weight="light" className="text-accent/60 shrink-0" />,
    title: "Global shortcuts",
    body: "Shortcuts without a space work everywhere. Simple as that.",
  },
  {
    icon: <LayoutIcon size={18} weight="light" className="text-accent/60 shrink-0" />,
    title: "Custom layouts",
    body: "Save window arrangements your way, not just the defaults.",
  },
  {
    icon: <LinkIcon size={18} weight="light" className="text-accent/60 shrink-0" />,
    title: "Smart launchers",
    body: "Restore windows AND open projects, websites, or run commands automatically.",
  },
  {
    icon: <ArrowsOutSimpleIcon size={18} weight="light" className="text-accent/60 shrink-0" />,
    title: "Adaptive resize",
    body: "Resize one window and the others grow or shrink to keep the display filled. One click puts everything back.",
  },
  {
    icon: <PaletteIcon size={18} weight="light" className="text-accent/60 shrink-0" />,
    title: "Themes",
    body: "Catppuccin, Dracula, Nord, GitHub, and more. Make Snapback match your setup.",
  },
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

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start relative z-10">
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
              {PRO_AVAILABLE ? "Now Available · Pro" : "Coming Soon · Pro"}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(32px,4.5vw,56px)] font-semibold tracking-[-0.03em] text-white leading-[1.06] mb-6"
          >
            Pro: Your shortcuts, your way.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-zinc-400 text-lg leading-[1.8] font-text max-w-xl mb-10"
          >
            One shortcut opens a command palette. Type what you want. No memorizing dozens of shortcuts ever again.
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-start gap-3 pt-8 border-t border-white/6 sm:flex-row sm:items-center sm:gap-5"
          >
            <Link
              href="/pro/"
              onClick={() => trackEvent("pro_cta_click", { location: "coming_soon" })}
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 bg-accent text-white text-sm font-semibold hover:bg-accent-hover hover:shadow-[0_8px_30px_rgba(254,100,69,0.3)] transition-all"
            >
              {PRO_AVAILABLE ? `Get Pro for ${PRO_PRICE}` : "See everything in Pro"}
              <ArrowRightIcon size={14} weight="bold" />
            </Link>
            {PRO_AVAILABLE ? (
              <span className="text-zinc-500 text-sm font-text">
                One-time purchase. No subscription, yours forever.
              </span>
            ) : (
              <a
                href="https://x.com/snapbackapp_dev"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 border border-accent/20 text-white/70 text-sm font-medium hover:border-accent/50 hover:text-white transition-all glass"
              >
                <XLogoIcon size={15} weight="fill" />
                Follow for updates
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Right — feature cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="flex flex-col gap-3"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="p-4 rounded-2xl border border-accent/10 glass flex items-start gap-4"
            >
              <div className="mt-0.5">{card.icon}</div>
              <div>
                <h3 className="text-white text-sm font-semibold mb-1">{card.title}</h3>
                <p className="text-zinc-500 text-xs leading-[1.7] font-text">{card.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
