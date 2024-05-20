import ItemDetailDialog from '@/app/(dashboard)/suggestion/components/ItemDetailDialog'
import { Skeleton } from '@/components/ui/skeleton'
import useSelectSuggestOutfit from '@/hooks/useSelectSuggestOutfit'
import { useGetClothes } from '@/services/clothes/useGetClothes'
import useRecommendOutfitStore from '@/store/recommendOutfitStore'
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
  const { searchValue } = useRecommendOutfitStore((state) => state)

  const {
    data: clothes,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetClothes(categoryID, searchValue)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  if (isLoading) {
    return (
      <ListOutfitLayout>
        <div className='px-8 grid grid-cols-5 gap-1 rounded-lg'>
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
        <div className='h-full px-8 flex justify-center items-center'>
          <span>No data</span>
        </div>
      </ListOutfitLayout>
    )
  }

  return (
    <ListOutfitLayout>
      <div className='px-8 grid grid-cols-5 gap-0.5'>
        {clothes?.pages?.map((page) =>
          page?.result?.map((item, index) => (
            <div
              key={item._id}
              className={`relative w-full h-[135px] cursor-pointer border-2 ${isSelectedProduct(categoryID, item._id) ? 'border-primary' : 'border-transparent'} group`}
              onClick={() => handleSelectProduct(categoryID, item)}
              // Là ảnh cuối cùng của page thì thêm ref vào để trigger inf loading
              ref={page.result.length === index + 1 ? ref : null}
            >
              <ItemDetailDialog categoryID={categoryID} clothes={item} />

              <div className='w-full h-full bg-[#EFEFEF] '>
                <Image
                  src={item.view.default}
                  alt=''
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>
            </div>
          )),
        )}

        {/* Loading */}
        {hasNextPage &&
          SKELETON_LOADING_ARRAY.map((item) => (
            <Skeleton key={item} className='w-full h-[135px]' />
          ))}
      </div>
    </ListOutfitLayout>
  )
}

export default ListOutfit

const ListOutfitLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='w-full h-full pb-2 overflow-auto'>{children}</div>
}
