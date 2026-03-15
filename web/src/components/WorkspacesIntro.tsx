"use client";
import { useReveal } from "./useReveal";
import { Section } from "./ui";

export default function WorkspacesIntro() {
  const [ref, visible] = useReveal();
  return (
    <Section bg="alt" mesh>
      <div
        ref={ref}
        className={`max-w-2xl mx-auto text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <span className="text-primary text-[11px] font-bold uppercase tracking-[0.12em] block mb-5">
          Workspaces
        </span>
        <h2 className="font-display text-[clamp(36px,6vw,60px)] font-semibold leading-[1.08] tracking-[-0.015em] text-white mb-6">
          One shortcut.<br />
          Every window where it belongs.
        </h2>
        <p className="text-zinc-400 text-xl leading-[1.65]">
          Save everything: every app, every display, and every position. Bring it back
          instantly, move between workflows as fast as you switch between tasks.
        </p>
      </div>
    </Section>
  );
}
