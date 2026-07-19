"use client"

import { motion } from "framer-motion"
import {  ArrowDownIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { DOWNLOAD_URL, PRO_PRICE } from "@/lib/constants"
import Image from "next/image"
import { getBlurDataURL } from "@/lib/assetPlaceholders"

const WALLPAPER_IMAGE_SRC = "/assets/wallpaper.webp"
const WALLPAPER_IMAGE_BLUR = getBlurDataURL(WALLPAPER_IMAGE_SRC)

export default function CTASection() {
  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden">
      {/* Background wallpaper */}
      <Image
        src={WALLPAPER_IMAGE_SRC}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        placeholder={WALLPAPER_IMAGE_BLUR ? "blur" : "empty"}
        blurDataURL={WALLPAPER_IMAGE_BLUR}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#080808]/65" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <img
          src="/assets/logo.svg"
          alt="Snapback"
          width={56}
          height={56}
          loading="lazy"
          className="w-14 h-14 rounded-[18px] mx-auto mb-8 shadow-2xl border border-white/10"
        />
        <h2 className="font-display text-[clamp(40px,6.5vw,72px)] font-semibold tracking-[-0.04em] text-white leading-[1]">
          Stop rebuilding your <em>workspace</em> every morning.
        </h2>
        <p className="text-white/60 text-xl leading-[1.7] max-w-md mx-auto mt-6 mb-10 font-text">
          Set up your first workspace in under 60 seconds. Then stop dragging windows around forever.
        </p>
        <a
          href={DOWNLOAD_URL}
          className="bg-white text-[#080808] font-bold px-10 py-4 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 text-base inline-flex items-center gap-2.5"
        >
          Download Free for Mac
          <ArrowDownIcon size={18} weight="regular" />
        </a>
        <p className="text-white/30 text-[11px] font-mono mt-5">
          Free forever · macOS 14.2+ · No account
        </p>
        <p className="text-white/40 text-sm mt-6 font-text">
          Want the command palette, Spaces, and custom layouts?{" "}
          <Link href="/pro" className="text-white/70 underline decoration-white/30 hover:text-white hover:decoration-white transition-colors">
            Get Pro for {PRO_PRICE}
          </Link>
        </p>
      </motion.div>
    </section>
  )
}
