"use client"

import Hero from "./Hero"
import ProblemSection from "./ProblemSection"
import WorkspacesIntro from "./WorkspacesIntro"
import DisplaySection from "./DisplaySection"
import SnapSection from "./SnapSection"
import CloseToggleSection from "./CloseToggleSection"
import MenuBarSection from "./MenuBarSection"
import ComingSoonSection from "./ComingSoonSection"
import ComparisonSection from "./ComparisonSection"
// import TestimonialsSection from "./TestimonialsSection"
import FAQSection from "./FAQSection"
import CTASection from "./CTASection"

export default function SnapbackLanding() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <WorkspacesIntro />
      <DisplaySection />
      <SnapSection />
      <CloseToggleSection />
      <MenuBarSection />
      <ComingSoonSection />
      <ComparisonSection />
      {/* <TestimonialsSection /> */}
      <FAQSection />
      <CTASection />
    </>
  )
}
