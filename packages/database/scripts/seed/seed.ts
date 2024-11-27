import { PrismaClient } from '../../prisma/prisma-client'
import { faker } from '@faker-js/faker'

export async function seed(prisma: PrismaClient) {
  const collectionNames = ['Casual Wear', 'Technology', 'Home and Kitchen']
  const productCategories = {
    'Casual Wear': ['T-Shirt', 'Jeans', 'Jacket', 'Sweater'],
    Technology: ['Smartphone', 'Laptop', 'Headphones', 'Tablet'],
    'Home and Kitchen': ['Blender', 'Pan', 'Knife Set', 'Dish Set'],
  }

  await prisma.collection.createMany({
    data: collectionNames.map((name) => ({
      name,
      description: faker.lorem.sentences(3),
    })),
  })

  for (let i = 0; i < 100; i++) {
    const collectionIndex = i % collectionNames.length
    const category = collectionNames[collectionIndex]
    const productName =
      faker.helpers.arrayElement(productCategories[category]) +
      ` ${faker.color.human()}`

    const product = await prisma.product.create({
      data: {
        name: productName,
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
        options: {
          create: [
            {
              name: 'Color',
              values: {
                create: ['Red', 'Blue', 'Green'].map((value) => ({
                  value,
                })),
              },
            },
            {
              name: 'Size',
              values: {
                create: ['S', 'M', 'L', 'XL'].map((value) => ({
                  value,
                })),
              },
            },
          ],
        },
      },
    })

    const variants = await prisma.variant.createManyAndReturn({
      data: [
        {
          productId: product.id,
          name: `${productName} - Red S`,
          description: faker.lorem.sentences(2),
          image: faker.image.url(),
          sku: faker.string.numeric(10),
          price: faker.number.int({ min: 1000, max: 5000 }),
          stock: faker.number.int({ min: 0, max: 100 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: product.id,
          name: `${productName} - Blue M`,
          description: faker.lorem.sentences(2),
          image: faker.image.url(),
          sku: faker.string.numeric(10),
          price: faker.number.int({ min: 1000, max: 5000 }),
          stock: faker.number.int({ min: 0, max: 100 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: product.id,
          name: `${productName} - Green L`,
          description: faker.lorem.sentences(2),
          image: faker.image.url(),
          sku: faker.string.numeric(10),
          price: faker.number.int({ min: 1000, max: 5000 }),
          stock: faker.number.int({ min: 0, max: 100 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })

    const colorOptions = await prisma.optionValue.findMany({
      where: {
        option: {
          name: 'Color',
          productId: product.id,
        },
      },
    })

    const sizeOptions = await prisma.optionValue.findMany({
      where: {
        option: {
          name: 'Size',
          productId: product.id,
        },
      },
    })

    const connectValues = [
      [
        { id: colorOptions.find((c) => c.value === 'Red')!.id },
        { id: sizeOptions.find((s) => s.value === 'S')!.id },
      ],
      [
        { id: colorOptions.find((c) => c.value === 'Blue')!.id },
        { id: sizeOptions.find((s) => s.value === 'M')!.id },
      ],
      [
        { id: colorOptions.find((c) => c.value === 'Green')!.id },
        { id: sizeOptions.find((s) => s.value === 'L')!.id },
      ],
    ]

    for (let j = 0; j < variants.length; j++) {
      const variant = variants[j]
      await prisma.variant.update({
        where: { id: variant.id },
        data: {
          optionValues: {
            connect: connectValues[j],
          },
        },
      })
    }

    const collection = await prisma.collection.findFirst({
      where: { name: collectionNames[collectionIndex] },
    })

    if (collection) {
      await prisma.collection.update({
        where: { id: collection.id },
        data: {
          products: {
            connect: { id: product.id },
          },
        },
      })
    }
  }
}
