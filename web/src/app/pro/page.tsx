import type { Metadata } from "next"
import ProContent from "./ProContent"
import { PRO_AVAILABLE } from "@/lib/constants"

const proTitle = PRO_AVAILABLE
  ? "Snapback Pro: Command Palette, Spaces & Custom Layouts"
  : "Snapback Pro Is Coming Soon: Power Features for Your Mac"
const proDescription = PRO_AVAILABLE
  ? "Snapback Pro adds a command palette, Spaces, custom layouts, and smart launchers to the free Mac window manager. One-time purchase, yours forever."
  : "Command palette, Spaces, custom layouts, and smart launchers. Snapback Pro is launching soon. Join the waitlist to lock in 25% off as an early subscriber."

export const metadata: Metadata = {
  title: proTitle,
  description: proDescription,
  alternates: {
    canonical: "/pro/",
  },
  openGraph: {
    url: "/pro/",
    title: proTitle,
    description: proDescription,
  },
}

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Snapback Pro: Command Palette, Spaces, and Custom Layouts",
  "description": "A preview of Snapback Pro features: command palette, Spaces, custom layouts, and smart launchers for macOS window management.",
  "thumbnailUrl": "https://snapbackapp.com/assets/pro-poster.webp",
  "uploadDate": "2026-05-17T00:00:00Z",
  "contentUrl": "https://snapbackapp.com/assets/pro.mp4",
  "embedUrl": "https://snapbackapp.com/assets/pro.mp4",
  "publisher": {
    "@type": "Organization",
    "name": "Snapback",
    "logo": {
      "@type": "ImageObject",
      "url": "https://snapbackapp.com/assets/logo.svg",
    },
  },
}

export default function ProPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <ProContent />
    </>
  )
}
