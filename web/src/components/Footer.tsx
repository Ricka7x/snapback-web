import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-row items-center justify-between gap-4">
        {/* Left: Logo and tagline */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img src="/assets/logo.svg" alt="Snapback" className="w-5 h-5 opacity-100 rounded-md" />
            <span className="text-white/80 text-sm font-medium tracking-tight">Snapback</span>
          </div>
          <p className="text-white/60 text-xs ml-3">Made for people who move fast on their Mac.</p>
        </div>
        {/* Right: Navigation */}
        <div className="flex flex-row items-center gap-4">
          <Link
            href="/privacy-policy"
            className="text-xs font-medium text-white/60 hover:text-white transition-all duration-200"
            style={{ textDecoration: "none" }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-xs font-medium text-white/60 hover:text-white transition-all duration-200"
            style={{ textDecoration: "none" }}
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
