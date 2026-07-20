import type { Metadata } from "next";
import { Geist_Mono, Outfit, Instrument_Serif } from "next/font/google";
import { SfProText } from "./fonts/text";
import { LATEST_VERSION } from "@/lib/constants";

import Footer from "../components/Footer";
import Nav from "../components/Nav";
import ClarityAnalytics from "../components/ClarityAnalytics";
import "./globals.css";
import Script from "next/script";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://snapbackapp.com"),
  title: "Snapback | Mac Workspace Manager: Save & Restore Layouts",
  description: "Snapback saves your entire Mac window layout: apps, positions, displays. Restores everything in one keystroke. Free. macOS 14.2+. No account needed.",
  keywords: ["macOS", "mac window manager", "workspace switcher mac", "window manager", "workspace restoration", "restore window layout macos", "productivity", "mac apps", "window snapping", "rectangle mac alternative"],
  authors: [{ name: "Snapback Team" }],
  openGraph: {
    title: "Snapback | Mac Workspace Manager: Save & Restore Layouts",
    description: "Save your entire Mac window layout: apps, positions, displays. Restore everything in one keystroke. Free. macOS 14.2+.",
    url: "https://snapbackapp.com/",
    siteName: "Snapback",
    images: [
      {
        url: "/assets/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Snapback Mac Workspace Manager",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snapback | Mac Workspace Manager: Save & Restore Layouts",
    description: "Save and restore your entire Mac window layout in one keystroke. Free. macOS 14.2+.",
    images: ["/assets/og-image.webp"],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" style={{ position: "relative" }}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="Snapback Blog RSS Feed" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Snapback",
                operatingSystem: "macOS",
                applicationCategory: "ProductivityApplication",
                description: "Snapback saves and restores your entire Mac workspace: apps, window positions, and display assignments. One shortcut saves it. One shortcut restores it. Free. macOS 14.2+.",
                url: "https://snapbackapp.com/",
                softwareVersion: LATEST_VERSION,
                downloadUrl: "https://snapbackapp.com/",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Snapback",
                url: "https://snapbackapp.com/",
                logo: "https://snapbackapp.com/assets/logo.svg",
                sameAs: [
                  "https://x.com/snapbackapp_dev"
                ]
              }
            ])
          }}
        />
      </head>
      <body
        style={{ position: "relative" }}
        className={`${SfProText.className} ${geistMono.variable} ${outfit.variable} ${instrumentSerif.variable} antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        <Nav />
        <ClarityAnalytics />
        <main id="main">{children}</main>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-64SYNLKRVQ"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-64SYNLKRVQ');
          `}
        </Script>
        <Footer />
      </body>
    </html>
  );
}
