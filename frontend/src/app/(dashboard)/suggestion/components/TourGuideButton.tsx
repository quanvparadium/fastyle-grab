import { Button } from '@/components/ui/button'
import { useMemo, useState } from 'react'
import { Callback, Step, TooltipRenderProps } from 'react-joyride'
import dynamic from 'next/dynamic'

const JoyRideNoSSR = dynamic(() => import('react-joyride'), { ssr: false })

const TourGuideButton = () => {
  const [guideRunning, setGuideRunning] = useState(false)
  const steps: Array<Step> = useMemo(
    () => [
      {
        content: 'Welcome to suggestion section tour guide',
        placement: 'center',
        target: 'body',
      },
      {
        target: '.step-1',
        content: 'abc cakasdcn asdkcnaksjcdnkj ákcn jnacsjcsn s',
        placement: 'bottom',
      },
      { target: '.step-2', content: 'abc', placement: 'right' },
      { target: '.step-3', content: 'abc', placement: 'left' },
      { target: '.step-4', content: 'abc', placement: 'top' },
    ],
    [],
  )

  const handleGuideClose: Callback = (data) => {
    if (data.status === 'finished') {
      setGuideRunning(false)
    }
  }

  return (
    <div>
      <Button
        className='items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
        onClick={() => setGuideRunning(true)}
      >
        TOUR GUIDE
      </Button>

      <JoyRideNoSSR
        locale={{
          back: 'previous step',
          last: 'last',
          next: 'next step',
        }}
        callback={handleGuideClose}
        run={guideRunning}
        steps={steps}
        continuous
        disableScrolling
        disableOverlayClose
        showProgress
        tooltipComponent={Tooltip}
      />
    </div>
  )
}

export default TourGuideButton

const Tooltip = ({
  continuous,
  index,
  step,
  size,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
}: TooltipRenderProps) => (
  <div
    className='flex-col justify-between'
    style={{
      maxWidth: 400,
      minHeight: 100,
      padding: '16px 32px',
      background: 'white',
      borderRadius: 16,
    }}
    {...tooltipProps}
  >
    {step.title && <div>{step.title}</div>}
    <div>{step.content}</div>
    <div style={{ textAlign: 'end', marginTop: 16 }}>
      {index > 0 && (
        <Button
          className='mr-2 outline-none items-center bg-transparent text-black font-semibold hover:text-gray-600 py-2 px-4 hover:border-transparent rounded'
          {...backProps}
        >
          <div id='back' />
          Previous step
        </Button>
      )}
      {continuous && (
        <Button {...primaryProps}>
          <div id='next' />
          {index > 0 ? `Step ${index}/${size - 1}` : 'Next'}
        </Button>
      )}
      {!continuous && (
        <Button {...closeProps}>
          <div id='close' />
        </Button>
      )}
    </div>
  </div>
)
