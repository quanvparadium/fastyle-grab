'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { sidebar } from '@/constants/sidebar'

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className='fixed w-[230px] h-full py-8 px-6 border-r flex flex-col gap-12'>
      <Image src='/Logo.png' width={100} height={93} alt='Logo' />
      <div className='flex flex-col gap-4'>
        {sidebar.map((item) => {
          return (
            <div
              className={cn(
                'relative p-4 rounded-xl border-2 flex cursor-pointer items-center outline-none',
                pathname === item.href
                  ? 'bg-iguana border-blue-jay'
                  : 'border-transparent',
              )}
              key={item.label}
              onClick={() => router.push(item.href)}
            >
              <div
                className={cn(
                  'flex items-center gap-4 text-[16px]',
                  pathname === item.href
                    ? 'text-macaw font-medium'
                    : 'text-wolf',
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar