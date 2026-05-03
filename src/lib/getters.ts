import prisma from '@/lib/prisma';
import type { Book, BookApi, Review } from '@/lib/types';

// Google Books APIのエンドポイント
const API_URL = 'https://www.googleapis.com/books/v1/volumes';

export async function getAllReviews(): Promise<Review[]> {
    // 読了日（read）降順で取得
    return await prisma.reviews.findMany({
        orderBy: {
            read: 'desc'
        }
    });
}

// API経由で取得した書籍情報から必要な情報だけをオブジェクトに詰め替え
export function createBook(book: BookApi): Book {
    const authors = book.volumeInfo.authors;
    const price = book.saleInfo.listPrice;
    const img = book.volumeInfo.imageLinks;
    return {
        id: book.id,
        title: book.volumeInfo.title,
        author: authors ? authors.join(',') : '',
        price: price ? price.amount : 0,
        publisher: book.volumeInfo.publisher,
        published: book.volumeInfo.publishedDate,
        image: img?.smallThumbnail ?? '/vercel.svg',
    };
}

// 引数keywordをキーにGoogle Books APIから書籍を検索
export async function getBooksByKeyword(keyword: string): Promise<Book[]> {
    const res = await fetch(`${API_URL}?q=${keyword}&langRestrict=ja&maxResults=20&printType=books`, { cache: 'no-store' });
    const result = await res.json();
    const books = [];
    // 応答内容をオブジェクト配列に詰め替え
    for (const b of result.itmes) {
        books.push(createBook(b));
    }
    return books;
}

// id値をキーに書籍情報を取得
export async function getBookById(id: string): Promise<Book> {
    const res = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
    const result = await res.json();
    return createBook(result);
}

// id値をキーにレビュー情報を取得
export async function getReviewById(id: string): Promise<Review | null> {
    return await prisma.reviews.findUnique({
        where: {
            id: id
        }
    });
}
