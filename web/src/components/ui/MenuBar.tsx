import React from 'react'
import { Shimmer } from './Shimmer'

interface MenuBarProps {
  leftItems?: number
  rightItems?: number
  className?: string
}

export const MenuBar: React.FC<MenuBarProps> = ({
  leftItems = 4,
  rightItems = 5,
  className = '',
}) => {
  const leftShimmers = Array.from({ length: leftItems }, (_, i) => {
    const width = i === 0 ? 16 : [14, 15, 15, 13, 14][i - 1] || 14
    const bgColor = i === 0 ? 'bg-white/20' : 'bg-white/14'
    const uniqueKey = `left-${i}-${width}-${bgColor}`
    return (
      <Shimmer
        key={uniqueKey}
        width={width}
        height={2}
        bgColor={bgColor}
      />
    )
  })

  const rightShimmers = Array.from({ length: rightItems }, (_, i) => {
    const width = [14, 12, 12, 32, 10][i] || 14
    const uniqueKey = `right-${i}-${width}`
    return (
      <Shimmer
        key={uniqueKey}
        width={width}
        height={1.5}
        bgColor="bg-white/20"
      />
    )
  })

  return (
    <div className={`absolute top-0 left-0 right-0 h-6 flex items-center px-3 z-50 border-b border-white/[0.07] bg-black/50 ${className}`}>
      {/* Apple logo */}
      <div className="w-2.5 h-2.5 rounded-full bg-white/55 mr-3 shrink-0" />
      
      {/* Left menu items */}
      <div className="flex items-center gap-3">
        {leftShimmers}
      </div>
      
      {/* Right menu items */}
      <div className="ml-auto flex items-center gap-3">
        {rightShimmers}
      </div>
    </div>
  )
}