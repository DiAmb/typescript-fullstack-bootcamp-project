import { Product } from './Product'

export type Collection = {
  id: number
  name: string
  description?: string
  products: Product[]
  createdAt: string
  updatedAt: string
}
