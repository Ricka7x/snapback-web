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
  title: "Snap your workspace back into place.",
  description: "Snap windows into place. Save your layout. Restore everything with one shortcut. Snapback is the premium window manager for macOS.",
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
