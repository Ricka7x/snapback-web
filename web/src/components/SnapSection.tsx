import FeatureSection from "./FeatureSection";

export default function SnapSection() {
  return (
    <FeatureSection
      id="features"
      bg="alt"
      reverseOnDesktop
      eyebrow="Window Snapping"
      heading={<>Every position,<br />one keystroke away.</>}
      body="Halves, thirds, quarters, corners. Every shortcut is remappable. It works exactly like you'd expect, right out of the box."
      imageSrc="/assets/positions.webp"
      imageAlt="Snapback hotkeys settings"
    />
  );
}
