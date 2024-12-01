import { GetProductResponse, ProductQuery } from '@repo/schemas'
import { queryOptions } from '@tanstack/react-query'

export const getProductQueryOptions = ({ id }: ProductQuery) => {
  const url = `http://localhost:5001/api/products/${id}`

  return queryOptions<GetProductResponse>({
    queryKey: ['getProduct', id],
    queryFn: () => fetch(url).then((result) => result.json()),
  })
}
