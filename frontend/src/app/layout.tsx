import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fastyle',
  description: 'Fastyle',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={poppins.className}>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
