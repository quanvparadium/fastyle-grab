import fs from 'fs'
import path from 'path'
import databaseService from '~/services/database.services'

import dotenv from 'dotenv'
import { getName, random } from './utils'
dotenv.config()

export async function buyLinkShop(shopName: string = 'Myntra') {
    const stylesPath = path.join(process.env.DATAPATH, 'styles')
    const imagesPath = path.join(process.env.DATAPATH, 'images')
    const files = fs.readdirSync(stylesPath).sort(getName)
    const totalFile = files.length
    const images = fs.readdirSync(imagesPath).sort(getName)
    const exist: { [key: string]: number } = {}
    const insertedReference = []
    for (const image of images) {
        exist[image.split('.')[0]] = 1
    }
    console.log(Object.keys(exist).length)
    console.log(images.length)
    for (const [idx, file] of files.entries()) {
        console.log('================================')
        console.log(`Index ${idx}/${totalFile}`)
        const filePath = `${stylesPath}/${file}`
        const jsonData = fs.readFileSync(filePath, 'utf8')
        try {
            exist[file.split('.')[0]]
        } catch (error) {
            console.log('Fault: ', file)
            continue
        }
        const data = JSON.parse(jsonData)
        const styleImage = data['data']['styleImages']
        const colours = data['data'].colours?.colors
        const colorOption = []
        for (const colourId in colours) {
            if (Object.prototype.hasOwnProperty.call(colours, colourId)) {
                const color = colours[colourId]
                colorOption.push({
                    baseColour: color.global_attr_base_colour,
                    imageUrls: [color.search_image]
                })
            }
        }
        const payload = {
            shop: shopName,
            clothId: data['data']['id'],
            clothName: data['data']['productDisplayName'],
            clothCategory: (data['data'].subCategory?.typeName as string).toLowerCase(),
            price: data['data']['price'],
            colour: data.data.baseColour,
            view: {
                default: styleImage.default?.resolutions['1080X1440'],
                left: styleImage.left?.resolutions['1080X1440'],
                right: styleImage.right?.resolutions['1080X1440'],
                front: styleImage.front?.resolutions['1080X1440'],
                back: styleImage.back?.resolutions['1080X1440'],
                top: styleImage.top?.resolutions['1080X1440']
            },
            colorOption: colorOption,
            referenceLink: `https://www.myntra.com/${data.data.landingPageUrl}` || '',
            review: {
                count: random(3000, idx),
                avg: random(3000, idx) / (random(3000, idx) + random(500, idx))
            }
        }
        /**
         * If you don't have buylink collection, let run below code
         * insertedReference.push(payload)
         */
        break
    }

    try {
        const result = await databaseService.buylink.insertMany(insertedReference)
        const { acknowledged, insertedCount } = result
        return {
            acknowledged,
            insertedCount
        }
    } catch (error) {
        return {
            acknowledged: false,
            insertedCount: 0
        }
    }
}
