"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { LayoutIcon, GridFourIcon } from "@phosphor-icons/react"
import Image from "next/image"
import { getBlurDataURL } from "@/lib/assetPlaceholders"

const LAYOUTS_IMAGE_SRC = "/assets/layouts.webp"
const LAYOUTS_IMAGE_BLUR = getBlurDataURL(LAYOUTS_IMAGE_SRC)

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const layouts = [
  {
    icon: <GridFourIcon size={20} weight="light" className="text-primary/60 mb-3" />,
    title: "Halves",
    body: "Two apps, equal split.",
  },
  {
    icon: <LayoutIcon size={20} weight="light" className="text-primary/60 mb-3" />,
    title: "Thirds",
    body: "Three columns, balanced.",
  },
  {
    icon: <GridFourIcon size={20} weight="light" className="text-primary/60 mb-3" />,
    title: "Full",
    body: "One app front and center.",
  },
]

export default function LayoutsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])

  return (
    <section ref={ref} className="bg-[#0f0f11] py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Two-col: image left, copy right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left — image */}
          <motion.div style={{ y }}>
            <Image
              src={LAYOUTS_IMAGE_SRC}
              alt="Default layout presets"
              width={1600}
              height={1000}
              placeholder={LAYOUTS_IMAGE_BLUR ? "blur" : "empty"}
              blurDataURL={LAYOUTS_IMAGE_BLUR}
              className="w-full rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/5"
            />
          </motion.div>

          {/* Right — copy */}
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
              <LayoutIcon size={14} weight="light" />
              Apply layouts instantly
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(34px,5vw,62px)] font-semibold leading-[1.06] tracking-[-0.03em] text-white mb-8"
            >
              One shortcut. Instant order.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-zinc-400 text-lg leading-[1.8] font-text"
            >
              Hit a shortcut. Your open apps snap into a preset layout. Halves, thirds, or one app.
            </motion.p>
          </motion.div>
        </div>

        
      </div>
    </section>
  )
}
