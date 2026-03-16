

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
    <div className={`fixed top-0 left-0 right-0 z-100 flex justify-center px-4 md:px-6 transition-all duration-500 ${scrolled ? 'pt-4' : 'pt-8'}`}>
      <nav className={`glass-card flex items-center justify-between gap-8 px-4 md:px-8 py-3 rounded-2xl w-full max-w-5xl transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-white/5 py-2.5 shadow-2xl' : 'bg-black/20 border-white/10'}`}>
        
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer shrink-0">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
            <img src="/assets/logo.svg" alt="Snapback" className="w-6 h-6 rounded-md" />
          </div>
          <span className="text-white text-sm font-semibold tracking-tight">Snapback</span>
        </div>
        
        {/* Action Button */}
        <div className="flex items-center">
          <Magnetic>
            <a
              href="/releases/Snapback-0.1.2.dmg"
              download
              className="text-[13px] md:text-sm font-semibold text-white bg-primary px-5 md:px-6 py-2 md:py-2.5 rounded-xl transition-all duration-300 hover:bg-primary-hover hover:scale-105 hover:shadow-[0_0_20px_rgba(21,86,219,0.3)] shadow-lg"
            >
              Get Snapback
            </a>
          </Magnetic>
        </div>
      </nav>
    </div>
  );
}
