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
