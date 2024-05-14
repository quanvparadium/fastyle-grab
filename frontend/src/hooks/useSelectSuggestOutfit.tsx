import { useToast } from '@/components/ui/use-toast'
import useSuggestOutfitStore from '@/store/suggestOutfitStore'
import { CategoryID, Clothes } from '@/types/product'

const LIMIT_SELECTION_PER_CATEGORY: number = 4

const useSelectSuggestOutfit = () => {
  const { toast } = useToast()

  const { selectedOutfit, setSelectedOutfit } = useSuggestOutfitStore(
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

    const cloneSelectedOutfit = { ...selectedOutfit }

    if (cloneSelectedOutfit.hasOwnProperty(categoryID)) {
      cloneSelectedOutfit[categoryID]?.push(clothes)
    } else {
      cloneSelectedOutfit[categoryID] = [clothes]
    }

    setSelectedOutfit(cloneSelectedOutfit)
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

    cloneSelectedOutfit[categoryID]?.splice(productIndex, 1)

    setSelectedOutfit(cloneSelectedOutfit)
  }

  const isSelectedProduct = (categoryID: CategoryID, productID: string) => {
    return selectedOutfit[categoryID]?.some((item) => item._id === productID)
  }

  return {
    selectedOutfit,

    isSelectedProduct,
    handleSelectProduct,
    handleRemoveProduct,
  }
}

export default useSelectSuggestOutfit
