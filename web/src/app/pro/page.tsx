"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Magnetic } from "@/components/ui";
import FeatureSection from "@/components/FeatureSection";
import { DOWNLOAD_URL, PRO_PURCHASE_URL } from "@/lib/constants";

// ─── Problems data ────────────────────────────────────────────────────────────

const problems = [
  {
    problem: "You wear more than one hat.",
    solution: "Work, design, admin, side project. Serious users have a lot of workspaces. Groups let you organize them by project and reuse the same shortcuts in each one.",
  },
  {
    problem: "You shouldn't need to memorize everything.",
    solution: "The Command Palette gives you Raycast-style access to every group and workspace. Type a few letters and jump anywhere. One shortcut to rule them all.",
  },
  {
    problem: "Your menu bar should match your mood.",
    solution: "When you're deep in a project, you don't need to see every workspace you've ever made. Groups keep the menu bar focused on what matters right now.",
  },
];

// ─── Features data ────────────────────────────────────────────────────────────

const features = [
  {
    tag: "Groups",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
    title: "Reuse shortcuts across projects",
    description: "Group your workspaces by project or role. ⌃⌥1 means 'Development' in your Work group and 'Gym' in your Personal group. Same keys, zero conflicts. Only one group is active at a time.",
  },
  {
    tag: "Groups",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 3M21 7.5H7.5" />
      </svg>
    ),
    title: "Switch projects, remap instantly",
    description: "Switching groups remaps all your shortcuts in one step. Move from Work to Personal and your entire shortcut layout updates automatically. No manual reassignment, no conflicts to resolve.",
  },
  {
    tag: "Command Palette",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "One shortcut to reach everything",
    description: "Can't remember which shortcut maps to what? Don't. Press one key, type a few letters, jump anywhere. The Command Palette gives you Raycast-style access to every group and workspace. No memorization required.",
  },
  {
    tag: "Groups",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
    title: "A focused menu bar",
    description: "Instead of a long list of every workspace you've ever made, the menu bar only shows what's relevant to your active group. Less noise, faster access.",
  },
];

// ─── Comparison table ─────────────────────────────────────────────────────────

