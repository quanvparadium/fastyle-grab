'use client'

import Canvas from '@/app/try-on/components/Canvas'
import OutfitDrawer from '@/app/try-on/components/OutfitDrawer'
import ParameterSidebar from '@/app/try-on/components/ParameterSidebar'
import React from 'react'

const TryOn = () => {
  return (
    <div className='w-full h-full relative'>
      <OutfitDrawer />

      <div className='h-full flex'>
        <Canvas />

        <ParameterSidebar />
      </div>
    </div>
  )
}

export default TryOn
