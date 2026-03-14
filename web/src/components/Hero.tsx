"use client"

export default function Hero() {
  return (
   <header className="flex flex-col text-center max-w-4xl mx-auto py-20 px-4">
    <div className="rounded-full border border-primary text-xs font-medium uppercase tracking-wide text-primary py-1 px-3 self-center animate-fade-in">
      <div className="rounded-full bg-primary w-2 h-2 inline-block mr-2 animate-pulse"></div>Free for macOS
    </div>
    <h1 className="text-6xl md:text-7xl lg:text-8xl text-white font-light leading-tight"><em className="font-normal italic">Snap</em> your workspace <em className="font-normal italic">back</em> into place.</h1>
    <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">Snap windows instantly, save complete workspace layouts, and restore everything with a single shortcut.</p>
    
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-4">
      <a href="#download" className="py-4 px-8 bg-primary hover:bg-primary-hover text-white font-medium rounded-full transition-colors">Download for macOS</a>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-8 text-sm text-text-secondary">
      <span>macOS 12.4+</span>
      <span className="hidden sm:inline">•</span>
      <span>Apple Silicon &amp; Intel</span>
      <span className="hidden sm:inline">•</span>
      <span>Menu bar app</span>
      <span className="hidden sm:inline">•</span>
      <span>No subscription</span>
    </div>

    <div className="mt-12 bg-surface rounded-2xl p-8 h-96 flex items-center justify-center border border-card-border">
        <span className="text-2xl text-text-secondary">Screenshot of the app</span>
    </div>
   </header>

  )
}
