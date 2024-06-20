import { Router } from 'express'
import { tryonController } from '~/controllers/tryon.controllers'
import { wrapAsync } from '~/utils/handler'

const tryonRouter = Router()

/**
 * Description: Require top-10 similar garment from input image and return buy link shop
 * Path: /api/try-on
 * Method: POST
 * Body: {
 *      base_url: string
 *      clothId: number
 *      clothUrl: string
 * }
 */

tryonRouter.post('/', tryonController)

export default tryonRouter
