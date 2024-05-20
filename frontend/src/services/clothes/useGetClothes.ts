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
  search: string
}

const LIMIT: number = 20

const fetchClothes = async ({
  categoryId,
  limit = LIMIT,
  offset = 0,
  search,
}: Params) => {
  const response = await axiosInstance.post(
    `/clothes/${categoryId}?limit=${limit}&offset=${offset}`,
    { search },
  )

  return response.data
}

export const useGetClothes = (categoryId: CategoryID, searchValue: string) => {
  return useInfiniteQuery<ResponseGetClothes>({
    queryKey: [QUERY_KEY.CLOTHES, categoryId, searchValue],
    queryFn: ({ pageParam }) => {
      return fetchClothes({
        categoryId,
        offset: pageParam as number,
        search: searchValue,
      })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset =
        lastPage.result.length === LIMIT ? allPages.length * LIMIT : undefined
      return nextOffset
    },
  })
}
