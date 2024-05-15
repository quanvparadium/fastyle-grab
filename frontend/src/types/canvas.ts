import { Clothes, TryOnOutfit } from '@/types/product'
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
  setActiveObject: any
  tryOnOutfit: TryOnOutfit | null
}

export type CanvasSelectionCreated = {
  options: fabric.IEvent
  canvas: fabric.Canvas
  tryOnOutfit: TryOnOutfit | null
  setIsChangeViewBtnDisable: any
  setActiveObject: any
}

export type CanvasMouseWheel = {
  options: fabric.IEvent
  canvas: fabric.Canvas
}

export type RenderImage = {
  canvas: React.MutableRefObject<fabric.Canvas | null>
  clothes: Clothes
}
