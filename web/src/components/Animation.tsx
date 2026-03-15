"use client"
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useTransform, MotionValue } from 'framer-motion'
import { DockIcon } from './ui/DockIcon'
import { MenuBar } from './ui/MenuBar'
import { BrowserWindow } from './windows/BrowserWindow'
import { VSCodeWindow } from './windows/VSCodeWindow'
import { TerminalWindow } from './windows/TerminalWindow'

type WorkspaceState = 'disordered' | 'trio' | 'studio' | 'command_center'

interface AnimationProps {
  progress: MotionValue<number>;
}

function KeyboardKey({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-[44px] h-11 px-3 rounded-xl glass-card shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center text-white/90 font-mono text-xl font-bold relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
      <div className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        {children}
      </div>
    </div>
  )
}

export default function Animation({ progress }: AnimationProps) {
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  // Map progress to workspace states (Numeric mapping for precision)
  // 0: disordered (0.0 - 0.2)
  // 1: trio (0.2 - 0.52)
  // 2: studio (0.52 - 0.75)
  // 3: command_center (0.75 - 1.0)
  const stateIndex = useTransform(progress, [0, 0.2, 0.52, 0.75], [0, 1, 2, 3]);
  const [activeState, setActiveState] = useState<WorkspaceState>('disordered');

  useEffect(() => {
    const states: WorkspaceState[] = ['disordered', 'trio', 'studio', 'command_center'];
    
    // Initial sync
    const initialIdx = Math.floor(stateIndex.get());
    setActiveState(states[Math.min(initialIdx, 3)]);

    return stateIndex.on("change", (latest) => {
      const idx = Math.floor(latest);
      setActiveState(states[Math.min(idx, 3)]);
    });
  }, [stateIndex]);

  // Expand effect at the end of scroll
  const expansionScale = useTransform(progress, [0.8, 1], [1, 2.5]);
  const expansionOpacity = useTransform(progress, [0.95, 1], [1, 0]);
  const expansionBlur = useTransform(progress, [0.85, 1], [0, 40]);

  // ── Sizing engine ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { offsetWidth: w } = containerRef.current
        // Primary scaling factor based on width
        const newScale = Math.min(w / 1100, 1)
        setScale(newScale)
      }
    }

    const observer = new ResizeObserver(handleResize)
    if (containerRef.current) observer.observe(containerRef.current)
    handleResize()

    return () => observer.disconnect()
  }, [])

  // Layout Constants (Fixed Pixels for Stability)
  const MARGIN = 30
  const TOP_OFFSET = 36
  const WORK_HEIGHT = 480
  const REF_WIDTH = 1100

  const getLayout = (state: WorkspaceState) => {
    switch (state) {
      case 'trio':
        return {
          vscode: { top: TOP_OFFSET, left: MARGIN, width: 330, height: WORK_HEIGHT },
          browser: { top: TOP_OFFSET, left: 385, width: 330, height: WORK_HEIGHT },
          terminal: { top: TOP_OFFSET, left: 740, width: 330, height: WORK_HEIGHT },
          shortcut: ['⌃', '⌥', '1'],
          label: 'snapback to trio'
        }
      case 'studio':
        return {
          vscode: { top: TOP_OFFSET, left: MARGIN, width: 680, height: WORK_HEIGHT },
          browser: { top: TOP_OFFSET, left: 740, width: 330, height: 232 },
          terminal: { top: TOP_OFFSET + 232 + 16, left: 740, width: 330, height: 232 },
          shortcut: ['⌃', '⌥', '2'],
          label: 'snapback to studio'
        }
      case 'command_center':
        return {
          vscode: { top: TOP_OFFSET, left: MARGIN, width: 1040, height: 300 },
          browser: { top: TOP_OFFSET + 300 + 16, left: MARGIN, width: 504, height: 164 },
          terminal: { top: TOP_OFFSET + 300 + 16, left: 566, width: 504, height: 164 },
          shortcut: ['⌃', '⌥', '3'],
          label: 'snapback to command center'
        }
      default: // disordered
        return {
          vscode: { top: 120, left: 110, width: 420, height: 320 },
          browser: { top: 50, left: 330, width: 440, height: 340 },
          terminal: { top: 180, left: 440, width: 400, height: 260 },
          shortcut: [] as string[],
          label: ''
        }
    }
  }

  const layout = getLayout(activeState)

  return (
    <motion.div 
      ref={containerRef} 
      style={{ filter: `blur(${expansionBlur}px)` }}
      className="w-full h-full relative overflow-hidden flex items-center justify-center"
    >
      {/* Inner content wrapper scaled to fit */}
      <motion.div 
        className="absolute origin-center shrink-0"
        style={{ 
          scale: useTransform(progress, [0, 1], [scale, scale * 1.5]), // Slight zoom in throughout
          width: '1100px', 
          height: '618px',
          opacity: expansionOpacity
        }}
      >
        {/* DESKTOP */}
        <div 
          className="w-full h-full relative overflow-hidden select-none bg-zinc-900 shadow-2xl"
          style={{
            backgroundImage: "url('/assets/wallpaper.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <MenuBar />
          
          {/* Windows */}
          <VSCodeWindow {...layout.vscode} />
          <BrowserWindow {...layout.browser} />
          <TerminalWindow {...layout.terminal} />

          {/* Shortcut Indicator (Keycaps) */}
          <AnimatePresence>
            {layout.shortcut.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60]"
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="flex items-center gap-3">
                    {layout.shortcut.map((key, i) => (
                      <KeyboardKey key={`${key}-${i}`}>{key}</KeyboardKey>
                    ))}
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase">
                    {layout.label}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* DOCK */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 scale-100">
            <div
              className="flex items-end gap-2 border border-white/[0.15] rounded-[24px] px-5 pt-3 pb-3 bg-white/10 backdrop-blur-2xl shadow-2xl"
            >
              <DockIcon gradient="linear-gradient(148deg,#1fc8db,#2980b9)" />
              <DockIcon gradient="linear-gradient(148deg,#f7971e,#ffd200)" />
              <DockIcon gradient="linear-gradient(148deg,#0575e6,#021b79)" />
              <DockIcon gradient="linear-gradient(148deg,#141e30,#0f3460)" />
              <DockIcon gradient="linear-gradient(148deg,#4b6cb7,#182848)" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}