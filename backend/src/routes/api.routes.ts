import { Router } from 'express'
import { wrapAsync } from '~/utils/handler'
// import { loginValidator } from '~/middlewares/users.middlewares'
import { loginController } from '~/controllers/users.controllers'
const apiRouter = Router()

/**
 * Description: Login a user
 * Path: /api/login
 * Method: POST
 * Body: {username: string, password: string}
 */
apiRouter.post('/login', wrapAsync(loginController))

export default apiRouter
