"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { MonitorIcon } from "@phosphor-icons/react"
import Image from "next/image"
import Link from "next/link"
import { getBlurDataURL } from "@/lib/assetPlaceholders"

const DISPLAY_IMAGE_SRC = "/assets/save.webp"
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
        {/* Image — first on mobile, right on desktop */}
        <motion.div className="order-1 lg:order-2" style={{ y }}>
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

        {/* Copy — second on mobile, left on desktop */}
        <motion.div
          className="order-2 lg:order-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="border-l-[2px] border-primary/50 pl-3 text-primary/80 text-[11px] uppercase tracking-[0.18em] font-semibold flex items-center gap-2 mb-8"
          >
            <MonitorIcon size={14} weight="light" />
            Display changes
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(34px,5vw,62px)] font-semibold leading-[1.06] tracking-[-0.03em] text-white mb-8"
          >
            Snapback knows when your displays change.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-zinc-400 text-lg leading-[1.8] font-text"
          >
            Connect or disconnect a monitor and Snapback adapts on its own. Every window lands on the right screen, and nothing piles up on your laptop display.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6">
            <Link
              href="/blog/manage-multiple-monitors-on-mac/"
              className="text-white/70 text-sm underline decoration-white/30 hover:decoration-white hover:text-white transition-colors"
            >
              Read the multi-monitor guide
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
