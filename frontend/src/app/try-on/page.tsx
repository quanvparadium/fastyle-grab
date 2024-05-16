'use client'

import Canvas from '@/app/try-on/components/Canvas'
import OutfitDrawer from '@/app/try-on/components/OutfitDrawer'
import ParameterSidebar from '@/app/try-on/components/ParameterSidebar'
import useTryOnOutfitStore from '@/store/tryonStore'
import { Pointer, Toolbar } from '@/types/canvas'
import {
  handleCanvasKeyDown,
  handleCanvasKeyUp,
  handleCanvasMouseDown,
  handleCanvasMouseUp,
  handleCanvasMouseWheel,
  handleCanvasResize,
  handleCanvaseMouseMove,
  initializeFabric,
} from '@/utils/canvas'
import React, { useEffect, useRef } from 'react'

const TryOn = () => {
  const {
    tryOnOutfit,
    activeTool,

    setActiveObject,
    setActiveTool,
  } = useTryOnOutfitStore((state) => state)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)

  const currentPointer = useRef<Pointer>({ x: 0, y: 0 })
  const activeToolRef = useRef<Toolbar>(activeTool)

  activeToolRef.current = activeTool

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
        tryOnOutfit,
        currentPointer,
        activeToolRef,
      })
    })

    /**
     * listen to the mouse up event on the canvas
     *
     * Event inspector: http://fabricjs.com/events
     * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
     */
    canvas.on('mouse:up', (options) => {
      handleCanvasMouseUp({
        options,
        activeToolRef,
      })
    })

    /**
     * listen to the mouse move event on the canvas which is fired when the
     * user moves the mouse on the canvas
     *
     * Event inspector: http://fabricjs.com/events
     * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
     */
    canvas.on('mouse:move', (options) => {
      handleCanvaseMouseMove({
        options,
        canvas,
        currentPointer,
        activeToolRef,
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

    /**
     * listen to the resize event on the window which is fired when the
     * user resizes the window.
     *
     * We're using this to resize the canvas when the user resizes the
     * window.
     */
    window.addEventListener('resize', () => {
      handleCanvasResize({
        canvas: fabricRef.current,
      })
    })

    /**
     * listen to the key down event on the window which is fired when the
     * user presses a key on the keyboard.
     *
     */
    window.addEventListener('keydown', (e) =>
      handleCanvasKeyDown({
        e,
        canvas,
        setActiveTool,
      }),
    )

    window.addEventListener('keyup', (e) =>
      handleCanvasKeyUp({
        e,
        canvas,
      }),
    )

    return () => {
      /**
       * dispose is a method provided by Fabric that allows you to dispose
       * the canvas. It clears the canvas and removes all the event
       * listeners
       *
       * dispose: http://fabricjs.com/docs/fabric.Canvas.html#dispose
       */
      canvas.dispose()

      window.removeEventListener('resize', () => {
        handleCanvasResize({
          canvas: null,
        })
      })

      window.removeEventListener('keydown', (e) =>
        handleCanvasKeyDown({
          e,
          canvas,
          setActiveTool,
        }),
      )

      window.removeEventListener('keyup', (e) =>
        handleCanvasKeyUp({
          e,
          canvas,
        }),
      )
    }
  }, [canvasRef])

  // handle change pointer shape
  useEffect(() => {
    if (fabricRef.current) {
      switch (activeTool) {
        case 'hand':
          fabricRef.current.defaultCursor = 'grab'
          break
        case 'move':
          fabricRef.current.defaultCursor = 'default'
          break
      }
    }
  }, [fabricRef.current, activeTool])

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
