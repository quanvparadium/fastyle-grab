<<<<<<< HEAD
'use client'

=======
>>>>>>> main
import { Button } from '@/components/ui/button'
import { CATEGORY_MAP } from '@/constants/product'
import useSelectSuggestOutfit from '@/hooks/useSelectSuggestOutfit'
import { CategoryID } from '@/types/product'
import { Trash2 } from 'lucide-react'
<<<<<<< HEAD
import PerfectScrollbar from 'react-perfect-scrollbar'
=======
>>>>>>> main
import React from 'react'

const PreviewChosen = () => {
  const { selectedOutfit, handleRemoveProduct, handleRemoveAllProducts } =
    useSelectSuggestOutfit()

  return (
<<<<<<< HEAD
    <PerfectScrollbar>
      <div className='step-3 flex flex-col gap-4 overflow-scroll scrollbar-hidden'>
        {Object.entries(selectedOutfit).map(([categoryID, value]) => {
          if (value.length) {
            return (
              <div key={categoryID} className='flex flex-col border rounded-lg'>
                <div className='flex justify-between items-center py-2 px-3 border-b'>
                  <span className='text-[14px] font-medium'>
                    {CATEGORY_MAP[categoryID as CategoryID]}
                  </span>
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

                <div className='p-2 flex items-center gap-2'>
                  {value.map((item) => (
                    <div
                      key={item._id}
                      className='relative w-[60px] h-[60px] bg-[#EFEFEF] rounded-lg cursor-pointer group'
                    >
                      <img
                        src={item.view.default}
                        className='w-full h-full object-cover rounded-lg'
                      />

                      <div
                        className='hidden absolute inset-0 bg-black/50 group-hover:flex justify-center items-center rounded-lg'
                        onClick={() =>
                          handleRemoveProduct(
                            categoryID as CategoryID,
                            item._id,
                          )
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
    </PerfectScrollbar>
=======
    <div className='flex flex-col gap-4 overflow-auto scrollbar-hidden'>
      {Object.entries(selectedOutfit).map(([categoryID, value]) => {
        if (value.length) {
          return (
            <div key={categoryID} className='flex flex-col border rounded-lg'>
              <div className='flex justify-between items-center py-2 px-3 border-b'>
                <span className='text-[14px] font-medium'>
                  {CATEGORY_MAP[categoryID as CategoryID]}
                </span>
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

              <div className='p-2 flex items-center gap-2'>
                {value.map((item) => (
                  <div
                    key={item._id}
                    className='relative w-[60px] h-[60px] bg-[#EFEFEF] rounded-lg cursor-pointer group'
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
>>>>>>> main
  )
}

export default PreviewChosen
