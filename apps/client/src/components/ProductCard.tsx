import { Product } from '@repo/schemas'
import { Link } from '@tanstack/react-router'
import { formatPrice } from '../utils/formatPrice'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      key={product.id}
      className="group border border-slate-200 rounded-xl overflow-hidden hover:border-slate-500 transition-all bg-slate-50 p-3 pb-6"
    >
      <div className="overflow-hidden rounded">
        <img
          className="transform transition-transform duration-300 ease-in-out group-hover:scale-105 w-full h-full object-cover"
          src={product.image ?? undefined}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-bold mb-1 text-lg">{product.name}</h2>
        <p className="text-xl font-bold text-blue-800 bg-sky-100 flex w-min rounded px-1">
          {formatPrice(product.price)}
        </p>
        <p className="text-sm text-slate-700 mt-6">{product.description}</p>
      </div>
    </Link>
  )
}
