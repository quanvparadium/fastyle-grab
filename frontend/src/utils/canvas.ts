import { positionDefault } from '@/constants/try-on-manually'
import {
  CanvasDeleteObject,
  CanvasKeyDown,
  CanvasKeyUp,
  CanvasMouseDown,
  CanvasMouseMove,
  CanvasMouseUp,
  CanvasMouseWheel,
  CanvasObjectMoving,
  CanvasObjectScaling,
  RenderImage,
} from '@/types/canvas'
import { Clothes } from '@/types/product'
import { convertClothCategoryToCategoryID } from '@/utils/product'
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
  currentPointer,
  activeToolRef,
  setActiveObjectAttribute,
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
      const clothes: Clothes = target.get('clothes')

      setActiveObject(clothes)

      // Lấy các thuộc tính của đối tượng
      const x = target.left ?? 0
      const y = target.top ?? 0
      const width = (target.width ?? 0) * (target.scaleX ?? 1)
      const height = (target.height ?? 0) * (target.scaleY ?? 1)

      // Cập nhật các thuộc tính của đối tượng đang hoạt động
      setActiveObjectAttribute({
        x,
        y,
        width,
        height,
      })
    }
  } else {
    setActiveObject(null)
  }
}

export const handleCanvasMouseUp = ({
  options,
  activeToolRef,
}: CanvasMouseUp) => {}

export const handleCanvasMouseMove = ({
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

export const handleCanvasObjectMoving = ({
  options,
  canvas,
  setActiveObjectAttribute,
}: CanvasObjectMoving) => {
  const activeObject = canvas.getActiveObject()

  // Kiểm tra xem có một đối tượng được chọn và không phải là một nhóm
  if (activeObject && !activeObject.isType('group')) {
    // Thực hiện hành động khi chỉ có một đối tượng duy nhất được chọn và không phải là một nhóm

    const x = activeObject.left ?? 0
    const y = activeObject.top ?? 0
    const width = (activeObject.width ?? 0) * (activeObject.scaleX ?? 1)
    const height = (activeObject.height ?? 0) * (activeObject.scaleY ?? 1)

    // Cập nhật các thuộc tính của đối tượng đang hoạt động
    setActiveObjectAttribute({
      x,
      y,
      width,
      height,
    })
  }
}

export const handleCanvasObjectScaling = ({
  options,
  canvas,
  setActiveObjectAttribute,
}: CanvasObjectScaling) => {
  const activeObject = canvas.getActiveObject()

  // Kiểm tra xem có một đối tượng được chọn và không phải là một nhóm
  if (activeObject && !activeObject.isType('group')) {
    // Thực hiện hành động khi chỉ có một đối tượng duy nhất được chọn và không phải là một nhóm

    const x = activeObject.left ?? 0
    const y = activeObject.top ?? 0
    const width = (activeObject.width ?? 0) * (activeObject.scaleX ?? 1)
    const height = (activeObject.height ?? 0) * (activeObject.scaleY ?? 1)

    // Cập nhật các thuộc tính của đối tượng đang hoạt động
    setActiveObjectAttribute({
      x,
      y,
      width,
      height,
    })
  }
}

export const handleCanvasKeyDown = ({
  e,
  canvas,
  setActiveTool,
}: CanvasKeyDown) => {
  switch (e.code) {
    case 'KeyH':
      setActiveTool('hand')
      break
    case 'KeyH':
      setActiveTool('move')
      break
    case 'Delete':
      handleCanvasDeleteObject({ canvas })
      break
    default:
      break
  }
}

export const handleCanvasKeyUp = ({ e, canvas }: CanvasKeyUp) => {}

export const handleRenderImage = ({ canvas, clothes }: RenderImage) => {
  fabric.Image.fromURL(clothes?.view?.default, (img) => {
    img.scaleToWidth(200)
    img.scaleToHeight(200)
    // @ts-ignore
    img.clothes = clothes
    // Đặt vị trí cho hình ảnh
    const categoryID = convertClothCategoryToCategoryID(clothes?.clothCategory)
    img.set({
      top: positionDefault[categoryID].top,
      left: positionDefault[categoryID].left,
    })

    canvas.current?.add(img)
  })
}

const handleCanvasDeleteObject = ({ canvas }: CanvasDeleteObject) => {
  const activeObjects = canvas.getActiveObjects() // Lấy các đối tượng đang được chọn
  if (activeObjects.length) {
    activeObjects.forEach((object) => {
      canvas.remove(object) // Xóa từng đối tượng
    })
    canvas.discardActiveObject() // Bỏ chọn các đối tượng sau khi xóa
    canvas.requestRenderAll() // Cập nhật lại canvas
  }
}
