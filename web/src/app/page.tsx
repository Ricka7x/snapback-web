import SnapbackLanding from '@/components/SnapbackLanding';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <link rel="preload" href="/assets/restore-poster.webp" as="image" fetchPriority="high" />
      <main>
        <SnapbackLanding />
      </main>
    </div>
  );
}
