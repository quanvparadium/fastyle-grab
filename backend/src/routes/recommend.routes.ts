import { Router } from 'express'
import { recommendController } from '~/controllers/recommend.controllers'
import { wrapAsync } from '~/utils/handler'

const recommendRouter = Router()

/**
 * Description: Require top-3 outfit from user input
 * Path: /api/recommend
 * Method: POST
 * Body: {
 *      topwear: [id1, id2, id3, id4],
 *      headwear: [id1, id2, id3, id4],
 *      bottomwear: [id1, id2, id3, id4],
 *      footwear: [id1, id2, id3, id4]
 * }
 */

recommendRouter.post('/', wrapAsync(recommendController))

export default recommendRouter
