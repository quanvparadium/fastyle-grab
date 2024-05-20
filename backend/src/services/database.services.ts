import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb'

import dotenv from 'dotenv'
import Clothes from '~/models/schemas/Clothes.schema'
<<<<<<< HEAD
=======
import ReferenceShop from '~/models/schemas/Reference.schema'
>>>>>>> backend
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
                strict: false,
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

    get headwear(): Collection<Clothes> {
        return this.db.collection((process.env.DB_HEADWEAR_COLLECTION as string) || 'headwear')
    }

    get topwear(): Collection<Clothes> {
        return this.db.collection((process.env.DB_TOPWEAR_COLLECTION as string) || 'headwear')
    }

    get bottomwear(): Collection<Clothes> {
        return this.db.collection((process.env.DB_BOTTOMWEAR_COLLECTION as string) || 'bottomwear')
    }

    get footwear(): Collection<Clothes> {
        return this.db.collection((process.env.DB_FOOTWEAR_COLLECTION as string) || 'footwear')
    }

    get dress(): Collection<Clothes> {
        return this.db.collection((process.env.DB_DRESS_COLLECTION as string) || 'dress')
    }

    get others(): Collection<Clothes> {
        return this.db.collection((process.env.DB_OTHERS_COLLECTION as string) || 'others')
    }

<<<<<<< HEAD
=======
    get buylink(): Collection<ReferenceShop> {
        return this.db.collection((process.env.DB_REFERENCE_SHOP as string) || 'buylink')
    }

>>>>>>> backend
    async close() {
        await this.client.close()
    }
}

const databaseService = DatabaseService.getInstance()
export default databaseService
