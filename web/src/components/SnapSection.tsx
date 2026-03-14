import FeatureSection from "./FeatureSection";

export default function SnapSection() {
  return (
    <FeatureSection
      bg="main"
      reverseOnDesktop
      eyebrow="Window Snapping"
      heading={<>Every position,<br />one keystroke away.</>}
      body="Halves, thirds, quarters, corners. Every shortcut is remappable. Works exactly like you'd expect — until you need more."
      imageSrc="/assets/hotkeys.png"
      imageAlt="Snapback hotkeys settings"
    />
  );
}
