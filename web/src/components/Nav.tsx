"use client"

import { useEffect, useState } from "react"
import { DOWNLOAD_URL, LATEST_VERSION } from "@/lib/constants"
import Link from "next/link"

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const versionDisplay = LATEST_VERSION.split('.').slice(0, 2).join('.')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-[#080808]/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/assets/logo.svg" className="w-6 h-6 rounded-md" alt="Snapback logo" />
          <span className="text-white/85 text-[15px] font-semibold tracking-tight ml-2">Snapback</span>
          <span className="font-mono text-[9px] text-primary border border-primary/40 rounded px-1.5 py-0.5 ml-2 bg-primary/10">
            v{versionDisplay}
          </span>
        </Link>
        
        <a
          href={DOWNLOAD_URL}
          className="bg-primary text-white text-[13px] font-semibold px-4 py-1.5 rounded-xl hover:bg-primary-hover transition-colors"
        >
          Download Free for Mac
        </a>
      </div>
    </nav>
  )
}
