import { create } from 'zustand'

interface TryOnOutfitAIState {
  modelUrl: string | null
  clothesUrl: string | null
  resultUrl: string | null
  isLoadingResult: boolean
<<<<<<< HEAD
  progressPercent: number
=======
>>>>>>> main

  setModelUrl: (data: string | null) => void
  setClothesUrl: (data: string) => void
  setResultUrl: (data: string | null) => void
  setIsLoadingResult: (data: boolean) => void
<<<<<<< HEAD
  setProgressPercent: (data: number) => void
=======
>>>>>>> main
}

const useTryOnOutfitAIStore = create<TryOnOutfitAIState>()((set) => ({
  clothesUrl: null,
  modelUrl: null,
  resultUrl: null,
  isLoadingResult: false,
<<<<<<< HEAD
  progressPercent: 0,
=======
>>>>>>> main

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
<<<<<<< HEAD
  setProgressPercent: (data) => {
    return set({ progressPercent: data })
  },
=======
>>>>>>> main
}))

export default useTryOnOutfitAIStore
