import { useContext } from 'react'
import { formatPrice } from '../utils/formatPrice'
import { CartContext } from '../context/CartContext'

const Cart = ({ onClose }: { onClose: () => void }) => {
  const { cartItems, removeFromCart, decreaseQuantity, increaseQuantity } =
    useContext(CartContext)

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white dark:bg-gray-800 shadow-lg z-50 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Shopping Cart
        </h2>
        <button
          className="text-gray-500 hover:text-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <ul className="space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md"
            >
              <div>
                <p className="text-lg font-medium text-gray-800 dark:text-white">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {formatPrice(item.price)}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  className="w-6 h-6 flex items-center justify-center text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  −
                </button>

                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  {item.quantity}
                </span>
                <button
                  className="w-6 h-6 flex items-center justify-center text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
                <button
                  className="px-2 py-1 text-white bg-red-600 hover:bg-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={() => removeFromCart(item.id)}
                >
                  <img
                    src="/icons/trash.svg"
                    className="w-5 h-5 invert"
                    alt="Remove"
                  />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Your cart is empty.
          </p>
        )}
      </ul>

      {cartItems.length > 0 && (
        <div className="mt-6 border-t pt-4 border-gray-200 dark:border-gray-600">
          <div className="flex justify-between text-lg font-bold text-gray-800 dark:text-white">
            <span>Total</span>
            <span>
              {formatPrice(
                cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0,
                ),
              )}
            </span>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
