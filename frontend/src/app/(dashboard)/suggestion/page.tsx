import Header from '@/app/(dashboard)/components/Header'
import Form from '@/app/(dashboard)/suggestion/components/Form'
import React from 'react'

const Suggestion = () => {
  return (
    <div className='w-full h-full pt-6 px-10'>
      <Header
        title='Fashion Suggestion'
        description='Discover your ideal outfit instantly with image or text-based search.'
        icon={'Lightbulb'}
      />

      <Form />
    </div>
  )
}

export default Suggestion
