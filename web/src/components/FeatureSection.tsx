import { Section, TwoCol, Copy, Shot } from "./ui";

interface FeatureSectionProps {
  id?: string;
  bg?: "main" | "alt";
  className?: string;
  reverseOnDesktop?: boolean;
  eyebrow: string;
  heading: React.ReactNode;
  body: string;
  imageSrc: string;
  imageAlt: string;
}

export default function FeatureSection(props: FeatureSectionProps) {
  return (
    <Section id={props.id} bg={props.bg} className={props.className}>
      <TwoCol
        reverseOnDesktop={props.reverseOnDesktop}
        left={
          <Copy
            eyebrow={props.eyebrow}
            heading={props.heading}
            body={props.body}
          />
        }
        right={<Shot src={props.imageSrc} alt={props.imageAlt} />}
      />
    </Section>
  );
}