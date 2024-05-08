'use client'

import { Button } from '@/components/ui/button'
import { ROUTE } from '@/constants/route'
import { useRouter } from 'next/navigation'
import HeroSection from './components/HeroSection/HeroSection'
import IntroSection from './components/IntroSection/IntroSection'

export default function Home() {
  const router = useRouter()

  return (
    <div>
      <HeroSection />
      <IntroSection />
    </div>
  )
}
