import FeatureSection from "./FeatureSection";

export default function ShortcutsSection() {
  return (
    <FeatureSection
      bg="alt"
      eyebrow="Workspace shortcuts"
      heading={<>Your whole day,<br />mapped to four keys.</>}
      body="Development. Design. Meetings. Focus. Each one a full window layout, one shortcut away. Your Mac catches up the moment you do."
      imageSrc="/assets/workspaces.png"
      imageAlt="Workspace shortcuts panel"
    />
  );
}
