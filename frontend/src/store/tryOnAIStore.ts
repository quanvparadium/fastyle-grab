import { create } from 'zustand'

interface TryOnOutfitAIState {
  modelUrl: string | null
  clothesUrl: string | null
  resultUrl: string | null

  setModelUrl: (data: string | null) => void
  setClothesUrl: (data: string) => void
  setResultUrl: (data: string) => void
}

const useTryOnOutfitAIStore = create<TryOnOutfitAIState>()((set) => ({
  clothesUrl: null,
  modelUrl: null,
  resultUrl: null,

  setClothesUrl: (data) => {
    return set({ clothesUrl: data })
  },
  setModelUrl: (data) => {
    return set({ modelUrl: data })
  },
  setResultUrl: (data) => {
    return set({ resultUrl: data })
  },
}))

export default useTryOnOutfitAIStore
