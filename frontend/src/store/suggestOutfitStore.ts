import { SelectedOutfit } from '@/types/product'
import { create } from 'zustand'

interface SuggestOutfitState {
  selectedOutfit: SelectedOutfit
  setSelectedOutfit: (newSelectedOutfit: SelectedOutfit) => void
}

const useSuggestOutfitStore = create<SuggestOutfitState>()((set) => ({
  selectedOutfit: {},
  setSelectedOutfit: (newSelectedOutfit) => {
    return set({ selectedOutfit: newSelectedOutfit })
  },
}))

export default useSuggestOutfitStore
