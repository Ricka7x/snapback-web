import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Instrument_Serif } from "next/font/google";
import { SfProDisplay } from "./fonts/display";
import { SfProText } from "./fonts/text";

import Footer from "../components/Footer";
import Nav from "../components/Nav";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
  title: "Snapback: Mac Workspace Manager | Save & Restore Window Layouts",
  description: "Snapback saves your entire Mac window layout: apps, positions, displays. Restores everything in one keystroke. Free. macOS 14.2+. No account needed.",
  keywords: ["macOS", "mac window manager", "workspace switcher mac", "window manager", "workspace restoration", "restore window layout macos", "productivity", "mac apps", "window snapping", "rectangle mac alternative"],
  authors: [{ name: "Snapback Team" }],
  openGraph: {
    title: "Snapback: Mac Workspace Manager | Save & Restore Window Layouts",
    description: "Save your entire Mac window layout: apps, positions, displays. Restore everything in one keystroke. Free. macOS 14.2+.",
    url: "https://snapbackapp.com",
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
    title: "Snapback: Mac Workspace Manager | Save & Restore Window Layouts",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preload" href="/assets/wallpaper.webp" as="image" />
        <link rel="alternate" type="application/rss+xml" title="Snapback Blog RSS Feed" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Snapback",
              operatingSystem: "macOS",
              applicationCategory: "ProductivityApplication",
              description: "Snapback saves and restores your entire Mac workspace: apps, window positions, and display assignments. One shortcut saves it. One shortcut restores it. Free. macOS 14.2+.",
              url: "https://snapbackapp.com",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              }
            })
          }}
        />
      </head>
      <body
        className={`${SfProDisplay.className} ${SfProText.className} ${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${instrumentSerif.variable} antialiased`}
        suppressHydrationWarning
      >
        <Nav />
        {children}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vxr0eco3jw");
          `}
        </Script>
        <Footer />
      </body>
    </html>
  );
}
