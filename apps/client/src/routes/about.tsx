import { createFileRoute } from '@tanstack/react-router'
import Footer from '../components/Footer'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-blue-700 mt-16 text-white py-16 px-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg mt-4 mb-6">
            Discover the story behind DeStore, our mission, and what drives us
            to be your favorite online store.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/images/about-us-spotlight.png"
              alt="About Us"
              className="rounded-lg shadow-lg w-full max-w-md md:max-w-full"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              At DeStore, we strive to provide a seamless shopping experience
              with the best products, excellent service, and a commitment to
              customer satisfaction. Our journey started with a simple goal: to
              make online shopping easy and accessible for everyone.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Join us as we continue to grow, innovate, and bring you the best
              shopping experience possible. Your trust and loyalty inspire us to
              do better every day.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="flex justify-center items-center h-20 w-20 mb-4">
                <img
                  src="/icons/integrity.svg"
                  alt="Integrity"
                  className="w-12 dark:invert"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Integrity
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                We are committed to transparency and honesty in every aspect of
                our business.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="flex justify-center items-center h-20 w-20 mb-4">
                <img
                  src="/icons/innovation.svg"
                  alt="Innovation"
                  className="w-12 dark:invert"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                Constantly improving to offer you the best online shopping
                experience.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="flex justify-center items-center h-20 w-20 mb-4">
                <img
                  src="/icons/customer-focus.svg"
                  alt="Customer Focus"
                  className="w-12 dark:invert"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Customer Focus
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                Our customers are at the heart of everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
