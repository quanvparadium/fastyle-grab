import { Clothes, TryOnOutfit } from '@/types/product'
import { create } from 'zustand'

interface TryOnOutfitState {
  tryOnOutfit: TryOnOutfit | null
  activeObject: Clothes | null
  isChangeViewBtnDisable: boolean

  setTryOnOutfit: (newTryOnOutfit: TryOnOutfit) => void
  setActiveObject: (data: Clothes) => void
  setIsChangeViewBtnDisable: (status: boolean) => void
}

const useTryOnOutfitStore = create<TryOnOutfitState>()((set) => ({
  tryOnOutfit: null,
  activeObject: null,
  isChangeViewBtnDisable: true,

  setTryOnOutfit: (newTryOnOutfit) => {
    return set({ tryOnOutfit: newTryOnOutfit })
  },
  setActiveObject: (data) => {
    return set({ activeObject: data })
  },
  setIsChangeViewBtnDisable: (status) => {
    return set({ isChangeViewBtnDisable: status })
  },
}))

export default useTryOnOutfitStore
