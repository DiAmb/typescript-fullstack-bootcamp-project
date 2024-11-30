import { createFileRoute } from '@tanstack/react-router'
import { ProductList } from '../components/ProductList'
import { useSuspenseQuery } from '@tanstack/react-query'

import { FilterOption } from '../components/FilterOption'
import { productsQueryOptions } from '../utils/productsQueryOptions'
import { collectionsQueryOptions } from '../utils/collectionsQuery'
import { Suspense } from 'react'
import { ProductsQuerySchema } from '@repo/schemas'

import { SearchInput } from '../components/SearchInput'
import LoadingIndicator from '../components/LoadingIndicator'
import Footer from '../components/Footer'

export const Route = createFileRoute('/search')({
  component: SearchPage,
  validateSearch: ProductsQuerySchema,
  loaderDeps: ({ search: { collection, sort } }) => ({
    collection,
    sort,
  }),
  loader: async ({ context, deps }) => {
    if (!context.queryClient) {
      throw new Error('queryClient is not available in context')
    }

    return {
      products: await context.queryClient.ensureQueryData(
        productsQueryOptions(deps),
      ),
      collections: await context.queryClient.ensureQueryData(
        collectionsQueryOptions(),
      ),
    }
  },
  pendingMinMs: 0,
})

function SearchPage() {
  return (
    <div className="dark:bg-gray-900 pt-24 min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row gap-12 flex-1">
        {/* Sidebar */}
        <aside className="flex flex-col gap-6 max-w-52 ml-2 mb-12 bg-gray-100 dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <Collections />
          <Sort />
        </aside>

        {/* Main Content */}
        <main className="flex-1 mr-8 mb-12">
          {/* Search Input */}
          <div className="flex justify-end mb-6 ">
            <SearchInput />
          </div>

          {/* Product List */}
          <Suspense fallback={<LoadingIndicator />}>
            <ProductList />
          </Suspense>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

function Collections() {
  const { data } = useSuspenseQuery(collectionsQueryOptions())

  if (data.status === 'error') {
    return <span>Error from API: {JSON.stringify(data)}</span>
  }

  return (
    <nav className=" dark:text-white">
      <h3 className="text-sm font-semibold text-slate-500 ">Collections</h3>
      <ul className="space-y-2">
        <li>
          <FilterOption filterKey="collection" name="All" value={undefined} />
        </li>
        {data.data.map((item) => (
          <li key={item.id} className="hover:text-blue-700">
            <FilterOption
              filterKey="collection"
              name={item.name}
              value={item.id}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Sort() {
  return (
    <nav className="space-y-4 dark:text-white">
      <h3 className="text-sm font-semibold text-slate-500">Sort</h3>
      <ul className="space-y-2">
        <li>
          <FilterOption
            filterKey="sort"
            name="Price: Low to high"
            value="price-asc"
          />
        </li>
        <li>
          <FilterOption
            filterKey="sort"
            name="Price: High to low"
            value="price-desc"
          />
        </li>
      </ul>
    </nav>
  )
}
