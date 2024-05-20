import fs from 'fs'
import path from 'path'
import databaseService from '~/services/database.services'

import dotenv from 'dotenv'
import { getName, random } from './utils'
dotenv.config()
function convertToVietnamese(text) {
    // Sử dụng TextDecoder để giải mã chuỗi
    return new TextDecoder('utf-8').decode(new Uint8Array(text.split('').map((char) => char.charCodeAt(0))))
}

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
        const clothCategory = data['data'].subCategory?.typeName
        let clothType = ''
        if (clothCategory === 'Topwear') {
            clothType = 'topwear'
        } else if (clothCategory === 'Headwear') {
            clothType = 'headwear'
        } else if (clothCategory === 'Bottomwear') {
            clothType = 'bottomwear'
        } else if (clothCategory === 'Dress') {
            clothType = 'dress'
        } else if (['Shoes', 'Sandal', 'Flip Flops'].includes(clothCategory)) {
            clothType = 'footwear'
        } else if (['Bags', 'Gloves', 'Watches', 'Jewellery'].includes(clothCategory)) {
            clothType = 'others'
        }
        if (clothType === '') continue
        const payload = {
            shop: shopName,
            clothId: data['data']['id'],
            clothName: data['data']['productDisplayName'],
            clothCategory: clothType,
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
        // insertedReference.push(payload)
        // break
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

export async function buyLinkCrawl(shopName: string = 'Yody') {
    const imagesPath = path.join(process.env.CRAWLPATH, 'crawl', shopName.toLowerCase())
    const stylesPath = path.join(
        process.env.CRAWLPATH,
        'infos',
        shopName.toLowerCase(),
        `${shopName.toLowerCase()}.json`
    )
    const insertedReference = []
    const files = fs.readFileSync(stylesPath, 'utf-8')
    const images = fs.readdirSync(imagesPath).sort(getName)
    const data = JSON.parse(files).data
    if (data == null) {
        return
    }
    console.log(images)
    const keyView = ['front', 'back', 'left', 'right', 'top']
    for (const [idx, garment] of data.entries()) {
        if (idx === 1873 || idx === 3150) continue
        console.log('================================')
        console.log(`Index ${idx}/${data.length}`)
        const viewOption: object = {}
        for (const [idx, key] of keyView.entries()) {
            if (idx < (garment['view'] as string[]).length) {
                break
            }
            viewOption[key] = garment['view'][idx]
        }
        const payload = {
            shop: shopName,
            clothId: idx,
            clothName: garment['clothName'],
            clothCategory: garment?.category || '',
            price: garment['price'],
            colour: garment['colors'] ? convertToVietnamese(garment['colors'][0]?.name || '') : garment['color'] || '',
            view: {
                default: `http://${process.env.DB_HOST}:${process.env.BACKEND_PORT}/api/static/images/${shopName.toLowerCase()}/${idx}`,
                ...viewOption
            },
            colorOption: [],
            referenceLink: garment['url'],
            review: {
                count: random(1000, idx),
                avg: random(1000, idx) / (random(1000, idx) + random(100, idx))
            }
        }
        /**
         * If you want add data into Mongodb, let run below code
         * insertedReference.push(payload)
         */
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
    // console.log(JSON.parse(files).data)
}
