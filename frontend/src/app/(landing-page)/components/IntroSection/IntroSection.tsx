import Image from 'next/image'
import TriangleIcon from '../../../../assets/IntroSectionTriangleIcon.png'
import './JumpAnimation.css'

const IntroSection = () => {
  return (
    <div id='intro' className='mt-12'>
      <div className='w-full flex justify-center mb-8'>
        <div className='w-[20px] h-[20px] flex justify-center'>
          <Image className='jump-animation' src={TriangleIcon} alt='' />
        </div>
      </div>
      <div className='mt-6 flex justify-center'>
        <iframe
          height={440}
          width={800}
          src='https://www.youtube.com/embed/701Ou8BI4JQ'
          style={{ borderRadius: 24 }}
        />
      </div>
    </div>
  )
}

export default IntroSection
