'use client'
import Header from '@/app/(dashboard)/components/Header'
import Form from '@/app/(dashboard)/suggestion/components/Form'
import ListSuggestOutfit from '@/app/(dashboard)/suggestion/components/ListSuggestOutfit'
import React from 'react'
import TourGuideButton from './components/TourGuideButton'

const Suggestion = () => {
  return (
    <div className='w-full pt-6 px-10'>
      <div className='flex justify-between items-center'>
        <Header
          title='Fashion Suggestion'
          description='Pick your style, I will perfect your look.'
          icon={'Lightbulb'}
        />
        <TourGuideButton />
      </div>

      <div className='flex flex-col gap-6'>
        <Form />

        <ListSuggestOutfit />
      </div>
    </div>
  )
}

export default Suggestion
