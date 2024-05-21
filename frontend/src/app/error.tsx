'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <section className='flex items-center h-screen p-16 bg-gray-50 dark:bg-gray-700'>
      <div className='container flex flex-col items-center '>
        <div className='flex flex-col gap-6 max-w-md text-center'>
          <h2 className='font-extrabold text-9xl text-gray-600 dark:text-gray-100'>
            <span className='sr-only'>Error</span>404
          </h2>
          <p className='text-2xl md:text-3xl dark:text-gray-300'>
            Sorry, we couldn't find this page.
          </p>
        </div>
      </div>
    </section>
  )
}
