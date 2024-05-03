'use client'

import { Button } from '@/components/ui/button'
import { CircleX, Upload } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const ImageUploadForm = () => {
  const [previewImg, setPreviewImg] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setPreviewImg(objectUrl)

      e.target.value = ''
    } else {
      setPreviewImg(null)
    }
  }

  const handleRemoveImage = () => {
    setPreviewImg(null)
  }

  return (
    <>
      <div className='w-full h-[400px] bg-primary/5 rounded-2xl border-2 border-primary border-dashed cursor-pointer'>
        {previewImg ? (
          <div className='w-full h-full relative rounded-2xl group'>
            <CircleX
              size={24}
              className='hidden absolute z-10 right-0 translate-x-[10px] -translate-y-[10px] group-hover:block'
              onClick={handleRemoveImage}
            />
            <Image
              src={previewImg as string}
              alt='Image'
              fill
              className='rounded-2xl'
            />
          </div>
        ) : (
          <label
            htmlFor='upload'
            className='w-full h-full flex items-center justify-center cursor-pointer'
          >
            <div className='flex flex-col gap-4 items-center'>
              <Upload size={48} color='#7c3aed' />
              <span className='text-primary text-[14px]'>
                Click here to upload your image
              </span>
            </div>
          </label>
        )}

        <input
          id='upload'
          className='bg-transparent border-none outline-none hidden'
          name='media'
          type='file'
          accept='image/jpeg,image/png'
          onInput={handleImageChange}
        />
      </div>
      <Button className='mt-4 w-full'>Submit</Button>
    </>
  )
}

export default ImageUploadForm
