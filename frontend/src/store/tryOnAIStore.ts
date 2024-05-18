import { create } from 'zustand'

interface TryOnOutfitAIState {
  modelUrl: string | null
  clothesUrl: string | null
  resultUrl: string | null
  isLoadingResult: boolean

  setModelUrl: (data: string | null) => void
  setClothesUrl: (data: string) => void
  setResultUrl: (data: string | null) => void
  setIsLoadingResult: (data: boolean) => void
}

const useTryOnOutfitAIStore = create<TryOnOutfitAIState>()((set) => ({
  clothesUrl: null,
  modelUrl: null,
  resultUrl: null,
  isLoadingResult: false,

  setClothesUrl: (data) => {
    return set({ clothesUrl: data })
  },
  setModelUrl: (data) => {
    return set({ modelUrl: data })
  },
  setResultUrl: (data) => {
    return set({ resultUrl: data })
  },
  setIsLoadingResult: (data) => {
    return set({ isLoadingResult: data })
  },
}))

export default useTryOnOutfitAIStore
