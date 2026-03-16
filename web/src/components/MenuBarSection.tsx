import FeatureSection from "./FeatureSection";

export default function MenuBarSection() {
  return (
    <FeatureSection
      bg="alt"
      eyebrow="Stays out of your way"
      heading={<>It lives in<br />your menu bar.</>}
      body="No dock clutter, no floating windows. Snapback sits quietly in your menu bar. Snap a window, switch a workspace, and get back to work. It never gets in the way."
      imageSrc="/assets/menu.webp"
      imageAlt="Snapback menu bar dropdown"
    />
  );
}
