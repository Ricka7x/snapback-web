import React from 'react'

interface CodeLine {
  parts: { width: number; color: string }[]
  indent?: number
  highlight?: boolean
}

const codeLines: CodeLine[] = [
  { parts: [{ width: 40, color: 'bg-[#c586c0]/72' }, { width: 56, color: 'bg-white/18' }, { width: 40, color: 'bg-[#c586c0]/72' }, { width: 62, color: 'bg-[#ce9178]/78' }] },
  { parts: [{ width: 40, color: 'bg-[#c586c0]/72' }, { width: 48, color: 'bg-white/18' }, { width: 40, color: 'bg-[#c586c0]/72' }, { width: 70, color: 'bg-[#ce9178]/78' }] },
  { parts: [] },
  { parts: [{ width: 120, color: 'bg-[#6a9955]/72' }] },
  { parts: [{ width: 48, color: 'bg-[#c586c0]/72' }, { width: 38, color: 'bg-[#c586c0]/72' }, { width: 56, color: 'bg-[#dcdcaa]/82' }, { width: 16, color: 'bg-white/20' }] },
  { parts: [{ width: 32, color: 'bg-[#c586c0]/72' }, { width: 48, color: 'bg-white/18' }, { width: 56, color: 'bg-[#dcdcaa]/82' }, { width: 32, color: 'bg-[#4ec9b0]/82' }, { width: 16, color: 'bg-[#b5cea8]/82' }], indent: 1 },
  { parts: [{ width: 32, color: 'bg-[#c586c0]/72' }, { width: 58, color: 'bg-white/18' }, { width: 56, color: 'bg-[#dcdcaa]/82' }, { width: 38, color: 'bg-[#4ec9b0]/82' }, { width: 28, color: 'bg-[#b5cea8]/82' }], indent: 1 },
  { parts: [] },
  { parts: [{ width: 32, color: 'bg-[#c586c0]/72' }, { width: 64, color: 'bg-[#dcdcaa]/82' }, { width: 24, color: 'bg-white/18' }], indent: 1 },
  { parts: [{ width: 56, color: 'bg-[#dcdcaa]/82' }, { width: 48, color: 'bg-white/18' }, { width: 32, color: 'bg-[#9cdcfe]/82' }, { width: 20, color: 'bg-[#b5cea8]/82' }], indent: 2 },
  { parts: [{ width: 12, color: 'bg-white/20' }], indent: 1 },
  { parts: [] },
  { parts: [{ width: 32, color: 'bg-[#c586c0]/72' }, { width: 58, color: 'bg-[#dcdcaa]/82' }, { width: 38, color: 'bg-[#c586c0]/72' }, { width: 24, color: 'bg-white/18' }], indent: 1 },
  { parts: [{ width: 32, color: 'bg-[#c586c0]/72' }, { width: 22, color: 'bg-white/18' }, { width: 38, color: 'bg-[#c586c0]/72' }, { width: 48, color: 'bg-[#dcdcaa]/82' }, { width: 38, color: 'bg-[#9cdcfe]/82' }], indent: 2 },
  { parts: [{ width: 32, color: 'bg-[#c586c0]/72' }, { width: 22, color: 'bg-white/18' }, { width: 38, color: 'bg-[#c586c0]/72' }, { width: 22, color: 'bg-[#9cdcfe]/82' }, { width: 38, color: 'bg-[#dcdcaa]/82' }], indent: 2, highlight: true },
  { parts: [{ width: 58, color: 'bg-[#dcdcaa]/82' }, { width: 22, color: 'bg-[#9cdcfe]/82' }, { width: 38, color: 'bg-[#ce9178]/78' }], indent: 2 },
  { parts: [{ width: 12, color: 'bg-white/20' }], indent: 1 },
  { parts: [] },
  { parts: [{ width: 40, color: 'bg-[#c586c0]/72' }, { width: 24, color: 'bg-white/20' }], indent: 1 },
  { parts: [{ width: 24, color: 'bg-white/18' }, { width: 32, color: 'bg-[#4ec9b0]/85' }, { width: 56, color: 'bg-[#4fc1ff]/82' }, { width: 70, color: 'bg-[#ce9178]/78' }], indent: 2 },
  { parts: [{ width: 32, color: 'bg-[#4ec9b0]/85' }, { width: 48, color: 'bg-[#9cdcfe]/82' }, { width: 58, color: 'bg-[#dcdcaa]/82' }], indent: 3 },
  { parts: [{ width: 48, color: 'bg-white/18' }, { width: 32, color: 'bg-[#9cdcfe]/82' }], indent: 4 },
  { parts: [{ width: 48, color: 'bg-[#4ec9b0]/72' }], indent: 3 },
  { parts: [{ width: 32, color: 'bg-white/18' }], indent: 2 },
]

