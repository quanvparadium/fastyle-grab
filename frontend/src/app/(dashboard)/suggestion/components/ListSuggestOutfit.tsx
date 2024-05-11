'use client'

import { Button } from '@/components/ui/button'
import { ROUTE } from '@/constants/route'
import { fakeData } from '@/constants/try-on'
import useTryOnOutfitStore from '@/store/tryonStore'
import { TryOnOutfit } from '@/types/product'
import { useRouter } from 'next/navigation'
import React from 'react'

const ListSuggestOutfit = () => {
  const { setTryOnOutfit } = useTryOnOutfitStore((state) => state)
  const router = useRouter()

  const handleClickTryOn = (outfit: TryOnOutfit) => {
    setTryOnOutfit(outfit)
    router.push(ROUTE.TRY_ON)
  }

  return (
    <div className='grid grid-cols-3 gap-6'>
      {fakeData.map((outfit, index) => (
        <div key={index}>
          <div className='w-full grid grid-cols-2'>
            {Object.entries(outfit).map(([categoryID, outfit]) => (
              <div key={outfit._id}>
                <img
                  src={outfit.view.default}
                  className='w-full h-full object-cover rounded-lg'
                />
              </div>
            ))}
          </div>
          <Button onClick={() => handleClickTryOn(outfit)}>Try on</Button>
        </div>
      ))}
    </div>
  )
}

export default ListSuggestOutfit
