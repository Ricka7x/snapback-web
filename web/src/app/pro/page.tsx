import type { Metadata } from "next"
import ProContent from "./ProContent"

export const metadata: Metadata = {
  title: "Snapback Pro · Coming Soon",
  description: "Command palette, Spaces, custom layouts, and deep links. Snapback Pro is launching soon — lock in 25% off for early subscribers.",
  alternates: {
    canonical: "/pro",
  },
}

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Snapback Pro: Command Palette, Spaces, and Custom Layouts",
  "description": "A preview of Snapback Pro features: command palette, Spaces, custom layouts, and smart launchers for macOS window management.",
  "thumbnailUrl": "https://snapbackapp.com/assets/pro-poster.webp",
  "uploadDate": "2026-05-17",
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
