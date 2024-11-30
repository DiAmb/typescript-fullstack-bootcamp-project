import { createFileRoute } from '@tanstack/react-router'
import { getProductQueryOptions } from '../utils/getProductsQueryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { formatPrice } from '../utils/formatPrice'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export const Route = createFileRoute('/product/$id')({
  component: Page,
  loader: ({ context, params }) => ({
    product: context.queryClient.ensureQueryData(
      getProductQueryOptions({ id: Number(params.id) }),
    ),
  }),
  pendingMinMs: 0,
})

function Page() {
  const params = Route.useParams()
  const { addToCart } = useContext(CartContext)
  const { data } = useSuspenseQuery(
    getProductQueryOptions({ id: Number(params.id) }),
  )

  if (data.status === 'error') {
    return <span>Error from API: {JSON.stringify(data)}</span>
  }

  return (
    <div className="dark:bg-gray-900 pt-24 min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto py-12 px-4 max-w-5xl">
          <button
            className="mb-6 bg-gray-100  hover:text-blue-600 text-gray-800 font-medium text-sm py-2 px-4 rounded-lg flex items-center space-x-2 dark:bg-gray-700 dark:hover:bg-gray-400  dark:text-white"
            onClick={() => window.history.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            <span>Back</span>
          </button>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <img
                src={data.data?.image || 'https://via.placeholder.com/600'}
                alt={data.data?.name}
                className="w-full h-80 lg:h-full object-cover"
              />
            </div>

            <div className="p-6 lg:w-1/2 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  {data.data?.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-base mb-6">
                  {data.data?.description}
                </p>
                <p className="text-2xl font-semibold text-green-600 text-center">
                  {formatPrice(data.data?.price ?? 0)}
                </p>
              </div>

              <button
                className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg py-3 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition"
                onClick={() => {
                  if (data.data) {
                    addToCart({
                      id: data.data.id,
                      name: data.data.name,
                      price: data.data.price,
                    })
                  }
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
