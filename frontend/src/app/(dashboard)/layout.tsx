import React from 'react'
import Sidebar from './components/Sidebar'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='flex h-full'>
      <Sidebar />
      <div className='pl-[230px] flex-1'>{children}</div>
    </main>
  )
}
