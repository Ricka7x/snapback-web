import Nav from "./Nav";
import Hero from "./Hero";
import MenuBarSection from "./MenuBarSection";
import SnapSection from "./SnapSection";
import WorkspacesIntro from "./WorkspacesIntro";
import SaveSection from "./SaveSection";
import PreviewSection from "./PreviewSection";
import CloseToggleSection from "./CloseToggleSection";
import ShortcutsSection from "./ShortcutsSection";
import FlexibilitySection from "./FlexibilitySection";
import CTASection from "./CTASection";
import Footer from "./Footer";

export default function SnapbackLanding() {
  return (
    
    <>
      <Nav />
      <Hero />  
      <MenuBarSection />
      <SnapSection />
      <WorkspacesIntro />
      <SaveSection />
      <PreviewSection />
      <CloseToggleSection />
      <ShortcutsSection />
      <FlexibilitySection />
      <CTASection />
      <Footer />
    </>
  );
}
