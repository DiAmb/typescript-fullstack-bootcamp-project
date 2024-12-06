import { Request, Response } from 'express'
import { ProductsService } from '../services/ProductService'

export class ProductController {
  private productService: ProductsService

  constructor(productService: ProductsService) {
    this.productService = productService
  }

  async getAllProducts(req: Request, res: Response) {
    const products = await this.productService.getAllProducts()
    res.json(products)
  }

  async getProductById(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const product = await this.productService.getProductById(id)
    res.json(product)
  }

  async createProduct(req: Request, res: Response) {
    const productData = req.body
    const product = await this.productService.createProduct(productData)
    res.json(product)
  }

  async updateProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const productData = req.body
    const product = await this.productService.updateProduct(id, productData)
    res.json(product)
  }

  async deleteProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    await this.productService.deleteProduct(id)
    res.json({ message: 'Product deleted successfully' })
  }
}
