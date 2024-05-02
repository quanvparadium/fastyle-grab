import express from 'express'
import { urlencoded, json } from 'body-parser'
import cors from 'cors'
import databaseService from './services/database.services'
import { defaultErrorHandler } from '~/middlewares/errors.middlewares'
import dotenv from 'dotenv'
import apiRouter from './routes/api.routes'
dotenv.config()

const app = express()
const port = process.env.BACKEND_PORT || 4000

databaseService.connect()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors())

// Router
// app.use('/', authRouter)
app.use('/api', apiRouter)

databaseService.close()
app.use(defaultErrorHandler)
app.listen(port, () => {
    console.log(`Backend đang lắng nghe tại http://localhost:${port}`)
})
