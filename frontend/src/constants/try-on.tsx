import { Toolbar } from '@/types/canvas'
import { TryOnOutfit } from '@/types/product'
import { LuMousePointer2, LuHand, LuCrop } from 'react-icons/lu'

export const fakeData: TryOnOutfit[] = [
  {
    headwear: {
      _id: '6636882e05fb6be628561871',
      clothName: 'Puma Unisex Logo Cap',
      clothCategory: 'Headwear',
      price: 699,
      discountedPrice: 699,
      colour: 'Black',
      brandName: 'Puma',
      brandLogoImage:
        'http://assets.myntassets.com/assets/images/2015/11/17/11447736932686-113016-3ff8sf.jpg',
      view: {
        default:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/bfa6bc3cf0134934aefc6abfa07486dc_images.jpg',
        left: 'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/89281f9695f37619a88a0384bec789b5_images.jpg',
        right:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/68d41cd43da539eba829ca24f03ab4ea_images.jpg',
        front:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/00f19d05f6d42e8c0a469a6345b94cb5_images.jpg',
        back: 'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/e62a0c07680b47a2abf6972cfac43508_images.jpg',
        top: null,
      },
    },
    topwear: {
      _id: '6636882d05fb6be628561865',
      clothName: 'Nike Sahara Team India Fanwear Round Neck Jersey',
      clothCategory: 'Topwear',
      price: 895,
      discountedPrice: 895,
      colour: 'Blue',
      brandName: 'Nike',
      brandLogoImage:
        'http://assets.myntassets.com/v1/assets/banners/2015/6/26/1435317851398-23197-3chxv6.jpg',
      view: {
        default:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/Nike-Sahara-Team-India-Fanwear-Round-Neck-Jersey_2d27392cc7d7730e8fee0755fd41d30c_images.jpg',
        left: null,
        right: null,
        front:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/Nike-Sahara-Team-India-Fanwear-Round-Neck-Jersey_cc463e4fd400193e1a45117423129116_images.jpg',
        back: 'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/Nike-Sahara-Team-India-Fanwear-Round-Neck-Jersey_b9b54179594bc8a27811f82a0a82f00d_images.jpg',
        top: null,
      },
    },
    bottomwear: {
      _id: '6636882f05fb6be628561888',
      clothName: 'Artengo Men Training Shorts',
      clothCategory: 'Bottomwear',
      price: 999,
      discountedPrice: 999,
      colour: 'Black',
      brandName: 'Artengo',
      brandLogoImage: 'N/A',
      view: {
        default:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/809975ee7971d8a9faa437db7460eb9c_images.jpg',
        left: 'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/4204b0e29b3d3b6a82d0b6d04362b4f3_images.jpg',
        right:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/d3fa002769a3166889104fe9ce60ce17_images.jpg',
        front:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/28b51ce48e4f139e71938fa202b633e1_images.jpg',
        back: null,
        top: null,
      },
    },
    footwear: {
      _id: '6636882e05fb6be628561877',
      clothName: "Puma Men's Ballistic Spike White Green Shoe",
      clothCategory: 'Shoes',
      price: 5299,
      discountedPrice: 5299,
      colour: 'White',
      brandName: 'Puma',
      brandLogoImage:
        'http://assets.myntassets.com/assets/images/2015/11/17/11447736932686-113016-3ff8sf.jpg',
      view: {
        default:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/f64b458800bc9aff9805bb53ea1d01e3_images.jpg',
        left: 'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/dfcfd764eb9d2b2e99c40b5249939d6d_images.jpg',
        right:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/e30b654d34c384cf4cfe422812628b96_images.jpg',
        front:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/c46009c155856a12fa1af674a854e32a_images.jpg',
        back: 'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/44c85aa231e3fcc8e2be51f537dc7469_images.jpg',
        top: 'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/3b5f2de6be276a7a0904cfba4b44963a_images.jpg',
      },
    },
  },
  {
    topwear: {
      _id: '6636882d05fb6be628561867',
      clothName: 'Nike Mean Team India Cricket Jersey',
      clothCategory: 'Topwear',
      price: 2495,
      discountedPrice: 2495,
      colour: 'Blue',

      brandName: 'Nike',
      brandLogoImage:
        'http://assets.myntassets.com/v1/assets/banners/2015/6/26/1435317851398-23197-3chxv6.jpg',
      view: {
        default:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/assets/images/1165/2018/2/28/11519814282010-Nike-Mean-Team-India-Cricket-Jersey-6241519814281812-1.jpg',
        left: 'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/assets/images/1165/2018/2/28/11519814281928-Nike-Mean-Team-India-Cricket-Jersey-6241519814281812-5.jpg',
        right:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/assets/images/1165/2018/2/28/11519814281949-Nike-Mean-Team-India-Cricket-Jersey-6241519814281812-4.jpg',
        front:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/assets/images/1165/2018/2/28/11519814281993-Nike-Mean-Team-India-Cricket-Jersey-6241519814281812-2.jpg',
        back: 'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/assets/images/1165/2018/2/28/11519814281968-Nike-Mean-Team-India-Cricket-Jersey-6241519814281812-3.jpg',
        top: null,
      },
    },
    bottomwear: {
      _id: '6636882f05fb6be62856188c',
      clothName: 'Kalenji Mens Essential Training Track Pants',
      clothCategory: 'Bottomwear',
      price: 1299,
      discountedPrice: 1299,
      colour: 'Black',

      brandName: 'Kalenji',
      brandLogoImage: 'N/A',
      view: {
        default:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/60311352abfe03e7e3a351a9a9c1b7c6_images.jpg',
        left: 'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/b8db15e5ab753caa88a806a1f6b24fe1_images.jpg',
        right:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/80b8edcf8cd67c0f52bfbe0b33248779_images.jpg',
        front:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/2b4912de67d859acdcfef153f57168f0_images.jpg',
        back: null,
        top: null,
      },
    },
    footwear: {
      _id: '6636882e05fb6be62856187a',
      clothName: "Puma Men's Basket Bump Sneaker",
      clothCategory: 'Shoes',
      price: 3499,
      discountedPrice: 3499,
      colour: 'White',
      brandName: 'Puma',
      brandLogoImage:
        'http://assets.myntassets.com/assets/images/2015/11/17/11447736932686-113016-3ff8sf.jpg',
      view: {
        default:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/e5bbf781372cc7f852f7346c89eb2924_images.jpg',
        left: 'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/464d6f304b3352f204def2513bcf3faf_images.jpg',
        right:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/f1a5557229a9d1650d0c1857bc72e39e_images.jpg',
        front:
          'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/5d61295b433a99b3e2f76b87b9519750_images.jpg',
        back: 'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/93059189b6ffc32eeaa2968fa333e6a8_images.jpg',
        top: 'http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/a00646cac5ca161e41287af96a27f902_images.jpg',
      },
    },
  },
]

export const toolbar: Toolbar[] = [
  {
    id: 'move',
    name: 'Move',
    icon: <LuMousePointer2 size={24} />,
  },
  {
    id: 'hand',
    name: 'Hand tool',
    icon: <LuHand size={24} />,
  },
  {
    id: 'crop',
    name: 'Crop',
    icon: <LuCrop size={24} />,
  },
]
