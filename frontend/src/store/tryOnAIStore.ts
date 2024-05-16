import { create } from 'zustand'

interface TryOnOutfitAIState {
  modelUrl: string | null
  clothesUrl: string | null

  setModelUrl: (data: string) => void
  setClothesUrl: (data: string) => void
}

const useTryOnOutfitAIStore = create<TryOnOutfitAIState>()((set) => ({
  clothesUrl: null,
  modelUrl: null,

  setClothesUrl: (data) => {
    return set({ clothesUrl: data })
  },
  setModelUrl: (data) => {
    return set({ modelUrl: data })
  },
}))

export default useTryOnOutfitAIStore
