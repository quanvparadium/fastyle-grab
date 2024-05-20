import { icons } from 'lucide-react'
import React from 'react'

interface HeaderProps {
  title: string
  description: string
  icon: keyof typeof icons
}

const Header: React.FC<HeaderProps> = ({ title, description, icon }) => {
  const LucideIcon = icons[icon]

  return (
    <div className='px-4 flex items-center gap-x-3 mb-8'>
      <div className='p-2 w-fit rounded-md bg-pink-700/10'>
        <LucideIcon className='w-10 h-10 text-pink-700' />
      </div>
      <div>
        <h2 className='text-3xl font-bold'>{title}</h2>
        <p className='text-sm text-wolf'>{description}</p>
      </div>
    </div>
  )
}

export default Header
