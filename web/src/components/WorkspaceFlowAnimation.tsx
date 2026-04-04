"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BrowserWindow } from "./windows/BrowserWindow"
import { VSCodeWindow } from "./windows/VSCodeWindow"
import { TerminalWindow } from "./windows/TerminalWindow"
import { MenuBar } from "./ui/MenuBar"
import { DockIcon } from "./ui/DockIcon"

type FlowPhase = "cluttered" | "arrange" | "save" | "unordered" | "restore"

type WindowLayout = {
  top: number
  left: number
  width: number
  height: number
  opacity?: number
  scale?: number
}

type SceneLayout = {
  vscode: WindowLayout
  browser: WindowLayout
  terminal: WindowLayout
}

const BASE_WIDTH = 1100
const BASE_HEIGHT = 618

const HOLD_MS: Record<FlowPhase, number> = {
  cluttered: 1700,
  arrange: 1900,
  save: 2800,
  unordered: 1900,
  restore: 2200,
}

const OVERLAY_MS = 2200

const clutteredLayout: SceneLayout = {
  vscode: { top: 56, left: 310, width: 640, height: 352 },
  browser: { top: 88, left: 604, width: 430, height: 286 },
  terminal: { top: 292, left: 168, width: 560, height: 270 },
}

const restoredLayout: SceneLayout = {
  vscode: { top: 44, left: 30, width: 330, height: 480 },
  browser: { top: 44, left: 385, width: 330, height: 480 },
  terminal: { top: 44, left: 740, width: 330, height: 480 },
}

const unorderedLayout: SceneLayout = {
  vscode: { top: 44, left: 208, width: 584, height: 308 },
  browser: { top: 70, left: 42, width: 430, height: 266 },
  terminal: { top: 300, left: 642, width: 414, height: 252 },
}

const phases: FlowPhase[] = ["cluttered", "arrange", "save", "unordered", "restore"]

const transitionCopy: Record<FlowPhase, ReactNode> = {
  cluttered: (
    <p className="font-display text-[clamp(22px,3.2vw,42px)] leading-[1.1] tracking-[-0.02em] text-white">
      set up your apps exactly the way you want them.
    </p>
  ),
  arrange: (
    <p className="font-display text-[clamp(22px,3.2vw,42px)] leading-[1.1] tracking-[-0.02em] text-white">
      name it, give it a keyboard shortcut, and save it.
    </p>
  ),
  save: (
    <p className="font-display text-[clamp(22px,3.2vw,42px)] leading-[1.1] tracking-[-0.02em] text-white">
      saved. now go break your layout.
    </p>
  ),
  unordered: (
    <p className="font-display text-[clamp(22px,3.2vw,42px)] leading-[1.1] tracking-[-0.02em] text-white">
      restore any time with a single shortcut.
    </p>
  ),
  restore: (
    <p className="font-display text-[clamp(22px,3.2vw,42px)] leading-[1.1] tracking-[-0.02em] text-white">
      back exactly where you left off.
    </p>
  ),
}

function SaveModePanel({ typedName }: { typedName: string }) {
  return (
    <div className="w-105 rounded-2xl border border-white/12 bg-[#1f1a25]/95 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden">
      <div className="h-9 border-b border-white/8 px-4 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] font-semibold text-white/70 tracking-wide">Save Mode</span>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <p className="text-white text-xl font-semibold tracking-tight mb-1">Save Mode</p>
          <p className="text-white/45 text-xs leading-relaxed">Save your current setup and switch between it instantly.</p>
        </div>

        <div className="rounded-xl border border-white/8 bg-black/20 p-3.5">
          <p className="text-white/65 text-[10px] uppercase tracking-[0.14em] mb-2">Mode Name</p>
          <div className="h-9 rounded-lg border border-white/10 bg-[#16121d] px-3 flex items-center justify-between">
            <span className="text-white/85 text-sm font-medium">{typedName}<span className="animate-pulse">|</span></span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/65">Record Shortcut</span>
          </div>
        </div>

        <div className="rounded-xl border border-white/8 bg-black/20 p-3 flex items-center justify-between">
          <div>
            <p className="text-white/85 text-xs font-semibold mb-0.5">Mode Information</p>
            <p className="text-white/40 text-[10px]">Design mode with mapped shortcuts</p>
          </div>
          <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-white/65">Record Shortcut</div>
        </div>

        <div className="rounded-xl border border-white/8 bg-black/20 p-3 flex items-center justify-between">
          <div>
            <p className="text-white/85 text-xs font-semibold mb-0.5">Save as mode</p>
            <p className="text-white/40 text-[10px]">Closes unrelated apps and restores exact context</p>
          </div>
          <div className="w-11 h-6 rounded-full bg-primary/85 relative">
            <div className="absolute top-0.5 left-5.5 w-5 h-5 rounded-full bg-white shadow" />
          </div>
        </div>

        <div className="rounded-xl border border-white/8 bg-black/20 p-3 space-y-2">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-white/55">
            <span>Preview</span>
            <span className="rounded-full border border-white/15 px-2 py-0.5">Update Positions</span>
          </div>
          <div className="h-24 rounded-lg border border-white/8 bg-[#2a2433] relative overflow-hidden">
            <div className="absolute left-3 top-3 w-22 h-14 rounded-md border border-white/12" />
            <div className="absolute right-4 top-4 w-34 h-13 rounded-md bg-primary/40 border border-primary/40" />
            <div className="absolute right-4 bottom-4 w-16 h-7 rounded-md bg-cyan-400/35 border border-cyan-300/35" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button className="h-8 px-4 rounded-lg border border-white/10 text-white/60 text-xs">Cancel</button>
          <button className="h-8 px-4 rounded-lg bg-primary text-white text-xs font-semibold">Save Mode</button>
        </div>
      </div>
    </div>
  )
}

