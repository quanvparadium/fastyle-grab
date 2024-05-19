import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useTryOnOutfitManuallyStore from '@/store/tryOnManuallyStore'
import { Attribute } from '@/types/canvas'
import React from 'react'

const attributeOptions = [
  { label: 'X', property: 'x' },
  { label: 'Y', property: 'y' },
  { label: 'W', property: 'width' },
  { label: 'H', property: 'height' },
]

const AttributeSection = () => {
  const { activeObjectAttribute } = useTryOnOutfitManuallyStore(
    (state) => state,
  )

  if (!activeObjectAttribute) return null

  return (
    <div className='flex flex-col gap-2'>
      <span className='font-semibold'>Attributes</span>
      <div className='grid grid-cols-2 gap-4'>
        {attributeOptions.map((item) => (
          <div
            key={item.label}
            className='flex flex-1 items-center gap-3 rounded-sm'
          >
            <Label htmlFor={item.property} className='text-[10px] font-bold'>
              {item.label}
            </Label>
            <Input
              id={item.property}
              placeholder='100'
              className='input-ring'
              value={
                activeObjectAttribute[
                  item.property as keyof Attribute
                ] as number
              }
              onChange={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AttributeSection
