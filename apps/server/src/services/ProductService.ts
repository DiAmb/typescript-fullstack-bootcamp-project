import { prisma } from '../lib/prismaClient'
import {
  CreateProductData,
  Product,
  UpdateProductData,
} from '../models/Product'

export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      include: {
        variants: {
          include: {
            optionValues: true,
          },
        },
        options: {
          include: {
            values: true,
          },
        },
        collections: true,
      },
    })

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      variants: product.variants.map((variant) => ({
        id: variant.id,
        name: variant.name,
        description: variant.description,
        image: variant.image,
        sku: variant.sku,
        price: variant.price,
        stock: variant.stock,
        optionValues: variant.optionValues.map((optionValue) => ({
          id: optionValue.id,
          optionId: optionValue.optionId,
          value: optionValue.value,
          createdAt: optionValue.createdAt.toISOString(),
          updatedAt: optionValue.updatedAt.toISOString(),
        })),
      })),
      options: product.options.map((option) => ({
        id: option.id,
        name: option.name,
        values: option.values.map((value) => ({
          id: value.id,
          value: value.value,
          createdAt: value.createdAt.toISOString(),
          updatedAt: value.updatedAt.toISOString(),
        })),
      })),
      collections: product.collections.map((collection) => ({
        id: collection.id,
        name: collection.name,
        description: collection.description,
      })),
    })) as Product[]
  }

  async getProductById(id: number): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: {
          include: {
            optionValues: true,
          },
        },
        options: {
          include: {
            values: true,
          },
        },
        collections: true,
      },
    })

    if (!product) return null

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      variants: product.variants.map((variant) => ({
        id: variant.id,
        name: variant.name,
        description: variant.description,
        image: variant.image,
        sku: variant.sku,
        price: variant.price,
        stock: variant.stock,
        optionValues: variant.optionValues.map((optionValue) => ({
          id: optionValue.id,
          optionId: optionValue.optionId,
          value: optionValue.value,
          createdAt: optionValue.createdAt.toISOString(),
          updatedAt: optionValue.updatedAt.toISOString(),
        })),
      })),
      options: product.options.map((option) => ({
        id: option.id,
        name: option.name,
        values: option.values.map((value) => ({
          id: value.id,
          value: value.value,
          createdAt: value.createdAt.toISOString(),
          updatedAt: value.updatedAt.toISOString(),
        })),
      })),
      collections: product.collections.map((collection) => ({
        id: collection.id,
        name: collection.name,
        description: collection.description,
      })),
    } as Product
  }

  async createProduct(data: CreateProductData) {
    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
        variants: {
          create: data.variants.map((variant) => ({
            name: variant.name,
            description: variant.description,
            image: variant.image,
            sku: variant.sku,
            price: variant.price,
            stock: variant.stock,
            optionValues: {
              create: variant.optionValues.map((optionValue) => ({
                optionId: optionValue.optionId,
                value: optionValue.value,
              })),
            },
          })),
        },
        options: {
          create: data.options.map((option) => ({
            name: option.name,
            values: {
              create: option.values.map((value) => ({
                value: value.value,
              })),
            },
          })),
        },
        collections: {
          create: data.collections.map((collection) => ({
            name: collection.name,
            description: collection.description,
          })),
        },
      },
    })
  }

  async updateProduct(id: number, data: UpdateProductData) {
    return prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
        variants: data.variants
          ? {
              update: data.variants.map((variant) => ({
                where: { id: variant.id },
                data: {
                  name: variant.name,
                  description: variant.description,
                  image: variant.image,
                  sku: variant.sku,
                  price: variant.price,
                  stock: variant.stock,
                  optionValues: variant.optionValues
                    ? {
                        update: variant.optionValues.map((optionValue) => ({
                          where: { id: optionValue.id },
                          data: {
                            value: optionValue.value,
                          },
                        })),
                      }
                    : undefined,
                },
              })),
            }
          : undefined,

        options: data.options
          ? {
              update: data.options.map((option) => ({
                where: { id: option.id },
                data: {
                  name: option.name,
                  values: option.values
                    ? {
                        update: option.values.map((value) => ({
                          where: { id: value.id },
                          data: {
                            value: value.value,
                          },
                        })),
                      }
                    : undefined,
                },
              })),
            }
          : undefined,

        collections: data.collections
          ? {
              update: data.collections.map((collection) => ({
                where: { id: collection.id },
                data: {
                  name: collection.name,
                  description: collection.description,
                },
              })),
            }
          : undefined,
      },
    })
  }
  async deleteProduct(
    id: number,
  ): Promise<{ message: string; id: number } | null> {
    const productWithVariants = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: true,
        options: true,
      },
    })

    if (!productWithVariants) return null

    await prisma.optionValue.deleteMany({
      where: {
        optionId: {
          in: productWithVariants.options.map((option) => option.id),
        },
      },
    })
    await prisma.option.deleteMany({
      where: {
        productId: id,
      },
    })

    await prisma.variant.deleteMany({
      where: {
        productId: id,
      },
    })

    await prisma.product.delete({
      where: { id },
    })

    return { message: `Producto con ID ${id} eliminado exitosamente.`, id }
  }
}
