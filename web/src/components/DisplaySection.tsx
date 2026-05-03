"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { MonitorIcon } from "@phosphor-icons/react"
import Image from "next/image"
import { getBlurDataURL } from "@/lib/assetPlaceholders"

const DISPLAY_IMAGE_SRC = "/assets/preview.webp"
const DISPLAY_IMAGE_BLUR = getBlurDataURL(DISPLAY_IMAGE_SRC)

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function DisplaySection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])

  return (
    <section ref={ref} className="bg-[#0c0e14] py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
        {/* Left — copy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="border-l-[2px] border-primary/50 pl-3 text-primary/60 text-[11px] uppercase tracking-[0.18em] font-semibold flex items-center gap-2 mb-8"
          >
            <MonitorIcon size={14} weight="light" />
            Display changes
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(34px,5vw,62px)] font-semibold leading-[1.06] tracking-[-0.03em] text-white mb-8"
          >
            Connect a monitor. Your windows go where they belong.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-zinc-400 text-lg leading-[1.8] font-text"
          >
            Plug in a display and Snapback puts each window on the right screen automatically. Remove one and it skips those windows. Nothing piles up on your laptop screen. Everything else restores exactly as usual.
          </motion.p>
        </motion.div>

        {/* Right — image */}
        <motion.div style={{ y }}>
          <Image
            src={DISPLAY_IMAGE_SRC}
            alt="Snapback display settings panel"
            width={1600}
            height={1000}
            placeholder={DISPLAY_IMAGE_BLUR ? "blur" : "empty"}
            blurDataURL={DISPLAY_IMAGE_BLUR}
            className="w-full rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/5"
          />
        </motion.div>
      </div>
    </section>
  )
}