const comparison = [
  { feature: "Save & restore workspaces", free: true, pro: true },
  { feature: "Window snapping", free: true, pro: true },
  { feature: "Custom keyboard shortcuts", free: true, pro: true },
  { feature: "Multi-display support", free: true, pro: true },
  { feature: "Workspace groups", free: false, pro: true },
  { feature: "Reusable shortcuts across groups", free: false, pro: true },
  { feature: "Command palette", free: false, pro: true },
  { feature: "Filter menu bar by group", free: false, pro: true },
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const faqs = [
  {
    question: "Is this a subscription?",
    answer: "No. Snapback Pro is a one-time purchase for $9. Pay once and own it forever, including all future updates to Groups and the Command Palette.",
  },
  {
    question: "How does shortcut reuse actually work?",
    answer: "Each group has its own shortcut assignments. When you switch groups, Snapback activates that group's shortcuts. So ⌃⌥1 can mean something different in each group and they'll never conflict because only one group is active at a time.",
  },
  {
    question: "How many Macs can I use it on?",
    answer: "Each license covers up to 2 Macs. You can deactivate from within the app to transfer to a new machine.",
  },
  {
    question: "What if I want a refund?",
    answer: "Contact us within 30 days and we'll issue a full refund. No questions asked.",
  },
  {
    question: "Does Snapback free still work without Pro?",
    answer: "Absolutely. Snapback is and will remain free for all core features. Pro is purely additive and nothing is taken away.",
  },
];

// ─── Check / X icons ──────────────────────────────────────────────────────────

function Check() {
  return (
    <svg className="w-5 h-5 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="w-5 h-5 text-zinc-700 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main className="bg-black min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-black pt-40 pb-24 px-6 overflow-hidden relative mesh-gradient">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none blur-[120px]"
          style={{ background: "radial-gradient(ellipse at center, rgba(254,100,69,0.15) 0%, transparent 70%)" }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-8 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5"
          >
            Snapback Pro
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(44px,8vw,80px)] font-semibold leading-[0.95] tracking-[-0.03em] text-white mb-8 text-glow-orange"
          >
            More contexts.<br />
            More <em>control.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-400 text-xl md:text-2xl leading-[1.65] max-w-2xl mx-auto mb-12 font-medium"
          >
            Groups let you reuse the same shortcuts across different contexts.
            The Command Palette means you only need to remember one.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <Magnetic>
              <a
                href={PRO_PURCHASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-4 bg-accent text-white font-bold rounded-2xl transition-all duration-300 hover:bg-accent-hover hover:scale-105 hover:shadow-[0_0_40px_rgba(254,100,69,0.4)] shadow-xl flex items-center gap-3 overflow-hidden text-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Get Snapback Pro — $9
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </Magnetic>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">One-time · No subscription · 2 Macs per license</span>
          </motion.div>
        </div>
      </section>

      {/* ── Problem section ──────────────────────────────────────────────── */}
      <section className="bg-zinc-950 border-t border-white/5 py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-block text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5"
            >
              Built for power users
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(28px,4vw,46px)] font-semibold text-white tracking-[-0.02em] leading-[1.1] text-glow"
            >
              When free isn't enough.
            </motion.h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {problems.map((p, i) => (
              <motion.div
                key={p.problem}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="p-7 rounded-2xl bg-zinc-900/50 border border-white/5"
              >
                <p className="text-white font-semibold text-lg mb-3 tracking-tight">{p.problem}</p>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium">{p.solution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo feature sections ───────────────────────────────────────── */}
      <FeatureSection
        bg="main"
        eyebrow="Groups"
        heading={<>Reuse the same shortcuts<br />in every context.</>}
        body="Group your workspaces by project or role: Work, Design, Personal. ⌃⌥1 means 'Development' when coding and 'Figma' when designing. Same keys, different project, zero clashes."
        imageSrc="/assets/workspaces.webp"
        imageAlt="Workspace groups in Snapback"
      />

      <FeatureSection
        bg="alt"
        reverseOnDesktop
        eyebrow="Groups"
        heading={<>Switch context.<br />Everything remaps.</>}
        body="Switching groups remaps your entire shortcut layout in one step. Move from Work to Personal and every shortcut updates automatically. No manual reassignment, nothing to untangle."
        imageSrc="/assets/settings.webp"
        imageAlt="Group switching in Snapback"
      />

      <FeatureSection
        bg="main"
        eyebrow="Command Palette"
        heading={<>One shortcut<br />to reach everything.</>}
        body="Can't remember which key maps to what? Don't. Press one shortcut, type a few letters and jump anywhere. Raycast-style access to every group and workspace. No memorization required."
        imageSrc="/assets/menu.webp"
        imageAlt="Command palette in Snapback"
      />

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="bg-black border-t border-white/5 py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-block text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5"
            >
              The solution
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(32px,5vw,52px)] font-semibold text-white tracking-[-0.02em] leading-[1.1] text-glow"
            >
              Groups + Command Palette.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-zinc-400 text-lg mt-4 max-w-xl mx-auto font-medium"
            >
              Organize by context. Reuse shortcuts freely. Access everything with one key.
            </motion.p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative group p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-accent/20 transition-all duration-500 hover:bg-zinc-900/70"
              >
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    {f.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-semibold text-lg tracking-tight">{f.title}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent/70 border border-accent/15 bg-accent/5 px-2 py-0.5 rounded-full">{f.tag}</span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed font-medium text-sm">{f.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 border-t border-white/5 py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-block text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5"
            >
              Pricing
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-display text-[clamp(32px,5vw,52px)] font-semibold text-white tracking-[-0.02em] leading-[1.1] text-glow"
            >
              Simple, honest pricing.
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 flex flex-col"
            >
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4 block">Free</span>
                <div className="flex items-end gap-2 mb-2">
                  <span className="font-display text-5xl font-semibold text-white tracking-tight">$0</span>
                  <span className="text-zinc-500 mb-2 font-medium">forever</span>
                </div>
                <p className="text-zinc-400 text-sm font-medium">Everything you need to manage windows and save workspaces.</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {comparison.filter(c => c.free).map(c => (
                  <li key={c.feature} className="flex items-center gap-3 text-zinc-300 font-medium text-sm">
                    <Check />{c.feature}
                  </li>
                ))}
              </ul>
              <a
                href={DOWNLOAD_URL}
                download
                className="block text-center px-6 py-3 rounded-xl border border-white/10 text-white/70 font-semibold text-sm hover:border-white/20 hover:text-white transition-all duration-300"
              >
                Download Free
              </a>
            </motion.div>

            {/* Pro */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="relative p-8 rounded-3xl border border-accent/30 bg-zinc-900/60 flex flex-col overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(254,100,69,0.12)" }} />
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-transparent pointer-events-none" />

              <div className="relative mb-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4 block">Pro</span>
                <div className="flex items-end gap-2 mb-2">
                  <span className="font-display text-5xl font-semibold text-white tracking-tight">$9</span>
                  <span className="text-zinc-500 mb-2 font-medium">one-time</span>
                </div>
                <p className="text-zinc-400 text-sm font-medium">Everything in Free, plus Groups and Command Palette.</p>
              </div>
              <ul className="relative space-y-3 mb-8 flex-1">
                {comparison.map(c => (
                  <li key={c.feature} className="flex items-center gap-3 font-medium text-sm">
                    {c.pro ? <Check /> : <Cross />}
                    <span className={c.pro ? "text-zinc-300" : "text-zinc-600"}>{c.feature}</span>
                    {!c.free && c.pro && (
                      <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-2 py-0.5 rounded-full">Pro</span>
                    )}
                  </li>
                ))}
              </ul>
              <Magnetic>
                <a
                  href={PRO_PURCHASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group block text-center px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-sm transition-all duration-300 hover:bg-accent-hover hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(254,100,69,0.3)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  Get Snapback Pro — $9
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-black border-t border-white/5 py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-block text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5"
            >
              Questions
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-display text-[clamp(28px,4vw,44px)] font-semibold text-white tracking-[-0.02em] text-glow"
            >
              Good questions deserve<br className="hidden md:block" /> straight answers.
            </motion.h2>
          </div>

          <div className="grid gap-4">
            {faqs.map((faq, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  <div className={`absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/30 to-blue-500/30 transition-opacity duration-500 pointer-events-none ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                  <div className={`relative rounded-2xl transition-all duration-500 overflow-hidden ${isActive ? "bg-zinc-900/60 backdrop-blur-2xl" : "bg-zinc-900/40 border border-white/5 hover:bg-zinc-900/50"}`}>
                    <button
                      onClick={() => setActiveIndex(isActive ? null : i)}
                      className="w-full px-8 py-6 text-left flex items-center justify-between gap-6 outline-none"
                    >
                      <span className={`text-lg font-medium tracking-tight transition-colors duration-300 ${isActive ? "text-white" : "text-white/60 group-hover:text-white/90"}`}>
                        {faq.question}
                      </span>
                      <div className={`relative w-5 h-5 shrink-0 transition-transform duration-500 ${isActive ? "rotate-135" : ""}`}>
                        <div className={`absolute top-1/2 left-0 w-full h-[2px] rounded-full transition-colors duration-300 ${isActive ? "bg-primary" : "bg-white/20"}`} />
                        <div className={`absolute top-0 left-1/2 h-full w-[2px] rounded-full transition-colors duration-300 ${isActive ? "bg-primary" : "bg-white/20"}`} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        >
                          <div className="px-8 pb-7">
                            <div className="h-px w-10 bg-primary/20 mb-5" />
                            <p className="text-zinc-400 leading-relaxed font-medium">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center text-zinc-500 text-sm mt-12 font-medium"
          >
            More questions?{" "}
            <a href="mailto:support@snapbackapp.com" className="text-primary hover:underline">
              support@snapbackapp.com
            </a>
          </motion.p>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 border-t border-white/5 py-24 md:py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden border border-white/5"
          style={{ backgroundImage: "url('/assets/wallpaper.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
              className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-8"
            >
              <img src="/assets/logo.svg" alt="Snapback" className="w-12 h-12 rounded-xl" />
            </motion.div>

            <h2 className="font-display text-[clamp(32px,6vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-6 text-glow-orange">
              One shortcut.<br />Every workspace.
            </h2>
            <p className="text-white/70 text-lg md:text-xl leading-[1.65] mb-10 font-medium max-w-lg mx-auto">
              $9 once. Two Macs. No subscription. Groups and Command Palette unlock instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Magnetic>
                <a
                  href={PRO_PURCHASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-bold rounded-2xl transition-all duration-300 hover:bg-accent-hover hover:scale-105 hover:shadow-[0_20px_40px_rgba(254,100,69,0.25)] active:scale-95"
                >
                  Get Snapback Pro — $9
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </Magnetic>
              <a
                href={DOWNLOAD_URL}
                download
                className="text-sm font-semibold text-white/50 hover:text-white/80 transition-colors duration-300 px-4 py-2"
              >
                Or download free →
              </a>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
