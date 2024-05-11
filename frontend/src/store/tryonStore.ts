import { TryOnOutfit } from '@/types/product'
import { create } from 'zustand'

interface TryOnOutfitState {
  tryOnOutfit: TryOnOutfit | null
  setTryOnOutfit: (newTryOnOutfit: TryOnOutfit) => void
}

const useTryOnOutfitStore = create<TryOnOutfitState>()((set) => ({
  tryOnOutfit: null,
  setTryOnOutfit: (newTryOnOutfit) => {
    return set({ tryOnOutfit: newTryOnOutfit })
  },
}))

export default useTryOnOutfitStore
