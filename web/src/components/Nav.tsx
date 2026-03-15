

"use client"
import { useState, useEffect } from "react";
import { Magnetic } from "./ui";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-6 transition-all duration-500 ${scrolled ? 'pt-4' : 'pt-8'}`}>
      <nav className={`glass-card flex items-center justify-between gap-8 px-8 py-3 rounded-2xl w-full max-w-5xl transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-white/5 py-2.5' : ''}`}>
        <div className="flex items-center gap-3 group cursor-pointer shrink-0">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
            <img src="/assets/logo.svg" alt="Snapback" className="w-5 h-5 rounded-[4px]" />
          </div>
          <span className="text-white text-sm font-semibold tracking-tight">Snapback</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-zinc-400 text-sm font-medium hover:text-white transition-colors">Features</a>
          <a href="#faq" className="text-zinc-400 text-sm font-medium hover:text-white transition-colors">FAQ</a>
          <a href="#download" className="text-zinc-400 text-sm font-medium hover:text-white transition-colors">Download</a>
        </div>

        <Magnetic>
          <a
            href="#download"
            className="text-sm font-semibold text-white bg-primary px-6 py-2.5 rounded-xl transition-all duration-300 hover:bg-primary-hover hover:scale-105 hover:shadow-[0_0_20px_rgba(21,86,219,0.3)] shadow-lg"
          >
           Get free
          </a>
        </Magnetic>
      </nav>
    </div>
  );
}
