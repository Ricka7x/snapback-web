"use client"

import { motion } from "framer-motion"
import { StackSimpleIcon, KeyboardIcon, MonitorIcon, ArrowsLeftRightIcon } from "@phosphor-icons/react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const steps = [
  {
    number: "01",
    title: "Arrange once",
    body: "Open your apps. Position every window. Takes 2 minutes.",
  },
  {
    number: "02",
    title: "Save in 5 seconds",
    body: "Name your workspace, assign a shortcut. Done.",
  },
  {
    number: "03",
    title: "Restore instantly",
    body: "Every app reopens in the exact same position, on the exact same display, in the exact same order. Every time.",
  },
]

const secondaryFeatures = [
  {
    icon: <KeyboardIcon size={18} weight="light" className="text-primary/70" />,
    title: "Keyboard-first",
    body: "Every action has a shortcut. Every shortcut is customizable. Mouse optional.",
  },
  {
    icon: <MonitorIcon size={18} weight="light" className="text-primary/70" />,
    title: "Multi-display",
    body: "Up to 6 displays. Each window remembers exactly which screen it belongs on.",
  },
  {
    icon: <ArrowsLeftRightIcon size={18} weight="light" className="text-primary/70" />,
    title: "Display resilient",
    body: "Plug in a monitor mid-session. Unplug it at the office. Your layout adjusts. Nothing breaks.",
  },
]

export default function WorkspacesIntro() {
  return (
    <section className="bg-[#080808] py-28 md:py-40">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-20"
      >
        <motion.p
          variants={fadeUp}
          className="text-primary text-[11px] font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-1.5 mb-5"
        >
          <StackSimpleIcon size={14} weight="regular" />
          Core feature
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(36px,5.5vw,64px)] font-semibold tracking-[-0.03em] text-white leading-[1.05] mb-5"
        >
          One shortcut saves your whole setup. One shortcut brings it all back.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-zinc-400 text-lg leading-[1.7] max-w-xl mx-auto font-text"
        >
          Every open app, every window position, every display. Saved in one keystroke. Restored in one keystroke. Even after closing your laptop, switching monitors, or restarting.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-0"
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            variants={fadeUp}
            className={`border-t border-white/[0.08] pt-8 md:pr-12 ${
              i < 2 ? "md:border-r border-white/[0.06]" : ""
            } ${i > 0 ? "md:pl-12" : ""}`}
          >
            <span className="font-mono text-[96px] text-white/4 leading-none block">
              {step.number}
            </span>
            <div className="-mt-3 mb-4" />
            <h3 className="text-white font-semibold text-base mb-2 tracking-tight">{step.title}</h3>
            <p className="text-zinc-400 text-sm leading-[1.7] font-text">{step.body}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="max-w-7xl mx-auto px-6 lg:px-12 mt-20"
      >
        <div className="max-w-5xl mx-auto">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-2xl border border-white/6 shadow-[0_60px_120px_rgba(0,0,0,0.9)]"
          >
            <source src="/assets/snapback-steps.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/[0.06]"
      >
        {secondaryFeatures.map((f, i) => (
          <motion.div
            key={f.title}
            variants={fadeUp}
            className={`pt-8 pb-4 ${
              i < 2 ? "md:border-r border-white/[0.06]" : ""
            } ${i === 0 ? "md:pr-10" : i === 2 ? "md:pl-10" : "md:px-10"}`}
          >
            {f.icon}
            <h3 className="text-white text-sm font-semibold mt-3 mb-1">{f.title}</h3>
            <p className="text-zinc-400 text-sm leading-[1.7] font-text">{f.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
