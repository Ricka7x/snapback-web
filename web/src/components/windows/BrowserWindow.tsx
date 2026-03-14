import React from 'react'
import { Window } from '../ui/Window'
import { Shimmer } from '../ui/Shimmer'

interface BrowserWindowProps {
  top?: string | number
  left?: string | number
  width?: string | number
  height?: string | number
  opacity?: number
  scale?: number
}

export const BrowserWindow: React.FC<BrowserWindowProps> = ({
  top = 11,
  left = 6,
  width = 544,
  height = 358,
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
      headerBg="linear-gradient(180deg,#3c3c3c,#2e2e2e)"
    >
      {/* Tabs */}
      <div className="h-8 flex items-end px-2 gap-0.5 bg-[#222] border-b border-black/60 shrink-0">
        <div className="h-[26px] rounded-t-lg flex items-center gap-1.5 px-3 bg-[#2a2a2a]">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{
              background: "linear-gradient(135deg,#e84393,#c13584)"
            }}
          />
          <div className="text-[11px] font-medium text-white/85 tracking-tight">Snapback</div>
        </div>
        <div className="h-[26px] rounded-t-lg flex items-center gap-1.5 px-3 opacity-40">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4285f4] shrink-0" />
          <div className="text-[11px] font-medium text-white/55 tracking-tight">GitHub</div>
        </div>
        <div className="h-[26px] rounded-t-lg flex items-center gap-1.5 px-3 opacity-40">
          <div className="w-2.5 h-2.5 rounded-full bg-[#555] shrink-0" />
          <div className="text-[11px] font-medium text-white/55 tracking-tight">Linear</div>
        </div>
      </div>
      
      {/* Toolbar */}
      <div className="h-9 flex items-center px-2.5 gap-2 bg-[#2a2a2a] border-b border-black/40 shrink-0">
        <div className="w-5 h-5 rounded-full bg-[#3a3a3a] shrink-0" />
        <div className="w-5 h-5 rounded-full bg-[#3a3a3a] shrink-0" />
        <div className="w-5 h-5 rounded-full bg-[#3a3a3a] shrink-0" />
        <div className="flex-1 h-6 bg-[#1c1c1c] rounded-md flex items-center px-2.5 gap-1.5">
          <div className="w-1.5 h-2 bg-[#28c840] rounded-sm shrink-0" />
          <div className="text-[13px] font-medium text-white/55 tracking-tight">app.snapback.so</div>
        </div>
        <div className="w-5 h-5 rounded-full bg-[#3a3a3a] shrink-0" />
      </div>
      
      {/* Content */}
      <div className="flex-1 bg-[#f1f1f1] flex flex-col overflow-hidden">
        {/* Hero section */}
        <div
          className="h-[88px] px-4 flex flex-col justify-center gap-2 shrink-0"
          style={{
            background:
              "linear-gradient(128deg,#e8673a 0%,#c13584 60%,#7c3fa0 100%)"
          }}
        >
          <Shimmer width="52%" height={2} bgColor="bg-black/14" />
          <Shimmer width="36%" height={1.5} bgColor="bg-black/10" />
          <Shimmer width="44%" height={1.5} bgColor="bg-black/10" />
        </div>
        
        {/* Cards section */}
        <div className="p-3 flex flex-col gap-2.5">
          {/* Breadcrumb */}
          <div className="flex gap-2">
            <Shimmer width={20} height={1.5} bgColor="bg-black/12" />
            <Shimmer width={14} height={1.5} bgColor="bg-black/08" />
            <Shimmer width={16} height={1.5} bgColor="bg-black/08" />
          </div>
          
          {/* First row of cards */}
          <div className="flex gap-2.5">
            {[
              { gradient: "linear-gradient(135deg,#667eea,#764ba2)", widths: [72, 88, 60], id: 'card-purple' },
              { gradient: "linear-gradient(135deg,#f093fb,#f5576c)", widths: [66, 82, 52], id: 'card-pink' },
              { gradient: "linear-gradient(135deg,#4facfe,#00f2fe)", widths: [78, 90, 58], id: 'card-blue' }
            ].map((card) => (
              <div key={card.id} className="flex-1 bg-white rounded-lg p-2.5 flex flex-col gap-1.5 shadow-sm">
                <div
                  className="h-10 rounded-md"
                  style={{ background: card.gradient }}
                />
                {card.widths.map((width) => (
                  <Shimmer
                    key={`${card.id}-shimmer-${width}`}
                    width={`${width}%`}
                    height={width === card.widths[0] ? 1.5 : 1}
                    bgColor={`bg-black/${width === card.widths[0] ? '12' : width === card.widths[1] ? '08' : '06'}`}
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* Second row of cards */}
          <div className="flex gap-2.5">
            {[
              { gradient: "linear-gradient(135deg,#43e97b,#38f9d7)", widths: [62, 80], id: 'card-green' },
              { gradient: "linear-gradient(135deg,#fa709a,#fee140)", widths: [70, 74], id: 'card-yellow' },
              { gradient: "linear-gradient(135deg,#a18cd1,#fbc2eb)", widths: [65, 86], id: 'card-lavender' }
            ].map((card) => (
              <div key={card.id} className="flex-1 bg-white rounded-lg p-2.5 flex flex-col gap-1.5 shadow-sm">
                <div
                  className="h-10 rounded-md"
                  style={{ background: card.gradient }}
                />
                {card.widths.map((width) => (
                  <Shimmer
                    key={`${card.id}-shimmer-${width}`}
                    width={`${width}%`}
                    height={width === card.widths[0] ? 1.5 : 1}
                    bgColor={`bg-black/${width === card.widths[0] ? '12' : '08'}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  )
}