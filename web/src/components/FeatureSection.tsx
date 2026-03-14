"use client";
import { useReveal } from "./useReveal";
import { Section, TwoCol, Copy, Shot } from "./ui";

interface FeatureSectionProps {
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
  const [ref, visible] = useReveal();
  return (
    <Section bg={props.bg} className={props.className}>
      <div ref={ref}>
        <TwoCol
          visible={visible}
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
      </div>
    </Section>
  );
}