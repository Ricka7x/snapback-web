"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "@phosphor-icons/react"

const faqs = [
  {
    q: "Is Snapback really free?",
    a: "Yes. The core app is free and will stay that way. Paid features start with Modes.",
  },
  {
    q: "Does it work with multiple monitors?",
    a: "Yes. Workspaces capture window positions across all connected displays.",
  },
  {
    q: "What if I swap or rotate a display?",
    a: "Snapback detects the change and recalculates automatically.",
  },
  {
    q: "What happens if I disconnect a display entirely?",
    a: "Snapback won't restore windows onto a screen that isn't there. Everything waits until you reconnect.",
  },
  {
    q: "What happens if an app in my workspace is closed?",
    a: "Snapback reopens it automatically.",
  },
  {
    q: "Will it work after a macOS update?",
    a: "Snapback targets macOS 14.2+ and is actively maintained.",
  },
  {
    q: "Does it run in the background?",
    a: "Yes. Menu bar, minimal resources.",
  },
  {
    q: "Can I use it alongside Rectangle or Magnet?",
    a: "Yes. They work together without conflicts.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between py-5 w-full text-left group cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-white/70 text-base md:text-lg font-medium group-hover:text-white transition-colors leading-snug pr-6">
          {q}
        </span>
        <motion.span
          style={{ rotate: open ? "45deg" : "0deg" }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="shrink-0"
        >
          <Plus size={20} weight="regular" className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <div className="pb-6">
              <span className="w-8 h-px bg-primary block mb-4" />
              <p className="text-zinc-500 text-base leading-[1.8] font-text">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  return (
    <section className="bg-[#080808] py-28 md:py-40">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-semibold text-white tracking-[-0.03em]">
            Got <em>questions?</em>
          </h2>
          <p className="text-zinc-600 text-base mt-4 font-text">
            We&apos;ve got answers. Reach us at{" "}
            <a
              href="mailto:support@snapbackapp.com"
              className="text-primary hover:underline"
            >
              support@snapbackapp.com
            </a>
          </p>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {faqs.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
