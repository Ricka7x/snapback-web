"use client"

import { XLogoIcon } from "@phosphor-icons/react"

const messages = [
  "Just discovered @snapbackapp — one shortcut restores my entire workspace. The macOS utility I didn't know I needed.",
  "Been using @snapbackapp for a week. Dev mode, design mode, meeting mode. My windows go where they should, every time.",
  "Finally a window manager with memory. @snapbackapp restores my full layout in one keystroke. Nothing else does this.",
  "My setup is exactly where I left it after every call. @snapbackapp does what no other window manager does.",
  "Snapback is quietly the best thing I've installed on my Mac this year. @snapbackapp",
]

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)]
}

export default function ShareOnX() {
  const handleClick = () => {
    const text = encodeURIComponent(getRandomMessage())
    const url = encodeURIComponent("https://snapbackapp.com")
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      onClick={handleClick}
      className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/8 text-zinc-400 text-sm font-text hover:border-white/20 hover:text-white transition-all glass whitespace-nowrap"
    >
      <XLogoIcon size={15} weight="fill" className="text-zinc-500 group-hover:text-white transition-colors" />
      Share on X
    </button>
  )
}
