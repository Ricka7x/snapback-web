"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Shimmer } from './Shimmer'

interface WindowProps {
  title?: string
  width?: string | number
  height?: string | number
  top?: string | number
  left?: string | number
  children: React.ReactNode
  className?: string
  showTrafficLights?: boolean
  headerBg?: string
  shadow?: string
  opacity?: number
  scale?: number
}

export const Window: React.FC<WindowProps> = ({
  title,
  width = 'auto',
  height = 'auto',
  top,
  left,
  children,
  className = '',
  showTrafficLights = true,
  headerBg = 'linear-gradient(180deg,#3c3c3c,#2e2e2e)',
  shadow = '0 0 0 1px rgba(255,255,255,0.06),0 26px 72px rgba(0,0,0,0.7)',
  opacity = 1,
  scale = 1,
}) => {
  return (
    <motion.div
      initial={false}
      animate={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        top: typeof top === 'number' ? `${top}px` : top,
        left: typeof left === 'number' ? `${left}px` : left,
        opacity,
        scale,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 30,
        opacity: { duration: 0.2 }
      }}
      className={`absolute rounded-xl overflow-hidden flex flex-col backdrop-blur-xl bg-zinc-900/40 ${className}`}
      style={{
        boxShadow: shadow,
      }}
    >
      {/* Window Header */}
      <div
        className="h-8 flex items-center px-3 gap-1.5 shrink-0 relative border-b border-black/50"
        style={{ background: headerBg }}
      >
        {showTrafficLights && (
          <>
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] shrink-0" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shrink-0" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] shrink-0" />
          </>
        )}
        
        {title && (
          <div className="absolute left-1/2 -translate-x-1/2">
            <Shimmer width={24} height={1.5} />
          </div>
        )}
      </div>
      
      {/* Window Content */}
      <div className="flex-1 overflow-hidden relative flex flex-col">
        {children}
      </div>
    </motion.div>
  )
}