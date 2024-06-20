'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import useRecommendOutfitStore from '@/store/recommendOutfitStore'
<<<<<<< HEAD
import { CategoryID } from '@/types/product'

interface SearchProps {
  selectedCategoryID: CategoryID
}

const Search = ({ selectedCategoryID }: SearchProps) => {
=======

const Search = () => {
>>>>>>> main
  const { setSearchValue } = useRecommendOutfitStore((state) => state)
  const [search, setSearch] = useState<string>('')

  // Debounce search value
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchValue(search)
<<<<<<< HEAD
    }, 1000)
=======
    }, 1500)
>>>>>>> main

    return () => {
      clearTimeout(handler)
    }
  }, [search])

<<<<<<< HEAD
  useEffect(() => {
    setSearchValue('')
    setSearch('')
  }, [selectedCategoryID])

=======
>>>>>>> main
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
