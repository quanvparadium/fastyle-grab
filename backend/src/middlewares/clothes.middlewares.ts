import { checkSchema } from 'express-validator'
import HTTPSTATUS from '~/constants/httpStatus'
import { CLOTHES_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'
export const clothesValidator = validate(
    checkSchema(
        {
            type: {
                custom: {
                    options: async (value) => {
                        const typeCloth = ['topwear', 'headwear', 'bottomwear', 'footwear', 'dress', 'others']
                        if (!typeCloth.includes(value)) {
                            throw new ErrorWithStatus({
                                message: CLOTHES_MESSAGES.NOT_EXIST_CATEGORY,
                                status: HTTPSTATUS.UNAUTHORIZED
                            })
                        }
                    }
                }
            }
        },
        ['params']
    )
)
