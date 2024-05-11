import { CATEGORY_MAP } from '@/constants/product'

export type CategoryID = keyof typeof CATEGORY_MAP

type ViewOption = {
  default: string
  left?: string | null
  right?: string | null
  front?: string | null
  back?: string | null
  top?: string | null
}

export type Clothes = {
  _id: string
  clothName: string
  clothCategory: string
  price: number
  discountedPrice: number
  colour: string
  brandName: string
  brandLogoImage: string
  view: ViewOption
}

export type SelectedOutfit = {
  [key in CategoryID]?: Clothes[]
}

export type TryOnOutfit = {
  [key in CategoryID]?: Clothes
}
