'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import useSuggestOutfitStore from '@/store/suggestOutfitStore'

const Search = () => {
  const { setSearchValue } = useSuggestOutfitStore((state) => state)
  const [search, setSearch] = useState<string>('')

  // Debounce search value
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchValue(search)
    }, 1500)

    return () => {
      clearTimeout(handler)
    }
  }, [search])

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
