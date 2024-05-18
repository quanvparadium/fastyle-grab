'use client'

import { Button } from '@/components/ui/button'
import { ROUTE } from '@/constants/route'
import useRecommendOutfitStore from '@/store/recommendOutfitStore'
import useTryOnOutfitAIStore from '@/store/tryOnAIStore'
import useTryOnOutfitManuallyStore from '@/store/tryOnManuallyStore'
import { useRouter } from 'next/navigation'
import React from 'react'

const ListSuggestOutfit = () => {
  const router = useRouter()

  const { setTryOnOutfit } = useTryOnOutfitManuallyStore((state) => state)
  const { setClothesUrl, setModelUrl, setResultUrl } = useTryOnOutfitAIStore(
    (state) => state,
  )
  const { recommendOutfit } = useRecommendOutfitStore((state) => state)

  // const handleClickTryOnManually = (outfit: TryOnOutfit) => {
  //   setTryOnOutfit(outfit)
  //   router.push(ROUTE.TRY_ON_MANUALLY)
  // }

  const handleClickTryOnAI = (clothesUrl: string) => {
    setClothesUrl(clothesUrl)
    setModelUrl(null)
    setResultUrl(null)
    router.push(ROUTE.TRY_ON_AI)
  }

  return (
    <div className='grid grid-cols-3 gap-6'>
      {recommendOutfit.map((outfit, index) => (
        <div
          key={`recommendOutfit-${index}`}
          className='flex flex-col gap-4 p-4 rounded-md shadow-custom'
        >
          <div className='w-full grid grid-cols-2 gap-2'>
            {Object.entries(outfit).map(([categoryID, value]) => (
              <div key={value.original.default}>
                <img
                  src={value.original.default}
                  className='w-full h-full object-cover rounded-[3px]'
                />
              </div>
            ))}
          </div>

          <div className='grid grid-cols-2 gap-2'>
            {/* <Button onClick={() => handleClickTryOnManually(outfit)}>
              Try on Manually
            </Button> */}
            <Button
              onClick={() =>
                handleClickTryOnAI(outfit?.topwear?.original.default as string)
              }
              disabled={!outfit?.topwear}
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
