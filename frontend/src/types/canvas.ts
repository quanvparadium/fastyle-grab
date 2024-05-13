import { Clothes } from '@/types/product'
import React from 'react'

export type Toolbar = {
  id: string
  name: string
  icon: React.ReactNode
}

export type CanvasMouseDown = {
  options: fabric.IEvent
  canvas: fabric.Canvas
  setIsChangeViewBtnDisable: any
}

export type RenderImage = {
  canvas: React.MutableRefObject<fabric.Canvas | null>
  clothes: Clothes
}
