"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowsOut, CornersOut, GridFour, Hand, Monitor } from "@phosphor-icons/react"
import Image from "next/image"
import { getBlurDataURL } from "@/lib/assetPlaceholders"

const SNAP_IMAGE_SRC = "/assets/positions.webp"
const SNAP_IMAGE_BLUR = getBlurDataURL(SNAP_IMAGE_SRC)

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const features = [
  {
    icon: <CornersOut size={20} weight="light" className="text-primary/60 mb-3" />,
    title: "Halves and thirds",
    body: "Left, right, top, or bottom.",
  },
  {
    icon: <GridFour size={20} weight="light" className="text-primary/60 mb-3" />,
    title: "Quarter layouts",
    body: "Four apps, one screen.",
  },
  {
    icon: <Hand size={20} weight="light" className="text-primary/60 mb-3" />,
    title: "Modifier drag",
    body: "Hold Option and drag.",
  },
  {
    icon: <Monitor size={20} weight="light" className="text-primary/60 mb-3" />,
    title: "Multi-display",
    body: "Spans every monitor.",
  },
]

export default function SnapSection() {
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
              src={SNAP_IMAGE_SRC}
              alt="Window snap positions"
              width={1600}
              height={1000}
              placeholder={SNAP_IMAGE_BLUR ? "blur" : "empty"}
              blurDataURL={SNAP_IMAGE_BLUR}
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
              <ArrowsOut size={14} weight="light" />
              Window snapping
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(34px,5vw,62px)] font-semibold leading-[1.06] tracking-[-0.03em] text-white mb-8"
            >
              One shortcut. Every window where it belongs.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-zinc-400 text-lg leading-[1.8] font-text"
            >
              Snap any window to any division: half, quarter, third. Use keyboard shortcuts or Option-drag. No configuration, no learning curve, just the layout you want.
            </motion.p>
          </motion.div>
        </div>

        {/* 4 features */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-white/8"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className={`p-6 md:py-8
                ${i % 2 === 0 ? "border-r border-white/6" : ""}
                ${i < 2 ? "border-b border-white/6 md:border-b-0" : ""}
                ${i === 1 ? "md:border-r md:border-white/6" : ""}
                ${i === 0 ? "md:pl-0" : ""}
                ${i === 3 ? "md:pr-0" : ""}
              `}
            >
              {f.icon}
              <h3 className="text-white text-sm font-semibold mb-1">{f.title}</h3>
              <p className="text-zinc-600 text-xs leading-[1.6] font-text">{f.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
