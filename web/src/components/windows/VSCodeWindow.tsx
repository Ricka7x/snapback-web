import React from 'react'
import { Window } from '../ui/Window'
import { ActivityBar, FileSidebar, Editor } from '../vscode'

interface VSCodeWindowProps {
  top?: string | number
  left?: string | number
  width?: string | number
  height?: string | number
  opacity?: number
  scale?: number
}

export const VSCodeWindow: React.FC<VSCodeWindowProps> = ({
  top = 58,
  left = 212,
  width = 524,
  height = 382,
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
      headerBg="#323233"
      showTrafficLights={true}
    >
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar />
        <FileSidebar />
        <Editor />
      </div>
    </Window>
  )
}