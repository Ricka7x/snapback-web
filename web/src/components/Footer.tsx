import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-row items-center justify-between gap-4">
        {/* Left: Logo, name, tagline responsive */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3">
          <div className="flex items-center gap-2">
            <img src="/assets/logo.svg" alt="Snapback" className="w-5 h-5 opacity-100 rounded-md" />
            <span className="text-white/80 text-sm font-medium tracking-tight">Snapback</span>
          </div>
          <p className="text-white/60 text-xs md:ml-3 order-2 md:order-1 mt-1 md:mt-0">Made for people who move fast on their Mac.</p>
        </div>
        {/* Right: Navigation - only show Terms & Privacy on mobile */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-1 md:gap-4">
          <Link
            href="/privacy-policy"
            className="text-xs font-medium text-white/60 hover:text-white transition-all duration-200 md:block"
            style={{ textDecoration: "none" }}
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-xs font-medium text-white/60 hover:text-white transition-all duration-200 md:block"
            style={{ textDecoration: "none" }}
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
