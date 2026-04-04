"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DockIcon } from "./ui/DockIcon"
import { MenuBar } from "./ui/MenuBar"
import { BrowserWindow } from "./windows/BrowserWindow"
import { VSCodeWindow } from "./windows/VSCodeWindow"
import { TerminalWindow } from "./windows/TerminalWindow"

type WorkspaceState = "trio" | "studio" | "command_center"

const STATES: WorkspaceState[] = ["trio", "studio", "command_center"]
const HOLD_MS = 2800
const SHORTCUT_MS = 900

const MARGIN = 30
const TOP_OFFSET = 36
const WORK_HEIGHT = 480

const layouts = {
  trio: {
    vscode:   { top: TOP_OFFSET, left: MARGIN,       width: 330,  height: WORK_HEIGHT },
    browser:  { top: TOP_OFFSET, left: 385,           width: 330,  height: WORK_HEIGHT },
    terminal: { top: TOP_OFFSET, left: 740,           width: 330,  height: WORK_HEIGHT },
    shortcut: ["⌃", "⌥", "1"],
    label: "snapback to trio",
  },
  studio: {
    vscode:   { top: TOP_OFFSET,            left: MARGIN, width: 680, height: WORK_HEIGHT },
    browser:  { top: TOP_OFFSET,            left: 740,    width: 330, height: 232 },
    terminal: { top: TOP_OFFSET + 232 + 16, left: 740,    width: 330, height: 232 },
    shortcut: ["⌃", "⌥", "2"],
    label: "snapback to studio",
  },
  command_center: {
    vscode:   { top: TOP_OFFSET,            left: MARGIN, width: 1040, height: 300 },
    browser:  { top: TOP_OFFSET + 300 + 16, left: MARGIN, width: 504,  height: 164 },
    terminal: { top: TOP_OFFSET + 300 + 16, left: 566,    width: 504,  height: 164 },
    shortcut: ["⌃", "⌥", "3"],
    label: "snapback to command center",
  },
}

function KeyboardKey({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-[40px] h-10 px-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center text-white/90 font-mono text-lg font-bold">
      {children}
    </div>
  )
}

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [activeState, setActiveState] = useState<WorkspaceState>("trio")
  const [showShortcut, setShowShortcut] = useState(false)

  // Fit 1100px content into actual container width
  useEffect(() => {
    let rafId: number
    const measure = () => {
      if (containerRef.current) {
        setScale(containerRef.current.offsetWidth / 1100)
      }
    }
    const debounced = () => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(measure) }
    const ro = new ResizeObserver(debounced)
    if (containerRef.current) ro.observe(containerRef.current)
    measure()
    return () => { ro.disconnect(); cancelAnimationFrame(rafId) }
  }, [])

  // Cycle states: hold → show shortcut → advance → repeat
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>

    const cycle = () => {
      t = setTimeout(() => {
        setShowShortcut(true)
        t = setTimeout(() => {
          setShowShortcut(false)
          setActiveState(prev => STATES[(STATES.indexOf(prev) + 1) % STATES.length])
          cycle()
        }, SHORTCUT_MS)
      }, HOLD_MS)
    }

    cycle()
    return () => clearTimeout(t)
  }, [])

  const layout = layouts[activeState]

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden rounded-2xl border border-white/6 shadow-[0_60px_120px_rgba(0,0,0,0.9)]"
      style={{ height: scale > 0 ? 618 * scale : "auto", aspectRatio: scale === 0 ? "1100/618" : undefined }}
    >
      {scale > 0 && (
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{ width: 1100, height: 618, transform: `scale(${scale})` }}
        >
          {/* Desktop shell */}
          <div
            className="w-full h-full relative overflow-hidden bg-zinc-900 select-none"
            style={{ backgroundImage: "url('/assets/wallpaper.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <MenuBar />

            <VSCodeWindow {...layout.vscode} />
            <BrowserWindow {...layout.browser} />
            <TerminalWindow {...layout.terminal} />

            {/* Shortcut overlay */}
            <AnimatePresence>
              {showShortcut && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -12 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] flex flex-col items-center gap-4"
                >
                  <div className="flex items-center gap-2">
                    {layout.shortcut.map((key) => (
                      <KeyboardKey key={key}>{key}</KeyboardKey>
                    ))}
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase">
                    {layout.label}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dock */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
              <div className="flex items-end gap-2 border border-white/[0.15] rounded-[24px] px-5 pt-3 pb-3 bg-white/10 backdrop-blur-2xl shadow-2xl">
                <DockIcon gradient="linear-gradient(148deg,#1fc8db,#2980b9)" />
                <DockIcon gradient="linear-gradient(148deg,#f7971e,#ffd200)" />
                <DockIcon gradient="linear-gradient(148deg,#0575e6,#021b79)" />
                <DockIcon gradient="linear-gradient(148deg,#141e30,#0f3460)" />
                <DockIcon gradient="linear-gradient(148deg,#4b6cb7,#182848)" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
