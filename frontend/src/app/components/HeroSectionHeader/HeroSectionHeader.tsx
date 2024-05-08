'use client'

import { Button } from '@/components/ui/button'
import './LinkButton.css'
import { useMediaQuery } from 'react-responsive'

const HeroSectionHeader = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  })

  return (
    <div
      className='flex w-full justify-between'
      style={{ padding: isDesktopOrLaptop ? 64 : 24 }}
    >
      <div className='flex items-center'>
        <Button className='link-button' variant='link' onClick={() => {}}>
          Introduction
        </Button>
        <Button className='link-button' variant='link' onClick={() => {}}>
          Features
        </Button>
        <Button className='link-button' variant='link' onClick={() => {}}>
          About us
        </Button>
      </div>

      {isDesktopOrLaptop && <img src='abc.png' />}

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
        size='lg'
      >
        Dashboard
      </Button>
    </div>
  )
}

export default HeroSectionHeader
