'use client'

import Header from '@/app/(dashboard)/components/Header'
import SelectModel from '@/app/(try-on)/try-on-ai/components/SelectModel'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ROUTE } from '@/constants/route'
import useProgress from '@/hooks/useProgress'
import useCreateTryOnOutfitAI from '@/services/tryOnAI/createTryOnOutfitAI'
import useTryOnOutfitAIStore from '@/store/tryOnAIStore'
import { roundDecimalNumber } from '@/utils/number'
import { Equal, MoveLeft, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const TryOnAI = () => {
  const { isLoadingResult, clothesUrl, resultUrl, modelUrl } =
    useTryOnOutfitAIStore((state) => state)
  const { progressPercent } = useProgress(isLoadingResult, 42000, 96)
  const router = useRouter()

  const createTryOnOutfitAI = useCreateTryOnOutfitAI()

  return (
    <div className='pt-6 px-[120px]'>
      <Button
        className='absolute left-4 text-black hover:text-opacity-50'
        variant={'link'}
        onClick={() => router.push(ROUTE.SUGGESTION)}
      >
        <MoveLeft />
      </Button>
      <Header
        title='Fashion AI'
        description='Pick a model and outfit to discover if it suits you.'
        icon={'Shirt'}
      />

      <div className='flex flex-col gap-1'>
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

        {isLoadingResult ? (
          <div className='w-full h-10'>
            <span>Loading {roundDecimalNumber(progressPercent, 2)}%</span>
            <Progress
              value={progressPercent}
              className='w-full h-full rounded-md'
            />
          </div>
        ) : (
          <Button
            onClick={() => createTryOnOutfitAI.mutate()}
            disabled={!modelUrl || !clothesUrl || isLoadingResult}
          >
            Run
          </Button>
        )}
      </div>
    </div>
  )
}

export default TryOnAI
