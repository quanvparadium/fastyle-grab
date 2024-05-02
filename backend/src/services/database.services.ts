import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb'

import dotenv from 'dotenv'
dotenv.config()

class DatabaseService {
    private client: MongoClient
    private db: Db
    static instance: DatabaseService

    static getInstance() {
        if (DatabaseService.instance) {
            return DatabaseService.instance
        } else {
            DatabaseService.instance = new DatabaseService()
            return DatabaseService.instance
        }
    }

    constructor() {
        this.client = new MongoClient(process.env.DB_MONGO_LINK, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            }
        })
        this.db = this.client.db(process.env.DB_NAME)
    }
    async connect() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await this.client.connect()
            // Send a ping to confirm a successful connection
            await this.db.command({ ping: 1 })
            console.log('Pinged your deployment. You successfully connected to MongoDB!')
            console.log('Database name', process.env.DB_NAME)
        } catch (error) {
            console.log('Error', error)
            throw error
        }
    }

    async close() {
        await this.client.close()
    }
}

const databaseService = DatabaseService.getInstance()
export default databaseService
