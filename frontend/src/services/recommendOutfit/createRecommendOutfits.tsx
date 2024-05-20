import { useToast } from '@/components/ui/use-toast'
import axiosInstance from '@/lib/axios'
import useRecommendOutfitStore from '@/store/recommendOutfitStore'
import { RecommendOutfit, SelectedOutfitID } from '@/types/recommendOutfit'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type Response = {
  message: string
  outfit: RecommendOutfit[]
}

const createRecommendOutfits = async (body: SelectedOutfitID) => {
  const response: AxiosResponse<Response> = await axiosInstance.post(
    '/recommend',
    body,
  )

  return response.data
}

const useCreateRecommendOutfit = () => {
  const { setRecommendOutfit } = useRecommendOutfitStore((state) => state)
  const { toast } = useToast()

  return useMutation({
    mutationFn: (body: SelectedOutfitID) => createRecommendOutfits(body),
    onSuccess: (data) => {
      setRecommendOutfit(data.outfit)
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: `Something went wrong: ${error}`,
        duration: 4000,
      })
    },
  })
}

export default useCreateRecommendOutfit
