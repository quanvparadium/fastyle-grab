import { Attribute, Toolbar } from '@/types/canvas'
import { Clothes } from '@/types/product'
import { RecommendOutfit } from '@/types/recommendOutfit'
import { create } from 'zustand'

interface TryOnOutfitManuallyState {
  tryOnOutfit: RecommendOutfit | null
  activeObject: Clothes | null
  activeTool: Toolbar
  activeObjectAttribute: Attribute | null

  setTryOnOutfit: (newTryOnOutfit: RecommendOutfit) => void
  setActiveObject: (data: Clothes | null) => void
  setActiveTool: (type: Toolbar) => void
  setActiveObjectAttribute: (data: Attribute | null) => void
}

const useTryOnOutfitManuallyStore = create<TryOnOutfitManuallyState>()(
  (set) => ({
    tryOnOutfit: null,
    activeObject: null,
    activeTool: 'move',
    activeObjectAttribute: null,

    setTryOnOutfit: (newTryOnOutfit) => {
      return set({ tryOnOutfit: newTryOnOutfit })
    },
    setActiveObject: (data) => {
      return set({ activeObject: data })
    },
    setActiveTool: (type) => {
      return set({ activeTool: type })
    },
    setActiveObjectAttribute: (data) => {
      // round data
      let tmp: Attribute | null = null

      if (data) {
        tmp = { ...data }
        for (const key in tmp) {
          const KEY = key as keyof Attribute
          tmp[KEY] = Math.floor(tmp[KEY] ?? 0)
        }
      }

      return set({ activeObjectAttribute: tmp })
    },
  }),
)

export default useTryOnOutfitManuallyStore
