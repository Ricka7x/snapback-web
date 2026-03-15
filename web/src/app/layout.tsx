import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import { SfProDisplay } from "./fonts/display";
import { SfProText } from "./fonts/text";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://snapbackapp.com"),
  title: "Snapback — Your Mac workspace, exactly how you left it.",
  description: "The ultimate workspace automation tool for macOS. Save and restore groups of apps, window positions, and z-index stacks across multiple displays with a single hotkey.",
  keywords: ["macOS", "window manager", "workspace restoration", "productivity", "mac apps", "window snapping"],
  authors: [{ name: "Snapback Team" }],
  openGraph: {
    title: "Snapback — Your Mac workspace, exactly how you left it.",
    description: "Save and restore entire workspaces on macOS. Power users' secret for instant digital flow.",
    url: "https://snapbackapp.com",
    siteName: "Snapback",
    images: [
      {
        url: "/assets/og-image.jpg",
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
    title: "Snapback — Your Mac workspace, exactly how you left it.",
    description: "Launch apps, restore positions, and preserve z-index stacks with one shortcut.",
    images: ["/assets/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${SfProDisplay.className} ${SfProText.className} ${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
