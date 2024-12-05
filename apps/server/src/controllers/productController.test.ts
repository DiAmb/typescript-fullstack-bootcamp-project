import { ProductController } from './productController'
import { ProductsService } from '../services/ProductService'
import { Request, Response } from 'express'

jest.mock('../services/ProductService', () => {
  return {
    ProductsService: jest.fn().mockImplementation(() => ({
      getAllProducts: jest.fn(),
      getProductById: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    })),
  }
})

describe('ProductController', () => {
  let controller: ProductController
  let service: ProductsService
  let mockReq: Partial<Request>
  let mockRes: Partial<Response>
  let jsonResponse: jest.Mock

  beforeEach(() => {
    service = new ProductsService()
    controller = new ProductController(service)
    mockReq = {}
    jsonResponse = jest.fn()
    mockRes = {
      json: jsonResponse,
    }
    jest.clearAllMocks()
  })

  describe('getAllProducts', () => {
    it('should return a list of products', async () => {
      const mockProducts = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          image: 'image1.jpg',
          price: 100,
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'Description 2',
          image: 'image2.jpg',
          price: 200,
        },
      ]
      ;(service.getAllProducts as jest.Mock).mockResolvedValue(mockProducts)
      await controller.getAllProducts(mockReq as Request, mockRes as Response)
      expect(jsonResponse).toHaveBeenCalledWith(mockProducts)
    })
  })

  describe('getProductById', () => {
    it('should return a single product', async () => {
      const mockProduct = {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        image: 'image1.jpg',
        price: 100,
      }
      const id = 1
      mockReq.params = { id: String(id) }
      ;(service.getProductById as jest.Mock).mockResolvedValue(mockProduct)

      await controller.getProductById(mockReq as Request, mockRes as Response)

      expect(jsonResponse).toHaveBeenCalledWith(mockProduct)
    })
  })

  describe('createProduct', () => {
    it('should create and return a new product', async () => {
      const newProductData = {
        name: 'Product 3',
        description: 'Description 3',
        image: 'image3.jpg',
        price: 300,
      }
      const createdProduct = { id: 3, ...newProductData }
      mockReq.body = newProductData
      ;(service.createProduct as jest.Mock).mockResolvedValue(createdProduct)

      await controller.createProduct(mockReq as Request, mockRes as Response)

      expect(jsonResponse).toHaveBeenCalledWith(createdProduct)
    })
  })

  describe('updateProduct', () => {
    it('should update and return the updated product', async () => {
      const updatedProductData = {
        name: 'Updated Product',
        description: 'Updated Description',
        image: 'updated.jpg',
        price: 150,
      }
      const updatedProduct = { id: 1, ...updatedProductData }
      const id = 1
      mockReq.params = { id: String(id) }
      mockReq.body = updatedProductData
      ;(service.updateProduct as jest.Mock).mockResolvedValue(updatedProduct)

      await controller.updateProduct(mockReq as Request, mockRes as Response)

      expect(jsonResponse).toHaveBeenCalledWith(updatedProduct)
    })
  })

  describe('deleteProduct', () => {
    it('should delete a product and return a success message', async () => {
      const id = 1
      mockReq.params = { id: String(id) }
      ;(service.deleteProduct as jest.Mock).mockResolvedValue(undefined)

      await controller.deleteProduct(mockReq as Request, mockRes as Response)

      expect(jsonResponse).toHaveBeenCalledWith({
        message: 'Product deleted successfully',
      })
    })
  })
})
