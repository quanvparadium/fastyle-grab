'use client'

import Canvas from '@/app/try-on/components/Canvas'
import OutfitDrawer from '@/app/try-on/components/OutfitDrawer'
import ParameterSidebar from '@/app/try-on/components/ParameterSidebar'
import useTryOnOutfitStore from '@/store/tryonStore'
import { handleCanvasMouseDown, initializeFabric } from '@/utils/canvas'
import React, { useEffect, useRef, useState } from 'react'

const TryOn = () => {
  const [activeTool, setActiveTool] = useState<string>('move')
  const { setIsChangeViewBtnDisable } = useTryOnOutfitStore((state) => state)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)

  const handleActiveTool = (ele: string) => {
    setActiveTool(ele)
    console.log('ele', ele)
  }

  useEffect(() => {
    // initialize the fabric canvas
    const canvas = initializeFabric({
      canvasRef,
      fabricRef,
    })

    canvas.on('mouse:down', function (options) {
      handleCanvasMouseDown({
        options,
        canvas,
        setIsChangeViewBtnDisable,
      })
    })

    return () => {
      /**
       * dispose is a method provided by Fabric that allows you to dispose
       * the canvas. It clears the canvas and removes all the event
       * listeners
       *
       * dispose: http://fabricjs.com/docs/fabric.Canvas.html#dispose
       */
      canvas.dispose()
    }
  }, [canvasRef])

  return (
    <div className='w-full h-full relative'>
      <OutfitDrawer canvas={fabricRef} />

      <div className='h-full flex'>
        <Canvas
          canvasRef={canvasRef}
          activeTool={activeTool}
          handleActiveTool={handleActiveTool}
        />

        <ParameterSidebar />
      </div>
    </div>
  )
}

export default TryOn
