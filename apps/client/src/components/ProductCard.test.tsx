import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProductCard } from './ProductCard'
import { ReactNode } from 'react'

jest.mock('@tanstack/react-router', () => ({
  Link: ({ children }: { children: ReactNode }) => children,
}))

describe('ProductCard', () => {
  it('loads and displays ProductCard with an image', async () => {
    render(
      <ProductCard
        product={{
          id: 1,
          name: 'Product Name',
          description: 'Product description',
          image: 'http://images.com',
          price: 1999,
        }}
      />,
    )
    const title = await screen.findAllByText('Product Name')
    const description = await screen.findAllByText('Product description')
    expect(title).toBeTruthy()
    expect(description).toBeTruthy()

    // Validate that the image has the correct source URL
    const image = screen.getByAltText('Product Name') as HTMLImageElement
    expect(image.src).toBe('http://images.com/')

    expect(image).toHaveClass('object-cover')
  })

  it('loads and displays ProductCard without an image', async () => {
    render(
      <ProductCard
        product={{
          id: 2,
          name: 'Product Without Image',
          description: 'Product without an image description',
          image: undefined,
          price: 1999,
        }}
      />,
    )
    const title = await screen.findAllByText('Product Without Image')
    const description = await screen.findAllByText(
      'Product without an image description',
    )
    expect(title).toBeTruthy()
    expect(description).toBeTruthy()

    // Validate that the image has no src set when image is undefined
    const image = screen.getByAltText(
      'Product Without Image',
    ) as HTMLImageElement
    expect(image.src).toBe('')
  })

  it('handles case with long product name and description', async () => {
    render(
      <ProductCard
        product={{
          id: 3,
          name: 'Long Product Name That Should Be Truncated or Handled Properly',
          description:
            'This is a very long description that should be displayed properly within the component, potentially truncating if necessary.',
          image: 'http://images.com',
          price: 2999,
        }}
      />,
    )
    // Validate that the long name and description are rendered correctly
    const title = await screen.findAllByText(
      'Long Product Name That Should Be Truncated or Handled Properly',
    )
    const description = await screen.findAllByText(
      'This is a very long description that should be displayed properly within the component, potentially truncating if necessary.',
    )
    expect(title).toBeTruthy()
    expect(description).toBeTruthy()
  })
})
