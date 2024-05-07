import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import HTTPSTATUS from '~/constants/httpStatus'
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
    const result = await databaseService[type].find().toArray()
    res.json({
        result
    })
}
