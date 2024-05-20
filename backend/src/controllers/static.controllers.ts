import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import path from 'path'
import HTTPSTATUS from '~/constants/httpStatus'
import databaseService from '~/services/database.services'

export const serveImageController = async (req: Request, res: Response, next: NextFunction) => {
    const { type, id } = req.params
<<<<<<< HEAD
    const result = await databaseService[type].findOne({ _id: new ObjectId(id) })
    const { clothId } = result
    return res.sendFile(path.resolve(`${process.env.DATAPATH}/images`, clothId + '.jpg'), (err) => {
        if (err) {
            res.status(HTTPSTATUS.NOT_FOUND).send('Image not found')
        }
    })
=======
    if (['yame', 'yody'].includes(type)) {
        console.log(path.resolve(`${process.env.CRAWLPATH}/crawl/${type}`, `${type}_${id}.jpg`))
        return res.sendFile(path.resolve(`${process.env.CRAWLPATH}/crawl/${type}`, `${type}_${id}.jpg`), (err) => {
            if (err) {
                res.status(HTTPSTATUS.NOT_FOUND).send(`Image shop ${type} not found`)
            }
        })
    } else {
        const result = await databaseService[type].findOne({ _id: new ObjectId(id) })
        const { clothId } = result
        return res.sendFile(path.resolve(`${process.env.DATAPATH}/images`, clothId + '.jpg'), (err) => {
            if (err) {
                res.status(HTTPSTATUS.NOT_FOUND).send('Image not found')
            }
        })
    }
>>>>>>> backend
}
