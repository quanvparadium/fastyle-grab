import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import HTTPSTATUS from '~/constants/httpStatus'
import dotenv from 'dotenv'
dotenv.config()

export const tryonController = async (req: Request, res: Response, next: NextFunction) => {
    const { base_url, clothId, clothUrl } = req.body

    try {
        const result = await fetch(process.env.DOMAIN_FILE)
        const domain = await result.text()
        console.log('Domain: ', domain)

        // Try on AI
        const payload = {
            base: base_url,
            input_path: '/content/drive/MyDrive/tryon/input/',
            filename: `${clothId}.jpg`,
            clothUrl: clothUrl
        }
        try {
            const tryonResult = await axios.post(`${domain}/try-on/lower-body`, payload)
            console.log(tryonResult.data?.message || 'Message fault')
        } catch (error) {
            console.log('Try on fault')
        }

        const { data } = await axios.get(`${domain}/static/${clothId}.jpg`)
        console.log('Public url: ', data)
        return res.status(HTTPSTATUS.ACCEPTED).json({
            message: 'Try on',
            image_url: data['output']
        })
    } catch (error) {
        return res.status(HTTPSTATUS.BAD_REQUEST).json({
            message: 'Cannot get domain'
        })
    }

    // const result = axios.get()
}
