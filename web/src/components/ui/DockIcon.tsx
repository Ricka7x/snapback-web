import React from 'react'

interface DockIconProps {
  gradient: string
  className?: string
}

export const DockIcon: React.FC<DockIconProps> = ({ gradient, className = '' }) => {
  return (
    <div
      className={`w-[52px] h-[52px] rounded-[14px] relative cursor-default transition-transform duration-150 hover:-translate-y-2.5 hover:scale-110 shrink-0 ${className}`}
      style={{ background: gradient }}
    >
      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/65" />
    </div>
  )
}