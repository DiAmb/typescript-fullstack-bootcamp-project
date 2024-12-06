import { collectionsQueryOptions } from './collectionsQuery'

describe('collectionsQueryOptions', () => {
  it('returns query options with correct structure and behavior', async () => {
    const options = collectionsQueryOptions()

    // Verify the queryKey structure is as expected
    expect(options.queryKey).toEqual(['collections'])

    // Mock the fetch API to simulate a successful response
    const mockResponse = { data: 'mockData' }
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      } as Response),
    )

    // Call the queryFn and check if it returns the mocked response
    const result = await options.queryFn()
    expect(result).toEqual(mockResponse)

    global.fetch.mockRestore()
  })
})
