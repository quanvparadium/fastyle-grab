import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { categories } from '@/constants/product'
import { CategoryID } from '@/types/product'
import React from 'react'
import { IconContext } from 'react-icons'

interface ListCategoryProps {
  selectedCategoryID: CategoryID
  onSelectCategory: (categoryID: CategoryID) => void
}

const ListCategory = ({
  selectedCategoryID,
  onSelectCategory,
}: ListCategoryProps) => {
  return (
    <div className='step-1 h-[64px] flex justify-between border-b px-8'>
      {categories.map((item) => (
        <TooltipProvider key={item.id} delayDuration={0}>
          <Tooltip>
            <TooltipTrigger className='w-full'>
              <div
                className={`w-full h-full flex justify-center items-center cursor-pointer border-b-2 ${selectedCategoryID === item.id ? 'border-primary' : 'border-transparent'}`}
                onClick={() => onSelectCategory(item.id)}
              >
                <IconContext.Provider
                  value={{
                    color: `${selectedCategoryID === item.id ? '#00b14f' : '#DBDBDB'}`,
                  }}
                >
                  {item.icon}
                </IconContext.Provider>
              </div>
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <span>{item.name}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

export default ListCategory
