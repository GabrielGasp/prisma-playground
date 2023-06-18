import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        email: 'lomo@prisma.io',
        name: 'Sonia Lomo',
        age: 25,
        country: 'Kenya',
        role: 'USER'
      },
      {
        email: 'ruheni@prisma.io',
        name: 'Alex Ruheni',
        age: 25,
        country: 'Germany',
        role: 'USER'
      },
      {
        email: 'bava@prisma.io',
        name: 'Nilu Bava',
        age: 20,
        country: 'Germany',
        role: 'ADMIN'
      },
      {
        email: 'ada@lovelace.dev',
        name: 'Ada Lovelace',
        age: 208,
        country: 'England',
        role: 'USER'
      }
    ]
  })

  await prisma.profile.createMany({
    data: [
      {
        bio: 'I like turtles',
        userId: 1
      },
      {
        bio: 'MDX Ninja @ Prisma',
        userId: 2
      },
      {
        bio: 'I wrote computer programs before it was cool',
        userId: 4
      }
    ]
  })

  await prisma.category.createMany({
    data: [
      {
        name: 'Random'
      },
      {
        name: 'Tech'
      }
    ]
  })

  const postsData = [
    {
      title: 'Hello World',
      published: true,
      authorId: 1,
      categories: {
        connect: { id: 1 }
      }
    },
    {
      title: 'How Prisma Makes Frontend Developers Fullstack',
      published: false,
      authorId: 1,
      categories: {
        connect: { id: 2 }
      }
    },
    {
      title: 'What it feels like to work in a company with 5 people called Alex',
      published: true,
      authorId: 2,
      categories: {
        connect: { id: 1 }
      }
    },
    {
      title: 'Deep Dive into Prisma Migrate 1/5',
      published: false,
      authorId: 2,
      categories: {
        connect: { id: 2 }
      }
    },
    {
      title: 'Deep Dive into Prisma Migrate 2/5',
      published: true,
      authorId: 2,
      categories: {
        connect: { id: 2 }
      }
    },
    {
      title: 'Deep Dive into Prisma Migrate 3/5',
      published: false,
      authorId: 2,
      categories: {
        connect: { id: 2 }
      }
    },
    {
      title: 'Deep Dive into Prisma Migrate 4/5',
      published: true,
      authorId: 2,
      categories: {
        connect: { id: 2 }
      }
    },
    {
      title: 'Deep Dive into Prisma Migrate 5/5',
      published: false,
      authorId: 2,
      categories: {
        connect: { id: 2 }
      }
    },
    {
      title: 'How Computers Work',
      published: true,
      authorId: 4,
      categories: {
        connect: { id: 1 }
      }
    },
    {
      title: 'A typical day of an Engineer in England in the 1820s',
      published: false,
      authorId: 4,
      categories: {
        connect: { id: 1 }
      }
    }
  ]

  await Promise.all(postsData.map(async (post) => prisma.post.create({ data: post })));
}

seed()
  .then(async () => {
    console.log('Seeding complete!')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })