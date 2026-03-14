import React from 'react'

export const ActivityBar: React.FC = () => {
  return (
    <div className="w-11 bg-[#2c2c2c] border-r border-black/50 flex flex-col items-center py-2 gap-1.5 shrink-0">
      <div className="w-8 h-8 rounded-md bg-white/[0.12]" />
      <div className="w-8 h-8 rounded-md bg-white/[0.05]" />
      <div className="w-8 h-8 rounded-md bg-white/[0.05]" />
      <div className="w-8 h-8 rounded-md bg-white/[0.05]" />
      <div className="w-8 h-8 rounded-md bg-white/[0.05] mt-auto mb-1.5" />
    </div>
  )
}