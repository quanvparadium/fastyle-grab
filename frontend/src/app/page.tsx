'use client'

import { Button } from '@/components/ui/button'
import { ROUTE } from '@/constants/route'
import { useRouter } from 'next/navigation'
import HeroSection from './components/HeroSection/HeroSection'

export default function Home() {
  const router = useRouter()

  return (
    <div>
      <HeroSection />
      <Button onClick={() => router.push(ROUTE.RETRIVAL)}>Landing page</Button>
    </div>
  )
}
