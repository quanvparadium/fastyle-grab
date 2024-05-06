import { CATEGORY_MAP } from '@/constants/product'

export type CategoryId = keyof CATEGORY_MAP

export type Product = {
  id: string
  imgUrl: string
}
