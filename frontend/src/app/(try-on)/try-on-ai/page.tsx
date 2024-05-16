import Header from '@/app/(dashboard)/components/Header'
import SelectModel from '@/app/(try-on)/try-on-ai/components/SelectModel'
import { Button } from '@/components/ui/button'
import { Equal, Plus } from 'lucide-react'
import React from 'react'

const TryOnAI = () => {
  return (
    <div className='pt-6 px-[120px]'>
      <Header
        title='Fashion Suggestion'
        description='Discover your ideal outfit instantly with image or text-based search.'
        icon={'Lightbulb'}
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
            <img
              src='http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/Nike-Sahara-Team-India-Fanwear-Round-Neck-Jersey_2d27392cc7d7730e8fee0755fd41d30c_images.jpg'
              alt=''
              className='object-contain'
            />
          </div>

          <div className='h-[400px] flex items-center'>
            <Equal size={24} />
          </div>

          <div className='flex-1 h-[400px] border rounded'>
            <img
              src='http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/Nike-Sahara-Team-India-Fanwear-Round-Neck-Jersey_2d27392cc7d7730e8fee0755fd41d30c_images.jpg'
              alt=''
              className='object-contain'
            />
          </div>
        </div>

        <Button>Run</Button>
      </div>
    </div>
  )
}

export default TryOnAI
