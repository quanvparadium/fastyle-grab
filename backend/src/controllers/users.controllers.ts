import { NextFunction, Request, Response } from 'express'
import HTTPSTATUS from '~/constants/httpStatus'

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(HTTPSTATUS.ACCEPTED).json({
        message: 'Login successfully',
    })
}