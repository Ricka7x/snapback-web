"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { DOWNLOAD_URL, LATEST_VERSION } from "@/lib/constants"
import Link from "next/link"

const navLinks = [
  { href: "/blog", label: "Blog" },
]

const sectionLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#compare", label: "Compare" },
  { href: "#faq", label: "FAQ" },
]

function scrollToSection(href: string) {
  const id = href.replace("#", "")
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: "smooth" })
  }
}

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const versionDisplay = LATEST_VERSION.split('.').slice(0, 2).join('.')
  const isHome = pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
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
            <span className="font-mono text-[9px] text-primary border border-primary/40 rounded px-1.5 py-0.5 ml-2 bg-primary/10 hidden sm:inline">
              v{versionDisplay}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/50 text-[13px] hover:text-white/85 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {isHome && sectionLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-white/50 text-[13px] hover:text-white/85 transition-colors bg-transparent border-none cursor-pointer p-0"
              >
                {link.label}
              </button>
            ))}
            <a
              href={DOWNLOAD_URL}
              className="bg-primary text-white text-[13px] font-semibold px-4 py-1.5 rounded-xl hover:bg-primary-hover transition-colors"
            >
              Download Free for Mac
            </a>
          </div>

          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-5 h-[2px] bg-white/85 rounded transition-all duration-200 origin-center ${
                mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-white/85 rounded transition-all duration-200 origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[99] bg-[#080808]/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-white/85 text-2xl font-display tracking-tight hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
        {isHome && sectionLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => {
              scrollToSection(link.href)
              setMobileOpen(false)
            }}
            className="text-white/85 text-2xl font-display tracking-tight hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
          >
            {link.label}
          </button>
        ))}
        <a
          href={DOWNLOAD_URL}
          onClick={() => setMobileOpen(false)}
          className="mt-4 bg-primary text-white text-[15px] font-semibold px-8 py-3 rounded-xl hover:bg-primary-hover transition-colors"
        >
          Download Free for Mac
        </a>
      </div>
    </>
  )
}
