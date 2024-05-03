import React from 'react'
import Sidebar from './components/Sidebar'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='flex h-full bg-[#F8F9FE]'>
      <Sidebar />
      <div className='flex-1'>{children}</div>
    </main>
  )
}
