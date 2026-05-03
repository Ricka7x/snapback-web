"use client"

import { motion } from "framer-motion"
import { XLogoIcon } from "@phosphor-icons/react"

const tweetTemplates = [
  "Just discovered @snapbackapp — one shortcut restores my entire workspace. The macOS utility I didn't know I needed.",
  "Been using @snapbackapp for a week. Dev mode, design mode, meeting mode. My windows go where they should, every time.",
  "Finally a window manager with memory. @snapbackapp restores my full layout in one keystroke. Nothing else does this.",
  "My setup is exactly where I left it after every call. @snapbackapp does what no other window manager does.",
  "Snapback is quietly the best thing I've installed on my Mac this year. @snapbackapp",
]

function getRandomTemplate() {
  return tweetTemplates[Math.floor(Math.random() * tweetTemplates.length)]
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function SocialProofCTA() {
  const handleShare = () => {
    const text = encodeURIComponent(getRandomTemplate())
    const url = encodeURIComponent("https://snapbackapp.com")
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="bg-[#0c0e14] py-28 md:py-40">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-7xl mx-auto px-6 lg:px-12 text-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-primary text-[11px] font-bold uppercase tracking-[0.14em] mb-5"
        >
          Social proof
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(32px,4.5vw,56px)] font-semibold tracking-[-0.03em] text-white leading-[1.06] mb-6"
        >
          No fake testimonials. Yours is the one that matters.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-zinc-400 text-lg leading-[1.8] font-text max-w-xl mx-auto mb-10"
        >
          We&apos;re not going to make up quotes. Share how Snapback fits into your workflow and we&apos;ll feature real ones right here.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-6">
          <button
            onClick={handleShare}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-bold text-base hover:bg-zinc-200 transition-colors"
          >
            <XLogoIcon size={20} weight="fill" />
            Share your setup
          </button>

          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-white/[0.06]" />
            <a
              href="https://x.com/snapbackapp_dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 text-sm font-text hover:text-zinc-400 transition-colors"
            >
              @snapbackapp_dev
            </a>
            <span className="h-px w-8 bg-white/[0.06]" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
