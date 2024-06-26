import PreviewChosen from '@/app/(dashboard)/suggestion/components/PreviewChosen'
import Spinner from '@/components/global/Spinner'
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
<<<<<<< HEAD
    <div className='step-3 flex-1 flex flex-col px-4 py-4'>
=======
    <div className='flex-1 flex flex-col px-4 py-4'>
>>>>>>> main
      <div className='flex-1 flex flex-col gap-4 overflow-hidden pb-4'>
        <div className='w-full flex items-center justify-center'>
          <span className='text-[18px] font-medium'>YOUR ITEM</span>
        </div>

        <PreviewChosen />
      </div>

      <div className='w-full flex justify-end'>
        <Button
<<<<<<< HEAD
          className='step-4 w-[130px]'
=======
          className='step-3 w-[130px]'
>>>>>>> main
          onClick={handleCreateOutfit}
          disabled={
            Object.keys(selectedOutfit).length === 0 ||
            createRecommendOutfit.isPending
          }
        >
<<<<<<< HEAD
          {createRecommendOutfit.isPending ? (
            <div className='flex gap-2 items-center'>
              <Spinner />
              <span>Loading</span>
            </div>
          ) : (
            'Submit'
          )}
=======
          {createRecommendOutfit.isPending ? 'Loading...' : 'Submit'}
>>>>>>> main
        </Button>
      </div>
    </div>
  )
}

export default PreviewSection
