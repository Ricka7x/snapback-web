"use client"

import { useEffect, useState } from "react"
import { BLACK_FRIDAY_END } from "@/lib/constants"

/**
 * True while the Black Friday offer runs. It starts false so the pre-rendered page and the first
 * client render match, flips after mount, and turns itself off at BLACK_FRIDAY_END even if the
 * page stays open.
 */
export function useBlackFriday(): boolean {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const check = () => setActive(Date.now() < BLACK_FRIDAY_END.getTime())
    check()
    const id = setInterval(check, 30000)
    return () => clearInterval(id)
  }, [])

  return active
}
