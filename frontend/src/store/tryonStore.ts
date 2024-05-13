import { TryOnOutfit } from '@/types/product'
import { create } from 'zustand'

interface TryOnOutfitState {
  tryOnOutfit: TryOnOutfit | null
  isChangeViewBtnDisable: boolean

  setTryOnOutfit: (newTryOnOutfit: TryOnOutfit) => void
  setIsChangeViewBtnDisable: (status: boolean) => void
}

const useTryOnOutfitStore = create<TryOnOutfitState>()((set) => ({
  tryOnOutfit: null,
  isChangeViewBtnDisable: true,

  setTryOnOutfit: (newTryOnOutfit) => {
    return set({ tryOnOutfit: newTryOnOutfit })
  },
  setIsChangeViewBtnDisable: (status) => {
    return set({ isChangeViewBtnDisable: status })
  },
}))

export default useTryOnOutfitStore
