"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { DOWNLOAD_URL, LATEST_VERSION, DISCOUNT_SOLD_OUT, PRO_AVAILABLE } from "@/lib/constants"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react"
import { trackEvent } from "@/lib/analytics"

const navLinks = [
  { href: "/pro", label: "Pro" },
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
  const links = isHome ? navLinks : [{ href: "/", label: "Home" }, ...navLinks]

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
      <div className="fixed top-0 left-0 right-0 z-100">
        {/* Pro announcement banner */}
        <Link
          href="/pro/"
          onClick={() => trackEvent("pro_cta_click", { location: "nav_banner" })}
          className="flex items-center justify-center gap-2 bg-[#080808]/80 backdrop-blur-xl border-b border-accent/20 px-4 py-2 text-[12px] font-medium text-accent hover:bg-[#080808]/90 transition-colors group"
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
          </span>
          {PRO_AVAILABLE ? (
            <>
              <span className="sm:hidden">Snapback Pro is here · get it now</span>
              <span className="hidden sm:inline">Snapback Pro is now available · get it now</span>
            </>
          ) : DISCOUNT_SOLD_OUT ? (
            <>
              <span className="sm:hidden">Snapback Pro · join the waitlist</span>
              <span className="hidden sm:inline">Snapback Pro is launching soon · join the waitlist</span>
            </>
          ) : (
            <>
              <span className="sm:hidden">Snapback Pro · lock in <strong className="font-semibold">25% off</strong></span>
              <span className="hidden sm:inline">Snapback Pro is launching soon · lock in <strong className="font-semibold">25% off</strong> before we go live</span>
            </>
          )}
          <ArrowRightIcon size={11} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
        </Link>

        {/* Nav */}
        <nav
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-[#080808]/90 backdrop-blur-xl border-b border-white/5"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
              <img src="/assets/logo.svg" width={24} height={24} className="w-6 h-6 rounded-md" alt="Snapback logo" />
              <span className="text-white/85 text-[15px] font-semibold tracking-tight ml-2">Snapback</span>
              <span className="font-mono text-[9px] text-primary border border-primary/40 rounded px-1.5 py-0.5 ml-2 bg-primary/10 hidden sm:inline">
                v{versionDisplay}
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {links.map((link) => (
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
                onClick={() => trackEvent("download_click", { location: "nav_desktop" })}
                className="bg-primary text-white text-[13px] font-semibold px-4 py-1.5 rounded-xl hover:bg-primary-hover transition-colors"
              >
                Download Free for Mac
              </a>
            </div>

            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.25 p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`block w-5 h-0.5 bg-white/85 rounded transition-all duration-200 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-white/85 rounded transition-all duration-200 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-99 bg-[#080808]/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {links.map((link) => (
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
          onClick={() => {
            trackEvent("download_click", { location: "nav_mobile" })
            setMobileOpen(false)
          }}
          className="mt-4 bg-primary text-white text-[15px] font-semibold px-8 py-3 rounded-xl hover:bg-primary-hover transition-colors"
        >
          Download Free for Mac
        </a>
      </div>
    </>
  )
}
