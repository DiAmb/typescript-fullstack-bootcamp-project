import { getProductQueryOptions } from './getProductsQueryOptions'

describe('getProductQueryOptions', () => {
  it('returns query options with the correct structure and behavior', async () => {
    const productId = '123'
    const options = getProductQueryOptions({ id: productId })

    // Verify the queryKey structure includes the correct ID
    expect(options.queryKey).toEqual(['getProduct', productId])

    // Mock the fetch API to simulate a successful API call
    const mockResponse = { id: '123', name: 'Test Product' }
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      } as Response),
    )

    // Call the query function and validate the returned data
    const result = await options.queryFn()
    expect(result).toEqual(mockResponse)

    // Restore the original fetch implementation
    global.fetch.mockRestore()
  })

  it('throws an error if the fetch fails', async () => {
    const productId = '123'
    const options = getProductQueryOptions({ id: productId })

    // Mock the fetch API to simulate a failure
    global.fetch = jest.fn(() => Promise.reject(new Error('Fetch failed')))

    // Expect the query function to throw an error
    await expect(options.queryFn()).rejects.toThrow('Fetch failed')

    // Restore the original fetch implementation
    global.fetch.mockRestore()
  })
})
