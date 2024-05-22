'use client'

import { Button } from '@/components/ui/button'
import HeroImage from '../../../../assets/HeroImage.gif'
import Image from 'next/image'

const HeroSectionRightSide = () => {

  return (
    <div
      className='sm:hidden md:hidden lg:block'
      style={{
        flex: 1,
        right: 0,
        position: 'relative',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          transform: 'rotate(-10deg)',
          width: 460,
          height: 460,
          background: 'linear-gradient(#CBB7EA, #6966DA)',
          position: 'absolute',
          borderRadius: 64,
          right: 120,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          width: 460,
          height: 460,
          right: 120,
          position: 'absolute',
        }}
      >
        <div
          style={{
            width: 460,
            height: 460,
            background: 'linear-gradient(#B1B4FF, #6966DA)',
            borderRadius: 64,
            opacity: 0.7,
            position: 'absolute',
          }}
        />
        <Image
          style={{ marginLeft: 16, height: 500, position: 'absolute' }}
          src={HeroImage}
          alt={''}
        />

        <div
          style={{
            width: 224,
            height: 100,
            borderRadius: 26,
            paddingLeft: 16,
            paddingTop: 24,
            background: 'white',
            position: 'absolute',
            left: 120,
            top: 428,
          }}
        >
          <div className='flex justify-center'>
            <Button
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                background: 'white',
                boxShadow: 'rgba(99, 99, 99, 0.3) 0px 2px 8px 0px',
                position: 'relative',
                left: 16,
                padding: 0,
              }}
            >
              <img
                src={
                  'http://assets.myntassets.com/v1/images/style/properties/ce32795389b11ae8a3392012076ed0a5_images.jpg'
                }
                alt=''
                style={{ height: 40, width: 40, borderRadius: 100 }}
              />
            </Button>
            <Button
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                background: 'white',
                boxShadow: 'rgba(99, 99, 99, 0.3) 0px 2px 8px 0px',
                position: 'relative',
                left: 0,
                padding: 0,
              }}
            >
              <img
                src={
                  'https://assets.myntassets.com/v1/images/style/properties/c488ace119583d86a6f8aad3a413b714_images.jpg'
                }
                alt=''
                style={{ height: 40, width: 40, borderRadius: 100 }}
              />
            </Button>
            <Button
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                background: 'white',
                boxShadow: 'rgba(99, 99, 99, 0.3) 0px 2px 8px 0px',
                position: 'relative',
                left: -16,
                padding: 0,
              }}
            >
              <img
                src={
                  'https://assets.myntassets.com/v1/images/style/properties/5d3c039c2a5b008d3a0cf1051aa5dd76_images.jpg'
                }
                alt=''
                style={{ height: 40, width: 40, borderRadius: 100 }}
              />
            </Button>
            <Button
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                background: 'white',
                boxShadow: 'rgba(99, 99, 99, 0.3) 0px 2px 8px 0px',
                position: 'relative',
                left: -32,
                color: '#6966DA',
                backgroundColor: '#CFCEF3',
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              +50
            </Button>
          </div>
          <p className='mt-1 pl-2 opacity-40 text-sm'>
            More than 50000 items...
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroSectionRightSide
