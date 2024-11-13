import express, { Express } from 'express'
import { prisma } from '../../lib/prismaClient'

export function ProductsRoute(app: Express): void {
  const router = express.Router()
  app.use('/api/products', router)

  router.get('/', async function name(_req, res, next) {
    try {
      const result = await prisma.product.findMany({
        include: { variants: true },
      })
      return res.json({ result })
    } catch (error) {
      next(error)
    }
  })
}
