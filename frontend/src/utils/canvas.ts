import { CanvasMouseDown, RenderImage } from '@/types/canvas'
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
}: CanvasMouseDown) => {
  /**
   * get target object i.e., the object that is clicked
   * findtarget() returns the object that is clicked
   *
   * findTarget: http://fabricjs.com/docs/fabric.Canvas.html#findTarget
   */
  const target = canvas.findTarget(options.e, false)

  setIsChangeViewBtnDisable(true)

  if (target) {
    if (target instanceof fabric.Group) {
    } else {
      setIsChangeViewBtnDisable(false)
    }
  }
}

export const handleRenderImage = ({ canvas, clothes }: RenderImage) => {
  fabric.Image.fromURL(clothes.view.default, (img) => {
    img.scaleToWidth(200)
    img.scaleToHeight(200)

    canvas.current?.add(img)
  })
}
