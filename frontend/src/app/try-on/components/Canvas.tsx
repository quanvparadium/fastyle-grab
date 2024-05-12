'use client'

import React from 'react'

interface CanvasProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
}

const Canvas = ({ canvasRef }: CanvasProps) => {
  return (
    <div id='canvas' className='relative flex-1 w-full h-full'>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Canvas
