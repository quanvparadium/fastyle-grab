import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import HTTPSTATUS from '~/constants/httpStatus'
import { RecommendReqBody } from '~/models/requests/request'
import dotenv from 'dotenv'
import databaseService from '~/services/database.services'
import { Collection, ObjectId } from 'mongodb'
import Clothes from '~/models/schemas/Clothes.schema'
import { axiosPython } from '~/constants/axios'
import { capitalize } from '~/utils/utils'
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

export const retrievalController = async (
    req: Request<ParamsDictionary, any, RecommendReqBody>,
    res: Response,
    next: NextFunction
) => {
    const { type, cloth_id } = req.params
    console.log(typeof cloth_id)
    const clothes = await (databaseService[type] as Collection<Clothes>).findOne({
        _id: new ObjectId(cloth_id)
    })
    // console.log(imageId)
    const payload = {
        imageUrl: `${clothes.clothId}.jpg`,
        category: type,
        topk: 20
    }
    console.log(payload)
    const retrieval = await axiosPython.post('/api/retrieval', {
        ...payload
    })
    console.log(retrieval)
    const result: string[] = retrieval.data?.result || []
    const imageIds = []
    console.log(result)
    const infos = result.map((image: string, idx) => {
        const [shop, imageId] = image.split('_').slice(0, 2)
        imageId
            ? imageIds.push(parseInt(imageId.split('.')[0] as string))
            : imageIds.push(parseInt(shop.split('.')[0] as string))
        return imageId
            ? {
                  shop: capitalize(shop as string),
                  clothId: parseInt(imageId.split('.')[0] as string)
                  //   rank: idx + 1
              }
            : {
                  shop: 'Myntra',
                  clothId: parseInt(shop.split('.')[0] as string)
                  //   rank: idx + 1
              }
    })
    console.log(infos)
    const metadata = await databaseService.buylink.find({ $or: infos }).toArray()
    // console.log('Metadata: ', metadata.slice(0, 10))
    return res.status(HTTPSTATUS.ACCEPTED).json({
        message: 'Return outfit successfully',
        result: metadata
    })
}
