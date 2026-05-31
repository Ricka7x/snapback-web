"use client"

import { useState, useEffect, ChangeEvent } from "react"
import { motion } from "framer-motion"
import {
  CheckCircleIcon,
  SpinnerIcon,
  TagIcon,
} from "@phosphor-icons/react"
import { DISCOUNT_SOLD_OUT } from "@/lib/constants"

const LOOPS_FORM_ENDPOINT = "https://app.loops.so/api/newsletter-form/cmp35lqn404k40iym3d4cl21w"
const DISCOUNT_DEADLINE = new Date("2026-06-08T00:00:00Z")

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

const features = [
  {
    badge: "Command Palette",
    title: "One shortcut.\nAnything you need.",
    body: "Press one key and type what you want. Open apps, run layouts, switch contexts, without memorizing a shortcut for each thing.",
    image: "/assets/command-palette.webp",
    imageAlt: "Snapback Pro command palette",
  },
  {
    badge: "Spaces",
    title: "Same keys.\nDifferent context.",
    body: "Group shortcuts by what you're working on. Design mode, coding mode, meeting mode. Same muscle memory, completely different actions.",
    image: "/assets/spaces.webp",
    imageAlt: "Snapback Pro Spaces",
  },
  {
    badge: "Custom Layouts",
    title: "Your window\narrangements, saved.",
    body: "Define exactly how windows should be positioned and sized. Recall any layout instantly without the setup.",
    image: "/assets/custom-layouts.webp",
    imageAlt: "Snapback Pro custom layouts",
  },
  {
    badge: "Deep Links",
    title: "Restore everything\nat once.",
    body: "One shortcut opens apps, loads projects, visits URLs, and runs commands. All together, automatically.",
    image: "/assets/deeplinks.webp",
    imageAlt: "Snapback Pro deep links",
  },
]

function CountdownTimer() {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, DISCOUNT_DEADLINE.getTime() - Date.now())
      setRemaining({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const blocks = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ]

  return (
    <div className="flex items-center gap-2">
      {blocks.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="font-mono text-3xl font-bold text-white tabular-nums w-14 text-center">
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-zinc-500 text-[9px] uppercase tracking-[0.15em] mt-1">{label}</span>
          </div>
          {i < blocks.length - 1 && (
            <span className="font-mono text-xl text-zinc-700 mb-4">:</span>
          )}
        </div>
      ))}
    </div>
  )
}

function EmailForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")
    const email = (new FormData(e.currentTarget)).get("email") as string
    try {
      const res = await fetch(LOOPS_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}&userGroup=${DISCOUNT_SOLD_OUT ? "waitlist" : "earlybird"}`,
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center max-w-md"
      >
        <CheckCircleIcon size={40} weight="thin" className="text-accent mx-auto mb-3" />
        <p className="text-white font-semibold mb-1">You're on the list!</p>
        <p className="text-zinc-400 text-sm">
          {DISCOUNT_SOLD_OUT
            ? "We'll email you the moment Snapback Pro launches."
            : "Your 25% off code will be sent to your email at launch. No action needed."}
        </p>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="sm:shrink-0 bg-accent text-white font-semibold px-5 py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-accent-hover hover:shadow-[0_8px_30px_rgba(254,100,69,0.3)] transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === "submitting" ? (
            <SpinnerIcon size={15} className="animate-spin" />
          ) : (
            "Notify me"
          )}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
      )}
    </div>
  )
}

export default function ProContent() {
  return (
    <main className="bg-[#080808] min-h-screen">

      {/* Hero */}
      <section className="relative pt-40 pb-28 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-150 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, rgba(254,100,69,0.13) 0%, transparent 65%)" }}
        />
        <div className="max-w-3xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-accent/15 border border-accent/25 text-accent text-[10px] uppercase tracking-[0.2em] font-semibold mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                Coming Soon
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(44px,7vw,80px)] font-semibold tracking-[-0.03em] text-white leading-[1.02] mb-6"
            >
              Snapback{" "}
              <span className="text-accent">Pro</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-zinc-400 text-xl leading-[1.75] max-w-lg mx-auto font-text mb-10"
            >
              A command palette, Spaces, custom layouts, and deep links. Everything power users have been asking for.
            </motion.p>

            {!DISCOUNT_SOLD_OUT && (
              <motion.div variants={fadeUp} className="flex flex-col items-center gap-2 mb-8">
                <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-semibold">Offer expires in</span>
                <CountdownTimer />
              </motion.div>
            )}

            <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
              <EmailForm />
              <div className="flex items-center gap-2">
                <TagIcon size={13} weight="bold" className="text-accent shrink-0" />
                {DISCOUNT_SOLD_OUT
                  ? <span className="text-zinc-400 text-sm font-semibold">Stay in the loop for future discounts</span>
                  : <span className="text-accent text-sm font-semibold">25% off for the first 100 · $7.49 one-time</span>
                }
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video placeholder */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-12"
          >
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-semibold tracking-[-0.03em] text-white mb-3">
              See it in action
            </h2>
            <p className="text-zinc-500 font-text">Full walkthrough coming soon.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/assets/pro-poster.webp"
              className="w-full rounded-3xl border border-white/8 shadow-[0_60px_120px_rgba(0,0,0,0.9)]"
            >
              <source src="/assets/pro.webm" type="video/webm" />
              <source src="/assets/pro.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-24"
          >
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-semibold tracking-[-0.03em] text-white mb-3">
              What's coming in Pro
            </h2>
            <p className="text-zinc-500 font-text text-lg">Free users keep everything they have now.</p>
          </motion.div>

          <div className="space-y-36">
            {features.map((feature, i) => (
              <motion.div
                key={feature.badge}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                className={`flex flex-col gap-12 lg:gap-20 lg:items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"}`}
              >
                <motion.div variants={fadeUp} className="flex-1">
                  <span className="inline-block text-accent text-[10px] uppercase tracking-[0.2em] font-semibold mb-5 border border-accent/25 bg-accent/10 rounded-full px-3 py-1">
                    {feature.badge}
                  </span>
                  <h3 className="font-display text-[clamp(26px,3.5vw,44px)] font-semibold tracking-[-0.025em] text-white leading-[1.1] mb-5 whitespace-pre-line">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-lg leading-[1.8] font-text max-w-sm">
                    {feature.body}
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="flex-1 rounded-2xl overflow-hidden border border-white/8 bg-[#0c0e14]"
                >
                  <img
                    src={feature.image}
                    alt={feature.imageAlt}
                    className="w-full h-auto"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(32px,5vw,56px)] font-semibold tracking-[-0.03em] text-white mb-4"
            >
              Be first in line
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-zinc-400 text-lg mb-8 font-text"
            >
              {DISCOUNT_SOLD_OUT
                ? "The discount spots are gone, but sign up to be first in line for future discounts."
                : "Lock in 25% off for the first 100 subscribers. That's $7.49 instead of $9.99, one-time."}
            </motion.p>
            <motion.div variants={fadeUp}>
              <EmailForm />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-zinc-600 text-xs mt-6 font-text"
            >
              Free users keep everything they have now. Pro is an optional one-time upgrade.
            </motion.p>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
