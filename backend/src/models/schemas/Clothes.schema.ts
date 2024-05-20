import { ObjectId } from 'mongodb'
import { AgeGroup, Gender, Season, UsageCloth } from '~/constants/enum'

interface viewOption {
    default: string
    left?: string
    right?: string
    front?: string
    back?: string
    top?: string
}

interface ColorType {
    baseColour: string
    imageUrl: string
}

interface ClothesType {
    _id?: ObjectId
    clothId: number
    clothName: string
    clothCategory: string
    price: number
    discountedPrice: number
    colour: string
    gender: Gender
    season: Season
    ageGroup: AgeGroup
    brandName?: string
    brandLogoImage?: string
    vat?: number
    view: viewOption
    colorOption?: ColorType[]
    resolution?: string
    usage: UsageCloth
    createdAt: Date
}

export default class Clothes {
    _id: ObjectId
    clothId: number
    clothName: string
    clothCategory: string
    price: number
    discountedPrice: number
    colour: string
    gender: Gender
    season: Season
    ageGroup: AgeGroup
    brandName: string
    brandLogoImage: string
    vat: number
    view: viewOption
    colorOption?: ColorType[]
    resolution?: string
    usage: UsageCloth
    createdAt: Date

    constructor(cloth: ClothesType) {
        this._id = cloth._id || new ObjectId()
        this.clothId = cloth.clothId
        this.clothName = cloth.clothName
        this.clothCategory = cloth.clothCategory
        this.price = cloth.price
        this.discountedPrice = cloth.discountedPrice
        this.colour = cloth.colour
        this.gender = cloth.gender
        this.season = cloth.season
        this.ageGroup = cloth.ageGroup
        this.brandName = cloth.brandName || 'N/A'
        this.brandLogoImage = cloth.brandLogoImage || 'N/A'
        this.vat = cloth.vat || 0
        this.view = cloth.view
        this.resolution = cloth.resolution || '1080X1440'
        this.colorOption = cloth.colorOption || null
        this.usage = cloth.usage
        this.createdAt = cloth.createdAt || new Date()
    }
}
