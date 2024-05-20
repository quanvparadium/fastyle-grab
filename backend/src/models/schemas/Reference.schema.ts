import { ObjectId } from 'mongodb'

interface viewOption {
    default: string
    left?: string
    right?: string
    front?: string
    back?: string
    top?: string
}

interface ColorShopLink {
    baseColour: string
    imageUrls: string[]
}

interface Review {
    count: number
    avg: number
}

interface ReferenceShopType {
    _id?: ObjectId
    shop: string
    clothId: number
    clothName: string
    clothCategory: string
    price: number
    colour: string
    view: viewOption
    colorOption?: ColorShopLink[]
    referenceLink: string
    review: Review
}

export default class ReferenceShop {
    _id: ObjectId
    shop: string
    clothId: number
    clothName: string
    clothCategory: string
    price: number
    colour: string
    view: viewOption
    colorOption?: ColorShopLink[]
    referenceLink: string
    review: Review

    constructor(ref: ReferenceShopType) {
        this._id = ref._id || new ObjectId()
        this.shop = ref.shop
        this.clothId = ref.clothId
        this.clothName = ref.clothName
        this.clothCategory = ref.clothCategory
        this.price = ref.price
        this.colour = ref.colour
        this.view = ref.view
        this.colorOption = ref.colorOption || null
        this.referenceLink = ref.referenceLink
        this.review = ref.review
    }
}
