import React from 'react'
import { DockIcon } from './ui/DockIcon'
import { MenuBar } from './ui/MenuBar'
import { BrowserWindow } from './windows/BrowserWindow'
import { VSCodeWindow } from './windows/VSCodeWindow'
import { TerminalWindow } from './windows/TerminalWindow'

export default function Animation() {
  return (
    <>
      <div
        className="w-full h-full relative"
        
      >
       
           {/* DESKTOP */}
           <div 
             className="w-full rounded-md h-full relative overflow-hidden select-none"
             style={{
               backgroundImage: "url('/assets/bg.jpg')",
               backgroundSize: "cover",
               backgroundPosition: "center",
               backgroundRepeat: "no-repeat"
             }}
           >
            
            
            <MenuBar />
            
            <BrowserWindow />
            
            <VSCodeWindow />
            
            <TerminalWindow />
            
            {/* ══ DOCK ══ */}
            <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 z-50 scale-75">
              <div
                className="flex items-end gap-1.5 border border-white/[0.18] rounded-[14px] px-3 pt-2 pb-1.5 bg-white/10"
                style={{
                  boxShadow:
                    "0 6px 30px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.22)"
                }}
              >
                <DockIcon gradient="linear-gradient(148deg,#1fc8db,#2980b9)" className="scale-75" />
                <DockIcon gradient="linear-gradient(148deg,#f7971e,#ffd200)" className="scale-75" />
                <DockIcon gradient="linear-gradient(148deg,#0575e6,#021b79)" className="scale-75" />
                <DockIcon gradient="linear-gradient(148deg,#141e30,#0f3460)" className="scale-75" />
                <DockIcon gradient="linear-gradient(148deg,#4b6cb7,#182848)" className="scale-75" />
              </div>
            </div>
          </div>
         </div>       
    </>
  )
}