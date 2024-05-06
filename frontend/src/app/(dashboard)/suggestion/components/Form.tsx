'use client'

import { Button } from '@/components/ui/button'
import { categories } from '@/constants/product'
import { CategoryId, Product } from '@/types/product'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'

const Form = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId>('ao')
  const [images, setImages] = useState(fakeData['ao'])

  const handleSelectCategory = (categoryId: CategoryId) => {
    setSelectedCategoryId(categoryId)
  }

  const handleSelectImage = (product: Product) => {}

  return (
    <div className='h-[550px] border-2 shadow-sm rounded-2xl flex'>
      <div className='w-[750px] h-full border-r-2 flex flex-col'>
        <div className='h-[64px] flex justify-between border-b-2 px-8'>
          {categories.map((item) => (
            <div
              key={item.id}
              className={`w-full h-full flex justify-center items-center cursor-pointer ${selectedCategoryId === item.id && 'text-macaw border-b-[3px] border-macaw'}`}
              onClick={() => handleSelectCategory(item.id)}
            >
              <span className='font-medium'>{item.name}</span>
            </div>
          ))}
        </div>
        <div className='w-full h-full px-8 pt-6 grid grid-cols-5 gap-4 overflow-auto scrollbar-hidden rounded-lg'>
          {images.map((item) => (
            <div
              key={item.id}
              className='relative w-full h-[120px] rounded-lg cursor-pointer border-2'
              onClick={() => handleSelectImage(item)}
            >
              <img
                src={item.imgUrl}
                className='w-full h-full object-cover rounded-lg'
              />
              {
                (item.id === '1' || item.id === '3' || item.id === '5' || item.id === '9') &&
                <div className='border-[3px] border-blue-jay absolute w-full h-full bg-iguana/30 z-10 inset-0 rounded-lg'></div>
              }
            </div>
          ))}
        </div>
      </div>
      <div className='flex-1 flex flex-col px-4 py-4'>
        <div className='flex-1 flex flex-col gap-9 overflow-hidden pb-4'>
          <div className='w-full flex items-center justify-center'>
            <span className='text-[20px] font-medium'>Your Item</span>
          </div>
          {/* <div className='flex flex-col gap-4 overflow-auto scrollbar-hidden'>
            {Object.entries(previewForm).map(([key, value]) => (
              <div
                key={key}
                className='flex flex-col gap-2 border border-[#C5C6CC] p-2 rounded-lg'
              >
                <div className='flex justify-between items-center'>
                  <span>{value.categoryName}</span>
                  <Trash2 size={18} />
                </div>
                <div className='flex gap-4'>
                  {value.data.map((item) => (
                    <div
                      key={item.id}
                      className='w-[60px] h-[60px] rounded-lg cursor-pointer'
                    >
                      <img
                        src={item.imgUrl}
                        className='w-full h-full object-cover rounded-lg'
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div> */}
        </div>
        <div className='w-full flex justify-end'>
          <Button className='w-[130px]' hasShadow>Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default Form

const unsplashLink = 'https://source.unsplash.com/random' // Đường dẫn nguồn trên Unsplash

const fakeData = {
  ao: Array.from({ length: 30 }, (_, i) => ({
    id: String(i + 1),
    imgUrl: `${unsplashLink}?${i + 1}`,
  })),
  quan: Array.from({ length: 30 }, (_, i) => ({
    id: String(i + 31),
    imgUrl: `${unsplashLink}?${i + 31}`,
  })),
  giay: Array.from({ length: 30 }, (_, i) => ({
    id: String(i + 61),
    imgUrl: `${unsplashLink}?${i + 61}`,
  })),
  'trang-suc': Array.from({ length: 30 }, (_, i) => ({
    id: String(i + 91),
    imgUrl: `${unsplashLink}?${i + 91}`,
  })),
}
