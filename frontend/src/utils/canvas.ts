import {
  CanvasMouseDown,
  CanvasMouseWheel,
  CanvasSelectionCreated,
  RenderImage,
} from '@/types/canvas'
import { TryOnOutfit } from '@/types/product'
import { findClothesInTryOnById } from '@/utils/clothes'
import { fabric } from 'fabric'

// initialize fabric canvas
export const initializeFabric = ({
  fabricRef,
  canvasRef,
}: {
  fabricRef: React.MutableRefObject<fabric.Canvas | null>
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
}) => {
  // get canvas element
  const canvasElement = document.getElementById('canvas')

  // create fabric canvas
  const canvas = new fabric.Canvas(canvasRef.current, {
    width: canvasElement?.clientWidth,
    height: canvasElement?.clientHeight,
  })

  // set canvas reference to fabricRef so we can use it later anywhere outside canvas listener
  fabricRef.current = canvas

  return canvas
}

export const handleCanvasMouseDown = ({
  options,
  canvas,
  setIsChangeViewBtnDisable,
  setActiveObject,
  tryOnOutfit,
}: CanvasMouseDown) => {
  const target = canvas.findTarget(options.e, false)

  // Click vào object
  if (target) {
    // click vào image
    if (target instanceof fabric.Image) {
      // @ts-ignore
      const objectId = target.get('objectId')
      const clothes = findClothesInTryOnById(
        tryOnOutfit as TryOnOutfit,
        objectId,
      )

      setActiveObject(clothes)
      setIsChangeViewBtnDisable(false)
    }
  } else {
    setIsChangeViewBtnDisable(true)
    setActiveObject(null)
  }
}

export const handleCanvasSelectionCreated = ({
  options,
  canvas,
  setActiveObject,
  setIsChangeViewBtnDisable,
  tryOnOutfit,
}: CanvasSelectionCreated) => {
  if (!options?.selected) return
}

export const handleCanvasMouseWheel = ({
  options,
  canvas,
}: CanvasMouseWheel) => {
  const event = options.e as WheelEvent

  // Nếu nhấn kèm phím ctrl thì zoom
  if (event.ctrlKey) {
    const delta = event?.deltaY
    let zoom = canvas.getZoom()

    // allow zooming to min 20% and max 150%
    const minZoom = 0.2
    const maxZoom = 1.5
    const zoomStep = 0.001

    // calculate zoom based on mouse scroll wheel with min and max zoom
    zoom = Math.min(Math.max(minZoom, zoom - delta * zoomStep), maxZoom)

    // set zoom to canvas
    // zoomToPoint: http://fabricjs.com/docs/fabric.Canvas.html#zoomToPoint
    canvas.zoomToPoint({ x: event.offsetX, y: event.offsetY }, zoom)

    event.preventDefault()
    event.stopPropagation()
  }
}

export const handleRenderImage = ({ canvas, clothes }: RenderImage) => {
  fabric.Image.fromURL(clothes.view.default, (img) => {
    img.scaleToWidth(200)
    img.scaleToHeight(200)
    // @ts-ignore
    img.objectId = clothes._id
    canvas.current?.add(img)
  })
}
