"use client"

import { motion } from "framer-motion"
import { ScalesIcon, CheckIcon, XIcon } from "@phosphor-icons/react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const rows = [
  { label: "Snap and resize windows", other: true, snapback: true, snapbackOnly: false },
  { label: "Saves full workspace layouts", other: false, snapback: true, snapbackOnly: true },
  { label: "Restores layouts on demand", other: false, snapback: true, snapbackOnly: true },
  { label: "Reopens closed apps automatically", other: false, snapback: true, snapbackOnly: true },
  { label: "Unlimited named workspaces", other: false, snapback: true, snapbackOnly: true },
  { label: "Layouts survive restarts", other: false, snapback: true, snapbackOnly: true },
]

export default function ComparisonSection() {
  return (
    <section className="bg-[#0f0f11] py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 max-w-3xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="border-l-[2px] border-primary/50 pl-3 text-primary/60 text-[11px] uppercase tracking-[0.18em] font-semibold flex items-center gap-2 mb-8"
          >
            <ScalesIcon size={14} weight="light" />
            vs other window managers
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(34px,5vw,62px)] font-semibold leading-[1.06] tracking-[-0.03em] text-white mb-6"
          >
            Already using Rectangle, Magnet, or Moom?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-zinc-400 text-lg leading-[1.8] font-text"
          >
            They resize windows. They don&apos;t remember what was open or where. Close your laptop, lose your layout. Snapback remembers.
          </motion.p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="rounded-2xl overflow-hidden border border-white/[0.08]"
        >
          {/* Header row */}
          <div className="grid grid-cols-[1fr_100px_100px] bg-[#0c0e14] border-b border-white/[0.08] px-6 py-4">
            <div />
            <div className="text-zinc-600 text-[10px] uppercase tracking-[0.14em] text-center">Other apps</div>
            <div className="text-primary text-[10px] uppercase tracking-[0.14em] font-bold text-center">Snapback</div>
          </div>

          {/* Data rows */}
          {rows.map((row) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1fr_100px_100px] px-6 py-4 items-center border-b border-white/5 last:border-0 relative ${
                row.snapbackOnly ? "bg-primary/[0.04] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary/50" : ""
              }`}
            >
              <span className={`text-sm ${row.snapbackOnly ? "text-white/90 font-medium" : "text-zinc-500"}`}>
                {row.label}
              </span>

              {/* Other apps cell */}
              <div className="flex items-center justify-center">
                {row.other ? (
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <CheckIcon size={14} weight="regular" className="text-primary" />
                  </div>
                ) : (
                  <div className="w-6 h-6 flex items-center justify-center mx-auto">
                    <XIcon size={14} weight="regular" className="text-zinc-700" />
                  </div>
                )}
              </div>

              {/* Snapback cell */}
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
                  <CheckIcon size={14} weight="regular" className="text-primary" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-zinc-600 text-sm text-center mt-6 font-text"
        >
          Snapback works alongside Rectangle, Magnet, or any other window manager. No conflicts.
        </motion.p>
      </div>
    </section>
  )
}
