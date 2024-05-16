'use client'

import { Button } from '@/components/ui/button'
import './LinkButton.css'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const HeroSectionHeader = () => {
  const router = useRouter()

  return (
    <div className='flex w-full justify-between' style={{ padding: 24 }}>
      <div className='flex items-center'>
        <a href='#intro'>
          <Button className='link-button' variant='link'>
            Introduction
          </Button>
        </a>
        <a href='#features'>
          <Button className='link-button' variant='link'>
            Features
          </Button>
        </a>
        <a href='#about'>
          <Button className='link-button' variant='link'>
            About us
          </Button>
        </a>
      </div>

      <Image
        className='sm:hidden md:hidden lg:block'
        width={200}
        height={93}
        src='/Logo.png'
        alt=''
        style={{ position: 'relative', left: '-8%' }}
      />

      <div className='flex justify-center items-center'>
        <Button
          style={{
            minWidth: 120,
            color: '#7A78DE',
            background: 'white',
            fontWeight: 600,
            marginRight: 32,
            borderRadius: 32,
            fontSize: 17,
          }}
          onClick={() => router.push('/retrival')}
          size='lg'
        >
          Dashboard
        </Button>
      </div>
    </div>
  )
}

export default HeroSectionHeader
