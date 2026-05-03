"use client"

import { motion } from "framer-motion"
import { XLogoIcon } from "@phosphor-icons/react"
import ShareOnX from "./ShareOnX"

// REPLACE THESE with real tweets when you have them.
// Grab tweet URLs from X and drop name, handle, and content here.
const tweets = [
  {
    name: "James Whitfield",
    handle: "@jwhitfield_dev",
    initials: "JW",
    content: "Been using Snapback for three weeks. My dev setup is exactly where I left it after every call. Embarrassingly simple. Why didn't this exist before.",
    date: "Mar 14",
  },
  {
    name: "Mara Okonkwo",
    handle: "@mara.design",
    initials: "MO",
    content: "Switching between design and code used to cost me 5 minutes of rearranging windows. Now it's one shortcut. My brain stays in flow.",
    date: "Mar 21",
  },
  {
    name: "Rafael Torres",
    handle: "@rtorres_mac",
    initials: "RT",
    content: "The close other apps on restore thing is underrated. I go into focus mode and my whole environment gets quiet. It's weirdly satisfying.",
    date: "Feb 28",
  },
  {
    name: "Soren Lindqvist",
    handle: "@soren_lind",
    initials: "SL",
    content: "I dock and undock my laptop 10 times a day. With Snapback my windows just... go where they should. I stopped thinking about it entirely.",
    date: "Mar 8",
  },
  {
    name: "Priya Nair",
    handle: "@priya_codes",
    initials: "PN",
    content: "Lives in the menu bar, out of the way. I forget it's running until I need it. That's exactly what a good utility should feel like.",
    date: "Mar 17",
  },
  {
    name: "Tom Marchetti",
    handle: "@t.marchetti",
    initials: "TM",
    content: "Showed this to three people on my team. All three installed it within the hour. That says everything.",
    date: "Apr 1",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

function TweetCard({ tweet, index }: { tweet: typeof tweets[0]; index: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: (index % 3) * 0.08 } } }}
      className="rounded-2xl border border-white/8 bg-white/2 p-5 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-semibold text-zinc-300 font-mono">{tweet.initials}</span>
          </div>
          <div>
            <p className="text-white/80 text-sm font-semibold leading-none mb-1">{tweet.name}</p>
            <p className="text-zinc-600 text-[11px] font-mono">{tweet.handle}</p>
          </div>
        </div>
        <XLogoIcon size={16} weight="fill" className="text-zinc-700 shrink-0 mt-0.5" />
      </div>

      <p className="text-zinc-400 text-sm leading-[1.75] font-text">{tweet.content}</p>

      <p className="text-zinc-700 text-[11px] font-mono">{tweet.date}</p>
    </motion.div>
  )
}

const col1 = tweets.filter((_, i) => i % 2 === 0)
const col2 = tweets.filter((_, i) => i % 2 !== 0)

export default function TestimonialsSection() {
  return (
    <section className="bg-[#0f0f11] py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="border-l-2 border-primary/50 pl-3 text-primary/60 text-[11px] uppercase tracking-[0.18em] font-semibold mb-6"
          >
            From real users
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(32px,4.5vw,56px)] font-semibold tracking-[-0.03em] text-white leading-[1.06] max-w-lg"
          >
            Mac users who stopped rebuilding their workspace every morning.
          </motion.h2>
        </motion.div>

        {/* Share CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex items-center gap-4 mb-16"
        >
          <ShareOnX />
          <p className="text-zinc-600 text-xs font-text">Using Snapback? Share your setup.</p>
        </motion.div>

        {/* Masonry grid — 2 cols desktop, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            {col1.map((tweet, i) => (
              <TweetCard key={tweet.handle} tweet={tweet} index={i * 2} />
            ))}
          </div>
          <div className="flex flex-col gap-4 md:mt-12">
            {col2.map((tweet, i) => (
              <TweetCard key={tweet.handle} tweet={tweet} index={i * 2 + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
