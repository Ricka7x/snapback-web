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
  title: "Snapback · Your Mac workspace, exactly how you left it.",
  description: "The ultimate workspace automation tool for macOS. Save and restore groups of apps, window positions, and z-index stacks across multiple displays with a single hotkey.",
  keywords: ["macOS", "window manager", "workspace restoration", "productivity", "mac apps", "window snapping"],
  authors: [{ name: "Snapback Team" }],
  openGraph: {
    title: "Snapback · Your Mac workspace, exactly how you left it.",
    description: "Save and restore entire workspaces on macOS. Power users' secret for instant digital flow.",
    url: "https://snapbackapp.com",
    siteName: "Snapback",
    images: [
      {
        url: "/assets/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Snapback Workspace Restoration",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snapback · Your Mac workspace, exactly how you left it.",
    description: "Launch apps, restore positions, and preserve z-index stacks with one shortcut.",
    images: ["/assets/og-image.webp"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Snapback",
              operatingSystem: "macOS",
              applicationCategory: "ProductivityApplication",
              description: "The ultimate workspace automation tool for macOS. Save and restore groups of apps, window positions, and z-index stacks across multiple displays.",
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
