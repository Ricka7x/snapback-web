"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef } from "react"
import { ArrowRightIcon, CpuIcon } from "@phosphor-icons/react"
import { DOWNLOAD_URL } from "@/lib/constants"

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mouseX.set((e.clientX - cx) * 0.25)
    mouseY.set((e.clientY - cy) * 0.25)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={ref}
      className="min-h-[100dvh] bg-[#080808] relative overflow-hidden flex items-center"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(21,86,219,0.08) 0%, transparent 65%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center w-full py-32 lg:py-40">
        {/* Left column */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-primary/80 text-[10px] uppercase tracking-[0.22em] font-mono mb-8 flex items-center gap-2"
          >
            <CpuIcon size={14} weight="light" />
            Free · Now in Beta
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-display text-[clamp(52px,6.5vw,88px)] font-semibold leading-[0.92] tracking-[-0.04em] text-white mb-6"
          >
            Your Mac workspace, <em>back</em> in a <em>snap</em>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-zinc-400 text-lg leading-[1.7] max-w-[420px] mb-10 font-text"
          >
            Save your entire layout with one shortcut. Restore it just as fast: every app, every position, every display. Dev mode, design mode, meeting mode. Seconds apart.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <motion.a
              href={DOWNLOAD_URL}
              style={{ x: springX, y: springY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.02 }}
              className="bg-primary text-white font-semibold px-8 py-4 rounded-2xl text-base flex items-center gap-2.5 w-fit hover:shadow-[0_12px_40px_rgba(21,86,219,0.4)] transition-shadow"
            >
              Download Free
              <ArrowRightIcon size={18} weight="regular" />
            </motion.a>
            <div className="flex items-center gap-2.5 mt-5">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="text-zinc-500 text-[11px] font-mono">Free forever · macOS 14.2+ · No account required</span>
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="relative"
        >
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(21,86,219,0.1) 0%, transparent 70%)" }}
          />
          <motion.div style={{ y }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-2xl border border-white/6 shadow-[0_60px_120px_rgba(0,0,0,0.9)]"
            >
              <source src="/assets/restore.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
