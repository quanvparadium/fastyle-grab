import { Lightbulb, Search } from 'lucide-react'
import { ROUTE } from '@/constants/route'

export interface Sidebar {
  href: string
  icon: React.ReactNode
  label: string
}

export const sidebar: Sidebar[] = [
  {
    href: `/${ROUTE.SUGGESTION}`,
    icon: <Lightbulb size={18} />,
    label: 'Suggestion',
  },
]
