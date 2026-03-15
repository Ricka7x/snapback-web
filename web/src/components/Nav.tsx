"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "./ui";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "FAQ", href: "#faq" },
    { name: "Download", href: "#download" },
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 z-100 flex justify-center px-2 md:px-6 transition-all duration-500 ${scrolled ? 'pt-4' : 'pt-8'}`}>
      <nav className={`glass-card flex items-center justify-between gap-8 px-2 md:px-8 py-3 rounded-2xl w-full max-w-5xl transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-white/5 py-2.5' : 'bg-black/20 border-white/10'}`}>
        
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer shrink-0">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
            <img src="/assets/logo.svg" alt="Snapback" className="w-6 h-6 rounded-md" />
          </div>
          <span className="text-white text-sm font-semibold tracking-tight">Snapback</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-zinc-400 text-sm font-medium hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4">
            <Magnetic>
              <a
                href="#download"
                className="hidden sm:block text-sm font-semibold text-white bg-primary px-6 py-2.5 rounded-xl transition-all duration-300 hover:bg-primary-hover hover:scale-105 hover:shadow-[0_0_20px_rgba(21,86,219,0.3)] shadow-lg"
              >
                Get Snapback
              </a>
            </Magnetic>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-white rounded-full transition-transform" 
            />
            <motion.span 
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-white rounded-full transition-opacity" 
            />
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-white rounded-full transition-transform" 
            />
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-3xl z-[-1] flex flex-col items-center justify-center px-4"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-semibold text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-4 flex flex-col items-center gap-3"
              >
                <a
                  href="#download"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-bold text-black bg-white px-10 py-4 rounded-2xl hover:bg-primary hover:text-white transition-all active:scale-95"
                >
                  Get Snapback
                </a>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Always Free</span>
              </motion.div>
            </div>
            
            {/* Footer in menu */}
            <div className="absolute bottom-12 text-zinc-500 text-sm">
              © 2024 Snapback. All rights reserved.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
