import { Toolbar } from '@/types/canvas'
import { Clothes, TryOnOutfit } from '@/types/product'
import { create } from 'zustand'

interface TryOnOutfitManuallyState {
  tryOnOutfit: TryOnOutfit | null
  activeObject: Clothes | null
  activeTool: Toolbar

  setTryOnOutfit: (newTryOnOutfit: TryOnOutfit) => void
  setActiveObject: (data: Clothes) => void
  setActiveTool: (type: Toolbar) => void
}

const useTryOnOutfitManuallyStore = create<TryOnOutfitManuallyState>()((set) => ({
  tryOnOutfit: null,
  activeObject: null,
  activeTool: 'move',

  setTryOnOutfit: (newTryOnOutfit) => {
    return set({ tryOnOutfit: newTryOnOutfit })
  },
  setActiveObject: (data) => {
    return set({ activeObject: data })
  },
  setActiveTool: (type) => {
    return set({ activeTool: type })
  },
}))

export default useTryOnOutfitManuallyStore
