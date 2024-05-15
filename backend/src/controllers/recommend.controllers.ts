import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import HTTPSTATUS from '~/constants/httpStatus'
import { RecommendReqBody } from '~/models/requests/request'
import dotenv from 'dotenv'
import databaseService from '~/services/database.services'
import { ObjectId } from 'mongodb'
import Clothes from '~/models/schemas/Clothes.schema'
dotenv.config()

export const recommendRandomController = async (
    req: Request<ParamsDictionary, any, RecommendReqBody>,
    res: Response,
    next: NextFunction
) => {
    const keys = Object.keys(req.body)
    const result: object = {}
    const imageUrl = `http://${process.env.DB_HOST + ':' + process.env.BACKEND_PORT || 'http://localhost:4000'}/api/static/images`

    for (const key of keys) {
        const values = req.body[key]
        const randomValue = values[Math.floor(Math.random() * values.length)]
        result[key] = `${imageUrl}/${key}/${randomValue}`
    }
    return res.status(HTTPSTATUS.ACCEPTED).json({
        message: 'Return outfit successfully',
        result
    })
}

export const recommendController = async (
    req: Request<ParamsDictionary, any, RecommendReqBody>,
    res: Response,
    next: NextFunction
) => {
    const keys = Object.keys(req.body)
    const result: object = {}
    for (const key of keys) {
        const values = req.body[key]
        const objectIds = values.map((id: string)=> new ObjectId(id))
        const infos = await databaseService[key].find({ _id: { $in: objectIds }}).toArray()
        result[key] = infos.map((info: Clothes) => info.clothId)
    }
    return res.status(HTTPSTATUS.ACCEPTED).json({
        message: 'Return outfit successfully',
        result
    })
}
