import { CATEGORY_MAP } from '@/constants/product'

export type CategoryID = keyof typeof CATEGORY_MAP

type ViewOption = {
  default: string
  left?: string
  right?: string
  front?: string
  back?: string
  top?: string
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
