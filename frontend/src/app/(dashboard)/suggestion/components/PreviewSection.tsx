import PreviewChosen from '@/app/(dashboard)/suggestion/components/PreviewChosen'
import { Button } from '@/components/ui/button'
import React from 'react'

const PreviewSection = () => {
  return (
    <div className='flex-1 flex flex-col px-4 py-4'>
      <div className='flex-1 flex flex-col gap-9 overflow-hidden pb-4'>
        <div className='w-full flex items-center justify-center'>
          <span className='text-[18px]'>Your Item</span>
        </div>
        <PreviewChosen />
      </div>
      <div className='w-full flex justify-end'>
        <Button className='w-[130px]' hasShadow>
          Submit
        </Button>
      </div>
    </div>
  )
}

export default PreviewSection