function KeyboardKey({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-10 h-10 px-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center text-white/90 font-mono text-lg font-bold">
      {children}
    </div>
  )
}

export default function WorkspaceFlowAnimation({
}: {
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [activePhase, setActivePhase] = useState<FlowPhase>("cluttered")
  const [typedName, setTypedName] = useState("")
  const [transitionOverlayText, setTransitionOverlayText] = useState<{ content: ReactNode; id: string } | null>(null)

  useEffect(() => {
    let rafId: number
    const measure = () => {
      if (containerRef.current) {
        setScale(containerRef.current.offsetWidth / BASE_WIDTH)
      }
    }
    const debounced = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(measure)
    }
    const ro = new ResizeObserver(debounced)
    if (containerRef.current) ro.observe(containerRef.current)
    measure()
    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = []
    let stopped = false

    const runPhase = (index: number) => {
      if (stopped) return

      const phase = phases[index]
      setActivePhase(phase)
      setTransitionOverlayText(null)

      const holdId = setTimeout(() => {
        setTransitionOverlayText({ content: transitionCopy[phase], id: phase })

        const switchId = setTimeout(() => {
          setTransitionOverlayText(null)
          runPhase((index + 1) % phases.length)
        }, OVERLAY_MS)

        ids.push(switchId)
      }, HOLD_MS[phase])

      ids.push(holdId)
    }

    runPhase(0)

    return () => {
      stopped = true
      ids.forEach((id) => clearTimeout(id))
    }
  }, [])

  useEffect(() => {
    if (activePhase !== "save") {
      setTypedName("")
      return
    }

    const full = "Design"
    let index = 0
    const id = setInterval(() => {
      index += 1
      setTypedName(full.slice(0, index))
      if (index >= full.length) clearInterval(id)
    }, 110)

    return () => clearInterval(id)
  }, [activePhase])

  const targetLayout =
    activePhase === "cluttered"
      ? clutteredLayout
      : activePhase === "unordered"
        ? unorderedLayout
        : restoredLayout

  const desktopTransform =
    activePhase === "save"
      ? { scale: 1.12, x: -32, y: -14 }
      : activePhase === "restore"
        ? { scale: 1.03, x: -12, y: -8 }
        : { scale: 1, x: 0, y: 0 }

  const overlayContentScale = scale > 0 ? Math.min(3, Math.max(1, 1 / scale)) : 1

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden rounded-2xl border border-white/8 shadow-[0_55px_100px_rgba(0,0,0,0.75)]"
      style={{
        height: scale > 0 ? BASE_HEIGHT * scale : "auto",
        aspectRatio: scale === 0 ? `${BASE_WIDTH}/${BASE_HEIGHT}` : undefined,
      }}
    >
      {scale > 0 && (
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{ width: BASE_WIDTH, height: BASE_HEIGHT, transform: `scale(${scale})` }}
        >
          <div
            className="w-full h-full relative overflow-hidden select-none"
            style={{
              backgroundImage: "url('/assets/wallpaper.avif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/25" />
            <MenuBar />

            <motion.div
              initial={false}
              animate={desktopTransform}
              transition={{ type: "spring", stiffness: 170, damping: 24 }}
              className="absolute inset-0"
            >
              <VSCodeWindow {...targetLayout.vscode} />
              <BrowserWindow {...targetLayout.browser} />
              <TerminalWindow {...targetLayout.terminal} />
            </motion.div>

            <AnimatePresence>
              {activePhase === "save" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 z-70 bg-black/30 backdrop-blur-xs"
                />
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {activePhase === "save" && (
                <motion.div
                  key="save-panel"
                  initial={{ opacity: 0, scale: 0.9, y: 28 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-90"
                >
                  <SaveModePanel typedName={typedName} />
                </motion.div>
              )}

              {activePhase === "restore" && (
                <motion.div
                  key="restore-panel"
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-92 flex flex-col items-center gap-4"
                >
                  <div className="flex items-center gap-2">
                    {(["⌃", "⌥", "2"] as const).map((key, i) => (
                      <motion.div
                        key={key}
                        animate={{
                          y: [0, 0, 5, 0],
                          scale: [1, 1, 0.86, 1],
                        }}
                        transition={{
                          delay: 0.35 + i * 0.2,
                          duration: 0.28,
                          times: [0, 0.1, 0.45, 1],
                          ease: "easeInOut",
                        }}
                      >
                        <KeyboardKey>{key}</KeyboardKey>
                      </motion.div>
                    ))}
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {transitionOverlayText && (
                <motion.div
                  key={transitionOverlayText.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.26 }}
                  className="absolute inset-0 z-98 flex items-center justify-center bg-black/55 backdrop-blur-md px-10 text-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    style={{ scale: overlayContentScale }}
                  >
                    {transitionOverlayText.content}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dock */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
              <div className="flex items-end gap-2 border border-white/15 rounded-3xl px-5 pt-3 pb-3 bg-white/10 backdrop-blur-2xl shadow-2xl">
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
