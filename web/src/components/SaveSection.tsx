import FeatureSection from "./FeatureSection";

export default function SaveSection() {
  return (
    <FeatureSection
      bg="main"
      className="py-24"
      eyebrow="Save it"
      heading={<>Name it.<br />Shortcut it. Done.</>}
      body={`Give your layout a name (like Dev, Design, or Deep work) and assign a shortcut. Set it up once, and Snapback remembers every window on every display.`}
      imageSrc="/assets/save.png"
      imageAlt="Save Workspace dialog"
    />
  );
}
