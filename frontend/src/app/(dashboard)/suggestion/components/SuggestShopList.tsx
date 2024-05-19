import { Skeleton } from '@/components/ui/skeleton'
import useGetRetrievalOutfit from '@/services/retrievalOutfit/getRetrievalOutfit'
import { CategoryID, Clothes } from '@/types/product'
import Link from 'next/link'
import React from 'react'

interface SuggestShopListProps {
  clothes: Clothes
  categoryID: CategoryID
}

const SKELETON_LOADING_ARRAY: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const SuggestShopList = ({ categoryID, clothes }: SuggestShopListProps) => {
  const { data: retrievalClothes, isLoading } = useGetRetrievalOutfit(
    categoryID,
    clothes._id,
  )

  if (isLoading) {
    return (
      <div className='grid grid-cols-4 gap-4 overflow-auto'>
        {SKELETON_LOADING_ARRAY.map((item) => (
          <Skeleton key={item} className='w-full h-[138px]' />
        ))}
      </div>
    )
  }

  if (!retrievalClothes?.result.length) {
    return (
      <div className='h-full flex justify-center items-center'>
        <span>No data</span>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-4 gap-4 overflow-auto'>
      {retrievalClothes?.result?.map((item) => (
        <Link key={item?._id} href={item?.referenceLink} target='_blank'>
          <div className='flex flex-col cursor-pointer '>
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
        </Link>
      ))}
    </div>
  )
}

export default SuggestShopList
