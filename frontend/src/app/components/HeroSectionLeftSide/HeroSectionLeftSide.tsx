'use client'

import { Button } from '@/components/ui/button'
import { useMediaQuery } from 'react-responsive'

const HeroSectionLeftSide = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  })

  return (
    <div style={{ width: isDesktopOrLaptop ? '40%' : '80%', padding: 32 }}>
      <div style={{ marginTop: 100 }}>
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
            minWidth: 200,
            fontSize: 24,
            padding: '32px 48px',
          }}
        >
          More Features
        </Button>
      </div>
    </div>
  )
}

export default HeroSectionLeftSide
