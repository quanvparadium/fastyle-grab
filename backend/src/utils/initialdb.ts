import fs from 'fs'
import path from 'path'
import { parseAge, parseGender, parseSeason, parseUsage } from './parser'
import databaseService from '~/services/database.services'
import Clothes from '~/models/schemas/Clothes.schema'
import { ObjectId } from 'mongodb'
// import databaseService from '~/services/database.services'

function getName(file1: string, file2: string): number {
    try {
        return parseInt(file1.split('.')[0]) - parseInt(file2.split('.')[0])
    } catch (error) {
        throw new Error('Validation Type')
    }
}

function getDate(seconds: number): Date {
    const date = new Date(0) // Tạo một đối tượng Date với thời điểm ban đầu là Epoch (01/01/1970 00:00:00 UTC)
    date.setSeconds(seconds)
    return date
}
function saveArrayToJsonFile(data: any[], filePath: string): void {
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFileSync(filePath, jsonData)
    console.log(`Array saved to ${filePath}`)
}

export async function createData() {
    const stylesPath = path.join(process.env.DATAPATH, 'styles')
    const imagesPath = path.join(process.env.DATAPATH, 'images')
    const files = fs.readdirSync(stylesPath).sort(getName)
    const totalFile = files.length
    const images = fs.readdirSync(imagesPath).sort(getName)
    const exist: { [key: string]: number } = {}
    const insertedImage = []
    for (const image of images) {
        exist[image.split('.')[0]] = 1
    }
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
                    imageUrl: color.search_image
                })
            }
        }
        const clothCategory = data['data'].subCategory?.typeName
        const payload = {
            clothId: data['data']['id'],
            clothName: data['data']['productDisplayName'],
            clothCategory: clothCategory,
            price: data['data']['price'],
            discountedPrice: data['data']['discountedPrice'],
            colour: data.data.baseColour,
            gender: parseGender(data['data']['gender'] as string),
            season: parseSeason(data['data']['season'] as string),
            ageGroup: parseAge(data['data']['ageGroup'] as string),
            brandName: data['data']['brandName'],
            brandLogoImage: data.data?.brandUserProfile?.image,
            vat: data['data']['vat'],
            view: {
                default: styleImage.default?.resolutions['1080X1440'],
                left: styleImage.left?.resolutions['1080X1440'],
                right: styleImage.right?.resolutions['1080X1440'],
                front: styleImage.front?.resolutions['1080X1440'],
                back: styleImage.back?.resolutions['1080X1440'],
                top: styleImage.top?.resolutions['1080X1440']
            },
            colorOption: colorOption,
            usage: parseUsage(data['data']['usage']),
            createdAt: getDate(data['data']['catalogAddDate'])
        }

        try {
            if (clothCategory === 'Topwear') {
                await databaseService.topwear.insertOne(new Clothes(payload))
            } else if (clothCategory === 'Headwear') {
                await databaseService.headwear.insertOne(new Clothes(payload))
            } else if (clothCategory === 'Bottomwear') {
                await databaseService.bottomwear.insertOne(new Clothes(payload))
            } else if (clothCategory === 'Dress') {
                await databaseService.dress.insertOne(new Clothes(payload))
            } else if (['Shoes', 'Sandal', 'Flip Flops'].includes(clothCategory)) {
                await databaseService.footwear.insertOne(new Clothes(payload))
            } else if (['Bags', 'Gloves', 'Watches', 'Jewellery'].includes(clothCategory)) {
                await databaseService.others.insertOne(new Clothes(payload))
            }
            insertedImage.push(file.split('.')[0] + '.jpg')
            console.log(file.split('.')[0] + '.jpg')
        } catch (error) {
            console.log(error, clothCategory)
            throw new Error(error)
        }
    }
    saveArrayToJsonFile(insertedImage, 'data.json')
    console.log('Insert data successfully')
}
