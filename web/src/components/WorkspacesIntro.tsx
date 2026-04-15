"use client"

import { motion } from "framer-motion"
import { StackSimpleIcon } from "@phosphor-icons/react"
import WorkspaceFlowAnimation from "./WorkspaceFlowAnimation"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const steps = [
  {
    number: "01",
    title: "Arrange your apps",
    body: "Drag windows into position or use keyboard shortcuts.",
  },
  {
    number: "02",
    title: "Save the layout",
    body: "Name it, assign a shortcut. Takes five seconds.",
  },
  {
    number: "03",
    title: "Restore it anytime",
    body: "Every app reopens. Every window returns to its exact position.",
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
          Save a workspace. Restore everything, instantly.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-zinc-500 text-lg leading-[1.7] max-w-xl mx-auto font-text"
        >
          Arrange your apps, save the layout, name it, assign a shortcut. One key brings everything back exactly as you left it.
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
          <WorkspaceFlowAnimation />
        </div>
      </motion.div>
    </section>
  )
}
