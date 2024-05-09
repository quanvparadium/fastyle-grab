import Image from 'next/image'
import TriangleIcon from '../../../assets/IntroSectionTriangleIcon.png'
import './JumpAnimation.css'

const IntroSection = () => {
  return (
    <div id='intro' className='mt-12'>
      <div className='flex justify-center'>
        <Image className='jump-animation' src={TriangleIcon} alt='' />
      </div>
      <div className='mt-3 flex justify-center'>
        <iframe
          height={400}
          width={800}
          src='https://www.youtube.com/embed/701Ou8BI4JQ'
          style={{ borderRadius: 16 }}
        />
      </div>
    </div>
  )
}

export default IntroSection
