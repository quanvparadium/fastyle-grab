import { TryOnOutfit } from "@/types/product"

// Hàm tìm Clothes trong TryOnOutfit dựa trên ClothesID
export const findClothesInTryOnById = (tryOnOutfit: TryOnOutfit, clothesId: string) => {
  // Chuyển đổi các giá trị của TryOnOutfit thành một mảng
  const outfits = Object.values(tryOnOutfit)

  // Sử dụng phương thức find để tìm Clothes có id bằng clothesId
  return outfits.find((clothes) => clothes?._id === clothesId)
}