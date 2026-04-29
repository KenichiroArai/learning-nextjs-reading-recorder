import prisma from '@/lib/prisma';
import type { Review } from '@/lib/types';

export async function getAllReviews(): Promise<Review[]> {
    // 読了日（read）降順で取得
    return await prisma.reviews.findMany({
        orderBy: {
            read: 'desc'
        }
    });
}
