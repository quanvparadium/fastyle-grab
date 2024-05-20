import express from 'express'
import { urlencoded, json } from 'body-parser'
import cors from 'cors'
import databaseService from './services/database.services'
import { defaultErrorHandler } from '~/middlewares/errors.middlewares'
import dotenv from 'dotenv'
import apiRouter from './routes/api.routes'
import { createData } from './utils/initialdb'
<<<<<<< HEAD
=======
import clothesService from './services/clothes.services'
>>>>>>> backend
dotenv.config()

const app = express()
const port = process.env.BACKEND_PORT || 4000

databaseService.connect()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors())

// console.log(clothesService.getClothID('topwear'))
// clothesService.saveClothID()
// Router
// app.use('/', authRouter)
app.use('/api', apiRouter)
// createData()

databaseService.close()
app.use(defaultErrorHandler)
app.listen(port, () => {
    console.log(`Backend đang lắng nghe tại http://localhost:${port}`)
})
