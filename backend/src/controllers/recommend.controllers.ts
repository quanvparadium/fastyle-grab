import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import HTTPSTATUS from '~/constants/httpStatus'
import { RecommendReqBody } from '~/models/requests/request'
import dotenv from 'dotenv'
dotenv.config()

export const recommendController = async (
    req: Request<ParamsDictionary, any, RecommendReqBody>,
    res: Response,
    next: NextFunction
) => {
    const keys = Object.keys(req.body)
    const result: object = {}
    const imageUrl = `http://${process.env.DB_HOST + ':' + process.env.BACKEND_PORT || 'http://localhost:4000'}/api/static/images`

    for (const key of keys) {
        console.log(key)
        const values = req.body[key]
        const randomValue = values[Math.floor(Math.random() * values.length)]
        result[key] = `${imageUrl}/${key}/${randomValue}`
    }
    return res.status(HTTPSTATUS.ACCEPTED).json({
        message: 'Return outfit successfully',
        result
    })
}
