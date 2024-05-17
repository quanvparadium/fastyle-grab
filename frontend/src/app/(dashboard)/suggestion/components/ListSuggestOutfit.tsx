'use client'

import { Button } from '@/components/ui/button'
import { ROUTE } from '@/constants/route'
import { fakeData } from '@/constants/try-on-manually'
import useTryOnOutfitAIStore from '@/store/tryOnAIStore'
import useTryOnOutfitManuallyStore from '@/store/tryOnManuallyStore'
import { TryOnOutfit } from '@/types/product'
import { useRouter } from 'next/navigation'
import React from 'react'

const ListSuggestOutfit = () => {
  const router = useRouter()

  const { setTryOnOutfit } = useTryOnOutfitManuallyStore((state) => state)
  const { setClothesUrl, setModelUrl } = useTryOnOutfitAIStore((state) => state)

  const handleClickTryOnManually = (outfit: TryOnOutfit) => {
    setTryOnOutfit(outfit)
    router.push(ROUTE.TRY_ON_MANUALLY)
  }

  const handleClickTryOnAI = (clothesUrl: string) => {
    setClothesUrl(clothesUrl)
    setModelUrl(null)
    router.push(ROUTE.TRY_ON_AI)
  }

  return (
    <div className='grid grid-cols-3 gap-6'>
      {fakeData.map((outfit, index) => (
        <div
          key={index}
          className='flex flex-col gap-4 p-4 rounded-md shadow-custom'
        >
          <div className='w-full grid grid-cols-2 gap-2'>
            {Object.entries(outfit).map(([categoryID, outfit]) => (
              <div key={outfit._id}>
                <img
                  src={outfit.view.default}
                  className='w-full h-full object-cover rounded-[3px]'
                />
              </div>
            ))}
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <Button onClick={() => handleClickTryOnManually(outfit)}>
              Try on Manually
            </Button>
            <Button
              onClick={() =>
                handleClickTryOnAI(outfit?.topwear?.view.default as string)
              }
              disabled={!outfit.topwear}
            >
              Try on AI
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListSuggestOutfit
