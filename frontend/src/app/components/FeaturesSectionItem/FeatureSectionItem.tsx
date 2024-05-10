'use client'

import { useMediaQuery } from 'react-responsive'

interface FeaturesSectionItemProps {
  videoUrl: String | null
  title: String
  content: String
  variant?: 'default' | 'reverse'
  videoStyle?: React.CSSProperties
  titleStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
  style?: React.CSSProperties
}

const FeaturesSectionItem = ({
  videoUrl,
  title,
  content,
  variant = 'default',
  videoStyle,
  titleStyle,
  contentStyle,
  style,
}: FeaturesSectionItemProps) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  })

  const isReverse = variant === 'reverse' && isDesktopOrLaptop

  return (
    <div
      className={isDesktopOrLaptop ? 'flex' : 'flex-col'}
      style={{
        flexDirection: isReverse ? 'row-reverse' : 'initial',
        padding: '16px 128px',
        ...style,
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: isDesktopOrLaptop ? 'start' : 'center',
          padding: '64px 32px',
        }}
      >
        <p style={{ fontSize: 28, fontWeight: 600, ...titleStyle }}>{title}</p>
        <p style={{ marginTop: 4, ...contentStyle }}>{content}</p>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <iframe
          height={400}
          width={600}
          src={videoUrl as string}
          style={{ borderRadius: 16, ...videoStyle }}
        />
      </div>
    </div>
  )
}

export default FeaturesSectionItem
