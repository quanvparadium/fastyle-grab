import { Request, Response, NextFunction, RequestHandler } from 'express'

export const wrapAsync = (func: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next)
        } catch (error) {
            console.log('Error handler in here')
            next(error)
        }
    }
}