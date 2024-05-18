'use client'

import { Button } from '@/components/ui/button'
import useTryOnOutfitStore from '@/store/tryOnManuallyStore'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ChevronRight } from 'lucide-react'
import { handleRenderImage } from '@/utils/canvas'

interface OutfitDrawerProps {
  canvas: React.MutableRefObject<fabric.Canvas | null>
}

const OutfitDrawer = ({ canvas }: OutfitDrawerProps) => {
  const { tryOnOutfit } = useTryOnOutfitStore((state) => state)

  const renderOutfit = () => {
    if (!tryOnOutfit) return <p>No data</p>

    return Object.entries(tryOnOutfit).map(([categoryID, value]) => (
      <div
        key={categoryID}
        className='w-[200px] h-[200px] rounded cursor-pointer'
        onClick={() => handleRenderImage({ canvas, view: value })}
      >
        <img
          src={value.original.default}
          className='w-full h-full object-cover rounded'
        />
      </div>
    ))
  }

  return (
    <Sheet defaultOpen={!!tryOnOutfit}>
      <SheetTrigger asChild>
        <Button className='w-10 h-10 p-0 absolute z-10 top-1/2 left-4 -translate-y-1/2'>
          <ChevronRight size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-[300px] flex flex-col gap-4'>
        <SheetHeader>
          <SheetTitle>SELECT ITEMS</SheetTitle>

          <SheetDescription>
            Mix and match items to create your desired look.
          </SheetDescription>
        </SheetHeader>
        <div className='h-full flex flex-col items-center gap-4 overflow-auto scrollbar-hidden'>
          {renderOutfit()}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default OutfitDrawer
