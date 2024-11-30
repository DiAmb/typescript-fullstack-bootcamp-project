import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { useState, useContext } from 'react'
import { CartProvider, CartContext } from '../context/CartContext'
import Cart from '../components/Cart'

type RootContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: () => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const location = useLocation()
    const { cartItems } = useContext(CartContext)

    return (
      <>
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" aria-label="Go to Home">
              <img
                src="logo.svg"
                className="w-60 dark:invert"
                alt="Destore Logo"
              />
            </Link>

            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
              <button
                type="button"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center"
              >
                <img
                  src="/icons/cart.svg"
                  className="w-6 h-6 invert"
                  alt="Cart"
                />
                <span className="ml-2">Cart</span>

                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>
            </div>

            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    to="/"
                    aria-current="page"
                    className={`block py-2 px-3 ${location.pathname === '/' ? 'text-blue-500 dark:text-blue-600' : 'text-gray-900'} rounded  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    aria-current="page"
                    className={`block py-2 px-3 ${location.pathname === '/about' ? 'text-blue-500 dark:text-blue-600' : 'text-gray-900'} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    aria-current="page"
                    className={`block py-2 px-3  ${location.pathname === '/search' ? 'text-blue-500 dark:text-blue-600' : 'text-gray-900'} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                  >
                    Search
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
        <Outlet />
      </>
    )
  },
})
