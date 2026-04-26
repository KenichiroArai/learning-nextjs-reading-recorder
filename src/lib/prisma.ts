import { PrismaClient } from '@/generated/prisma/client'

// globalオブジェクトにprismaを持たせるための型キャスト
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// global.prisma上にPrismaクライアントが存在すれば再利用
// 存在しなければ新しく生成（v7ではaccelerateUrlが必須）
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL!, // 接続URL（.envから取得）
    log: ['query'], // クエリログを出力
  })

// 非Production環境ではglobalForPrisma.prismaにオブジェクトを格納
// → ホットリロード時のインスタンス多重生成を防ぐ
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
