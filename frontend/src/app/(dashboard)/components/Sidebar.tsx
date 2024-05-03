'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { sidebarData } from '@/app/(dashboard)/data/sidebarData'
import Image from 'next/image'

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className='w-[230px] py-8 px-6 border-r-[1px] flex flex-col gap-12'>
      <Image src='/Logo.png' width={100} height={93} alt='Logo' />
      <div className='flex flex-col gap-4'>
        {sidebarData.map((item) => {
          return (
            <div
              className={cn(
                'relative p-4 rounded-xl flex cursor-pointer items-center outline-none',
                pathname === item.href &&
                  'bg-[#7c3aed] bg-opacity-15 text-white',
              )}
              key={item.label}
              onClick={() => router.push(item.href)}
            >
              <div
                className={cn(
                  'flex items-center gap-4 text-[16px]',
                  pathname === item.href && 'text-primary font-medium',
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
