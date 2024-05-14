import Header from '@/app/(dashboard)/components/Header'
import Form from '@/app/(dashboard)/suggestion/components/Form'
import ListSuggestOutfit from '@/app/(dashboard)/suggestion/components/ListSuggestOutfit'
import React from 'react'

const Suggestion = () => {
  return (
    <div className='w-full pt-6 px-10'>
      <Header
        title='Fashion Suggestion'
        description='Discover your ideal outfit instantly with image or text-based search.'
        icon={'Lightbulb'}
      />

      <div className='flex flex-col gap-6'>
        <Form />

        <ListSuggestOutfit />
      </div>
    </div>
  )
}

export default Suggestion
