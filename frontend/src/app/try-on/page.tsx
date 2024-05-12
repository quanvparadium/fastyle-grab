'use client'

import Canvas from '@/app/try-on/components/Canvas'
import OutfitDrawer from '@/app/try-on/components/OutfitDrawer'
import ParameterSidebar from '@/app/try-on/components/ParameterSidebar'
import { initializeFabric } from '@/utils/canvas'
import React, { useEffect, useRef } from 'react'

const TryOn = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)

  useEffect(() => {
    // initialize the fabric canvas
    const canvas = initializeFabric({
      canvasRef,
      fabricRef,
    })

    canvas.on('mouse:down', function (options) {})

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
        <Canvas canvasRef={canvasRef} />

        <ParameterSidebar />
      </div>
    </div>
  )
}

export default TryOn
