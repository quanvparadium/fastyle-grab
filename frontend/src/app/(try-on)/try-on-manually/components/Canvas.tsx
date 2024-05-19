'use client'

import { Button } from '@/components/ui/button'
import { toolbar } from '@/constants/try-on-manually'
import React from 'react'
import { IconContext } from 'react-icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useTryOnOutfitStore from '@/store/tryOnManuallyStore'
import { fabric } from 'fabric'

interface CanvasProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
  canvas: React.MutableRefObject<fabric.Canvas | null>
}

const Canvas = ({ canvasRef, canvas }: CanvasProps) => {
  const { activeTool, setActiveTool } = useTryOnOutfitStore((state) => state)

  return (
    <div id='canvas' className='relative flex-1 w-full h-full'>
      <canvas ref={canvasRef} />

      <div className='absolute bg-white bottom-10 left-1/2 -translate-x-1/2 py-1 px-2 flex gap-1 rounded-md shadow-md'>
        {toolbar.map((item) => (
          <TooltipProvider key={item.id} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={`w-10 h-10 p-0 ${activeTool === item.id ? 'bg-primary' : 'bg-white'}`}
                  onClick={() => setActiveTool(item.id)}
                >
                  <IconContext.Provider
                    value={{
                      color: `${activeTool === item.id ? '#fff' : '#000'}`,
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
      </div>
    </div>
  )
}

export default Canvas
