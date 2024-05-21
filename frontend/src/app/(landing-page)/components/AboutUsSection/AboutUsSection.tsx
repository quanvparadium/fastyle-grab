'use client'

import AboutUsSectionSlider from '../AboutUsSectionSlider/AboutUsSectionSlider'
import { useState } from 'react'
import AboutUsSectionInfoCard from '../AboutUsSectionInfoCard/AboutUsSectionInfoCard'
import MemberInfo from '../../interfaces/MemberInfo'

const AboutUsSection = () => {
  const members: MemberInfo[] = [
    {
      name: 'Hieu Khuong',
      avatar:
        'https://static-00.iconduck.com/assets.00/avatar-default-icon-1975x2048-2mpk4u9k.png',
      school: 'Mentor',
      description:
        'As a mentor, I help my team shape the projects we undertake, providing guidance and solutions to overcome challenges. In my first experience as a mentor, I look forward to creating memorable moments with the team and learning from the younger members.',
    },
    {
      name: 'Trần Bình Kha',
      avatar:
        'https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg',
      school: 'Fullstack developer',
      description:
        'My goal in joining Grab this time is to apply my knowledge in practice while learning and experiencing the working environment of a big tech company. I want to understand how they create products for hundreds of millions of users. Additionally, I hope to network and gain insights from senior colleagues who have many years of experience in the field.',
    },
    {
      name: 'Võ Phan Anh Quân',
      avatar:
        'https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg',
      school: 'Back-end/AI Engineer',
      description:
        'I thrive on collaborative development sessions with my team, finding great satisfaction in overcoming challenges together. I am passionate about continuous learning and am eager to expand my skills in a dynamic and innovative big tech environment.',
    },
    {
      name: 'Nguyễn Minh Kha',
      avatar:
        'https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg',
      school: 'Front-end',
      description:
        'My goal in joining Grab this time is to learn and experience the working environment of a big tech company and to understand how they create products for hundreds of millions of users. Additionally, I hope to network and gain insights from senior colleagues who have many years of experience in the field.',
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
