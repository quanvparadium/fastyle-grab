import MemberInfo from '@/app/interfaces/MemberInfo'
import { Button } from '@/components/ui/button'
import 'swiper/css'
import 'swiper/css/pagination'
import './SelectedAnimation.css'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from 'react-responsive'

interface AboutUsSectionSliderProps {
  members: MemberInfo[]
  onChange: (index: number) => void
  style?: React.CSSProperties
}

const AboutUsSectionSlider = ({
  members,
  onChange,
  style,
}: AboutUsSectionSliderProps) => {
  const swiperRef = useRef<SwiperRef>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPreventClick, setIsPreventClick] = useState(false)

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  })

  useEffect(() => {
    setIsPreventClick(true)
    const timerId = setTimeout(() => {
      setIsPreventClick(false)
    }, 400)

    onChange(currentIndex)

    return () => {
      clearTimeout(timerId)
    }
  }, [currentIndex])

  return (
    <div
      className='w-full flex justify-center items-center'
      style={{
        paddingLeft: isDesktopOrLaptop ? '25%' : '10%',
        paddingRight: isDesktopOrLaptop ? '25%' : '10%',
        ...style,
      }}
    >
      <Button
        style={{
          width: 60,
          height: 60,
          marginRight: 16,
          padding: '0px 16px',
          background: 'white',
          borderRadius: 100,
          border: '1px solid #e7e8ef',
        }}
        onClick={() => {
          if (isPreventClick) return
          setCurrentIndex(
            currentIndex - 1 >= 0
              ? currentIndex - 1
              : members.length + currentIndex - 1,
          )
          swiperRef.current?.swiper.slidePrev()
        }}
      >
        <ArrowLeft style={{ color: 'black' }} />
      </Button>
      <Swiper
        ref={swiperRef}
        autoHeight={true}
        slidesPerView={isDesktopOrLaptop ? 3 : 1}
        spaceBetween={16}
        centeredSlides={true}
        slidesPerGroup={1}
        allowTouchMove={false}
        loop={true}
        modules={[Pagination, Navigation]}
        className='flex items-center justify-center'
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: 152,
        }}
      >
        {members.map((member, index) => (
          <SwiperSlide
            key={index}
            className={index === currentIndex ? 'selected-slide' : ''}
            style={{
              height: 112,
              borderRadius: 16,
              padding: 16,
              cursor: 'pointer',
              border:
                index === currentIndex
                  ? '2px solid #2962FF'
                  : '1px solid #e7e8ef',
            }}
            onClick={() => {
              if (!isPreventClick) {
                swiperRef.current?.swiper.slideToLoop(index)
                setCurrentIndex(index)
              }
            }}
          >
            <div
              style={{
                cursor: 'pointer',
              }}
            >
              <div className='flex justify-between'>
                <div>
                  <Skeleton
                    style={{
                      width: 20,
                      height: 10,
                      borderRadius: 30,
                      background: '#2962FF',
                    }}
                  />
                </div>

                <img
                  width={36}
                  height={36}
                  src={member.avatar}
                  alt=''
                  style={{
                    borderRadius: '50%',
                  }}
                />
              </div>
              <div>
                <Skeleton
                  style={{ maxWidth: 60, height: 10, marginBottom: 10 }}
                />
                <Skeleton style={{ maxWidth: 120, height: 10 }} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Button
        style={{
          width: 60,
          height: 60,
          marginLeft: 16,
          padding: '0px 16px',
          background: 'white',
          borderRadius: 100,
          border: '1px solid #e7e8ef',
        }}
        onClick={() => {
          if (isPreventClick) return
          setCurrentIndex(
            currentIndex + 1 <= members.length - 1
              ? currentIndex + 1
              : currentIndex - members.length + 1,
          )
          swiperRef.current?.swiper.slideNext()
        }}
      >
        <ArrowRight style={{ color: 'black' }} />
      </Button>
    </div>
  )
}

export default AboutUsSectionSlider
