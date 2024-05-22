'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { sidebar } from '@/constants/sidebar'
import { ROUTE } from '@/constants/route'

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className='fixed w-[230px] h-full py-8 px-6 border-r flex flex-col gap-12'>
      <div
        className='flex gap-1 items-center cursor-pointer'
        onClick={() => router.push(ROUTE.HOME)}
      >
        <div className='w-10 h-10 flex justify-center items-center'>
          <span className='text-[24px]'>👔</span>
        </div>
        <span className='text-[28px] font-semibold'>Fastyle</span>
      </div>

      <div className='flex flex-col gap-4'>
        {sidebar.map((item) => {
          return (
            <div
              className={cn(
                'relative p-4 rounded-xl border-2 flex cursor-pointer items-center outline-none',
                pathname === item.href
                  ? 'border-primary'
                  : 'border-transparent',
              )}
              key={item.label}
              onClick={() => router.push(item.href)}
            >
              <div
                className={cn(
                  'flex items-center gap-4 text-[16px]',
                  pathname === item.href
                    ? 'text-primary font-medium'
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
