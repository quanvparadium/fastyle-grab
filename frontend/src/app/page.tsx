'use client'

import HeroSection from './components/HeroSection/HeroSection'
import IntroSection from './components/IntroSection/IntroSection'
import FeaturesSection from './components/FeaturesSection/FeaturesSection'
import AboutUsSection from './components/AboutUsSection/AboutUsSection'

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <IntroSection />
      <FeaturesSection />
      <AboutUsSection />
    </div>
  )
}
