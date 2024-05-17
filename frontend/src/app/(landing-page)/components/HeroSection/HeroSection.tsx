'use client'

import HeroSectionHeader from '../HeroSectionHeader/HeroSectionHeader'
import HeroSectionLeftSide from '../HeroSectionLeftSide/HeroSectionLeftSide'
import HeroSectionRightSide from '../HeroSectionRightSide/HeroSectionRightSide'

const HeroSection = () => {
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

        <HeroSectionRightSide />
      </div>
    </div>
  )
}

export default HeroSection
