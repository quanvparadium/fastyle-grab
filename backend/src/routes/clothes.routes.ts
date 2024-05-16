import { Router } from 'express'
import { getAllClothesController, getClothesController } from '~/controllers/clothes.controllers'
import { clothesValidator } from '~/middlewares/clothes.middlewares'
import { wrapAsync } from '~/utils/handler'
const clothesRouter = Router()

/**
 * Description: GET
 * Path: /api/login
 * Method: GET
 * Body: {username: string, password: string}
 */

clothesRouter.get('/:type/:id', clothesValidator, wrapAsync(getClothesController))

clothesRouter.post('/:type', clothesValidator, wrapAsync(getAllClothesController))

export default clothesRouter
