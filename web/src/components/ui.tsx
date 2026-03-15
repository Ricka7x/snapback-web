// Section wrapper
export function Section({ bg = "main", children, className = "", mesh = false }: { bg?: "main" | "alt", children: React.ReactNode, className?: string, mesh?: boolean }) {
  const bgClass = bg === "alt" ? "bg-zinc-950" : "bg-black";
  return (
    <section className={`${bgClass} ${mesh ? "mesh-gradient" : ""} ${className} relative overflow-hidden`}>
      <div className="max-w-6xl mx-auto py-12 md:py-32 px-6 relative z-10">{children}</div>
    </section>
  );
}

// Two-column layout
export function TwoCol({ left, right, reverseOnDesktop = false, visible = true, delay = 0 }: { left: React.ReactNode, right: React.ReactNode, reverseOnDesktop?: boolean, visible?: boolean, delay?: number }) {
  const show = "opacity-100 translate-y-0";
  const hide = "opacity-0 translate-y-8";

  return (
    <div className="grid gap-10 md:gap-16 items-center grid-cols-1 md:grid-cols-2">
      <div
        className={`transition-all duration-700 ${visible ? show : hide} 
          ${reverseOnDesktop ? "md:order-2" : ""}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {left}
      </div>
      <div
        className={`transition-all duration-700 ${visible ? show : hide} 
          ${reverseOnDesktop ? "md:order-1" : ""}`}
        style={{ transitionDelay: `${delay + 150}ms` }}
      >
        {right}
      </div>
    </div>
  );
}

// Content blocks
export function Copy({ eyebrow, heading, body, headingSize = "text-[clamp(32px,5vw,52px)]" }: { eyebrow: string, heading: React.ReactNode, body: string, headingSize?: string }) {
  return (
    <div className="animate-fade-up">
      <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] block mb-6 opacity-80">
        {eyebrow}
      </span>
      <h2 className={`${headingSize} font-display font-semibold leading-[1.05] mb-6 text-white tracking-[-0.02em] text-glow`}>
        {heading}
      </h2>
      <p className="text-zinc-400 text-lg leading-[1.8] max-w-prose font-medium">{body}</p>
    </div>
  );
}

// Media display
export function Shot({ src, alt }: { src: string, alt: string }) {
  return (
    <div className="relative group animate-fade-in">
      <div className="absolute -inset-10 rounded-[3rem] bg-primary/5 blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="relative p-2 rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_48px_80px_-20px_rgba(0,0,0,0.8)]">
        <img
          src={src}
          alt={alt}
          className="w-full rounded-2xl block border border-white/5 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 brightness-90 group-hover:brightness-100"
        />
      </div>
    </div>
  );
}
