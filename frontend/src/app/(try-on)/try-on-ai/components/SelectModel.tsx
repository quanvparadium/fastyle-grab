'use client'

import { modelData } from '@/constants/try-on-ai'
import useTryOnOutfitAIStore from '@/store/tryOnAIStore'
import { List } from 'lucide-react'
import React from 'react'

const SelectModel = () => {
  const { modelUrl, setModelUrl } = useTryOnOutfitAIStore((state) => state)

  return (
    <div className='flex-1 flex flex-col gap-6'>
      <div className='relative h-[400px] border rounded'>
        <div className='absolute border-b border-r top-0 left-0 px-4 bg-white rounded'>
          <span className='text-[12px]'>Model</span>
        </div>
        {modelUrl && <img src={modelUrl} alt='' className='object-contain' />}
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-1'>
          <List size={14} />
          <span className='text-[14px]'>Examples</span>
        </div>
        <div className='grid grid-cols-6 gap-4'>
          {modelData.map((item) => (
            <div
              key={item}
              className={`h-[70px] rounded-lg cursor-pointer border ${modelUrl === item ? 'border-macaw' : 'border-transparent'}`}
              onClick={() => setModelUrl(item)}
            >
              <img src={item} alt='' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SelectModel
