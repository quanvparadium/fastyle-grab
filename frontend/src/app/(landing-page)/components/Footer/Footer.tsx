'use client'

import { Facebook, InstagramIcon, TwitterIcon } from 'lucide-react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div
      className='sm:flex-col md:flex-col lg:flex-row'
      style={{
        height: 400,
        padding: '32px 72px 16px 72px',
        flexDirection: 'column',
      }}
    >
      <div
        className='flex sm:flex-col md:flex-col lg:flex-row'
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 36,
          background:
            'linear-gradient(rgba(216, 194, 250, 0.5), rgba(177, 180, 255, 0.5))',
          padding: 32,
        }}
      >
        <div style={{ maxWidth: 400, paddingLeft: 64 }}>
          <div style={{ width: 120, height: 60 }}>
            <Image width={120} height={60} src={'/Logo.png'} alt='' />
          </div>
          <p style={{ opacity: 0.6 }}>&#9737;Grab Engineer bootcamp Project</p>
          <p style={{ opacity: 0.6 }}>
            &#9737;1060 Nguyen Van Linh Street, Tan Phong, District 7, Ho Chi
            Minh city, Viet Nam
          </p>
        </div>
        <div style={{ width: 400 }} />
        <div>
          <p style={{ fontWeight: 600, fontSize: 16 }}>Products</p>
          <ul className='sm:flex md:flex lg:flex-col'>
            <li>Clothes</li>
            <li>Accessories</li>
            <li>Watches</li>
          </ul>
        </div>
        <div style={{ width: 128 }} />
        <div>
          <p style={{ fontWeight: 600, fontSize: 16 }}>Features</p>
          <ul className='sm:flex md:flex lg:flex-col'>
            <li>Search</li>
            <li>Recommendation</li>
          </ul>
        </div>
        <div style={{ width: 200 }} />
        <div className='flex'>
          <div
            style={{
              minWidth: 40,
              minHeight: 40,
              maxWidth: 40,
              maxHeight: 40,
              borderRadius: 100,
              border: '1px Solid',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.5,
            }}
          >
            <Facebook />
          </div>
          <div
            style={{
              minWidth: 40,
              minHeight: 40,
              maxWidth: 40,
              maxHeight: 40,
              marginLeft: 32,
              borderRadius: 100,
              border: '1px Solid',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.5,
            }}
          >
            <InstagramIcon />
          </div>
          <div
            style={{
              minWidth: 40,
              minHeight: 40,
              maxWidth: 40,
              maxHeight: 40,
              marginLeft: 32,
              borderRadius: 100,
              border: '1px Solid',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.5,
            }}
          >
            <TwitterIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
