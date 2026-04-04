const FOUNDED_YEAR = 2024

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#080808] border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img src="/assets/logo.svg" alt="Snapback" className="w-9 h-9 rounded-xl" />
            <div>
              <p className="text-white/80 text-sm font-semibold leading-none mb-1">Snapback</p>
              <p className="text-zinc-600 text-xs font-text">Made for people who move fast on their Mac.</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-zinc-500 text-sm hover:text-white/70 transition-colors">
              Privacy
            </a>
            <a href="/terms" className="text-zinc-500 text-sm hover:text-white/70 transition-colors">
              Terms
            </a>
            {/* open in new page */}
            <a href="mailto:support@snapbackapp.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 text-sm hover:text-white/70 transition-colors">
              Contact
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-8 border-t border-white/4">
          <p className="text-zinc-700 text-xs font-text">© {year === FOUNDED_YEAR ? year : `${FOUNDED_YEAR}–${year}`} Snapback. All rights reserved.</p>
          <p className="text-zinc-700 text-xs font-mono">macOS 14.2+</p>
        </div>
      </div>
    </footer>
  )
}
