import { createFileRoute } from '@tanstack/react-router'
import { ProductList } from '../components/ProductList'
import { useSuspenseQuery } from '@tanstack/react-query'

import { FilterOption } from '../components/FilterOption'
import { productsQueryOptions } from '../utils/productsQueryOptions'
import { collectionsQueryOptions } from '../utils/collectionsQuery'
import { Suspense } from 'react'
import { ProductsQuerySchema } from '@repo/schemas'

import { SearchInput } from '../components/SearchInput'

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
    <div className="flex justify-center container mx-auto gap-12 py-12">
      <aside className="flex flex-col gap-6 w-full max-w-[200px]">
        <Collections />
        <Sort />
      </aside>
      <main className="flex-1">
        <div className="flex justify-end mb-4">
          <SearchInput />
        </div>
        <Suspense fallback="Loading...">
          <ProductList />
        </Suspense>
      </main>
    </div>
  )
}

function Collections() {
  const { data } = useSuspenseQuery(collectionsQueryOptions())

  if (data.status === 'error') {
    return <span>Error from API: {JSON.stringify(data)}</span>
  }

  return (
    <nav>
      <h3 className="text-xs px-3 w-full text-slate-500">Collections</h3>
      <ul>
        <li>
          <FilterOption filterKey="collection" name="All" value={undefined} />
        </li>
        {data.data.map((item) => (
          <li key={item.id}>
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
    <nav>
      <h3 className="text-xs px-3 w-full text-slate-500">Sort</h3>
      <ul>
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
