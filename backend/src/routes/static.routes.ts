import { Router } from 'express'
import { serveImageController } from '~/controllers/static.controllers'
import { clothesValidator } from '~/middlewares/clothes.middlewares'

const staticRouter = Router()

staticRouter.get('/images/:type/:id', clothesValidator, serveImageController)

export default staticRouter
