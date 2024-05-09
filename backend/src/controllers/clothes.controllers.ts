import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.services'

export const getClothesController = async (req: Request, res: Response, next: NextFunction) => {
    const { type, id } = req.params
    console.log(id)
    const result = await databaseService[type].findOne({ _id: new ObjectId(id) })
    res.json({
        result
    })
}

export const getAllClothesController = async (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.params
    const { limit, offset } = req.query
    console.log('Limit: ', limit)
    console.log('Pagination: ', typeof offset)
    const result = await databaseService[type]
        .find()
        .skip(parseInt(offset as string) || 0)
        .limit(parseInt(limit as string) || 30)
        .toArray()
    res.json({
        result
    })
}
