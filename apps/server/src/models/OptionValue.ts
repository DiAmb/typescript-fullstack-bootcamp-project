import { Variant } from './Variant'

export type OptionValue = {
  id: number
  optionId: number
  value: string
  variants: Variant[]
  createdAt: string
  updatedAt: string
}
