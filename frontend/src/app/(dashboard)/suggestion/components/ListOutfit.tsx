import { Skeleton } from '@/components/ui/skeleton'
import useSelectSuggestOutfit from '@/hooks/useSelectSuggestOutfit'
import { useGetClothes } from '@/services/clothes/queries'
import { CategoryID } from '@/types/product'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface ListOutfitProps {
  categoryID: CategoryID
}

const SKELETON_LOADING_ARRAY: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const ListOutfit = ({ categoryID }: ListOutfitProps) => {
  const { ref, inView } = useInView()
  const { handleSelectProduct, isSelectedProduct } = useSelectSuggestOutfit()

  const {
    data: clothes,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetClothes(categoryID)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  if (isLoading) {
    return (
      <ListOutfitLayout>
        <div className='px-8 pt-6 grid grid-cols-5 gap-1 rounded-lg'>
          {SKELETON_LOADING_ARRAY.map((item) => (
            <Skeleton key={item} className='w-full h-[150px]' />
          ))}
        </div>
      </ListOutfitLayout>
    )
  }

  if (!clothes) {
    return (
      <ListOutfitLayout>
        <div className='h-full px-8 pt-6 flex justify-center items-center'>
          <span>No data</span>
        </div>
      </ListOutfitLayout>
    )
  }

  return (
    <ListOutfitLayout>
      <div className='px-8 pt-6 grid grid-cols-5 gap-1 rounded-lg'>
        {clothes?.pages?.map((page) =>
          page?.result?.map((item, index) => (
            <div
              key={item._id}
              className={`relative w-full h-[130px] cursor-pointer border shadow-sm bg-[#EFEFEF] ${isSelectedProduct(categoryID, item._id) ? 'border-macaw' : 'border-transparent'}`}
              onClick={() => handleSelectProduct(categoryID, item)}
              // Là ảnh cuối cùng của page thì thêm ref vào để trigger inf loading
              ref={page.result.length === index + 1 ? ref : null}
            >
              <Image
                src={item.view.default}
                alt=''
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
          )),
        )}

        {/* Loading */}
        {hasNextPage &&
          SKELETON_LOADING_ARRAY.map((item) => (
            <Skeleton key={item} className='w-full h-[150px]' />
          ))}
      </div>
    </ListOutfitLayout>
  )
}

export default ListOutfit

const ListOutfitLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full h-full pb-2 overflow-auto flex flex-col gap-2'>
      {children}
    </div>
  )
}
