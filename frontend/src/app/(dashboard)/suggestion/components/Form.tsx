'use client'

import PreviewSection from '@/app/(dashboard)/suggestion/components/PreviewSection'
import SelectOutfitSection from '@/app/(dashboard)/suggestion/components/SelectOutfitSection'

const Form = () => {
  return (
    <div className='h-[550px] border rounded-[5px] flex'>
      <SelectOutfitSection />

      <PreviewSection />
    </div>
  )
}

export default Form
