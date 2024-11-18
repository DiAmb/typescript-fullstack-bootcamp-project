import { ProductService } from './../services/ProductService'
import { Request, Response } from 'express'

const productService = new ProductService()

export class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const result = await productService.getAllProducts()
      return res.json({ result })
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message })
      } else {
        return res.status(500).json({ error: 'Unknown error occurred' })
      }
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const result = await productService.getProductById(id)
      return res.json({ result })
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message })
      } else {
        return res.status(500).json({ error: 'Unknown error occurred' })
      }
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const data = req.body
      const result = await productService.createProduct(data)
      return res.json({ result })
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message })
      } else {
        return res.status(500).json({ error: 'Unknown error occurred' })
      }
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const data = req.body
      const result = await productService.updateProduct(id, data)
      return res.json({ result })
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message })
      } else {
        return res.status(500).json({ error: 'Unknown error occurred' })
      }
    }
  }
}
