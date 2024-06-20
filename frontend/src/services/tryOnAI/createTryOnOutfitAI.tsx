<<<<<<< HEAD
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
=======
import { API_KEY, FASHION_ENDPOINT, fashionParams } from '@/constants/try-on-ai'
import useTryOnOutfitAIStore from '@/store/tryOnAIStore'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'

type FashionResponse = {
  status: 'processing'
  fetch_result: string
}

const fetchFashion = async ({
>>>>>>> main
  clothesUrl,
  modelUrl,
}: {
  clothesUrl: string
  modelUrl: string
}) => {
<<<<<<< HEAD
  const response: AxiosResponse<FashionResponse> = await axiosInstance.post(
    '/try-on',
    {
      clothUrl: clothesUrl,
      base_url: modelUrl,
      clothId: Math.floor(Math.random() * (5000 - 1 + 1)) + 1,
=======
  const response: AxiosResponse<FashionResponse> = await axios.post(
    FASHION_ENDPOINT,
    {
      ...fashionParams,
      cloth_image: clothesUrl,
      init_image: modelUrl,
>>>>>>> main
    },
  )

  console.log('fetchFashion', response.data)
  return response.data
}

<<<<<<< HEAD
const useCreateTryOnOutfitAI = () => {
  const {
    setIsLoadingResult,
    modelUrl,
    clothesUrl,
    setResultUrl,
    setProgressPercent,
  } = useTryOnOutfitAIStore((state) => state)
  const { toast } = useToast()

  return useMutation({
    mutationFn: () =>
      fetchTryOn({
=======
const fetchResult = async (fetchUrl: string) => {
  const response = await axios.post(fetchUrl, {
    key: API_KEY,
  })

  console.log('fetchResult', response.data)
  return response.data
}

const fetchWithRetry = async (
  fetchUrl: string,
  retriesLeft: number = 6,
): Promise<any> => {
  const response = await fetchResult(fetchUrl)

  if (response?.status === 'success') {
    return response
  } else if (response.status === 'processing' && retriesLeft > 0) {
    await new Promise((resolve) => setTimeout(resolve, 10000)) // Đợi 5 giây trước khi fetch lại
    return fetchWithRetry(fetchUrl, retriesLeft - 1)
  } else {
    throw new Error('Failed to fetch result or status is not success.')
  }
}

const useCreateTryOnOutfitAI = () => {
  const { setIsLoadingResult, modelUrl, clothesUrl, setResultUrl } =
    useTryOnOutfitAIStore((state) => state)

  return useMutation({
    mutationFn: () =>
      fetchFashion({
>>>>>>> main
        clothesUrl: clothesUrl as string,
        modelUrl: modelUrl as string,
      }),
    onMutate: () => {
      setIsLoadingResult(true)
    },
    onSuccess: async (data) => {
<<<<<<< HEAD
      setResultUrl(data?.image_url)
      setProgressPercent(100)
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
      setProgressPercent(0)
=======
      if (data && data.fetch_result) {
        try {
          const response = await fetchWithRetry(data.fetch_result)
          console.log('result', response)
          setResultUrl(response?.output[0])
        } catch (error) {
          console.error('Error in fetchResult:', error)
        }
      }
    },
    onError: (error) => {
      console.error('Error in fetchFashion:', error)
    },
    onSettled: () => {
      setIsLoadingResult(false)
>>>>>>> main
    },
  })
}

export default useCreateTryOnOutfitAI
