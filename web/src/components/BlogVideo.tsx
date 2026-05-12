"use client";

import { useEffect, useRef } from "react";

export default function Video({ src, autoPlay = false }: { src: string; autoPlay?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.load();
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      controls
      autoPlay={autoPlay}
      muted={autoPlay}
      loop={autoPlay}
      playsInline
      preload={autoPlay ? "auto" : "metadata"}
      className="w-full rounded-xl border border-white/10 my-8 bg-black"
    />
  );
}
