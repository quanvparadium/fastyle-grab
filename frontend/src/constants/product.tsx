import { CategoryID } from '@/types/product'
import React from 'react'
import { CgMoreO } from 'react-icons/cg'
import { FaRedhat } from 'react-icons/fa'
import { FaShirt } from 'react-icons/fa6'
import { GiAmpleDress, GiRunningShoe } from 'react-icons/gi'
import { PiPantsFill } from 'react-icons/pi'

export const CATEGORY_MAP = {
  topwear: 'Top Wear',
  headwear: 'Head Wear',
  bottomwear: 'Bottom Wear',
  footwear: 'Foot Wear',
  dress: 'Dress',
  others: 'Others',
} as const

export const categories: {
  id: CategoryID
  icon: React.ReactNode
  name: string
}[] = [
  {
    id: 'headwear',
    icon: <FaRedhat size={24} />,
    name: CATEGORY_MAP['headwear'],
  },
  {
    id: 'topwear',
    icon: <FaShirt size={24} />,
    name: CATEGORY_MAP['topwear'],
  },
  {
    id: 'bottomwear',
    icon: <PiPantsFill size={24} />,
    name: CATEGORY_MAP['bottomwear'],
  },
  {
    id: 'footwear',
    icon: <GiRunningShoe size={24} />,
    name: CATEGORY_MAP['footwear'],
  },
  {
    id: 'dress',
    icon: <GiAmpleDress size={24} />,
    name: CATEGORY_MAP['dress'],
  },
  {
    id: 'others',
    icon: <CgMoreO size={24} />,
    name: CATEGORY_MAP['others'],
  },
]
