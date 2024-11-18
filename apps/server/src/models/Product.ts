import { Collection } from './Collections'
import { Option } from './Option'
import { Variant } from './Variant'

export type Product = {
  id: number
  name: string
  description?: string | null
  image?: string | null
  createdAt: string
  updatedAt: string
  variants: Variant[]
  options: Option[]
  collections: Collection[]
}
export type CreateProductData = {
  name: string
  description?: string | null
  image?: string | null
  variants: Omit<Variant, 'id' | 'productId' | 'createdAt' | 'updatedAt'>[]
  options: Omit<Option, 'id' | 'productId' | 'createdAt' | 'updatedAt'>[]
  collections: Omit<Collection, 'id' | 'createdAt' | 'updatedAt' | 'products'>[]
}
export type UpdateProductData = {
  name?: string
  description?: string | null
  image?: string | null

  variants?: {
    id: number
    name?: string
    description?: string | null
    image?: string | null
    sku?: string
    price?: number
    stock?: number
    optionValues?: {
      id: number
      value?: string
    }[]
  }[]

  options?: {
    id: number
    name?: string
    values?: {
      id: number
      value?: string
    }[]
  }[]

  collections?: {
    id: number
    name?: string
    description?: string | null
  }[]
}
