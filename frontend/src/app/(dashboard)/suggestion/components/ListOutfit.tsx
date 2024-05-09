import { useGetClothes } from '@/services/clothes/queries'
import { CategoryID } from '@/types/product'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface ListOutfitProps {
  categoryID: CategoryID
}

const ListOutfit = ({ categoryID }: ListOutfitProps) => {
  const { ref, inView } = useInView()

  const {
    data: clothes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGetClothes(categoryID)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  return (
    <div className='w-full h-full px-8 pt-6 grid grid-cols-4 gap-4 overflow-auto scrollbar-hidden rounded-lg'>
      {clothes?.pages?.map((page) =>
        page?.result?.map((item) => (
          <div
            key={item._id}
            className='relative w-full h-[150px] rounded-lg cursor-pointer border-2'
          >
            <Image
              src={item.view.default}
              alt=''
              fill
              className='object-cover rounded-lg'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
        )),
      )}
      <div ref={ref}>Loading</div>
    </div>
  )
}

export default ListOutfit
