export type CATEGORY_MAP = {
  ao: 'AA'
  quan: 'BB'
  giay: 'CC'
  'trang-suc': 'DD'
  a: 'EE'
  b: 'FF'
}

export const categories: {
  id: keyof CATEGORY_MAP
  name: CATEGORY_MAP[keyof CATEGORY_MAP]
}[] = [
  {
    id: 'ao',
    name: 'AA',
  },
  {
    id: 'quan',
    name: 'BB',
  },
  {
    id: 'giay',
    name: 'CC',
  },
  {
    id: 'trang-suc',
    name: 'DD',
  },
  {
    id: 'a',
    name: 'EE',
  },
  {
    id: 'b',
    name: 'FF',
  },
]
