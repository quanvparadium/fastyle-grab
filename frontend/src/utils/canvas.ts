import {
  CanvasKeyDown,
  CanvasKeyUp,
  CanvasMouseDown,
  CanvasMouseMove,
  CanvasMouseUp,
  CanvasMouseWheel,
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
  setActiveObject,
  tryOnOutfit,
  currentPointer,
  activeToolRef,
}: CanvasMouseDown) => {
  const target = canvas.findTarget(options.e, false)

  if (activeToolRef.current === 'hand') {
    options.e.preventDefault()
    const pointer = canvas.getPointer(options.e)
    currentPointer.current = { x: pointer.x, y: pointer.y }
    // Ngăn chặn việc chọn đối tượng trên canvas
    if (target) {
      canvas.discardActiveObject()
      canvas.requestRenderAll()
    }

    return
  }

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
    }
  } else {
    setActiveObject(null)
  }
}

export const handleCanvasMouseUp = ({
  options,
  activeToolRef,
}: CanvasMouseUp) => {}

export const handleCanvaseMouseMove = ({
  options,
  canvas,
  currentPointer,
  activeToolRef,
}: CanvasMouseMove) => {
  const event = options.e as MouseEvent

  if (activeToolRef.current === 'hand' && event.buttons === 1) {
    const pointer = canvas.getPointer(event)
    const deltaX = pointer.x - currentPointer.current.x
    const deltaY = pointer.y - currentPointer.current.y

    // Di chuyển canvas
    canvas.relativePan(new fabric.Point(deltaX, deltaY))

    // Di chuyển tất cả các đối tượng trong canvas
    canvas.forEachObject((obj) => {
      obj.left! += deltaX
      obj.top! += deltaY
      obj.setCoords() // Cập nhật tọa độ của đối tượng
    })

    // Vẽ lại canvas
    canvas.renderAll()
  }
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
    const minZoom = 0.8
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

export const handleCanvasKeyDown = ({
  e,
  canvas,
  setActiveTool,
}: CanvasKeyDown) => {
  if (e.code === 'KeyH') {
    setActiveTool('hand')
    return
  }
  if (e.code === 'KeyM') {
    setActiveTool('move')
    return
  }
}

export const handleCanvasKeyUp = ({ e, canvas }: CanvasKeyUp) => {}

export const handleRenderImage = ({ canvas, clothes }: RenderImage) => {
  fabric.Image.fromURL(clothes.view.default, (img) => {
    img.scaleToWidth(200)
    img.scaleToHeight(200)
    // @ts-ignore
    img.objectId = clothes._id
    canvas.current?.add(img)
  })
}
