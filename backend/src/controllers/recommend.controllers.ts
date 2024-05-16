import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import HTTPSTATUS from '~/constants/httpStatus'
import { RecommendReqBody } from '~/models/requests/request'
import dotenv from 'dotenv'
import databaseService from '~/services/database.services'
import { Collection, ObjectId } from 'mongodb'
import Clothes from '~/models/schemas/Clothes.schema'
import { axiosPython } from '~/constants/axios'
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
    const queryPython: object = {}
    for (const key of keys) {
        const values = req.body[key]
        const objectIds = values.map((id: string) => new ObjectId(id))
        const infos = await databaseService[key].find({ _id: { $in: objectIds } }).toArray()
        queryPython[key] = infos.map((info: Clothes) => info.clothId)
    }
    // console.log(typeof (queryPython as any).topwear)
    // console.log((queryPython as any).topwear)
    // for (const value of (queryPython as any).topwear) {
    //     console.log('Value: ', typeof value)
    // }
    const outfits = await axiosPython.post('/api/recommended', JSON.parse(JSON.stringify(queryPython)))
    const data = outfits?.data
    const result: object[] = []
    for (const outfit of data.outfit) {
        const viewOutfit: object = {}
        for (const key of Object.keys(outfit)) {
            const garment: Clothes = await (databaseService[key] as Collection<Clothes>).findOne({
                clothId: outfit[key]
            })
            // console.log(garment)
            const imageUrl: object = {}
            imageUrl['original'] = garment.view
            viewOutfit[key] = imageUrl
        }
        result.push(viewOutfit)
    }

    return res.status(HTTPSTATUS.ACCEPTED).json({
        message: data.message,
        outfit: result
    })
}
