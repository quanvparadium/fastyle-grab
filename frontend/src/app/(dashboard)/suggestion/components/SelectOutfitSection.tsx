'use client'

import ListCategory from '@/app/(dashboard)/suggestion/components/ListCategory'
import ListOutfit from '@/app/(dashboard)/suggestion/components/ListOutfit'
import { CategoryID } from '@/types/product'
import React, { useState } from 'react'

const SelectOutfitSection = () => {
  const [selectedCategoryID, setSelectedCategoryID] =
    useState<CategoryID>('headwear')

  const handleSelectCategory = (categoryID: CategoryID) => {
    setSelectedCategoryID(categoryID)
  }

  return (
    <div className='w-[750px] h-full border-r flex flex-col'>
      <ListCategory
        selectedCategoryID={selectedCategoryID}
        onSelectCategory={handleSelectCategory}
      />

      <ListOutfit categoryID={selectedCategoryID} />
    </div>
  )
}

export default SelectOutfitSection
