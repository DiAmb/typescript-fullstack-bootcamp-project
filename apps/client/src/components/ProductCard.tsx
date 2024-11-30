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
      className="group border border-slate-200 dark:border-gray-600 rounded-lg overflow-hidden hover:border-blue-500 transition-all bg-white dark:bg-gray-800 p-4 shadow-lg dark:shadow-md"
    >
      {/* Image */}
      <div className="overflow-hidden rounded-md">
        <img
          className="transform transition-transform duration-300 ease-in-out group-hover:scale-105 w-full h-48 object-cover"
          src={product.image ?? undefined}
          alt={product.name}
        />
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">
          {product.name}
        </h2>
        <p className="text-blue-700 dark:text-blue-400 text-xl font-semibold">
          {formatPrice(product.price)}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
          {product.description}
        </p>
      </div>
    </Link>
  )
}
