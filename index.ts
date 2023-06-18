import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
})

async function main() {
  await prisma.user.count() // this is to connect to the database before the timer starts

  console.time('prisma');
  const post = await prisma.post.findFirst()

  if (!post) {
    throw new Error('No post found')
  }

  const categories = await prisma.category.findMany({
    where: {
      posts: {
        some: {
          id: post.id,
        },
      },
    },
  })

  const postsWithCategories = { ...post, categories }

  console.log(postsWithCategories)
  console.timeEnd('prisma');

  // Using prisma `include` results in 3 queries. This way we only need 2.
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })