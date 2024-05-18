import { DialogContent } from '@/components/ui/dialog'
import useGetRetrievalOutfit from '@/services/retrievalOutfit/getRetrievalOutfit'
import { CategoryID, Clothes } from '@/types/product'
import React, { useState } from 'react'

interface ItemDetailDialogContentProps {
  clothes: Clothes
  categoryID: CategoryID
}

const ItemDetailDialogContent = ({
  clothes,
  categoryID,
}: ItemDetailDialogContentProps) => {
  const [currentImage, setCurrentImage] = useState<string>(clothes.view.default)

  const { data: retrievalClothes } = useGetRetrievalOutfit(
    categoryID,
    clothes._id,
  )

  return (
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
          {retrievalClothes?.result?.map((item) => (
            <div key={item?._id} className='flex flex-col cursor-pointer '>
              <div className={`w-full h-[138px] rounded-sm overflow-hidden`}>
                <img
                  src={item?.view?.default}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='flex flex-col'>
                <span>{item?.shop}</span>
                <span className='text-[14px]'>{item?.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DialogContent>
  )
}

export default ItemDetailDialogContent
