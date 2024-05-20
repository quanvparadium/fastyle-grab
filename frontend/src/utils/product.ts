import { CategoryID } from '@/types/product'

export const convertClothCategoryToCategoryID = (
  clothCategory: string,
): CategoryID => {
  let result: CategoryID = 'others'

  switch (clothCategory) {
    case 'Topwear':
      result = 'topwear'
      break
    case 'Headwear':
      result = 'headwear'
      break
    case 'Bottomwear':
      result = 'bottomwear'
      break
    case 'Dress':
      result = 'dress'
      break
    case 'Shoes':
      result = 'footwear'
      break
    case 'Sandal':
      result = 'footwear'
      break
    case 'Flip Flops':
      result = 'footwear'
      break
    default:
      result = 'others'
      break
  }

  return result
}
