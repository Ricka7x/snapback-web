import FeatureSection from "./FeatureSection";

export default function PreviewSection() {
  return (
    <FeatureSection
      bg="main"
      className="py-24"
      reverseOnDesktop
      eyebrow="Preview it"
      heading={<>See exactly what<br />you're saving.</>}
      body="The preview maps your apps to their displays before you commit. Remove anything you don't want included. No surprises when you restore."
      imageSrc="/assets/preview.png"
      imageAlt="Workspace preview with displays"
    />
  );
}
