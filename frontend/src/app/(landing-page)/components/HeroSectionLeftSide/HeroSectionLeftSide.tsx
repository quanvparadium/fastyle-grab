'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const HeroSectionLeftSide = () => {
  const router = useRouter()

  return (
    <div className='sm:w-4/5 md:w-4/5 lg:w-1/2' style={{ padding: 32 }}>
      <div style={{ marginTop: 52 }}>
        <p style={{ fontSize: 48 }}>
          A convenient and quick way to get &nbsp;
          <span style={{ color: '#161ED3' }}>cool</span>&nbsp;fashion
        </p>
        <p style={{ fontSize: 20, color: 'black', opacity: 0.4 }}>
          Give recommendation and find fashion by describe or prompt text
        </p>
        <Button
          style={{
            margin: '24px 0 0 48px',
            background: '#524FD5',
            borderRadius: 32,
            minWidth: 160,
            fontSize: 20,
            padding: '24px 48px',
          }}
          onClick={() => router.push('/retrival')}
        >
          More Features
        </Button>
      </div>
    </div>
  )
}

export default HeroSectionLeftSide
