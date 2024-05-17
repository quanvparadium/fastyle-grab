import PreviewChosen from '@/app/(dashboard)/suggestion/components/PreviewChosen'
import { Button } from '@/components/ui/button'
import useSelectSuggestOutfit from '@/hooks/useSelectSuggestOutfit'
import useCreateRecommendOutfit from '@/services/recommendOutfit/createRecommendOutfits'
import React from 'react'

const PreviewSection = () => {
  const createRecommendOutfit = useCreateRecommendOutfit()

  const { selectedOutfit, handleConvertSelectedOutfitToID } =
    useSelectSuggestOutfit()

  const handleCreateOutfit = () => {
    const body = handleConvertSelectedOutfitToID()
    createRecommendOutfit.mutate(body)
  }

  return (
    <div className='flex-1 flex flex-col px-4 py-4'>
      <div className='flex-1 flex flex-col gap-9 overflow-hidden pb-4'>
        <div className='w-full flex items-center justify-center'>
          <span className='text-[18px]'>Your Item</span>
        </div>
        <PreviewChosen />
      </div>

      <div className='w-full flex justify-end'>
        <Button
          className='step-4 w-[130px]'
          hasShadow
          onClick={handleCreateOutfit}
          disabled={Object.keys(selectedOutfit).length === 0}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default PreviewSection
