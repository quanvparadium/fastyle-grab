'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/router'
import HeroSectionHeader from '../HeroSectionHeader/HeroSectionHeader'
import { useMediaQuery } from 'react-responsive'
import HeroSectionLeftSide from '../HeroSectionLeftSide/HeroSectionLeftSide'
import HeroSectionRightSide from '../HeroSectionRightSide/HeroSectionRightSide'

const HeroSection = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  })

  return (
    <div
      className='flex-col'
      style={{
        margin: '8px 16px 16px 16px',
        borderRadius: 36,
        height: 'calc(100vh - 16px)',
        background: 'linear-gradient(#D8C2FA, #B1B4FF)',
      }}
    >
      <HeroSectionHeader />

      <div className='flex w-full'>
        <HeroSectionLeftSide />
        {isDesktopOrLaptop && <HeroSectionRightSide />}
      </div>
    </div>
  )
}

export default HeroSection
