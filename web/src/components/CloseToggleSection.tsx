"use client"

import { motion } from "framer-motion";
import { Section } from "./ui";

const cases = [
  {
    name: "Dev to Design",
    shortcut: "⌃⌥D to ⌃⌥S",
    close: true,
    note: "Closes non-workspace apps for a totally fresh start.",
  },
  {
    name: "Work to Calls",
    shortcut: "⌃⌥W to ⌃⌥M",
    close: false,
    note: "Keeps your apps open but shifts them into meeting mode.",
  },
  {
    name: "Focus mode",
    shortcut: "⌃⌥F",
    close: true,
    note: "One app, one screen. Everything else goes away.",
  },
];

export default function CloseToggleSection() {
  return (
    <Section bg="main" className="py-12 md:py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 grid grid-cols-1 lg:grid-cols-2 shadow-2xl relative z-10 max-w-6xl mx-auto"
      >
        {/* Left: copy */}
        <div className="bg-zinc-900/50 backdrop-blur-xl p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-white/5">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-primary text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] block mb-4 md:mb-6 opacity-80"
          >
            Context switching
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-[clamp(26px,4vw,40px)] font-semibold leading-[1.15] tracking-[-0.015em] text-white mb-6 text-glow"
          >
            Switch contexts,<br className="hidden md:block" /> not just windows.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-zinc-400 text-[15px] md:text-[17px] leading-[1.6] md:leading-[1.7] mb-8 md:mb-10 font-medium opacity-90"
          >
            Switching from dev to design? Snapback can close the apps that don't belong.
            Toggle it per workspace: leave it off when setups share apps, flip it on when they don't.
          </motion.p>
          
          {/* Toggle row */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-white/5 rounded-2xl p-5 md:p-6 border border-white/10 glass-card"
          >
            <div className="flex items-center justify-between gap-4 md:gap-6">
              <div>
                <p className="text-white text-[13px] md:text-[14px] font-semibold mb-1">
                  Close non-workspace windows
                </p>
                <p className="text-white/40 text-[11px] md:text-xs font-medium leading-relaxed">
                  Apps not in this workspace will be closed on restore.
                </p>
              </div>
              <div className="shrink-0 w-11 h-6 md:w-12 md:h-7 bg-primary rounded-full relative border border-white/10 shadow-[0_0_15px_rgba(21,86,219,0.3)]">
                <motion.div 
                  initial={{ x: 2 }}
                  animate={{ x: 22 }}
                  transition={{ duration: 0.3 }}
                  className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full absolute top-[3px] left-0 shadow-lg" 
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: use cases */}
        <div className="bg-zinc-950/50 p-8 md:p-16 flex flex-col justify-center gap-4 relative">
          <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full pointer-events-none opacity-50" />
          {cases.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (i * 0.1), duration: 0.6 }}
              className="bg-zinc-900/60 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group relative z-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                 <span className="text-white/90 text-[13px] md:text-sm font-semibold tracking-tight">{item.name}</span>
                <span className="text-primary text-[9px] md:text-[10px] font-mono font-bold bg-primary/10 border border-primary/20 px-2 py-0.5 md:px-2.5 md:py-1 rounded-md tracking-wider self-start sm:self-auto">
                  {item.shortcut}
                </span>
              </div>
               <p className="text-zinc-500 text-[11px] md:text-xs leading-[1.6] mb-4 font-medium">{item.note}</p>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px] ${item.close ? "bg-primary shadow-primary/50" : "bg-white/15 shadow-transparent"}`} />
                 <span className="text-zinc-400 text-[10px] md:text-[11px] font-medium tracking-wide">
                  {item.close ? "Close non-workspace apps: ON" : "Close non-workspace apps: OFF"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
