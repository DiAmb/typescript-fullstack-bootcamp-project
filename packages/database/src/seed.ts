import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const colors = ['red', 'blue', 'green', 'yellow', 'purple']

async function main() {
  //Create 5 collections
  const collections = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.collection.create({
        data: {
          name: faker.commerce.department(),
          description: faker.lorem.sentence(),
        },
      }),
    ),
  )
  //Create 10 products
  const products = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          image: faker.image.url(),
          collections: {
            connect: collections.map((collection) => ({
              id: collection.id,
            })),
          },
        },
      }),
    ),
  )

  //Create 20 variants
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const variants = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      prisma.variant.create({
        data: {
          productId: faker.helpers.arrayElement(products).id,
          name: faker.commerce.productAdjective(),
          description: faker.lorem.sentence(),
          image: faker.image.url(),
          sku: faker.string.alphanumeric(10),
          price: faker.number.int({ min: 100, max: 1000 }),
          stock: faker.number.int({ min: 1, max: 100 }),
        },
      }),
    ),
  )

  //Create 5 OptionScalarFieldEnum
  const options = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.option.create({
        data: {
          productId: faker.helpers.arrayElement(products).id,
          name: faker.commerce.productMaterial(),
        },
      }),
    ),
  )

  //Create 15 OptionValue whit random colors from predefinied array
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const optionValues = await Promise.all(
    Array.from({ length: 15 }).map(() =>
      prisma.optionValue.create({
        data: {
          optionId: faker.helpers.arrayElement(options).id,
          value: faker.helpers.arrayElement(colors),
        },
      }),
    ),
  )
  console.log('Seed completed')
}
main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
