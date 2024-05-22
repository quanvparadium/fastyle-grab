import { create } from 'zustand'

interface TryOnOutfitAIState {
  modelUrl: string | null
  clothesUrl: string | null
  resultUrl: string | null
  isLoadingResult: boolean
  progressPercent: number

  setModelUrl: (data: string | null) => void
  setClothesUrl: (data: string) => void
  setResultUrl: (data: string | null) => void
  setIsLoadingResult: (data: boolean) => void
  setProgressPercent: (data: number) => void
}

const useTryOnOutfitAIStore = create<TryOnOutfitAIState>()((set) => ({
  clothesUrl: null,
  modelUrl: null,
  resultUrl: null,
  isLoadingResult: false,
  progressPercent: 0,

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
  setProgressPercent: (data) => {
    return set({ progressPercent: data })
  },
}))

export default useTryOnOutfitAIStore
