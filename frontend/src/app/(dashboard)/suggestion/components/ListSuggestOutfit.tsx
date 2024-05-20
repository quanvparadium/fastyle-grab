'use client'

import ItemDetailDialog from '@/app/(dashboard)/suggestion/components/ItemDetailDialog'
import { Button } from '@/components/ui/button'
import { ROUTE } from '@/constants/route'
import useRecommendOutfitStore from '@/store/recommendOutfitStore'
import useTryOnOutfitAIStore from '@/store/tryOnAIStore'
import useTryOnOutfitManuallyStore from '@/store/tryOnManuallyStore'
import { CategoryID } from '@/types/product'
import { RecommendOutfit } from '@/types/recommendOutfit'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

const ListSuggestOutfit = () => {
  const suggestOutfitRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  const { setTryOnOutfit } = useTryOnOutfitManuallyStore((state) => state)
  const { setClothesUrl, setModelUrl, setResultUrl } = useTryOnOutfitAIStore(
    (state) => state,
  )
  const { recommendOutfit } = useRecommendOutfitStore((state) => state)

  const handleClickTryOnManually = (outfit: RecommendOutfit) => {
    setTryOnOutfit(outfit)
    router.push(ROUTE.TRY_ON_MANUALLY)
  }

  const handleClickTryOnAI = (clothesUrl: string) => {
    setClothesUrl(clothesUrl)
    setModelUrl(null)
    setResultUrl(null)
    router.push(ROUTE.TRY_ON_AI)
  }

  useEffect(() => {
    suggestOutfitRef.current?.scrollIntoView()
  }, [recommendOutfit])

  if (!recommendOutfit.length) {
    return null
  }

  return (
    <div ref={suggestOutfitRef} className='flex flex-col gap-4'>
      <span className='text-[20px] font-semibold'>Fashion Suggestion</span>

      <div className='grid grid-cols-5 gap-6 pb-4'>
        {recommendOutfit.map((outfit, index) => (
          <div
            key={`recommendOutfit-${index}`}
            className='flex flex-col gap-4 p-4 rounded-md border'
          >
            <div className='flex-1'>
              <div className='w-full grid grid-cols-2 gap-2'>
                {Object.entries(outfit).map(([categoryID, clothes]) => (
                  <div
                    key={`${categoryID}-${clothes?._id}`}
                    className='relative group'
                  >
                    <ItemDetailDialog
                      categoryID={categoryID as CategoryID}
                      clothes={clothes}
                    />

                    <img
                      src={clothes?.view?.default}
                      className='w-full h-full object-cover rounded-[3px]'
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              {outfit?.topwear && (
                <Button
                  onClick={() =>
                    handleClickTryOnAI(outfit?.topwear?.view?.default as string)
                  }
                  disabled={!outfit?.topwear}
                  variant='outline'
                >
                  Try on AI
                </Button>
              )}
              <Button onClick={() => handleClickTryOnManually(outfit)}>
                Try on Manually
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListSuggestOutfit
