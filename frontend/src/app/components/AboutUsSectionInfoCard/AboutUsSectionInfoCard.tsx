import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'
import leftBackground from '../../../assets/leftAboutUsBackground.png'
import rightBackground from '../../../assets/rightAboutUsBackground.png'
import MemberInfo from '@/app/interfaces/MemberInfo'
import { Skeleton } from '@/components/ui/skeleton'

interface AboutUsSectionInfoCardProps {
  member: MemberInfo
  style?: React.CSSProperties
}

const AboutUsSectionInfoCard = ({
  member,
  style,
}: AboutUsSectionInfoCardProps) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  })

  return (
    <div
      className='flex justify-center'
      style={{ position: 'relative', ...style }}
    >
      {isDesktopOrLaptop && (
        <div style={{ position: 'relative', left: 100 }}>
          <Image
            src={leftBackground}
            alt=''
            style={{ minHeight: 400, minWidth: 400 }}
          />
        </div>
      )}
      <div
        style={{
          minWidth: isDesktopOrLaptop ? 652 : 600,
          maxWidth: isDesktopOrLaptop ? 652 : 600,
          height: 400,
          background: 'white',
          border: '1px solid #e7e8ef',
          boxShadow: 'rgba(99, 99, 99, 0.3) 0px 2px 8px 0px',
          borderRadius: 32,
          position: 'relative',
          top: isDesktopOrLaptop ? 52 : 0,
          padding: 32,
          zIndex: 999,
        }}
      >
        <div className='flex justify-between'>
          <div>
            <Skeleton
              style={{
                width: 32,
                height: 12,
                borderRadius: 30,
                background: '#2962FF',
                marginBottom: 4,
              }}
            />
            <p style={{ fontSize: 28, fontWeight: 600 }}>{member.name}</p>
            <p style={{ opacity: 0.4 }}>{member.school}</p>
          </div>
          <img
            src={member.avatar}
            alt=''
            style={{
              maxWidth: 84,
              maxHeight: 84,
              borderRadius: 100,
            }}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <p>{member.description}</p>
        </div>
      </div>
      {isDesktopOrLaptop && (
        <div style={{ position: 'relative', right: 100 }}>
          <Image
            src={rightBackground}
            alt=''
            style={{ minHeight: 400, minWidth: 400 }}
          />
        </div>
      )}
    </div>
  )
}

export default AboutUsSectionInfoCard
