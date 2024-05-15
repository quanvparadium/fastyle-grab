import { Button } from '@/components/ui/button'
import { CATEGORY_MAP } from '@/constants/product'
import useSelectSuggestOutfit from '@/hooks/useSelectSuggestOutfit'
import { CategoryID } from '@/types/product'
import { Trash2 } from 'lucide-react'
import React from 'react'

const PreviewChosen = () => {
  const { selectedOutfit, handleRemoveProduct, handleRemoveAllProducts } =
    useSelectSuggestOutfit()

  return (
    <div className='flex flex-col gap-4 overflow-auto scrollbar-hidden'>
      {Object.entries(selectedOutfit).map(([categoryID, value]) => {
        if (value.length) {
          return (
            <div
              key={categoryID}
              className='flex flex-col gap-2 border p-2 rounded-lg'
            >
              <div className='flex justify-between items-center pl-2'>
                <span>{CATEGORY_MAP[categoryID as CategoryID]}</span>
                <Button
                  variant={'ghost'}
                  className='p-0 w-8 h-8'
                  onClick={() =>
                    handleRemoveAllProducts(categoryID as CategoryID)
                  }
                >
                  <Trash2 size={14} color='#CC0000' />
                </Button>
              </div>

              <div className='flex gap-4'>
                {value.map((item) => (
                  <div
                    key={item._id}
                    className='relative w-[60px] h-[60px] rounded-lg cursor-pointer group'
                  >
                    <img
                      src={item.view.default}
                      className='w-full h-full object-cover rounded-lg'
                    />

                    <div
                      className='hidden absolute inset-0 bg-black/50 group-hover:flex justify-center items-center rounded-lg'
                      onClick={() =>
                        handleRemoveProduct(categoryID as CategoryID, item._id)
                      }
                    >
                      <Trash2 size={18} color='#fff' />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default PreviewChosen
