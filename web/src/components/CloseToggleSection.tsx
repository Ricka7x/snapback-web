"use client";
import { useReveal } from "./useReveal";
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
  const [ref, visible] = useReveal();
  return (
    <Section bg="main" className="py-20">
      <div
        ref={ref}
        className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} rounded-3xl overflow-hidden border border-white/10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))]`}
      >
        {/* Left: copy */}
        <div className="bg-zinc-900 p-16">
          <span className="text-primary text-[11px] font-bold uppercase tracking-[0.12em] block mb-4">
            Context switching
          </span>
          <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.1] tracking-[-0.015em] text-white mb-5">
            Switch contexts,<br />not just windows.
          </h2>
          <p className="text-zinc-400 text-[17px] leading-[1.7] mb-8">
            Switching from dev to design? Snapback can close the apps that don't belong.
            Toggle it per workspace: leave it off when setups share apps, flip it on when they don't.
          </p>
          {/* Toggle row */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10 glass-card">
            <div className="flex items-center justify-between gap-6">
              <div>
                <p className="text-white text-[14px] font-semibold mb-1">
                  Close non-workspace windows
                </p>
                <p className="text-white/40 text-xs font-medium leading-relaxed">
                  Apps not in this workspace will be closed on restore.
                </p>
              </div>
              <div className="shrink-0 w-12 h-7 bg-primary/20 rounded-full relative border border-white/10 group-hover:bg-primary/30 transition-all">
                <div className="w-5 h-5 bg-white rounded-full absolute top-[3px] left-[24px] shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: use cases */}
        <div className="bg-zinc-950 p-16 flex flex-col justify-center gap-4">
          {cases.map((item, i) => (
            <div key={i} className="bg-zinc-900 rounded-xl p-5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                 <span className="text text-sm font-medium">{item.name}</span>
                <span className="text-primary text-[10px] font-mono font-bold bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md tracking-wider">
                  {item.shortcut}
                </span>
              </div>
               <p className="text-zinc-500 text-xs leading-[1.55] mb-2.5">{item.note}</p>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${item.close ? "bg-primary" : "bg-white/15"}`} />
                 <span className="text-zinc-500 text-[11px]">
                  {item.close ? "Close non-workspace apps: on" : "Close non-workspace apps: off"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
