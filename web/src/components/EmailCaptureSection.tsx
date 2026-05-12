"use client"

import { useState, ChangeEvent, useEffect } from "react"
import { motion } from "framer-motion"
import {  CheckCircleIcon, SpinnerIcon } from "@phosphor-icons/react"

// POST only api, safe to leave it public, its rate limited
const LOOPS_FORM_ENDPOINT = "https://app.loops.so/api/newsletter-form/cmp35lqn404k40iym3d4cl21w"

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
    <div className="flex items-center justify-center gap-3 mb-8">
      {blocks.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <span className="font-mono text-2xl font-semibold text-white tabular-nums w-12 text-center">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-zinc-500 text-[10px] uppercase tracking-[0.15em] mt-1">{label}</span>
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
    const name = formData.get("name") as string

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
    <section className="py-24 lg:py-32 bg-[#080808] relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(21,86,219,0.06) 0%, transparent 70%)" }}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-primary/15 border border-primary/25 text-primary text-[10px] uppercase tracking-[0.2em] font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            First 100 Users
          </span>

          <CountdownTimer />

          <h2 className="font-display text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-4">
            Get early access
          </h2>

          <p className="text-zinc-400 text-lg leading-[1.7] max-w-[480px] mx-auto mb-10 font-text">
            First 100 users get a discount code. Drop your email we'll send it when we launch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[420px] mx-auto"
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-white/6 bg-white/5 backdrop-blur-sm p-8 text-center"
            >
              <CheckCircleIcon size={48} weight="thin" className="text-green-400 mx-auto mb-4" />
              <p className="text-white text-lg font-medium mb-1">You're in!</p>
              <p className="text-zinc-400 text-sm">We'll send your discount code when we launch.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/6 bg-white/5 backdrop-blur-sm p-6 space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="First name (optional)"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-primary text-white font-semibold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:shadow-[0_12px_40px_rgba(21,86,219,0.4)] transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <SpinnerIcon size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Count me in"
                )}
              </button>

              {status === "error" && (
                <p className="text-red-400 text-xs text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
