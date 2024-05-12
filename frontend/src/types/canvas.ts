import { Clothes } from '@/types/product'

export type CanvasMouseDown = {
  canvas: fabric.Canvas
}

export type RenderImage = {
  canvas: React.MutableRefObject<fabric.Canvas | null>
  clothes: Clothes
}
