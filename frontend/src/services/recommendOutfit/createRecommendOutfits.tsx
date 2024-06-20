<<<<<<< HEAD
import { useToast } from '@/components/ui/use-toast'
=======
>>>>>>> main
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
<<<<<<< HEAD
  const { toast } = useToast()
=======
>>>>>>> main

  return useMutation({
    mutationFn: (body: SelectedOutfitID) => createRecommendOutfits(body),
    onSuccess: (data) => {
      setRecommendOutfit(data.outfit)
    },
    onError: (error) => {
<<<<<<< HEAD
      toast({
        variant: 'destructive',
        description: `Something went wrong!`,
        duration: 4000,
      })
=======
      console.error('Error in fetchFashion:', error)
>>>>>>> main
    },
  })
}

export default useCreateRecommendOutfit
