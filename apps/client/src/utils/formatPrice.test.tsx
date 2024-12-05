import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('formats a price in cents to a currency string', () => {
    expect(formatPrice(100)).toEqual('$1.00')
    expect(formatPrice(200)).toEqual('$2.00')
    expect(formatPrice(1000)).toEqual('$10.00')
    expect(formatPrice(10000)).toEqual('$100.00')
  })

  it('throws an error for negative values', () => {
    expect(() => formatPrice(-100)).toThrow('Price cannot be negative')
    expect(() => formatPrice(-1)).toThrow('Price cannot be negative')
  })

  it('throws an error for decimal values', () => {
    expect(() => formatPrice(100.5)).toThrow(
      'Price must be provided in cents as an integer',
    )
    expect(() => formatPrice(0.1)).toThrow(
      'Price must be provided in cents as an integer',
    )
  })
})
