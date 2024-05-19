import { Router } from 'express'
import { retrievalController } from '~/controllers/recommend.controllers'
import { clothesValidator } from '~/middlewares/clothes.middlewares'
import { wrapAsync } from '~/utils/handler'

const retrievalRouter = Router()

/**
 * Description: Require top-10 similar garment from input image and return buy link shop
 * Path: /api/retrieval/:type/:image-id
 * Method: GET
 */

retrievalRouter.get('/:type/:cloth_id', clothesValidator, wrapAsync(retrievalController))

export default retrievalRouter
