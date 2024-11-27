import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { ProductCard } from './ProductCard'
import { productsQueryOptions } from '../utils/productsQueryOptions'

export const ProductList = () => {
  const search = useSearch({ strict: false })
  const { data } = useSuspenseQuery(productsQueryOptions(search))

  if (data.status === 'error') {
    return <div>An error happened</div>
  }

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(250px,1fr))]">
      {data.data.map((item) => (
        /*<div className="item" key={item.id}>
                    <img src={item.image ?? undefined}></img>
                    <h2>{item.name}</h2>
                    <p>{item.description ?? undefined}</p>
                </div>*/
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  )
}
