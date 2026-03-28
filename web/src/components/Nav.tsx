"use client"

import { DOWNLOAD_URL } from "@/lib/constants";
import { useState, useEffect } from "react";
import { Magnetic } from "./ui";
import Link from "next/link";

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
    <header className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 ${
      scrolled
        ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/6'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Go to home">
          <img src="/assets/logo.svg" alt="" className="w-6 h-6 rounded-md" aria-hidden="true" />
          <span className="text-white/85 text-[15px] font-semibold tracking-tight group-hover:text-white transition-colors duration-200">
            Snapback
          </span>
        </Link>

        {/* Download */}
        <Magnetic>
          <a
            href={DOWNLOAD_URL}
            download
            aria-label="Download Snapback for macOS"
            className="text-[13px] font-semibold text-white bg-primary px-5 py-2 rounded-xl transition-all duration-200 hover:bg-primary-hover hover:shadow-[0_6px_20px_rgba(21,86,219,0.22)] active:scale-[0.97] active:brightness-90"
          >
            Get Snapback
          </a>
        </Magnetic>

      </div>
    </header>
  );
}