export const Editor: React.FC = () => {
  const lineNumbers = Array.from({ length: 22 }, (_, i) => {
    const width = [3.5, 3.5, 2, 3.5, 3.5, 3.5, 2, 3.5, 3.5, 4, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4][i] || 3.5
    const bgColor = width === 2 ? 'bg-white/[0.07]' : 'bg-white/[0.12]'
    return { width, bgColor }
  })

  return (
    <div className="flex-1 bg-[#1e1e1e] flex flex-col min-w-0">
      {/* Tabs */}
      <div className="h-8 bg-[#2d2d2d] border-b border-black/50 flex items-end shrink-0">
        <div
          className="h-[30px] px-3.5 flex items-center gap-1.5 border-r border-black/40 bg-[#1e1e1e] shrink-0"
          style={{ borderTop: "1px solid #007acc" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#4ec9b0] shrink-0" />
          <div className="h-[5px] w-11 rounded-full bg-white/35" />
        </div>
        <div className="h-[30px] px-3.5 flex items-center gap-1.5 border-r border-black/40 opacity-40 shrink-0">
          <div className="h-[5px] w-9 rounded-full bg-white/20" />
        </div>
        <div className="h-[30px] px-3.5 flex items-center gap-1.5 border-r border-black/40 opacity-40 shrink-0">
          <div className="h-[5px] w-8 rounded-full bg-white/20" />
        </div>
      </div>
      
      {/* Code Area */}
      <div className="flex flex-1 py-2 overflow-hidden">
        {/* Line numbers gutter */}
        <div className="w-8 px-1.5 border-r border-white/[0.04] flex flex-col gap-[4px] items-end shrink-0 pt-px">
          {lineNumbers.map((line, index) => {
            const uniqueKey = `line-${line.width}-${line.bgColor}-${index}`
            return (
              <div
                key={uniqueKey}
                className={`h-[4px] rounded-sm ${line.bgColor}`}
                style={{ width: `${line.width}px` }}
              />
            )
          })}
        </div>
        
        {/* Code lines */}
        <div className="flex-1 px-3 flex flex-col gap-[4px] min-w-0 pt-px overflow-hidden">
          {codeLines.map((line, lineIndex) => {
            const paddingLeft = line.indent ? `pl-${line.indent * 4}` : ''
            const bgColor = line.highlight ? 'bg-white/[0.04] rounded-sm' : ''
            const uniqueKey = `code-line-${lineIndex}-${line.parts.length}-${line.indent || 0}-${line.highlight || false}`
            
            return (
              <div key={uniqueKey} className={`h-[4px] flex items-center gap-1.5 ${paddingLeft} ${bgColor}`}>
                {line.parts.map((part, partIndex) => {
                  const partKey = `${uniqueKey}-part-${partIndex}-${part.width}-${part.color}`
                  return (
                    <div
                      key={partKey}
                      className={`h-[4px] rounded-sm ${part.color} shrink-0`}
                      style={{ width: `${part.width}px` }}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Status bar */}
      <div className="h-[22px] bg-[#007acc] flex items-center px-2.5 gap-3.5 shrink-0">
        <div className="h-[5px] w-12 rounded-full bg-white/42" />
        <div className="h-[5px] w-8 rounded-full bg-white/32" />
        <div className="ml-auto flex gap-3.5">
          <div className="h-[5px] w-20 rounded-full bg-white/38" />
          <div className="h-[5px] w-7 rounded-full bg-white/32" />
          <div className="h-[5px] w-12 rounded-full bg-white/32" />
        </div>
      </div>
    </div>
  )
}