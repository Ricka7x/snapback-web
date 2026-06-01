import type { Metadata } from "next"
import ProContent from "./ProContent"

export const metadata: Metadata = {
  title: "Snapback Pro · Coming Soon",
  description: "Command palette, Spaces, custom layouts, and deep links. Snapback Pro is launching soon — lock in 25% off for early subscribers.",
  alternates: {
    canonical: "/pro",
  },
}

export default function ProPage() {
  return <ProContent />
}
