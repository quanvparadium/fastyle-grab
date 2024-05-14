import { SelectedOutfit } from '@/types/product'
import { create } from 'zustand'

interface SuggestOutfitState {
  selectedOutfit: SelectedOutfit
  searchValue: string

  setSelectedOutfit: (newSelectedOutfit: SelectedOutfit) => void
  setSearchValue: (value: string) => void
}

const useSuggestOutfitStore = create<SuggestOutfitState>()((set) => ({
  selectedOutfit: {},
  searchValue: '',

  setSelectedOutfit: (newSelectedOutfit) => {
    return set({ selectedOutfit: newSelectedOutfit })
  },
  setSearchValue: (value) => {
    return set({ searchValue: value })
  },
}))

export default useSuggestOutfitStore
