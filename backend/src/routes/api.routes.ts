import { Router } from 'express'
import { wrapAsync } from '~/utils/handler'
// import { loginValidator } from '~/middlewares/users.middlewares'
import { loginController } from '~/controllers/users.controllers'
import clothesRouter from './clothes.routes'
import staticRouter from './static.routes'
import recommendRouter from './recommend.routes'
const apiRouter = Router()

/**
 * Description: Login a user
 * Path: /api/login
 * Method: POST
 * Body: {username: string, password: string}
 */
apiRouter.post('/login', wrapAsync(loginController))

apiRouter.use('/clothes', clothesRouter)
apiRouter.use('/static', staticRouter)
apiRouter.use('/recommend', recommendRouter)

export default apiRouter
