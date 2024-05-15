'use client'

import Canvas from '@/app/try-on/components/Canvas'
import OutfitDrawer from '@/app/try-on/components/OutfitDrawer'
import ParameterSidebar from '@/app/try-on/components/ParameterSidebar'
import useTryOnOutfitStore from '@/store/tryonStore'
import {
  handleCanvasMouseDown,
  handleCanvasMouseWheel,
  handleCanvasSelectionCreated,
  initializeFabric,
} from '@/utils/canvas'
import React, { useEffect, useRef } from 'react'

const TryOn = () => {
  const { tryOnOutfit, setIsChangeViewBtnDisable, setActiveObject } =
    useTryOnOutfitStore((state) => state)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)

  useEffect(() => {
    // initialize the fabric canvas
    const canvas = initializeFabric({
      canvasRef,
      fabricRef,
    })

    /**
     * listen to the mouse down event on the canvas which is fired when the
     * user clicks on the canvas
     *
     * Event inspector: http://fabricjs.com/events
     * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
     */
    canvas.on('mouse:down', (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        setActiveObject,
        setIsChangeViewBtnDisable,
        tryOnOutfit,
      })
    })

    /**
     * listen to the selection created event on the canvas which is fired
     * when the user selects an object on the canvas.
     *
     * Event inspector: http://fabricjs.com/events
     * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
     */
    canvas.on('selection:created', (options) => {
      handleCanvasSelectionCreated({
        options,
        canvas,
        setActiveObject,
        setIsChangeViewBtnDisable,
        tryOnOutfit,
      })
    })

    /**
     * listen to the mouse wheel event on the canvas which is fired when
     * the user scrolls the mouse wheel on the canvas.
     *
     * Event inspector: http://fabricjs.com/events
     * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
     */
    canvas.on('mouse:wheel', (options) => {
      handleCanvasMouseWheel({
        options,
        canvas,
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
        <Canvas canvasRef={canvasRef} canvas={fabricRef} />

        <ParameterSidebar canvas={fabricRef} />
      </div>
    </div>
  )
}

export default TryOn
