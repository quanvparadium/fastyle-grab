import { QUERY_KEY } from '@/constants/query'
import axiosInstance from '@/lib/axios'
import { CategoryID, Clothes } from '@/types/product'
import { useInfiniteQuery } from '@tanstack/react-query'

export interface ResponseGetClothes {
  result: Clothes[]
}

interface Params {
  categoryId: CategoryID
  limit?: number
  offset?: number
}

const LIMIT: number = 16

const fetchClothes = async ({
  categoryId,
  limit = LIMIT,
  offset = 0,
}: Params) => {
  const response = await axiosInstance.get(
    `/clothes/${categoryId}?limit=${limit}&offset=${offset}`,
  )
  return response.data
}

export const useGetClothes = (categoryId: CategoryID) => {
  return useInfiniteQuery<ResponseGetClothes>({
    queryKey: [QUERY_KEY.CLOTHES, categoryId],
    queryFn: ({ pageParam }) => {
      return fetchClothes({ categoryId, offset: pageParam as number })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset =
        lastPage.result.length === LIMIT ? allPages.length * LIMIT : undefined
      return nextOffset
    },
  })
}
