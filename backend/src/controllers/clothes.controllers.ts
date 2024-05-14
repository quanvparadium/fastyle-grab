import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.services'
import { axiosPython } from '~/constants/axios'

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
    const { search } = req.body
    console.log('Limit: ', limit)
    console.log('Pagination: ', typeof offset)
    console.log('Search query: ', search, ' -> Empty: ', search === '')
    if (search) {
        const payload = {
            query: (search as string).split('-').join(' '),
            category: type,
            topk: (parseInt(limit as string) + parseInt(offset as string)).toString()
        }
        const search_res = await axiosPython.post('/search', payload)
        const img_result = search_res.data.result
        const imgIds = img_result.map((id: string, index: number) => {
            return parseInt(id.split('.')[0] as string)
        })
        const matchArray = imgIds.map((clothId) => ({ clothId }))

        const aggregateQuery = [
            {
                $match: {
                    $or: matchArray
                }
            },
            {
                $addFields: {
                    __order: {
                        $indexOfArray: [imgIds.map(String), { $toString: '$clothId' }]
                    }
                }
            },
            { $sort: { __order: 1 } },
            { $skip: parseInt(offset as string) || 0 }, // Bỏ qua 2 giá trị từ đầu (vị trí 0 và 1)
            { $limit: parseInt(limit as string) || 30 } // Chỉ lấy 3 giá trị tiếp theo (vị trí 2, 3, 4)
        ]
        // If you don't want to sort result
        // ===>  const result = await databaseService[type].find({ clothId: { $in: imgIds } }).toArray()

        const result = await databaseService[type].aggregate(aggregateQuery).toArray()
        res.json(result)
    } else {
        const result = await databaseService[type]
            .find()
            .skip(parseInt(offset as string) || 0)
            .limit(parseInt(limit as string) || 30)
            .toArray()
        res.json({
            result
        })
    }
}
