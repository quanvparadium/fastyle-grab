import { Router } from 'express'
import { wrapAsync } from '~/utils/handler'
// import { loginValidator } from '~/middlewares/users.middlewares'
import { loginController } from '~/controllers/users.controllers'
import clothesRouter from './clothes.routes'
import staticRouter from './static.routes'
import recommendRouter from './recommend.routes'
import { buyLinkShop, buyLinkCrawl } from '~/utils/updatedb'
import retrievalRouter from './retrieval.routes'
import tryonRouter from './tryon.routes'
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
apiRouter.use('/retrieval', retrievalRouter)
apiRouter.use('/try-on', tryonRouter)

apiRouter.route('/buylink').post(async (req, res) => {
    const { shop } = req.body
    // const result = await buyLinkShop(shop)
    const result = await buyLinkCrawl(shop)
    return res.json({
        message: 'OK',
        result
    })
})

export default apiRouter
