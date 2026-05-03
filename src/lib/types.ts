import type { ReactNode } from 'react';

// 書籍情報の型定義
export type Book = {
    id:     string;
    title:  string;
    author: string;
    price:  number;
    publisher: string;
    published: string;
    image: string;
};

// Book型をもとにReview型を定義
export type Review = Book & {
    read: Date;
    memo: string;
};

// レイアウトのProps型
export type LayoutProps = Readonly<{
    children: ReactNode;
}>;

// Google Books APIからの応答の部分型
export type BookApi = {
    id: string,
    volumeInfo: {
        title: string;
        authors: string[];
        publisher: string;
        publishedDate: string;
        imageLinks: {
            smallThumbnail: string | null;
        };
    },
    saleInfo: {
        listPrice: {
            amount: number;
        };
    };
};

// ページコンポーネントのProps型
export type BookResultProps = Readonly<{
    params: Promise<{
        keyword?: string[];
    }>
}>;

// ページコンポーネントのProps型
export type EditPageProps = Readonly<{
    params: Promise<{
        id: string;
    }>
}>;

// FormEditコンポーネントのProps型
export type FormEditProps = Readonly<{
    src: {
        id: string;
        read: string;
        moemo?: string;
    }
}>;

// BookDetails/LinkedBookDetailsコンポーネントのProps定義
export type BookDetailsProps = Readonly<{
    index?:     number;
    book:       Book;
}>;
