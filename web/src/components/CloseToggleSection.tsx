"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ArrowsLeftRight } from "@phosphor-icons/react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const cases = [
  {
    name: "Dev to Design",
    combos: [["⌃", "⌥", "D"], ["⌃", "⌥", "S"]],
    note: "Closes non-workspace apps for a totally fresh start.",
    accent: true,
  },
  {
    name: "Work to Calls",
    combos: [["⌃", "⌥", "W"], ["⌃", "⌥", "M"]],
    note: "Keeps your apps open but shifts them into meeting mode.",
    accent: false,
  },
  {
    name: "Focus mode",
    combos: [["⌃", "⌥", "F"]],
    note: "One app, one screen. Everything else goes away.",
    accent: false,
  },
]

export default function CloseToggleSection() {
  const [enabled, setEnabled] = useState(true)

  return (
    <section className="bg-[#080808] py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-white/8 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="bg-[#0c0e14] p-10 md:p-16"
          >
            <motion.p
              variants={fadeUp}
              className="border-l-2 border-primary/50 pl-3 text-primary/60 text-[11px] uppercase tracking-[0.18em] font-semibold flex items-center gap-2 mb-8"
            >
              <ArrowsLeftRight size={14} weight="light" />
              Context switching
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(28px,4vw,48px)] font-semibold leading-[1.12] tracking-[-0.03em] text-white mb-6"
            >
              Go from development to design without the clutter.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-zinc-400 text-lg leading-[1.8] font-text mb-8"
            >
              When you restore a workspace, Snapback can close anything that doesn&apos;t belong to it. One shortcut shifts your whole environment. Dev mode, design mode, focus mode. Each one stays clean.
            </motion.p>

            {/* Toggle */}
            <motion.div variants={fadeUp} className="glass rounded-2xl p-5 mt-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-semibold mb-0.5">Close other apps on restore</p>
                  <p className="text-zinc-600 text-xs font-text">Switch context without the clutter</p>
                </div>
                <button
                  onClick={() => setEnabled(!enabled)}
                  aria-pressed={enabled}
                  aria-label="Toggle close other apps"
                  className="relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0"
                  style={{ background: enabled ? "var(--color-primary)" : "rgba(255,255,255,0.1)" }}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
                    style={{ left: enabled ? "calc(100% - 1.375rem)" : "0.125rem" }}
                  />
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="bg-[#080808] p-10 md:p-12 flex flex-col gap-3 justify-center"
          >
            {cases.map((c) => (
              <motion.div
                key={c.name}
                variants={fadeUp}
                className={`rounded-2xl p-5 border ${
                  c.accent
                    ? "bg-primary/6 border-primary/20"
                    : "bg-white/2 border-white/6"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className={`text-sm font-semibold ${c.accent ? "text-white" : "text-white/70"}`}>
                    {c.name}
                  </p>
                  {c.accent && (
                    <span className="text-[9px] font-mono text-primary/60 uppercase tracking-[0.12em] border border-primary/20 rounded px-1.5 py-0.5 shrink-0">
                      example
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 flex-nowrap mb-3">
                  {c.combos.map((combo, j) => (
                    <div key={j} className="flex items-center gap-0.5 shrink-0">
                      {j > 0 && <span className="text-zinc-700 text-xs mx-1">→</span>}
                      {combo.map((key, k) => (
                        <kbd
                          key={k}
                          className="font-mono text-[11px] md:text-[13px] text-primary/80 bg-white/5 border border-white/10 rounded-md w-6 h-6 md:w-7 md:h-7 flex items-center justify-center leading-none"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  ))}
                </div>
                <p className="text-zinc-600 text-xs leading-[1.75] font-text">{c.note}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
