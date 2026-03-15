'use client';
import { useReveal } from "./useReveal";


export default function CTASection() {
  const [ref, visible] = useReveal();
  return (
    <section id="download" className="bg-zinc-950 py-16 md:py-52 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150 animate-pulse pointer-events-none" />
      <div
        ref={ref}
        className={`max-w-2xl mx-auto text-center px-6 transition-all duration-1000 relative z-10 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-10 shadow-2xl glass-card">
          <img
            src='/assets/logo.svg'
            alt="Snapback"
            className="w-12 h-12 rounded-lg"
          />
        </div>
        <h2 className="font-display text-[clamp(44px,7vw,72px)] font-semibold leading-[1] tracking-[-0.03em] text-white mb-8 text-glow">
          Ready to snap back?
        </h2>
        <p className="text-zinc-400 text-xl md:text-2xl leading-[1.65] mb-12 font-medium">
          Download Snapback for free and experience the most<br />
          seamless window management on macOS.
        </p>
        <a
          href="#"
          className="inline-block bg-primary text-white font-semibold text-xl px-12 py-5 rounded-full transition-all duration-300 hover:bg-primary-hover hover:scale-105 hover:shadow-[0_0_40px_rgba(21,86,219,0.4)] shadow-2xl"
        >
          Download for Mac (Free)
        </a>
        <p className="text-white/20 text-xs font-bold uppercase tracking-widest mt-8">macOS 13 Ventura or later · No account needed</p>
      </div>
    </section>
  );
}
