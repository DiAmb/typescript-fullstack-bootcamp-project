import { createFileRoute, Link } from '@tanstack/react-router'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Footer from '../components/Footer'

const queryClient = new QueryClient()

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        {/* Contenido Principal */}
        <div className="flex-grow  bg-gray-50 dark:bg-gray-900">
          {/* Hero Section */}
          <section className="bg-blue-700 text-white py-16 px-6">
            <div className="max-w-screen-2xl mx-auto text-center">
              <h1 className="text-4xl mt-20 md:text-5xl font-bold mb-4">
                Welcome to DeStore
              </h1>
              <p className="mt-8 text-lg mb-6">
                Discover the best categories and find what you need in just a
                few clicks. Your favorite items are just a few taps away.
              </p>
              <Link to="/search">
                <button className="mt-12 bg-white text-blue-700 px-6 py-3 rounded-lg shadow-lg transform transition-all hover:bg-gray-100 hover:scale-105">
                  Explore Now
                </button>
              </Link>

              {/* Additional Features Section */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                  <div className="flex justify-center items-center h-36 w-20 mb-4">
                    <img
                      src="/icons/cube.svg"
                      className="w-52 "
                      alt="Icon Cube"
                    />
                  </div>
                  <h3 className="text-xl text-gray-700 font-semibold">
                    Wide Selection
                  </h3>
                  <p className="text-gray-700 mt-2">
                    Browse a wide variety of products from top brands and
                    categories.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                  <div className="flex justify-center items-center h-36 w-20 mb-4">
                    <img
                      src="/icons/delivery.svg"
                      className="w-36 "
                      alt="Icon Delivery"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    Fast Shipping
                  </h3>
                  <p className="text-gray-700 mt-2">
                    Enjoy quick and reliable shipping on all your orders, right
                    to your door.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                  <div className="flex justify-center items-center h-36 w-20 mb-4">
                    <img
                      src="/icons/transactions.svg"
                      className="w-28 "
                      alt="Icon Transactions"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    Secure Payment
                  </h3>
                  <p className="text-gray-700 mt-2">
                    Your transactions are safe and secure with our top-notch
                    payment systems.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* Testimonials Section */}
        <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6">
          <div className="max-w-screen-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Join thousands of happy customers who love shopping with us!
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Customer 1"
                  className="w-20 h-20 rounded-full shadow-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Jane Doe
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                  "DeStore has completely transformed the way I shop online. The
                  fast delivery and secure payments make it my go-to!"
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Customer 2"
                  className="w-20 h-20 rounded-full shadow-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  John Smith
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                  "I was amazed by the wide selection of products. DeStore makes
                  finding what I need so easy!"
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/55.jpg"
                  alt="Customer 3"
                  className="w-20 h-20 rounded-full shadow-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Sarah Lee
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                  "The customer service team is fantastic. They resolved my
                  issue in no time. Highly recommend!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </QueryClientProvider>
  )
}
