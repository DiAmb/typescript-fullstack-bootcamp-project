import { ProductsService } from './ProductService'
import { prisma } from '../lib/prismaClient'

// Mocking the prisma client methods for testing
jest.mock('../lib/prismaClient', () => ({
  prisma: {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

describe('ProductsService', () => {
  let service: ProductsService

  beforeEach(() => {
    service = new ProductsService()
    jest.clearAllMocks() // Clear mocks before each test to ensure clean state
  })

  describe('getAllProducts', () => {
    it('should return a list of all products', async () => {
      const mockProducts = [
        { name: 'Product 1', description: 'Description 1' },
        { name: 'Product 2', description: 'Description 2' },
      ]
      ;(prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts)

      const result = await service.getAllProducts()

      expect(result).toHaveLength(2)
      expect(result[0].name).toBe('Product 1')
      expect(result[0].description).toBe('Description 1')
      expect(result[1].name).toBe('Product 2')
      expect(result[1].description).toBe('Description 2')
    })

    it('should handle products with null or undefined descriptions', async () => {
      const mockProducts = [
        { name: 'Product 1', description: null },
        { name: 'Product 2', description: undefined },
      ]
      ;(prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts)

      const result = await service.getAllProducts()

      // Ensure that descriptions default to an empty string
      expect(result).toHaveLength(2)
      expect(result[0].description).toBe('')
      expect(result[1].description).toBe('')
    })

    it('should throw an error if findMany fails', async () => {
      ;(prisma.product.findMany as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      )

      await expect(service.getAllProducts()).rejects.toThrow('Database error')
    })
  })

  describe('getProductById', () => {
    it('should throw an error if findUnique fails', async () => {
      ;(prisma.product.findUnique as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      )

      await expect(service.getProductById(1)).rejects.toThrow('Database error')
    })
  })

  describe('createProduct', () => {
    it('should throw an error if create fails', async () => {
      const mockProductData = {
        name: 'New Product',
        description: 'New Description',
      }
      ;(prisma.product.create as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      )

      await expect(service.createProduct(mockProductData)).rejects.toThrow(
        'Database error',
      )
    })
  })

  describe('updateProduct', () => {
    it('should throw an error if update fails', async () => {
      const mockUpdatedProductData = {
        name: 'Updated Product',
        description: 'Updated Description',
      }
      ;(prisma.product.update as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      )

      await expect(
        service.updateProduct(1, mockUpdatedProductData),
      ).rejects.toThrow('Database error')
    })
  })

  describe('deleteProduct', () => {
    it('should throw an error if delete fails', async () => {
      ;(prisma.product.delete as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      )

      await expect(service.deleteProduct(1)).rejects.toThrow('Database error')
    })
  })
})
