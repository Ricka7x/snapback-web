"use client"

import { useState, ChangeEvent, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircleIcon, SpinnerIcon, TagIcon, WarningCircleIcon } from "@phosphor-icons/react"

// POST only api, safe to leave it public, its rate limited
const LOOPS_FORM_ENDPOINT = "https://app.loops.so/api/newsletter-form/cmp35lqn404k40iym3d4cl21w"

// Flip to true once all 100 discount spots are claimed
const DISCOUNT_SOLD_OUT = false

const LAUNCH_DEADLINE = new Date("2026-06-01T00:00:00Z")

function CountdownTimer() {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, LAUNCH_DEADLINE.getTime() - Date.now())
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
    <div className="flex items-center justify-center gap-2 mb-10">
      {blocks.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="font-mono text-4xl font-bold text-white tabular-nums w-16 text-center">
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-zinc-500 text-[10px] uppercase tracking-[0.15em] mt-1">{label}</span>
          </div>
          {i < blocks.length - 1 && (
            <span className="font-mono text-2xl text-zinc-700 mb-4">:</span>
          )}
        </div>
      ))}
    </div>
  )
}

export default function EmailCaptureSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string

    try {
      const res = await fetch(LOOPS_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}`,
      })

      if (res.ok) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="py-32 lg:py-44 bg-[#080808] relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(254,100,69,0.07) 0%, transparent 70%)" }}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-accent/15 border border-accent/25 text-accent text-[10px] uppercase tracking-[0.2em] font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Snapback Pro
          </span>

          <CountdownTimer />

          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-4">
            {DISCOUNT_SOLD_OUT ? "Stay in the loop" : "Get notified at launch"}
          </h2>

          <p className="text-zinc-400 text-xl leading-[1.7] max-w-[500px] mx-auto mb-6 font-text">
            {DISCOUNT_SOLD_OUT
              ? "The discount spots are gone, but you can still sign up to be the first to know when Snapback Pro launches."
              : "Be the first to know when Snapback Pro launches and lock in an exclusive subscriber discount."}
          </p>

          {DISCOUNT_SOLD_OUT ? (
            <div className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-zinc-800/60 border border-white/10 mb-10">
              <WarningCircleIcon size={14} weight="bold" className="text-zinc-400" />
              <span className="text-zinc-400 text-sm font-semibold">All 100 discount spots are taken</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-accent/10 border border-accent/20 mb-10">
              <TagIcon size={14} weight="bold" className="text-accent" />
              <span className="text-accent text-sm font-semibold">25% off for the first 100 subscribers. <span className="line-through opacity-60">$9.99</span> $7.49 one-time</span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[540px] mx-auto"
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-accent/20 bg-accent/5 backdrop-blur-sm p-10 text-center"
            >
              <CheckCircleIcon size={52} weight="thin" className="text-accent mx-auto mb-4" />
              <p className="text-white text-xl font-medium mb-2">You're on the list!</p>
              <p className="text-zinc-400 text-sm">
                {DISCOUNT_SOLD_OUT
                  ? "We'll let you know the moment Snapback Pro launches."
                  : "We'll send your 25% off code when Snapback Pro launches. That's $7.49 instead of $9.99, one-time."}
              </p>
            </motion.div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-base focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="shrink-0 bg-accent text-white font-semibold px-7 py-4 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-accent-hover hover:shadow-[0_12px_40px_rgba(254,100,69,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === "submitting" ? (
                    <>
                      <SpinnerIcon size={16} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    DISCOUNT_SOLD_OUT ? "Notify me" : "Count me in"
                  )}
                </button>
              </form>

              {status === "error" && (
                <p className="text-red-400 text-xs text-center mt-3">Something went wrong. Please try again.</p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
