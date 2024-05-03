import React from 'react'
import { Lightbulb, Search } from 'lucide-react'
import { ROUTES } from '@/lib/constants'

export interface Sidebar {
  href: string
  icon: React.ReactNode
  label: string
}

export const sidebarData: Sidebar[] = [
  {
    href: `/${ROUTES.RETRIVAL}`,
    icon: <Search size={18} />,
    label: 'Research',
  },
  {
    href: `/${ROUTES.SUGGESTION}`,
    icon: <Lightbulb size={18} />,
    label: 'Suggestion',
  },
]
