import { PrismaClient } from '@/generated/prisma/client'

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined')
  }

  // SQLite
  if (databaseUrl.startsWith('file:')) {
    const adapter = new PrismaBetterSqlite3({
      url: databaseUrl,
    })

    return new PrismaClient({
      adapter,
      log: ['query'],
    })
  }

  // PostgreSQL
  const adapter = new PrismaPg({
    connectionString: databaseUrl,
  })

  return new PrismaClient({
    adapter,
    log: ['query'],
  })
}

const prisma =
  globalForPrisma.prisma ??
  createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
