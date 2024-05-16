import { Button } from '@/components/ui/button'
import useTryOnOutfitStore from '@/store/tryOnManuallyStore'
import React from 'react'
import { fabric } from 'fabric'

interface ParameterSidebarProps {
  canvas: React.MutableRefObject<fabric.Canvas | null>
}

const ParameterSidebar = ({ canvas }: ParameterSidebarProps) => {
  const { activeObject } = useTryOnOutfitStore((state) => state)

  const renderViewOption = () => {
    if (!activeObject) return

    return Object.entries(activeObject?.view).map(([option, value]) => (
      <Button disabled={value === null} onClick={() => handleChangeView(value)}>
        {option}
      </Button>
    ))
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
        <span>No data</span>
      </div>
    )
  }

  return (
    <div className='w-[300px] h-full border px-4 py-2'>
      <div className='flex flex-col gap-3'>
        <span>View Option</span>
        <div className='grid grid-cols-3 gap-2'>{renderViewOption()}</div>
      </div>
    </div>
  )
}

export default ParameterSidebar
