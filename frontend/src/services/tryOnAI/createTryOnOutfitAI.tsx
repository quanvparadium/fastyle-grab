import { API_KEY, FASHION_ENDPOINT, fashionParams } from '@/constants/try-on-ai'
import useTryOnOutfitAIStore from '@/store/tryOnAIStore'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'

type FashionResponse = {
  status: 'processing'
  fetch_result: string
}

const fetchFashion = async ({
  clothesUrl,
  modelUrl,
}: {
  clothesUrl: string
  modelUrl: string
}) => {
  const response: AxiosResponse<FashionResponse> = await axios.post(
    FASHION_ENDPOINT,
    {
      ...fashionParams,
      cloth_image: clothesUrl,
      init_image: modelUrl,
    },
  )

  console.log('fetchFashion', response.data)
  return response.data
}

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
        clothesUrl: clothesUrl as string,
        modelUrl: modelUrl as string,
      }),
    onMutate: () => {
      setIsLoadingResult(true)
    },
    onSuccess: async (data) => {
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
    },
  })
}

export default useCreateTryOnOutfitAI
