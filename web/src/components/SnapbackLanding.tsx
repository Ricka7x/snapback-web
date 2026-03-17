"use client"

import { motion, useTransform } from "framer-motion";
import Nav from "./Nav";
import Hero from "./Hero";
import MenuBarSection from "./MenuBarSection";
import SnapSection from "./SnapSection";
import WorkspacesIntro from "./WorkspacesIntro";
import SaveSection from "./SaveSection";
import PreviewSection from "./PreviewSection";
import CloseToggleSection from "./CloseToggleSection";
import ScrollStory from "./ScrollStory";
import Animation from "./Animation";
import ShortcutsSection from "./ShortcutsSection";
import FlexibilitySection from "./FlexibilitySection";
import CTASection from "./CTASection";
import FAQSection from "./FAQSection";
import Footer from "./Footer";

export default function SnapbackLanding() {
  return (
    
    <>
      <Hero />  
      
      <ScrollStory>
        {(progress) => (
          <div className="w-full h-75 md:h-full flex flex-col items-start md:items-center justify-center relative">
            <Animation progress={progress} />
            
            <motion.div 
               style={{ 
                 opacity: useTransform(progress, [0.8, 0.95], [0, 1]),
               }}
               className="absolute inset-0 bg-black z-50 pointer-events-none flex items-center justify-center p-6"
            >
               <motion.h2 
                 style={{ 
                   scale: useTransform(progress, [0.8, 1], [0.9, 1.1]),
                   opacity: useTransform(progress, [0.85, 0.95], [0, 1])
                 }}
                 className="text-4xl md:text-7xl font-display font-semibold text-white text-center tracking-tight"
                >
                  Exactly where<br />you left it.
               </motion.h2>
            </motion.div>
          </div>
        )}
      </ScrollStory>

      {/* Level 2: Core Experience */}
      <SnapSection />
      <WorkspacesIntro />
      <SaveSection />
      <PreviewSection />

      {/* Level 4: Experience & Polish */}
      <MenuBarSection />
      <CloseToggleSection />
      <ShortcutsSection />
      <FlexibilitySection />
      
      <FAQSection id="faq" />
      <CTASection />
    </>
  );
}
