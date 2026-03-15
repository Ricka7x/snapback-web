"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./ui";

const faqs = [
  {
    question: "How is Snapback different from a standard window manager?",
    answer: "Standard window managers only move windows. Snapback is a workspace automation engine. It remembers which apps you had open, their specific positions, and even their z-index stack. When you 'snap back', it can launch closed apps and restore your entire work environment exactly as you left it."
  },
  {
    question: "Does it support multiple monitors?",
    answer: "Yes. Snapback is built for multi-display setups. It remembers which monitor each window belongs to and restores them across your entire setup instantly."
  },
  {
    question: "Can it really open apps for me?",
    answer: "Absolutely. If you save a workspace with VS Code and Chrome, and they aren't running when you restore that workspace, Snapback will launch them and then place their windows in the saved locations."
  },
  {
    question: "Are the shortcuts remappable?",
    answer: "Every single action in Snapback can be bound to a custom hotkey. You can have one-tap access to your 'Coding', 'Design', or 'Meetings' workspaces."
  },
  {
    question: "Is it free to use?",
    answer: "Yes, Snapback is currently free for macOS. We are focused on building the best possible experience for power users."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Section bg="alt" className="border-t border-white/5 relative overflow-hidden">
      {/* Background Glows for Premium Feel */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
            Support
          </span>
          <h2 className="text-[clamp(32px,5vw,52px)] font-display font-semibold text-white tracking-tight leading-[1.1] text-glow">
            Still curious? <br />
            <span className="opacity-40">Common questions.</span>
          </h2>
        </div>

        <div className="grid gap-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                className="relative group"
              >
                {/* Active/Hover Border Glow */}
                <div 
                  className={`absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/30 to-blue-500/30 transition-opacity duration-500 pointer-events-none
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} 
                />
                
                <div className={`relative rounded-2xl transition-all duration-500 overflow-hidden
                  ${isActive 
                    ? 'bg-zinc-900/60 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]' 
                    : 'bg-zinc-900/40 backdrop-blur-xl border border-white/5 hover:bg-zinc-900/50'}`}
                >
                  <button
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="w-full px-8 py-7 text-left flex items-center justify-between gap-6 outline-none"
                  >
                    <span className={`text-xl font-medium tracking-tight transition-colors duration-300
                      ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}
                    >
                      {faq.question}
                    </span>
                    <div className={`relative w-6 h-6 shrink-0 transition-transform duration-500 ${isActive ? 'rotate-135' : 'rotate-0'}`}>
                        <div className={`absolute top-1/2 left-0 w-full h-[2px] rounded-full transition-colors duration-300 ${isActive ? 'bg-primary' : 'bg-white/20 group-hover:bg-white/40'}`} />
                        <div className={`absolute top-0 left-1/2 h-full w-[2px] rounded-full transition-colors duration-300 ${isActive ? 'bg-primary' : 'bg-white/20 group-hover:bg-white/40'}`} />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <div className="px-8 pb-8">
                          <div className="h-px w-12 bg-primary/20 mb-6" />
                          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl font-medium opacity-90">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
