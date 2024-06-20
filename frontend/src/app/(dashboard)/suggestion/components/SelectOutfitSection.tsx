'use client'

import ListCategory from '@/app/(dashboard)/suggestion/components/ListCategory'
import ListOutfit from '@/app/(dashboard)/suggestion/components/ListOutfit'
import Search from '@/app/(dashboard)/suggestion/components/Search'
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

      <div className='step-2 flex-1 flex flex-col overflow-hidden'>
<<<<<<< HEAD
        <Search selectedCategoryID={selectedCategoryID} />
=======
        <Search />
>>>>>>> main

        <ListOutfit categoryID={selectedCategoryID} />
      </div>
    </div>
  )
}

export default SelectOutfitSection
