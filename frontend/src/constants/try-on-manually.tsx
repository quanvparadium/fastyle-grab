import { Toolbar } from '@/types/canvas'
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
