import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import useGetRetrievalOutfit from '@/services/retrievalOutfit/getRetrievalOutfit'
import { CategoryID, Clothes } from '@/types/product'
import { TrimTextByLength } from '@/utils/string'
import PerfectScrollbar from 'react-perfect-scrollbar'
import React from 'react'

interface SuggestShopListProps {
  clothes: Clothes
  categoryID: CategoryID
}

const SKELETON_LOADING_ARRAY: number[] = [0, 1, 2]

const SuggestShopList = ({ categoryID, clothes }: SuggestShopListProps) => {
  const { data: retrievalClothes, isLoading } = useGetRetrievalOutfit(
    categoryID,
    clothes._id,
  )

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (isLoading) {
    return (
      <div className='grid grid-cols-3 gap-3 overflow-auto'>
        {SKELETON_LOADING_ARRAY.map((item) => (
          <Skeleton key={item} className='w-full h-[300px]' />
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
    <PerfectScrollbar>
      <div className='grid grid-cols-3 gap-3 overflow-auto scrollbar-hidden'>
        {retrievalClothes?.result?.map((item) => (
          <div
            key={item?._id}
            className='flex flex-col gap-1 rounded-md cursor-pointer group border border-transparent hover:border-border'
            onClick={() => openInNewTab(item?.referenceLink)}
          >
            <div className={`w-full h-[250px] rounded-md overflow-hidden`}>
              <img
                src={item?.view?.default}
                className='w-full h-full object-contain'
              />
            </div>

            <div className='relative'>
              <div className='flex flex-col'>
                <span className='text-[14px] font-medium'>{item?.shop}</span>
                <span className='text-[12px]'>
                  {TrimTextByLength(item?.clothName, 20)}
                </span>
                <span className='text-[14px] font-medium'>${item?.price}</span>
              </div>

              <div className='absolute inset-0 slide-up bg-white w-full h-full hidden group-hover:flex justify-center items-center px-4'>
                <Button
                  className='w-full p-0 border-primary text-primary hover:text-primary'
                  variant='outline'
                  onClick={() => openInNewTab(item?.referenceLink)}
                >
                  Buy now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PerfectScrollbar>
  )
}

export default SuggestShopList
