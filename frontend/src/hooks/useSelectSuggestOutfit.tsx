import { useToast } from '@/components/ui/use-toast'
import useRecommendOutfitStore from '@/store/recommendOutfitStore'
import { CategoryID, Clothes } from '@/types/product'
import { SelectedOutfitID } from '@/types/recommendOutfit'

const LIMIT_SELECTION_PER_CATEGORY: number = 4

const useSelectSuggestOutfit = () => {
  const { toast } = useToast()

  const { selectedOutfit, setSelectedOutfit } = useRecommendOutfitStore(
    (state) => state,
  )

  const handleSelectProduct = (categoryID: CategoryID, clothes: Clothes) => {
    // Đã được chọn rồi, bấm lần nữa sẽ xóa chọn
    if (isSelectedProduct(categoryID, clothes._id)) {
      handleRemoveProduct(categoryID, clothes._id)

      return
    }

    // Nếu cate này đã chọn quá LIMIT
    if (isExceedLimit(categoryID)) {
      toast({
        variant: 'destructive',
        description: `Select up to ${LIMIT_SELECTION_PER_CATEGORY} images only. Deselect one to add another.`,
        duration: 4000,
      })

      return
    }

<<<<<<< HEAD
    if (selectedOutfit.hasOwnProperty(categoryID)) {
      const newSelectedOutfit = {
        ...selectedOutfit,
      }
      newSelectedOutfit[categoryID]?.push(clothes)
      setSelectedOutfit(newSelectedOutfit)
    } else {
      const newSelectedOutfit = {
        [categoryID]: [clothes],
        ...selectedOutfit,
      }
      setSelectedOutfit(newSelectedOutfit)
    }
=======
    const cloneSelectedOutfit = { ...selectedOutfit }

    if (cloneSelectedOutfit.hasOwnProperty(categoryID)) {
      cloneSelectedOutfit[categoryID]?.push(clothes)
    } else {
      cloneSelectedOutfit[categoryID] = [clothes]
    }

    setSelectedOutfit(cloneSelectedOutfit)
>>>>>>> main
  }

  const isExceedLimit = (categoryID: CategoryID) => {
    if (
      selectedOutfit[categoryID] &&
      (selectedOutfit[categoryID]?.length as number) >
        LIMIT_SELECTION_PER_CATEGORY - 1
    )
      return true

    return false
  }

  const handleRemoveProduct = (categoryID: CategoryID, productID: string) => {
    const cloneSelectedOutfit = { ...selectedOutfit }

    const productIndex: number = cloneSelectedOutfit[categoryID]?.findIndex(
      (item) => item._id === productID,
    ) as number

    if (productIndex !== -1 && cloneSelectedOutfit[categoryID]) {
      cloneSelectedOutfit[categoryID]?.splice(productIndex, 1)

      // Kiểm tra nếu mảng rỗng sau khi xóa phần tử thì xóa luôn key
      if (cloneSelectedOutfit[categoryID]?.length === 0) {
        delete cloneSelectedOutfit[categoryID]
      }

      setSelectedOutfit(cloneSelectedOutfit)
    }
  }

  const handleRemoveAllProducts = (categoryID: CategoryID) => {
    const cloneSelectedOutfit = { ...selectedOutfit }
    delete cloneSelectedOutfit[categoryID]
    setSelectedOutfit(cloneSelectedOutfit)
  }

  const isSelectedProduct = (categoryID: CategoryID, productID: string) => {
    return selectedOutfit[categoryID]?.some((item) => item._id === productID)
  }

  // Chuyển selected outfit sang format request của api recommend
  const handleConvertSelectedOutfitToID = () => {
    const result: SelectedOutfitID = {}
    const cloneSelectedOutfit = { ...selectedOutfit }

    for (const categoryid in cloneSelectedOutfit) {
      const categoryID = categoryid as CategoryID

      if (cloneSelectedOutfit.hasOwnProperty(categoryID)) {
        const clothesArray = cloneSelectedOutfit[categoryID]
        if (clothesArray) {
          result[categoryID] = clothesArray.map((clothes) => clothes._id)
        }
      }
    }

    return result
  }

  return {
    selectedOutfit,

    isSelectedProduct,
    handleSelectProduct,
    handleRemoveProduct,
    handleRemoveAllProducts,
    handleConvertSelectedOutfitToID,
  }
}

export default useSelectSuggestOutfit
