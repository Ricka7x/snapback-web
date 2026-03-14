import React from 'react'

interface ShimmerProps {
  width?: string | number
  height?: string | number
  className?: string
  bgColor?: string
  rounded?: boolean
}

export const Shimmer: React.FC<ShimmerProps> = ({
  width = 'auto',
  height = '1.5',
  className = '',
  bgColor = 'bg-white/20',
  rounded = true,
}) => {
  const heightClass = typeof height === 'number' ? `h-${height}` : height
  
  return (
    <div
      className={`${heightClass} ${rounded ? 'rounded-full' : ''} ${bgColor} ${className}`}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width
      }}
    />
  )
}

export const ShimmerLine: React.FC<Omit<ShimmerProps, 'rounded'>> = (props) => (
  <Shimmer {...props} rounded={false} />
)