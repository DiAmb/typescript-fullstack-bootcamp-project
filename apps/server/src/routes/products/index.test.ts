import { productsRoute } from '.'
import request from 'supertest'
import express from 'express'

const app = express()
productsRoute(app)

jest.mock('../../services/products', () => ({
  ProductsService: class MockProductsService {
    async list() {
      return [
        {
          id: 1,
          name: 'Product A',
          description: 'Description A',
          image: 'http:/example.com',
          price: 100,
        },
        {
          id: 2,
          name: 'Product B',
          description: 'Description B',
          image: 'http:/example.com',
          price: 100,
        },
      ]
    }
    async get({ id }: { id: number }) {
      if (!id) {
        throw new Error('Invalid parameter: id is required')
      }

      if (id === 1) {
        return {
          id: 1,
          name: 'Product A',
          description: 'Description A',
          image: 'http:/example.com',
          price: 100,
        }
      }

      return {
        status: 'error',
        message: 'Product not found',
        statusCode: 404,
      }
    }
  },
}))

describe('Products API', () => {
  let server: ReturnType<typeof app.listen>

  beforeEach(() => {
    server = app.listen(4000)
  })

  afterEach(() => {
    if (server) server.close()
  })

  describe('GET /api/products', () => {
    it('responds with a list of products', async () => {
      const response = await request(app)
        .get('/api/products')
        .set('Accept', 'application/json')

      expect(response.body).toEqual({
        status: 'success',
        data: [
          {
            id: 1,
            name: 'Product A',
            description: 'Description A',
            image: 'http:/example.com',
            price: 100,
          },
          {
            id: 2,
            name: 'Product B',
            description: 'Description B',
            image: 'http:/example.com',
            price: 100,
          },
        ],
      })
    })
  })

  describe('GET /api/products/:id', () => {
    it('responds with a single product', async () => {
      const response = await request(app)
        .get('/api/products/1')
        .set('Accept', 'application/json')

      expect(response.body).toEqual({
        status: 'success',
        data: {
          id: 1,
          name: 'Product A',
          description: 'Description A',
          image: 'http:/example.com',
          price: 100,
        },
      })
    })

    it('responds with 404 if the product is not found', async () => {
      const response = await request(app)
        .get('/api/products/999')
        .set('Accept', 'application/json')

      expect(response.body).toEqual({
        status: 'success',
        data: {
          status: 'error',
          message: 'Product not found',
          statusCode: 404,
        },
      })
    })

    it('responds with 400 if the id is invalid', async () => {
      const response = await request(app)
        .get('/api/products/invalid_id')
        .set('Accept', 'application/json')

      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        message: 'Path parameters validation error.',
        details: [
          {
            code: 'invalid_type',
            expected: 'number',
            received: 'nan',
            path: ['id'],
            message: 'Expected number, received nan',
          },
        ],
      })
    })
  })
})
