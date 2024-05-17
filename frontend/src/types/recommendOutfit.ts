import { CategoryID, Clothes } from '@/types/product'

type OriginalView = {
  default: string
  left: string | null
  right: string | null
  front: string | null
  back: string | null
  top: string | null
}

type OutfitCategoryView = {
  original: OriginalView
}

export type RecommendOutfit = {
  [key in CategoryID]?: OutfitCategoryView
}

export type SelectedOutfit = {
  [key in CategoryID]?: Clothes[]
}

export type SelectedOutfitID = {
  [key in CategoryID]?: string[]
}
