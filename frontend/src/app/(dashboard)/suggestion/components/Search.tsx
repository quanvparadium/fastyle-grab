'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import useRecommendOutfitStore from '@/store/recommendOutfitStore'
import { CategoryID } from '@/types/product'

interface SearchProps {
  selectedCategoryID: CategoryID
}

const Search = ({ selectedCategoryID }: SearchProps) => {
  const { setSearchValue } = useRecommendOutfitStore((state) => state)
  const [search, setSearch] = useState<string>('')

  // Debounce search value
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchValue(search)
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [search])

  useEffect(() => {
    setSearchValue('')
    setSearch('')
  }, [selectedCategoryID])

  return (
    <div className='px-8 py-4'>
      <Input
        placeholder='Describe your ideal'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

export default Search
