import { z } from 'zod'
import { Product } from './../models/product'

export const ListProductsResponseSchema = z.object({
  status: z.enum(['success', 'error']),
  data: z.array(Product),
})

export type ListProductsResponse = z.infer<typeof ListProductsResponseSchema>
