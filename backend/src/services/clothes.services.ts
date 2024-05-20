import { cloneWith } from "lodash";
import databaseService from "./database.services";
import fs from 'fs'

class ClothesService {
    async getClothID(category: string) {
        const result = await databaseService[category].distinct('clothId')
        console.log(result)
        return result
    }

    async saveClothID() {
        let clothIDs = {}
        const typeCloth = ['topwear', 'headwear', 'bottomwear', 'footwear', 'dress', 'others']
        for (const cate of typeCloth) {
            console.log("Processing ", cate)
            const result = await this.getClothID(cate)
            clothIDs[cate] = result
            console.log('DONE', (result as number[]).length)
        } 
        fs.writeFileSync('clothIDs.json', JSON.stringify(clothIDs))
    }

}

const clothesService = new ClothesService()
export default clothesService