import React from 'react'
import Navbar from '../components/v2/Navbar.jsx';
import ScrollProgress from '../components/v2/ScrollProgress.jsx';
import BackToTop from '../components/BackToTop';
import ScrollIndicator from '../components/ScrollIndicator.jsx';
import HeroSection from '../components/v2/HeroSection.jsx';
import HomeSection from '../components/v2/HomeSection.jsx';
import AboutSection from '../components/v2/AboutSection.jsx';
import SkillsSection from '../components/v2/SkillsSection.jsx';
import ProjectsSection from '../components/v2/ProjectsSection.jsx';
import ContactSection from '../components/v2/ContactSection.jsx';
import Footer from '../components/v2/Footer.jsx';
const Index = () => {
  return (
    <div>
      <Navbar />
      <ScrollProgress />
      <ScrollIndicator />
      <BackToTop />
      <main>
        <HeroSection />
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default Index
