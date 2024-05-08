'use client'

import { Button } from '@/components/ui/button'
import HeroImage from '../../../assets/HeroImage.gif'
import Image from 'next/image'

const HeroSectionRightSide = () => {
  return (
    <div
      style={{
        flex: 1,
        right: 0,
        position: 'relative',
        alignItems: 'center',
        marginTop: 24,
      }}
    >
      <div
        style={{
          transform: 'rotate(-10deg)',
          width: 568,
          height: 540,
          background: 'linear-gradient(#CBB7EA, #6966DA)',
          position: 'absolute',
          borderRadius: 64,
          right: 120,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          width: 568,
          height: 540,
          right: 120,
          position: 'absolute',
        }}
      >
        <div
          style={{
            width: 568,
            height: 540,
            background: 'linear-gradient(#B1B4FF, #6966DA)',
            borderRadius: 64,
            opacity: 0.7,
            position: 'absolute',
          }}
        />
        <Image
          style={{ marginLeft: 16, height: 520, position: 'absolute' }}
          src={HeroImage}
          alt={''}
        />
        <div
          style={{
            width: 252,
            height: 132,
            borderRadius: 26,
            paddingLeft: 16,
            background: 'white',
            position: 'absolute',
            left: 180,
            top: 460,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              background: 'white',
              boxShadow: 'rgba(99, 99, 99, 0.3) 0px 2px 8px 0px',
              position: 'relative',
              left: 16,
            }}
          ></Button>
          <Button
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              background: 'white',
              boxShadow: 'rgba(99, 99, 99, 0.3) 0px 2px 8px 0px',
              position: 'relative',
              left: 0,
            }}
          ></Button>
          <Button
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              background: 'white',
              boxShadow: 'rgba(99, 99, 99, 0.3) 0px 2px 8px 0px',
              position: 'relative',
              left: -16,
            }}
          ></Button>
          <Button
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              background: 'white',
              boxShadow: 'rgba(99, 99, 99, 0.3) 0px 2px 8px 0px',
              position: 'relative',
              left: -32,
              color: '#6966DA',
              backgroundColor: '#CFCEF3',
              fontWeight: 600,
              fontSize: 20,
            }}
          >
            +50
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSectionRightSide
