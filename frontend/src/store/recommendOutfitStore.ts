import { RecommendOutfit, SelectedOutfit } from '@/types/recommendOutfit'
import { create } from 'zustand'

interface RecommendOutfitState {
  recommendOutfit: RecommendOutfit[]
  selectedOutfit: SelectedOutfit
  searchValue: string

  setRecommendOutfit: (data: RecommendOutfit[]) => void
  setSelectedOutfit: (data: SelectedOutfit) => void
  setSearchValue: (value: string) => void
}

const useRecommendOutfitStore = create<RecommendOutfitState>()((set) => ({
  recommendOutfit: [],
  selectedOutfit: {},
  searchValue: '',

  setRecommendOutfit: (data) => {
    return set({ recommendOutfit: data })
  },
  setSelectedOutfit: (data) => {
    return set({ selectedOutfit: data })
  },
  setSearchValue: (value) => {
    return set({ searchValue: value })
  },
}))

export default useRecommendOutfitStore
