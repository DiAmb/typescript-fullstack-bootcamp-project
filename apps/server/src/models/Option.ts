import { OptionValue } from './OptionValue'

export type Option = {
  id: number
  productId: number
  name: string
  values: OptionValue[]
  createdAt: string
  updatedAt: string
}
