import Hero from "./Hero"
import ProblemSection from "./ProblemSection"
import WorkspacesIntro from "./WorkspacesIntro"
import DisplaySection from "./DisplaySection"
import SnapSection from "./SnapSection"
import DragToSnapSection from "./DragToSnapSection"
import LayoutsSection from "./LayoutsSection"
import MenuBarSection from "./MenuBarSection"
import SocialProofCTA from "./SocialProofCTA"
import ComingSoonSection from "./ComingSoonSection"
import ComparisonSection from "./ComparisonSection"
import FAQSection from "./FAQSection"
import CTASection from "./CTASection"

export default function SnapbackLanding() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <div id="how-it-works">
        <WorkspacesIntro />
      </div>
      <div id="features">
        <DisplaySection />
        <SnapSection />
        <DragToSnapSection />
        <LayoutsSection />
        <MenuBarSection />
      </div>
      <SocialProofCTA />
      <ComingSoonSection />
      <div id="compare">
        <ComparisonSection />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <CTASection />
    </>
  )
}
