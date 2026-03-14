

export default function Nav() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 animate-fade-in">
      <nav className="glass-card flex items-center justify-between gap-8 px-6 py-3 rounded-2xl w-full max-w-4xl">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
            <img src="/assets/logo.svg" alt="Snapback" className="w-5 h-5 rounded-[4px]" />
          </div>
          <span className="text-white text-sm font-semibold tracking-tight uppercase tracking-[0.05em]">Snapback</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#how" className="text-zinc-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">Features</a>
          <a href="#download" className="text-zinc-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">Download</a>
        </div>

        <a
          href="#download"
          className="text-xs font-bold uppercase tracking-widest text-white bg-primary px-5 py-2.5 rounded-xl transition-all duration-300 hover:bg-primary-hover hover:scale-105 hover:shadow-[0_0_20px_rgba(21,86,219,0.3)] shadow-lg"
        >
          Get Free
        </a>
      </nav>
    </div>
  );
}
