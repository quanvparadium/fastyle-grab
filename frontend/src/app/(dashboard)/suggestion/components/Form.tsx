'use client'

import SelectOutfitSection from '@/app/(dashboard)/suggestion/components/SelectOutfitSection'
import { Button } from '@/components/ui/button'

const Form = () => {
  return (
    <div className='h-[550px] border-2 shadow-sm rounded-2xl flex'>
      <SelectOutfitSection />

      <div className='flex-1 flex flex-col px-4 py-4'>
        <div className='flex-1 flex flex-col gap-9 overflow-hidden pb-4'>
          <div className='w-full flex items-center justify-center'>
            <span className='text-[20px] font-medium'>Your Item</span>
          </div>
          {/* <div className='flex flex-col gap-4 overflow-auto scrollbar-hidden'>
            {Object.entries(previewForm).map(([key, value]) => (
              <div
                key={key}
                className='flex flex-col gap-2 border border-[#C5C6CC] p-2 rounded-lg'
              >
                <div className='flex justify-between items-center'>
                  <span>{value.categoryName}</span>
                  <Trash2 size={18} />
                </div>
                <div className='flex gap-4'>
                  {value.data.map((item) => (
                    <div
                      key={item.id}
                      className='w-[60px] h-[60px] rounded-lg cursor-pointer'
                    >
                      <img
                        src={item.imgUrl}
                        className='w-full h-full object-cover rounded-lg'
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div> */}
        </div>
        <div className='w-full flex justify-end'>
          <Button className='w-[130px]' hasShadow>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Form
