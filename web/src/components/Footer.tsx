
export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <img src="/assets/logo.svg" alt="Snapback" className="w-5 h-5 opacity-40 rounded-md" />
          <span className="text-white/40 text-sm">Snapback</span>
        </div>
        <p className="text-white/40 text-xs">Made for people who move fast on their Mac.</p>
      </div>
    </footer>
  );
}
