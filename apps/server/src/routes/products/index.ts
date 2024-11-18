import express, { Express } from 'express'
import { ProductController } from '../../controllers/productController'

export function productsRoute(app: Express): void {
  const router = express.Router()
  const productController = new ProductController()
  app.use('/api/products', router)

  router.get('/', productController.getAllProducts)
  router.get('/:id', productController.getProductById)
  router.post('/', productController.createProduct)
  router.put('/:id', productController.updateProduct)
  router.delete('/:id', productController.deleteProduct)
}
