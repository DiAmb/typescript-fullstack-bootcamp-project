import { productsQueryOptions } from './productsQueryOptions'

describe('productsQueryOptions', () => {
  it('returns query options with the correct query key structure', () => {
    const query = { collection: '123', sort: 'asc', q: 'test' }
    const options = productsQueryOptions(query)

    // Verify the queryKey structure
    expect(options.queryKey).toEqual(['productsSearch', '123', 'asc', 'test'])
  })

  it('handles missing optional parameters gracefully', () => {
    const query = { collection: undefined, sort: undefined, q: undefined }
    const options = productsQueryOptions(query)

    // Verify the queryKey structure with undefined values
    expect(options.queryKey).toEqual([
      'productsSearch',
      undefined,
      undefined,
      undefined,
    ])

    // Validate the generated URL (empty parameters should not appear in the query string)
    const url = options.queryFn.toString()
    expect(url).not.toContain('collection')
    expect(url).not.toContain('sort')
    expect(url).not.toContain('q')
  })

  it('includes only parameters that are provided', async () => {
    const query = { collection: '123', sort: undefined, q: 'test' }
    const options = productsQueryOptions(query)

    // Mock the fetch API to validate the URL and return a mock response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ mockData: 'testData' }),
      }),
    )

    // Call the query function
    await options.queryFn()

    // Verify the URL used in the fetch call
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('collection=123'),
    )
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('q=test'))
    expect(global.fetch).not.toHaveBeenCalledWith(
      expect.stringContaining('sort'),
    )

    // Restore the original fetch implementation
    global.fetch.mockRestore()
  })

  it('fetches data correctly when queryFn is called', async () => {
    const query = { collection: '123', sort: 'asc', q: 'test' }
    const options = productsQueryOptions(query)

    // Mock the fetch API to simulate a successful API call
    const mockResponse = { products: [{ id: '1', name: 'Test Product' }] }
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
    const query = { collection: '123', sort: 'asc', q: 'test' }
    const options = productsQueryOptions(query)

    // Mock the fetch API to simulate a failure
    global.fetch = jest.fn(() => Promise.reject(new Error('Fetch failed')))

    // Expect the query function to throw an error
    await expect(options.queryFn()).rejects.toThrow('Fetch failed')

    // Restore the original fetch implementation
    global.fetch.mockRestore()
  })
})
