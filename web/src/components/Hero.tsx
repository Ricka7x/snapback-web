import Animation from "./Animation";

export default function Hero() {
  return (
    <section className="bg-black pt-44 pb-32 overflow-hidden relative mesh-gradient">
      {/* Background glow for hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-fade-in" />
      
      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <span className="inline-block text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-8 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 animate-fade-up">
          Free for macOS
        </span>
        <h1 className="font-display text-[clamp(44px,8vw,84px)] font-semibold leading-[0.95] tracking-[-0.03em] text-white mb-8 animate-fade-up [animation-delay:150ms] text-glow">
          Your Mac, exactly<br />
          how you left it.
        </h1>
        <p className="text-zinc-400 text-xl md:text-2xl leading-[1.65] max-w-2xl mx-auto mb-12 animate-fade-up [animation-delay:300ms] font-medium opacity-90">
          Snapback remembers your window arrangements: which app, which display,
          and which position. Then it restores them instantly.
        </p>
        <div className="flex items-center justify-center gap-6 flex-wrap animate-fade-up [animation-delay:450ms]">
          <a
            href="#download"
            className="inline-flex items-center gap-2.5 bg-primary text-white font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:bg-primary-hover hover:scale-105 hover:shadow-[0_0_30px_rgba(21,86,219,0.4)]"
          >
            Download for Mac (Free)
          </a>
          <a href="#how" className="text-zinc-500 text-base font-medium transition-all duration-300 hover:text-zinc-300 flex items-center gap-2">
            See how it works <span className="animate-bounce">↓</span>
          </a>
        </div>
      </div>

      {/* Animation / hero visual slot */}
      <div id="how" className="max-w-6xl mx-auto mt-24 px-6 animate-fade-up [animation-delay:600ms]">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-transparent rounded-[2.5rem] blur-xl opacity-50" />
          <div className="w-full aspect-video rounded-[2rem] bg-zinc-900/50 backdrop-blur-xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
          <div className="relative z-10 w-full h-full">
            <Animation/>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
