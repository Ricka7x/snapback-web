"use client";

import dynamic from 'next/dynamic';

const Landing = dynamic(() => import('@/components/SnapbackLanding'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">     
      <main>
        <Landing />
      </main>
    </div>
  );
}
