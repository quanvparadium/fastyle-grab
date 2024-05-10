'use client'

import MemberInfo from '@/app/interfaces/MemberInfo'
import AboutUsSectionSlider from '../AboutUsSectionSlider/AboutUsSectionSlider'
import { useState } from 'react'
import AboutUsSectionInfoCard from '../AboutUsSectionInfoCard/AboutUsSectionInfoCard'

const AboutUsSection = () => {
  const members: MemberInfo[] = [
    {
      name: 'Nguyễn Minh Kha',
      avatar:
        'https://static-00.iconduck.com/assets.00/avatar-default-icon-1975x2048-2mpk4u9k.png',
      school: 'HCMUS',
      description:
        'abcd dkd cnjwdc kmdc mdsackm mdksmc ksmdackmcasd ksad cmasdkc masdkcmasdkcm aksdcm asdkcm kadscm dkscm weicow eocmweco mwedcodewm cowedcmoewicdmoewicdmoweidcm oweidcmode wocimweodcm wedocm d edocmdeocm j',
    },
    {
      name: 'Trần Bình Kha',
      avatar:
        'https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg',
      school: 'HCMUS',
      description: 'abcd dkd',
    },
    {
      name: 'Võ Phan Anh Quân',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc3hMXsYcyINCaXkRBhVyEjHMQszmNStck2ELBWXKUYw&s',
      school: 'HCMUS',
      description: 'abcd dkd',
    },
    {
      name: 'Nguyễn Minh Kha',
      avatar:
        'https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg',
      school: 'HCMUS',
      description:
        'abcd dkd cnjwdc kmdc mdsackm mdksmc ksmdackmcasd ksad cmasdkc masdkcmasdkcm aksdcm asdkcm kadscm dkscm weicow eocmweco mwedcodewm cowedcmoewicdmoewicdmoweidcm oweidcmode wocimweodcm wedocm d edocmdeocm j',
    },
    {
      name: 'Nguyễn Minh Kha',
      avatar:
        'https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg',
      school: 'HCMUS',
      description: 'abcd dkd',
    },
  ]

  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div id='about' style={{ marginTop: 32, padding: '0px 128px' }}>
      <p
        style={{
          width: '100%',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: 40,
          marginBottom: 32,
        }}
      >
        Our Team
      </p>

      <AboutUsSectionSlider
        onChange={(index) => setSelectedIndex(index)}
        members={members}
      />

      <AboutUsSectionInfoCard member={members[selectedIndex]} />

      <div style={{ height: 60 }} />
    </div>
  )
}

export default AboutUsSection
