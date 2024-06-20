import SuggestShopList from '@/app/(dashboard)/suggestion/components/SuggestShopList'
import { DialogContent } from '@/components/ui/dialog'
import { CategoryID, Clothes } from '@/types/product'
import React, { useState } from 'react'
<<<<<<< HEAD
import { LazyLoadImage } from 'react-lazy-load-image-component'
=======
>>>>>>> main

interface ItemDetailDialogContentProps {
  clothes: Clothes
  categoryID: CategoryID
}

const ItemDetailDialogContent = ({
  clothes,
  categoryID,
}: ItemDetailDialogContentProps) => {
  const [currentImage, setCurrentImage] = useState<string>(clothes.view.default)

  return (
    <DialogContent
      className='flex h-[600px]'
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
<<<<<<< HEAD
                  className={`w-full h-[56px] rounded-sm overflow-hidden cursor-pointer shadow-md ${currentImage === imgUrl ? 'opacity-100' : 'opacity-50'}`}
                  onClick={() => setCurrentImage(imgUrl)}
                >
                  <LazyLoadImage effect='blur' src={imgUrl} />
=======
                  className={`w-full rounded-sm overflow-hidden cursor-pointer shadow-md ${currentImage === imgUrl ? 'opacity-100' : 'opacity-50'}`}
                  onClick={() => setCurrentImage(imgUrl)}
                >
                  <img src={imgUrl} />
>>>>>>> main
                </div>
              )
            }
          })}
        </div>

        <div className='w-[400px] rounded overflow-hidden shadow'>
<<<<<<< HEAD
          <LazyLoadImage src={currentImage} effect='blur' alt='' />
=======
          <img src={currentImage} alt='' />
>>>>>>> main
        </div>
      </div>

      <div className='w-[600px] flex flex-col gap-4'>
        <span className='text-[18px] font-medium'>SHOP IT</span>

        <SuggestShopList categoryID={categoryID} clothes={clothes} />
      </div>
    </DialogContent>
  )
}

export default ItemDetailDialogContent
