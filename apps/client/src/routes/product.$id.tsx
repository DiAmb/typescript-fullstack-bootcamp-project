import { createFileRoute } from '@tanstack/react-router'
import { getProductQueryOptions } from '../utils/getProductsQueryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { formatPrice } from '../utils/formatPrice'

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
  const { data } = useSuspenseQuery(
    getProductQueryOptions({ id: Number(params.id) }),
  )

  if (data.status === 'error') {
    return <span>Error from API: {JSON.stringify(data)}</span>
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={data.data?.image || 'https://via.placeholder.com/600'}
          alt={data.data?.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {data.data?.name}
          </h1>
          <p className="text-gray-600 text-lg mb-6">{data.data?.description}</p>
          <p className="text-xl font-semibold text-green-600">
            {formatPrice(data.data?.price ?? 0)}
          </p>
        </div>
      </div>
    </div>
  )
}
