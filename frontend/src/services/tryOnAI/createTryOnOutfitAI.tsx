import { useToast } from '@/components/ui/use-toast'
import axiosInstance from '@/lib/axios'
import useTryOnOutfitAIStore from '@/store/tryOnAIStore'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type FashionResponse = {
  message: string
  image_url: string
}

const fetchTryOn = async ({
  clothesUrl,
  modelUrl,
}: {
  clothesUrl: string
  modelUrl: string
}) => {
  const response: AxiosResponse<FashionResponse> = await axiosInstance.post(
    '/try-on',
    {
      clothUrl: clothesUrl,
      base_url: modelUrl,
      clothId: Math.floor(Math.random() * (5000 - 1 + 1)) + 1,
    },
  )

  console.log('fetchFashion', response.data)
  return response.data
}

const useCreateTryOnOutfitAI = () => {
  const { setIsLoadingResult, modelUrl, clothesUrl, setResultUrl } =
    useTryOnOutfitAIStore((state) => state)
  const { toast } = useToast()

  return useMutation({
    mutationFn: () =>
      fetchTryOn({
        clothesUrl: clothesUrl as string,
        modelUrl: modelUrl as string,
      }),
    onMutate: () => {
      setIsLoadingResult(true)
    },
    onSuccess: async (data) => {
      setResultUrl(data?.image_url)
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: `Something went wrong!`,
        duration: 4000,
      })
    },
    onSettled: () => {
      setIsLoadingResult(false)
    },
  })
}

export default useCreateTryOnOutfitAI
