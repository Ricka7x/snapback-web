import FeatureSection from "./FeatureSection";

export default function FlexibilitySection() {
  return (
    <FeatureSection
      bg="main"
      reverseOnDesktop
      eyebrow="Works your way"
      heading={<>Already have a<br />window manager?</>}
      body="Turn off snapping entirely and use Snapback just for workspaces. It plays well with whatever you already have like Magnet, Rectangle, or nothing at all."
      imageSrc="/assets/settings.png"
      imageAlt="General settings: disable window management"
    />
  );
}
