import { PrismaClient } from '../../prisma/prisma-client'
import { cleanup } from './cleanup'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting cleanup...')
  await cleanup(prisma)
  console.log('Cleanup completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
