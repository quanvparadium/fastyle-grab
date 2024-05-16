import { Clothes, TryOnOutfit } from '@/types/product'
import React from 'react'

export type Toolbar = 'move' | 'hand'

export type Pointer = {
  x: number
  y: number
}

export type CanvasMouseDown = {
  options: fabric.IEvent
  canvas: fabric.Canvas
  setActiveObject: any
  tryOnOutfit: TryOnOutfit | null
  currentPointer: React.MutableRefObject<Pointer>
  activeToolRef: React.MutableRefObject<Toolbar>
}

export type CanvasMouseUp = {
  options: fabric.IEvent
  activeToolRef: React.MutableRefObject<Toolbar>
}

export type CanvasMouseMove = {
  options: fabric.IEvent
  canvas: fabric.Canvas
  currentPointer: React.MutableRefObject<Pointer>
  activeToolRef: React.MutableRefObject<Toolbar>
}

export type CanvasMouseWheel = {
  options: fabric.IEvent
  canvas: fabric.Canvas
}

export type CanvasKeyDown = {
  e: KeyboardEvent
  canvas: fabric.Canvas | any
  setActiveTool: (type: Toolbar) => void
}

export type CanvasKeyUp = {
  e: KeyboardEvent
  canvas: fabric.Canvas
}

export type RenderImage = {
  canvas: React.MutableRefObject<fabric.Canvas | null>
  clothes: Clothes
}
