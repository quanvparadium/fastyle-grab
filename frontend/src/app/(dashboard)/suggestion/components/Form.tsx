'use client'

import PreviewChosen from '@/app/(dashboard)/suggestion/components/PreviewChosen'
import SelectOutfitSection from '@/app/(dashboard)/suggestion/components/SelectOutfitSection'
import { Button } from '@/components/ui/button'

const Form = () => {
  return (
    <div className='h-[550px] border-2 shadow-sm rounded-2xl flex'>
      <SelectOutfitSection />

      <div className='flex-1 flex flex-col px-4 py-4'>
        <div className='flex-1 flex flex-col gap-9 overflow-hidden pb-4'>
          <div className='w-full flex items-center justify-center'>
            <span className='text-[20px] font-medium'>Your Item</span>
          </div>
          <PreviewChosen />
        </div>
        <div className='w-full flex justify-end'>
          <Button className='w-[130px]' hasShadow>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Form
