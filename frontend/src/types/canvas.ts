import { Clothes } from '@/types/product'
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
  setActiveObjectAttribute: any
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

export type CanvasObjectMoving = {
  options: fabric.IEvent
  canvas: fabric.Canvas
  setActiveObjectAttribute: any
}

export type CanvasObjectScaling = {
  options: fabric.IEvent
  canvas: fabric.Canvas
  setActiveObjectAttribute: any
}

export type CanvasKeyDown = {
  e: KeyboardEvent
  canvas: fabric.Canvas
  setActiveTool: (type: Toolbar) => void
}

export type CanvasKeyUp = {
  e: KeyboardEvent
  canvas: fabric.Canvas
}

export type CanvasDeleteObject = {
  canvas: fabric.Canvas
}

export type RenderImage = {
  canvas: React.MutableRefObject<fabric.Canvas | null>
  clothes: Clothes
}

export type Attribute = {
  x: number
  y: number
  width: number
  height: number
}
