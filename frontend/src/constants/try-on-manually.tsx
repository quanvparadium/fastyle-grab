import { Toolbar } from '@/types/canvas'
import { CategoryID } from '@/types/product'
import { LuMousePointer2, LuHand } from 'react-icons/lu'

export type ToolbarData = {
  id: Toolbar
  name: string
  icon: React.ReactNode
}

export const toolbar: ToolbarData[] = [
  {
    id: 'move',
    name: 'Move',
    icon: <LuMousePointer2 size={24} />,
  },
  {
    id: 'hand',
    name: 'Hand tool',
    icon: <LuHand size={24} />,
  },
]

export const positionDefault: {
  [key in CategoryID]: { top: number; left: number }
} = {
  headwear: { top: 0, left: 450 },
  topwear: { top: 180, left: 450 },
  bottomwear: { top: 360, left: 450 },
  footwear: { top: 540, left: 450 },
  dress: { top: 180, left: 450 },
  others: { top: 300, left: 650 },
}
