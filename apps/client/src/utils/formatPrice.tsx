export function formatPrice(value: number) {
  if (value < 0) {
    throw new Error('Price cannot be negative')
  }
  if (!Number.isInteger(value)) {
    throw new Error('Price must be provided in cents as an integer')
  }

  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(value / 100)
}
