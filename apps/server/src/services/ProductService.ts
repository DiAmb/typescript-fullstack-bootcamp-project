import { prisma } from '../lib/prismaClient'
import { Product } from '../models/Product'

export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany()
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    })) as Product[]
  }

  async getProductById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
    }) as Promise<Product | null>
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createProduct(data: any) {
    return prisma.product.create({ data })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateProduct(id: number, data: any) {
    return prisma.product.update({
      where: { id },
      data,
    })
  }
}
