export type ProductCategoryKey = 'teas' | 'pastes' | 'tinctures' | 'seasonal'

export type Product = {
  display: string
  name: string
  nature: string
  price: string
  src: string
  alt: string
  category: ProductCategoryKey
}

export const productAssets: Omit<Product, 'display' | 'name' | 'nature' | 'alt'>[] = [
  {
    price: '¥128',
    src: '/assets/img-tea.png',
    category: 'teas',
  },
  {
    price: '¥268',
    src: '/assets/img-herbs.png',
    category: 'pastes',
  },
  {
    price: '¥320',
    src: '/assets/img-tea.png',
    category: 'teas',
  },
  {
    price: '¥398',
    src: '/assets/img-herbs.png',
    category: 'tinctures',
  },
  {
    price: '¥176',
    src: '/assets/img-wood.png',
    category: 'pastes',
  },
  {
    price: '¥96',
    src: '/assets/img-treatment.png',
    category: 'seasonal',
  },
]

export const categoryKeys: Array<ProductCategoryKey | 'all'> = [
  'all',
  'teas',
  'pastes',
  'tinctures',
  'seasonal',
]
