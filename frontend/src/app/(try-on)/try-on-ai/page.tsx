'use client'

import Header from '@/app/(dashboard)/components/Header'
import SelectModel from '@/app/(try-on)/try-on-ai/components/SelectModel'
import { Button } from '@/components/ui/button'
import useTryOnAI from '@/hooks/useTryOnAI'
import useTryOnOutfitAIStore from '@/store/tryOnAIStore'
import { Equal, Plus } from 'lucide-react'
import React from 'react'

const TryOnAI = () => {
  const { clothesUrl, modelUrl, resultUrl } = useTryOnOutfitAIStore(
    (state) => state,
  )
  const { createFashionMutation } = useTryOnAI()

  return (
    <div className='pt-6 px-[120px]'>
      <Header
        title='Fashion AI'
        description='Pick a model and outfit to discover if it suits you.'
        icon={'Shirt'}
      />

      <div className='flex flex-col gap-3'>
        <div className='flex items-start gap-10'>
          <SelectModel />

          <div className='h-[400px] flex items-center'>
            <Plus size={24} />
          </div>

          <div className='relative flex-1 h-[400px] border rounded'>
            <div className='absolute border-b border-r top-0 left-0 px-4 bg-white rounded'>
              <span className='text-[12px]'>Garment</span>
            </div>
            {clothesUrl && (
              <img src={clothesUrl} alt='Clothes' className='object-contain' />
            )}
          </div>

          <div className='h-[400px] flex items-center'>
            <Equal size={24} />
          </div>

          <div className='flex-1 h-[400px] border rounded'>
            {resultUrl && (
              <img src={resultUrl} alt='Result' className='object-contain' />
            )}
          </div>
        </div>

        <Button
          onClick={() => createFashionMutation.mutate()}
          disabled={!modelUrl || !clothesUrl}
        >
          Run
        </Button>
      </div>
    </div>
  )
}

export default TryOnAI
