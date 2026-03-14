import React from 'react'

interface FileItem {
  iconColor: string
  width: number
  indent?: number
  active?: boolean
}

const fileItems: FileItem[] = [
  { iconColor: 'bg-white/20', width: 14 },
  { iconColor: 'bg-white/20', width: 20 },
  { iconColor: 'bg-white/20', width: 7, indent: 0 },
  { iconColor: 'bg-[#4ec9b0]', width: 12, indent: 1, active: true },
  { iconColor: 'bg-[#4af626]', width: 11, indent: 1 },
  { iconColor: 'bg-[#e8c27d]', width: 9, indent: 1 },
  { iconColor: 'bg-white/20', width: 8, indent: 0 },
  { iconColor: 'bg-[#e8c27d]', width: 68, indent: 0 },
  { iconColor: 'bg-[#4af626]', width: 76, indent: 0 },
  { iconColor: 'bg-white/20', width: 14, indent: 0 },
  { iconColor: 'bg-white/20', width: 10, indent: 0 },
]

export const FileSidebar: React.FC = () => {
  return (
    <div className="w-[148px] bg-[#252526] border-r border-black/50 flex flex-col py-2 gap-0.5 shrink-0 overflow-hidden">
      <div className="px-2.5 pb-1">
        <div className="text-[11px] font-semibold text-white/45 tracking-wide">EXPLORER</div>
      </div>
      <div className="px-2.5 pb-1 pt-1.5">
        <div className="h-[5px] w-20 rounded-full bg-white/[0.12]"></div>
      </div>
      
      {fileItems.map((item, index) => {
        const paddingLeft = item.indent === 1 ? 'pl-5 pr-2.5' : 'px-2.5'
        const bgColor = item.active ? 'bg-white/[0.07]' : ''
        const uniqueKey = `file-${item.iconColor}-${item.width}-${item.indent}-${index}`
        
        return (
          <div key={uniqueKey} className={`flex items-center gap-1.5 ${paddingLeft} py-[3px] ${bgColor}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${item.iconColor} shrink-0`} />
            <div 
              className={`h-[5px] rounded-full ${item.active ? 'bg-white/20' : 'bg-white/12'}`}
              style={{ width: `${item.width}px` }}
            />
          </div>
        )
      })}
    </div>
  )
}