import { createFileRoute } from '@tanstack/react-router'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProductList } from '../components/ProductList'

const queryClient = new QueryClient()

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container flex flex-col gap-8 justify-center items-center min-h-screen p-8 text-center mx-auto">
        <h1 className="text-xl md:text-5xl font-bold text-balance max-w-screen-lg">
          Mega Store :D
        </h1>

        <ProductList />
      </main>
    </QueryClientProvider>
  )
}
