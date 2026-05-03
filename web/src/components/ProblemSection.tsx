"use client"

import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function ProblemSection() {
  return (
    <section className="bg-[#0f0f11] py-28 md:py-40">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-7xl mx-auto px-6 lg:px-12 max-w-2xl"
      >
        <motion.p
          variants={fadeUp}
          className="border-l-[2px] border-primary/50 pl-3 text-primary/80 text-[11px] uppercase tracking-[0.18em] font-semibold"
        >
          The problem
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(34px,5vw,62px)] font-semibold leading-[1.06] tracking-[-0.03em] text-white mt-8 mb-10"
        >
          Every context switch costs you 5 minutes. That&apos;s 25 minutes a day.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-zinc-400 text-xl leading-[1.8] font-text mb-8"
        >
          You had the perfect layout. Code editor left, terminal right, browser in the corner.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="space-y-3 pl-5 border-l border-white/[0.06] mb-8"
        >
          <p className="text-zinc-500 italic text-xl font-text">Then a Slack ping pulled you into a call.</p>
          <p className="text-zinc-500 italic text-xl font-text">Or you jumped to Figma for a quick review.</p>
          <p className="text-zinc-500 italic text-xl font-text">Or you just closed your laptop.</p>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-zinc-400 text-xl leading-[1.8] font-text"
        >
          Now it&apos;s gone. You spend the first five minutes of every session dragging windows back into place, every single day.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-16 pt-10 border-t border-white/[0.06]"
        >
          <span className="w-10 h-[2px] bg-primary block mb-6" />
          <h3 className="font-display text-[clamp(26px,3.5vw,44px)] font-semibold text-white tracking-[-0.025em]">
            Snapback fixes this once. Permanently.
          </h3>
        </motion.div>
      </motion.div>
    </section>
  )
}
