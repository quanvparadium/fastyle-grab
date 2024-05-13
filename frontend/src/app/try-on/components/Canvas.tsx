'use client'

import { Button } from '@/components/ui/button'
import { toolbar } from '@/constants/try-on'
import React from 'react'
import { IconContext } from 'react-icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useTryOnOutfitStore from '@/store/tryonStore'

interface CanvasProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
  activeTool: string
  handleActiveTool: any
}

const Canvas = ({ canvasRef, activeTool, handleActiveTool }: CanvasProps) => {
  const { isChangeViewBtnDisable } = useTryOnOutfitStore((state) => state)

  return (
    <div id='canvas' className='relative flex-1 w-full h-full'>
      <canvas ref={canvasRef} />

      <div className='absolute bottom-10 left-1/2 -translate-x-1/2 py-1 px-2 flex gap-1 rounded-md shadow-md'>
        {toolbar.map((item) => (
          <TooltipProvider key={item.id} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  key={item.id}
                  className={`w-10 h-10 p-0 ${activeTool === item.id ? 'bg-macaw/20' : 'bg-white'}`}
                  onClick={() => handleActiveTool(item.id)}
                >
                  <IconContext.Provider
                    value={{
                      color: `${activeTool === item.id ? '#1cb0f6' : '#000'}`,
                    }}
                  >
                    {item.icon}
                  </IconContext.Provider>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        <Button disabled={isChangeViewBtnDisable}>Change View</Button>
      </div>
    </div>
  )
}

export default Canvas
