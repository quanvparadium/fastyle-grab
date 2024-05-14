'use client'

import PreviewSection from '@/app/(dashboard)/suggestion/components/PreviewSection'
import SelectOutfitSection from '@/app/(dashboard)/suggestion/components/SelectOutfitSection'

const Form = () => {
  return (
    <div className='h-[550px] border-2 shadow-sm rounded-2xl flex'>
      <SelectOutfitSection />

      <PreviewSection />
    </div>
  )
}

export default Form
