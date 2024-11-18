import { OptionValue } from './OptionValue'

export type Variant = {
  id: number
  productId: number
  name: string
  description?: string | null
  image?: string | null
  sku: string
  price: number
  stock: number
  optionValues: OptionValue[]
  createdAt: string
  updatedAt: string
}
