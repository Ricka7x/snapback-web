import React from 'react'
import { Window } from '../ui/Window'

interface TerminalWindowProps {
  top?: string | number
  left?: string | number
  width?: string | number
  height?: string | number
  opacity?: number
  scale?: number
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  top = 112,
  left = 342,
  width = 390,
  height = 272,
  opacity = 1,
  scale = 1,
}) => {
  return (
    <Window
      width={width}
      height={height}
      top={top}
      left={left}
      opacity={opacity}
      scale={scale}
      headerBg="linear-gradient(180deg,#3a3a3a,#2d2d2d)"
    >
      <div className="flex-1 bg-[#161616] px-3.5 py-3 flex flex-col gap-[7px] overflow-hidden">
        {/* First command */}
        <div className="flex items-center gap-2">
          <div className="w-[7px] h-[7px] rounded-full bg-[#3dd68c] shrink-0" />
          <div className="h-[5px] w-14 rounded-full bg-[#4da6ff]/75 shrink-0" />
          <div className="h-[5px] w-16 rounded-full bg-white/26 shrink-0" />
        </div>
        <div className="flex items-center pl-4"><div className="h-[5px] w-32 rounded-full bg-white/12"></div></div>
        <div className="flex items-center pl-4"><div className="h-[5px] w-40 rounded-full bg-white/10"></div></div>
        <div className="flex items-center pl-4"><div className="h-[5px] w-20 rounded-full bg-white/08"></div></div>
        <div className="flex items-center pl-6"><div className="h-[5px] w-28 rounded-full bg-red-400/40"></div></div>
        <div className="flex items-center pl-6"><div className="h-[5px] w-24 rounded-full bg-red-400/40"></div></div>
        
        {/* Second command */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-[7px] h-[7px] rounded-full bg-[#3dd68c] shrink-0" />
          <div className="h-[5px] w-14 rounded-full bg-[#4da6ff]/75 shrink-0" />
          <div className="h-[5px] w-20 rounded-full bg-white/26 shrink-0" />
        </div>
        <div className="flex items-center pl-4"><div className="h-[5px] w-36 rounded-full bg-emerald-400/45"></div></div>
        <div className="flex items-center pl-4"><div className="h-[5px] w-24 rounded-full bg-emerald-400/30"></div></div>
        <div className="flex items-center pl-4"><div className="h-[5px] w-40 rounded-full bg-blue-400/42"></div></div>
        <div className="flex items-center pl-4"><div className="h-[5px] w-32 rounded-full bg-blue-400/30"></div></div>
        
        {/* Third command */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-[7px] h-[7px] rounded-full bg-[#3dd68c] shrink-0" />
          <div className="text-[13px] font-mono text-white/70 tracking-tight">{'>'}</div>
          <div className="w-[7px] h-[13px] bg-white/70 rounded-sm shrink-0" />
        </div>
      </div>
    </Window>
  )
}