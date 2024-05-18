import { Toolbar } from '@/types/canvas'
import { OutfitCategoryView, RecommendOutfit } from '@/types/recommendOutfit'
import { create } from 'zustand'

interface TryOnOutfitManuallyState {
  tryOnOutfit: RecommendOutfit | null
  activeObject: OutfitCategoryView | null
  activeTool: Toolbar

  setTryOnOutfit: (newTryOnOutfit: RecommendOutfit) => void
  setActiveObject: (data: OutfitCategoryView | null) => void
  setActiveTool: (type: Toolbar) => void
}

const useTryOnOutfitManuallyStore = create<TryOnOutfitManuallyState>()(
  (set) => ({
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
  }),
)

export default useTryOnOutfitManuallyStore
