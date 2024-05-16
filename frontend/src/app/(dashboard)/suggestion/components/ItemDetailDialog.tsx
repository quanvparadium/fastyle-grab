import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Clothes } from '@/types/product'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ItemDetailDialogProps {
  clothes: Clothes
}

const ItemDetailDialog = ({ clothes }: ItemDetailDialogProps) => {
  const [currentImage, setCurrentImage] = useState<string>(clothes.view.default)

  return (
    <Dialog>
      <DialogTrigger
        onClick={(e) => {
          e.stopPropagation()
        }}
        className='absolute right-0 z-20 hidden group-hover:flex'
      >
        <Button className='p-0 w-8 h-8' variant={'ghost'}>
          <ArrowUpRight size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className='flex'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className='w-fit flex gap-3'>
          <div className='w-11 h-full flex flex-col gap-4'>
            {Object.entries(clothes.view).map(([viewOption, imgUrl]) => {
              if (imgUrl) {
                return (
                  <div
                    key={viewOption}
                    className={`w-full rounded-sm overflow-hidden cursor-pointer shadow-md ${currentImage === imgUrl ? 'opacity-100' : 'opacity-50'}`}
                    onClick={() => setCurrentImage(imgUrl)}
                  >
                    <img src={imgUrl} />
                  </div>
                )
              }
            })}
          </div>

          <div className='w-[400px] h-[530px] rounded overflow-hidden shadow'>
            <img src={currentImage} alt='' />
          </div>
        </div>

        <div className='w-[600px] flex flex-col gap-4'>
          <span className='text-[20px] font-medium'>Shop It</span>
          <div className='grid grid-cols-4 gap-4'>
            {[0, 1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className='flex flex-col cursor-pointer '>
                <div className={`w-full h-[138px] rounded-sm overflow-hidden`}>
                  <img
                    src={clothes.view.default}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex flex-col'>
                  <span>Shopee</span>
                  <span className='text-[14px]'>$5.03</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ItemDetailDialog
