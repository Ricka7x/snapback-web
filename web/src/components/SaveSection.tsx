import FeatureSection from "./FeatureSection";

export default function SaveSection() {
  return (
    <FeatureSection
      bg="main"
      className="py-24"
      eyebrow="Save it"
      heading={<>Name it.<br />Shortcut it. Done.</>}
      body={`Give your layout a name — "Dev", "Design", "Deep work" — and assign a keyboard shortcut. Set it up once. Snapback remembers every window, every display, every position.`}
      imageSrc="/assets/hotkeys.png"
      imageAlt="Save Workspace dialog"
    />
  );
}
