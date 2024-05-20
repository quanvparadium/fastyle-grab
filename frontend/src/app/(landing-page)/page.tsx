'use client'

import HeroSection from './components/HeroSection/HeroSection'
import IntroSection from './components/IntroSection/IntroSection'
import FeaturesSection from './components/FeaturesSection/FeaturesSection'
import AboutUsSection from './components/AboutUsSection/AboutUsSection'
import Footer from './components/Footer/Footer'

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <IntroSection />
      {/* <FeaturesSection /> */}
      <AboutUsSection />
      <Footer />
      <div style={{ height: 16 }} />
    </div>
  )
}
