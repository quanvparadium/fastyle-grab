import { Button } from '@/components/ui/button'
import React from 'react'
import { fabric } from 'fabric'
import useTryOnOutfitManuallyStore from '@/store/tryOnManuallyStore'
import AttributeSection from '@/app/(try-on)/try-on-manually/components/AttributeSection'

interface ParameterSidebarProps {
  canvas: React.MutableRefObject<fabric.Canvas | null>
}

const ParameterSidebar = ({ canvas }: ParameterSidebarProps) => {
  const { activeObject } = useTryOnOutfitManuallyStore((state) => state)

  const renderViewOption = () => {
    if (!activeObject) return

    return Object.entries(activeObject.view).map(([option, value]) => {
      if (value) {
        return (
          <Button key={value} onClick={() => handleChangeView(value)}>
            <text className='capitalize'>{option}</text>
          </Button>
        )
      }
    })
  }

  const handleChangeView = (urlImage: string | null) => {
    if (!urlImage) return
    const target = canvas.current?.getActiveObject()
    if (target && target instanceof fabric.Image) {
      target.setSrc(urlImage, () => {
        canvas.current?.renderAll() // Vẽ lại canvas sau khi đặt hình ảnh mới
      })
    }
  }

  if (!activeObject) {
    return (
      <div className='w-[300px] h-full border px-4 py-2 flex items-center justify-center'>
<<<<<<< HEAD
        <span className='text-center'>
          Please select an object to view detail
        </span>
=======
        <span>No data</span>
>>>>>>> main
      </div>
    )
  }

  return (
    <div className='w-[300px] h-full border px-4 py-2 flex flex-col gap-4'>
      <AttributeSection />

      <div className='flex flex-col gap-2'>
        <span className='font-semibold'>View Option</span>
        <div className='grid grid-cols-3 gap-2'>{renderViewOption()}</div>
      </div>
    </div>
  )
}

export default ParameterSidebar
