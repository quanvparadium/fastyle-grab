import { QUERY_KEY } from '@/constants/query'
import axiosInstance from '@/lib/axios'
import { CategoryID, RetrievalOutfit } from '@/types/product'
import { useQuery } from '@tanstack/react-query'

type RetrievalOutfitResponse = {
  message: string
  result: RetrievalOutfit[]
}

type Params = {
  categoryID: CategoryID
  clothesID: string
}

const fetchRetrievalOutfit = async ({ categoryID, clothesID }: Params) => {
  const response = await axiosInstance.get(
    `/retrieval/topwear/6636886305fb6be628561d75`,
  )

  return response.data
}

const useGetRetrievalOutfit = (categoryID: CategoryID, clothesID: string) => {
  return useQuery<RetrievalOutfitResponse>({
    queryKey: [QUERY_KEY.RETRIEVAL_OUTFIT, categoryID, clothesID],
    queryFn: () => fetchRetrievalOutfit({ categoryID, clothesID }),
    enabled: !!categoryID && !!clothesID,
  })
}

export default useGetRetrievalOutfit
