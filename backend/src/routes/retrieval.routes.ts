import { Router } from 'express'
import { retrievalController } from '~/controllers/recommend.controllers'
import { wrapAsync } from '~/utils/handler'

const retrievalRouter = Router()

/**
 * Description: Require top-10 similar garment from input image and return buy link shop
 * Path: /api/retrieval/:type/:image-id
 * Method: GET
 */

retrievalRouter.get('/:type/:cloth_id', wrapAsync(retrievalController))

export default retrievalRouter
