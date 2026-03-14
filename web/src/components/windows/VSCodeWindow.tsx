import React from 'react'
import { Window } from '../ui/Window'
import { ActivityBar, FileSidebar, Editor } from '../vscode'

interface VSCodeWindowProps {
  top?: string | number
  left?: string | number
}

export const VSCodeWindow: React.FC<VSCodeWindowProps> = ({
  top = 58,
  left = 212,
}) => {
  return (
    <Window
      width={524}
      height={382}
      top={top}
      left={left}
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